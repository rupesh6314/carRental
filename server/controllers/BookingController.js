import booking from "../models/Bookings.js"
import car from "../models/car.js"



const checkAvailability=async(car,pickupDate,returnDate)=>{
    const bookings=await booking.find({
        car,
        status: { $in: ['pending', 'confirmed'] },
        pickupDate:{$lte:returnDate},
        returnDate:{$gte:pickupDate},
    })
    return bookings.length===0
}

export const getCarBookedDates = async (req, res) => {
    try {
        const { carId } = req.params;
        const bookings = await booking.find({ 
            car: carId, 
            status: { $in: ['pending', 'confirmed'] } 
        }).select('pickupDate returnDate -_id');

        res.json({ success: true, bookedDates: bookings });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}

export const checkAvailabilityofCar=async(req,res)=>{
    try{
        const {location,pickupDate,returnDate}=req.body

        const cars=await car.find({location,isAvailable:true})

        const availableCarsPromises=cars.map(async(indi)=>{
            const isAvailable=await checkAvailability(indi._id,pickupDate,returnDate)
            return {...indi._doc,isAvailable:isAvailable}
        })

        let availableCars=await Promise.all(availableCarsPromises)
        availableCars=availableCars.filter(indi=>indi.isAvailable==true)

        res.json({success: true, availableCars})

    }
    catch(error){
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}


import Razorpay from 'razorpay';
import crypto from 'crypto';
import NotificationService from '../services/notificationService.js';

export const createRazorpayOrder = async (req, res) => {
    try {
        const { carId, pickupDate, returnDate } = req.body;

        const isAvailable = await checkAvailability(carId, pickupDate, returnDate);
        if (!isAvailable) {
            return res.json({ success: false, message: 'Car is not Available' });
        }

        const carData = await car.findById(carId);
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);

        const noOfDays = Math.max(1, Math.ceil((returned - picked) / (1000 * 60 * 60 * 24)));

        let price = carData.pricingModel === 'perLiter' ? 0 : carData.pricePerDay * noOfDays;

        if (price === 0) {
            // For perLiter, create a dummy order of 1 INR just to authorize card/UPI, or bypass payment entirely.
            // But let's charge a small minimum deposit for perLiter (e.g., 500 INR).
            price = 500; 
        }

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key_id',
            key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
        });

        const options = {
            amount: price * 100, // paisa
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.json({ success: true, order, price });

    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }
};

export const verifyAndCreateBooking = async (req, res) => {
    try {
        const { _id } = req.user;
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingData } = req.body;
        const { carId, pickupDate, returnDate, price } = bookingData;

        // Verify Signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'dummy_secret')
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.json({ success: false, message: "Invalid payment signature" });
        }

        const carData = await car.findById(carId);

        // Create Booking
        const newBooking = await booking.create({
            car: carId,
            owner: carData.owner,
            user: _id,
            pickupDate,
            returnDate,
            price,
            paymentId: razorpay_payment_id
        });

        // Send Notifications (Fire and forget, don't await so it doesn't block response)
        NotificationService.sendBookingNotifications(newBooking._id).catch(err => console.error("Notification Error:", err));

        res.json({ success: true, message: 'Booking Created and Payment Verified' });

    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }
};


export const getUserBookings= async(req,res)=>{
    try{
        const {_id} =req.user;
        const bookings=await booking.find({user:_id}).populate("car").sort({createdAt:-1})
        res.json({success:true, bookings})
    }
    catch(err){
        console.log(err.message)
        res.json({success:false, message:err.message})
    }
}

export const getOwnerBookings=async(req,res)=>{
    try{
        if(req.user.role!=='owner'){
            return res.json({success:false, message:'Unauthorized'})
        }
        const bookings=await booking.find({owner:req.user._id}).populate('car user').select('-user.password').sort({createdAt:-1})
        res.json({success:true, bookings})
    }
    catch(err){
        console.log(err.message)
        res.json({success:false,message:err.message})
    }
}

export const changeBookingStatus=async(req,res)=>{
    try{
        const {_id}=req.user
        const {bookingId,status}=req.body
        const bookingDoc=await booking.findById(bookingId)
        if(bookingDoc.owner.toString()!==_id.toString()){
            return res.json({success:false, message:'Unauthorized'})
        }
        bookingDoc.status=status
        await bookingDoc.save()
        res.json({success:true, message:'Status Updated'})
    }
    catch(err){
        console.log(err.message)
        res.json({success:false,message:err.message})
    }
}