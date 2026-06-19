import booking from "../models/Bookings.js"
import car from "../models/car.js"



const checkAvailability=async(car,pickupDate,returnDate)=>{
    const bookings=await booking.find({
        car,
        pickupDate:{$lte:returnDate},
        returnDate:{$gte:pickupDate},
    })
    return bookings.length===0
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


export const createBooking = async (req, res) => {
    try {

        const { _id } = req.user

        const { carId, pickupDate, returnDate } = req.body

        const isAvailable = await checkAvailability(
            carId,
            pickupDate,
            returnDate
        )

        if (!isAvailable) {
            return res.json({
                success: false,
                message: 'Car is not Available'
            })
        }

        const carData = await car.findById(carId)

        const picked = new Date(pickupDate)
        const returned = new Date(returnDate)

        const noOfDays = Math.max(
            1,
            Math.ceil(
                (returned - picked) /
                (1000 * 60 * 60 * 24)
            )
        )

        let price = 0;
        if (carData.pricingModel === 'perLiter') {
            // Price cannot be calculated upfront, billed on consumption later
            price = 0;
        } else {
            price = carData.pricePerDay * noOfDays;
        }

        await booking.create({
            car: carId,
            owner: carData.owner,
            user: _id,
            pickupDate,
            returnDate,
            price
        })

        res.json({
            success: true,
            message: 'Booking Created'
        })

    } catch (err) {

        console.log(err)

        res.json({
            success: false,
            message: err.message
        })
    }
}


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