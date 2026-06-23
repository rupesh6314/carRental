import mongoose from "mongoose"
const {ObjectId} =mongoose.Schema.Types

const bookingSchema=new mongoose.Schema({
    car:{type:ObjectId, ref:'car', required:true},
    user:{type:ObjectId, ref:"user",required:true},
    owner: {type:ObjectId, ref:'user', required:true},
    pickupDate: {type:Date, required:true},
    returnDate:{type:Date, required:true},
    status:{type: String, enum:["pending","confirmed","cancelled"],default:"pending"},
    price:{type:Number, required:true},
    advancePaid:{type:Number, default:0},
    balanceAmount:{type:Number, default:0}
},{timestamps:true})


const booking=mongoose.model('booking',bookingSchema)

export default booking