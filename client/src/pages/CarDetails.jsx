import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const CarDetails = () => {

    const { id } = useParams()

    const {cars,pickupDate,setPickUpDate, returnDate, setReturnDate}=useAppContext()

    const navigate = useNavigate()

    const { axios, user, setShowLogin } = useAppContext()

    const [car, setCar] = useState(null)
    const [reviews, setReviews] = useState([])
    const [bookedDates, setBookedDates] = useState([])

    const currency = import.meta.env.VITE_CURRENCY || '₹';

    useEffect(() => {
        console.log("URL ID:", id)

        cars.forEach(car => {
            console.log("Car ID:", car._id)
        })

        const foundCar = cars.find(
            item => String(item._id) === String(id)
        )

        setCar(foundCar || null)

        // Fetch reviews
        const fetchReviews = async () => {
            try {
                const { data } = await axios.get(`/api/review/${id}`)
                if (data.success) {
                    setReviews(data.reviews)
                }
            } catch (err) {
                console.error(err)
            }
        }

        // Fetch booked dates
        const fetchBookedDates = async () => {
            try {
                const { data } = await axios.get(`/api/booking/dates/${id}`)
                if (data.success) {
                    setBookedDates(data.bookedDates)
                }
            } catch (err) {
                console.error(err)
            }
        }
        
        fetchReviews()
        fetchBookedDates()

    }, [cars, id, axios])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setShowLogin(true)
            return
        }

        if (!pickupDate || !returnDate) {
            toast.error("Please select dates")
            return
        }

        if (new Date(returnDate) < new Date(pickupDate)) {
            toast.error("Return date cannot be earlier than pick-up date")
            return
        }

        const picked = new Date(pickupDate)
        const returned = new Date(returnDate)

        const isOverlapping = bookedDates.some(b => {
            const bPick = new Date(b.pickupDate)
            const bRet = new Date(b.returnDate)
            return (picked <= bRet && returned >= bPick)
        })

        if (isOverlapping) {
            return toast.error("Selected dates overlap with an existing booking. Please choose different dates.")
        }

        try {
            // 1. Create Razorpay Order
            const { data: orderData } = await axios.post(
                "/api/booking/create-order",
                { carId: id, pickupDate, returnDate }
            )

            if (!orderData.success) {
                return toast.error(orderData.message)
            }

            // 2. Open Razorpay Checkout Window
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'dummy_key',
                amount: orderData.order.amount,
                currency: "INR",
                name: "Velora Car Rental",
                description: `Booking for ${car.make} ${car.model}`,
                order_id: orderData.order.id,
                handler: async function (response) {
                    try {
                        // 3. Verify Payment and Create Booking in DB
                        const { data: verifyData } = await axios.post(
                            "/api/booking/verify-payment",
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                bookingData: { carId: id, pickupDate, returnDate, price: orderData.price }
                            }
                        )

                        if (verifyData.success) {
                            toast.success("Payment Successful! Booking Confirmed.")
                            navigate("/my-bookings")
                        } else {
                            toast.error(verifyData.message)
                        }
                    } catch (error) {
                        toast.error("Payment verification failed.")
                    }
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response){
                toast.error(`Payment Failed: ${response.error.description}`);
            });
            rzp.open();

        } catch (error) {
            toast.error(
                error.message
            )
        }
    }


    if (!car) {
        return <Loader />
    }

    console.log("car =", car)
    console.log("pricePerDay =", car?.pricePerDay)
    return car ? (
        <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>

            <button
                onClick={() => navigate(-1)}
                className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'
            >
                <img
                    src={assets.arrow_icon}
                    alt=''
                    className='rotate-180 opacity-65'
                />
                Back to all cars
            </button>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>

                <div className='lg:col-span-2'>
                    <img
                        src={car.image}
                        alt=''
                        className='w-full h-auto md:max-h-150 object-cover rounded-xl mb-6 shadow-md'
                    />

                    <div className='space-y-6'>

                        <div className='flex justify-between items-start'>
                            <div>
                                <h1 className='text-3xl font-bold'>
                                    {car.brand} {car.model}
                                </h1>

                                <p className='text-gray-500 text-lg'>
                                    {car.category} {car.year}
                                </p>
                            </div>
                            {car.averageRating > 0 && (
                                <div className="flex flex-col items-end">
                                    <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-3 py-1.5 rounded-lg font-bold text-lg border border-yellow-200 shadow-sm">
                                        ★ {car.averageRating.toFixed(1)}
                                    </div>
                                    <span className="text-sm text-gray-400 mt-1">({car.reviewCount} reviews)</span>
                                </div>
                            )}
                        </div>

                        <hr className='border-borderColor my-6' />

                        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>

                            {[
                                {
                                    icon: assets.user_icon,
                                    text: `${car.seating_capacity} Seats`
                                },
                                {
                                    icon: assets.fuel_icon,
                                    text: car.fuel_type
                                },
                                {
                                    icon: assets.car_icon,
                                    text: car.transmission
                                },
                                {
                                    icon: assets.location_icon,
                                    text: car.location
                                }
                            ].map(({ icon, text }) => (
                                <div
                                    key={text}
                                    className='flex flex-col items-center bg-light p-4 rounded-lg'
                                >
                                    <img
                                        src={icon}
                                        alt=''
                                        className='h-5 mb-2'
                                    />
                                    {text}
                                </div>
                            ))}

                        </div>

                        <div>
                            <h1 className='text-xl font-medium mb-3'>
                                Description
                            </h1>

                            <p className='text-gray-500'>
                                {car.description}
                            </p>
                        </div>

                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500'
                >

                    <p className='text-2xl text-gray-800 font-semibold'>
                        {currency}
                        {car?.pricePerDay || car?.price || 0}
                        <span className='text-base text-gray-400 font-normal ml-2'>
                            {car?.pricingModel === 'perLiter' ? 'per liter' : 'per day'}
                        </span>
                    </p>

                    <hr className='border-borderColor my-6' />

                    {car?.pricingModel === 'perLiter' && (
                        <div className="bg-blue-50 border border-blue-200 text-blue-800 text-sm p-4 rounded-lg">
                            <p className="font-semibold mb-1">Consumption Based Billing</p>
                            <p>You will be billed for the exact liters of fuel consumed during your trip at the agreed rate. No upfront total is estimated.</p>
                        </div>
                    )}

                    {bookedDates.length > 0 && (
                        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                            <p className="font-semibold text-red-800 mb-2 text-sm">Already Booked Dates:</p>
                            <div className="flex flex-col gap-1">
                                {bookedDates.map((b, i) => (
                                    <span key={i} className="text-red-600 text-xs font-medium">
                                        • {b.pickupDate.split('T')[0]} to {b.returnDate.split('T')[0]}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className='flex flex-col gap-2'>
                        <label>
                            Pickup Date
                        </label>

                        <input
                            type='date'
                            id='pickup-date'
                            value={pickupDate}
                            onChange={(e) =>
                                setPickUpDate(
                                    e.target.value
                                )
                            }
                            className='border border-borderColor px-3 py-2 rounded-lg'
                            min={
                                new Date()
                                    .toISOString()
                                    .split('T')[0]
                            }
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label>
                            Return Date
                        </label>

                        <input
                            type='date'
                            id='return-date'
                            value={returnDate}
                            onChange={(e) =>
                                setReturnDate(
                                    e.target.value
                                )
                            }
                            className='border border-borderColor px-3 py-2 rounded-lg'
                            min={pickupDate}
                            required
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer'
                    >
                        Book Now
                    </button>

                    <p className='text-center text-sm'>
                        No Credit Card Required to reserve.
                    </p>

                </form>

            </div>

            {/* Reviews Section */}
            <div className='mt-16 bg-white p-8 rounded-2xl shadow-sm border border-gray-100'>
                <h2 className='text-2xl font-bold mb-6 text-gray-800 border-b pb-4'>Customer Reviews</h2>
                
                {reviews.length === 0 ? (
                    <div className='text-center py-10 bg-gray-50 rounded-xl border border-gray-100'>
                        <p className='text-gray-500'>No reviews yet. Be the first to review this car after renting!</p>
                    </div>
                ) : (
                    <div className='space-y-6'>
                        {reviews.map((review) => (
                            <div key={review._id} className='flex gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors'>
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-sm shrink-0">
                                    {review.user?.name ? review.user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div className='flex-1'>
                                    <div className='flex justify-between items-start'>
                                        <h4 className='font-bold text-gray-800'>{review.user?.name || 'Unknown User'}</h4>
                                        <span className='text-yellow-500 font-bold bg-yellow-50 px-2 py-0.5 rounded border border-yellow-100 text-sm'>
                                            ★ {review.rating}
                                        </span>
                                    </div>
                                    <p className='text-xs text-gray-400 mt-0.5'>{new Date(review.createdAt).toLocaleDateString()}</p>
                                    {review.comment && (
                                        <p className='mt-2 text-gray-600 text-sm leading-relaxed'>{review.comment}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    ) : (
        <Loader />
    )
}

export default CarDetails