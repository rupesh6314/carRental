import imageKit from "../configs/imagekit.js";
import user from "../models/user.js"
import Car from "../models/car.js"
import fs from 'fs'
import booking from "../models/Bookings.js";


export const changeRoleToOwner=async(req,res)=>{
    try{
        const{_id}=req.user;
        await user.findByIdAndUpdate(_id,{role:"owner"})
        res.json({success:true, message:"Now you can add your cars!!"})
    }
    catch(error){
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}


export const addCar=async(req,res)=>{
    try{
        const {_id}=req.user
        let carData =JSON.parse(req.body.carData)
        const imageFile=req.file

        const fileBuffer=fs.readFileSync(imageFile.path)
        const response=await imageKit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder:'/car'
        })

        var optimizedImageUrl=imageKit.url({
            path:response.filePath,
            transformation:[
                {width:'1280'},
                {quality:'auto'},
                {format:'webp'}
            ]
        })
        const image = optimizedImageUrl;

        await Car.create({...carData,owner:_id,image})

        res.json({success:true, message:"Car Added!!!"})
    }
    catch(error){
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}

export const getOwnerCars=async(req,res)=>{
    try{
        const {_id}=req.user
        const cars = await Car.find({owner:_id}).lean()
        const bookings = await booking.find({owner:_id, status: { $in: ['pending', 'confirmed'] }})

        cars.forEach(car => {
            car.bookings = bookings
                .filter(b => String(b.car) === String(car._id))
                .map(b => ({
                    pickupDate: b.pickupDate,
                    returnDate: b.returnDate,
                    status: b.status
                }))
        })

        res.json({success:true, cars})
    }
    catch(error){
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}

export const toggleCarAvailability = async (req, res) => {
    try {

        const { _id } = req.user
        const { carId } = req.body

        const car = await Car.findById(carId)

        if (!car) {
            return res.json({
                success: false,
                message: "Car not found"
            })
        }

        if (car.owner.toString() !== _id.toString()) {
            return res.json({
                success: false,
                message: "Unauthorized"
            })
        }

        car.isAvailable = !car.isAvailable

        await car.save()

        res.json({
            success: true,
            message: "Availability Updated"
        })

    } catch (error) {

        console.log(error)

        res.json({
            success: false,
            message: error.message
        })
    }
}

export const deleteCar = async (req, res) => {
    try {

        const { _id } = req.user
        const { carId } = req.body

        const car = await Car.findById(carId)

        if (!car) {
            return res.json({
                success: false,
                message: "Car not found"
            })
        }

        if (car.owner.toString() !== _id.toString()) {
            return res.json({
                success: false,
                message: "Unauthorized"
            })
        }

        await Car.findByIdAndDelete(carId)

        res.json({
            success: true,
            message: "Car Deleted Successfully"
        })

    } catch (error) {

        console.log(error)

        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getDashboardData=async(req,res)=>{
    try{
        const {_id,role}=req.user
        
        if(role!=='owner'){
            return res.json({success:false, message:'Unauthorized'})
        }

        const cars=await Car.find({owner:_id})

        const bookings=await booking.find({owner:_id}).populate('car').sort({createdAt:-1})
        const pendingBookings=await booking.find({owner:_id, status:'pending'})
        const completedBookings=await booking.find({owner:_id,status:'confirmed'})
        const monthlyRevenue=bookings.slice().filter(book=>book.status==='confirmed').reduce((acc,book)=>acc + book.price,0)

        const dashboardData={
            totalCars:cars.length,
            totalBookings:bookings.length,
            pendingBookings:pendingBookings.length,
            completedBookings:completedBookings.length,
            recentBookings:bookings.slice(0,4),
            monthlyRevenue
        }
        res.json({success:true, dashboardData})

    }
    catch(error){
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}


export const updateUserImage=async(req,res)=>{
    try{

        const {_id}=req.user
        
        const imageFile=req.file

        const fileBuffer=fs.readFileSync(imageFile.path)
        const response=await imageKit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder:'/user'
        })

        var optimizedImageUrl=imageKit.url({
            path:response.filePath,
            transformation:[
                {width:'400'},
                {quality:'auto'},
                {format:'webp'}
            ]
        })
        const image = optimizedImageUrl;

        await user.findByIdAndUpdate(_id,{image})
        res.json({success:true, message:'Image Updated'})

    }
    catch(err){
        console.log(err)
        res.json({success:false, message:err.message})
    }
}