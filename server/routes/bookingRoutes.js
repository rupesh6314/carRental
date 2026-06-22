import express from 'express'
import { changeBookingStatus, checkAvailabilityofCar, createRazorpayOrder, verifyAndCreateBooking, createBypassedBooking, getOwnerBookings, getUserBookings, getCarBookedDates } from '../controllers/BookingController.js'
import { protect } from '../middleware/auth.js'
const bookingRouter=express.Router()
bookingRouter.post('/check-availability',checkAvailabilityofCar)
bookingRouter.post('/create-order', protect, createRazorpayOrder)
bookingRouter.post('/verify-payment', protect, verifyAndCreateBooking)
bookingRouter.post('/create-bypassed', protect, createBypassedBooking)
bookingRouter.get('/user',protect,getUserBookings)
bookingRouter.get('/owner',protect,getOwnerBookings)
bookingRouter.get('/dates/:carId', getCarBookedDates)

bookingRouter.post('/change-status',protect,changeBookingStatus)
export default bookingRouter