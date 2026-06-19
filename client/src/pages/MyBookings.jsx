import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
const MyBookings = ()=>{
    const {axios,user, currency}= useAppContext()

    const [bookings,setBookings]=useState([])
    const [reviewModal, setReviewModal] = useState({ isOpen: false, carId: null })
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')
    const fetchMyBookings=async()=>{
        try{
            const {data}= await axios.get('/api/booking/user')
            if(data.success){
                setBookings(data.bookings || [])
            }
            else{
                toast.error(data.message)
            }
        }
        catch(err){
            toast.error(err.message)
        }
    }

    const submitReview = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/review/add', {
                carId: reviewModal.carId,
                rating,
                comment
            })
            if (data.success) {
                toast.success(data.message)
                setReviewModal({ isOpen: false, carId: null })
                setRating(5)
                setComment('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        user && fetchMyBookings()
    },[user])


    return(
        <div className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 my-16 text-sm max-w-7xl mx-auto'>
            <Title title='My Profile & Bookings' subTitle='Manage your profile and view your car rental history' align='left'/>
            {!user ? (
                <div className='flex flex-col items-center justify-center py-20 text-center'>
                    <h2 className='text-2xl font-semibold text-gray-800 mb-2'>Please Login</h2>
                    <p className='text-gray-500'>You need to be logged in to view and manage your bookings.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-10 mt-8">
                    {/* User Profile Section */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                            <p className="text-gray-500 mt-1 text-base">{user.email}</p>
                            <div className="mt-4">
                                <span className="inline-block px-4 py-1.5 bg-indigo-50 text-primary text-xs font-bold rounded-full border border-indigo-100 uppercase tracking-widest shadow-sm">
                                    {user.role === 'owner' ? 'Car Owner' : 'Renter'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Booking History Section */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Booking History</h3>
                        
                        {!bookings || bookings.length === 0 ? (
                            <div className='flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl border border-gray-100 text-center'>
                                <p className='text-gray-500 text-base'>You have no bookings yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {bookings.map((booking,index)=>(
                        <div key={booking._id} className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border borderColor rounded-lg mt-5 first:mt-12'>

                            <div className='md:cols-span-1'>
                                <div className='rounded-md overflow-hidden mb-3'>
                                    <img src={booking.car.image} alt='' className='w-full h-auto aspect-video object-cover'/>
                                </div>
                                <p className='text-lg font-medium mt-2'>{booking.car.brand} {booking.car.model}</p>
                                <p className='text-gray-500'>{booking.car.year} {booking.car.category} {booking.car.location}</p>
                            </div>

                            <div className='md:col-span-2'>
                                <div className='flex items-center gap-2'>
                                    <p className='px-3 py-1.5 bg-light rounded'>Booking #{index+1}</p>
                                    <p className={`px-3 py-1 text-xs rounded-full ${booking.status==='confirmed' ?'bg-green-400/15 text-green-600' :'bg-red-400/15 text-red-600'}`}>{booking.status}</p>
                                </div>

                                <div className='flex items-start gap-2 mt-3'>
                                    <img src={assets.calendar_icon_colored} alt='' className='w-4 h-4 mt-1'/>
                                    <div>
                                        <p className='text-gray-500'>Rental Period</p>
                                        <p>{booking.pickupDate.split('T')[0]} To {booking.returnDate.split('T')[0]}</p>
                                    </div>
                                </div>

                                <div className='flex items-start gap-2 mt-3'>
                                    <img src={assets.location_icon_colored} alt='' className='w-4 h-4 mt-1'/>
                                    <div>
                                        <p className='text-gray-500'>Pick-up Location</p>
                                        <p>{booking.car.location}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='md:col-span-1 flex flex-col justify-between gap-6'>
                                <div className='text-sm text-gray-500 text-right'>
                                    <p>Total Price</p>
                                    {booking.car.pricingModel === 'perLiter' ? (
                                        <h1 className='text-lg font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block mt-1'>Billed on Consumption</h1>
                                    ) : (
                                        <h1 className='text-2xl font-semibold text-primary'>{currency}{booking?.price}</h1>
                                    )}
                                    <p className='mt-1'>Booked on {booking.createdAt.split('T')[0]}</p>
                                </div>
                                <div className='text-right'>
                                    <button onClick={() => setReviewModal({ isOpen: true, carId: booking.car._id })} className='px-4 py-2 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-lg font-medium hover:bg-indigo-100 transition-colors'>
                                        Leave a Review
                                    </button>
                                </div>
                            </div>

                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Review Modal */}
            {reviewModal.isOpen && (
                <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4' onClick={() => setReviewModal({ isOpen: false, carId: null })}>
                    <div className='bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl' onClick={e => e.stopPropagation()}>
                        <h2 className='text-2xl font-bold text-gray-800 mb-2'>Leave a Review</h2>
                        <p className='text-gray-500 mb-6'>Rate your experience with this car.</p>
                        
                        <form onSubmit={submitReview} className='flex flex-col gap-4'>
                            <div>
                                <label className='block font-medium text-gray-700 mb-2'>Rating</label>
                                <div className='flex gap-2'>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button 
                                            key={star} 
                                            type="button" 
                                            onClick={() => setRating(star)}
                                            className={`text-3xl transition-transform ${star <= rating ? 'text-yellow-400 scale-110' : 'text-gray-300 hover:text-yellow-200'}`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div>
                                <label className='block font-medium text-gray-700 mb-2'>Comment (Optional)</label>
                                <textarea 
                                    className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 resize-none h-24' 
                                    placeholder='How was the car?'
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </div>
                            
                            <div className='flex gap-3 mt-4'>
                                <button type="button" onClick={() => setReviewModal({ isOpen: false, carId: null })} className='flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors'>Cancel</button>
                                <button type="submit" className='flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors'>Submit Review</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
export default MyBookings