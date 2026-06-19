import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const CarCard = ({ car }) => {

    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY || '₹';

    // Prevent crashes if car is undefined
    if (!car) return null

    return (
        <div
            onClick={() => {
                navigate(`/car-details/${car._id}`)
                window.scrollTo(0, 0)
            }}
            className='group rounded-2xl bg-white overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-transparent hover:border-primary/20 flex flex-col h-full'
        >

            <div className='relative h-56 overflow-hidden'>

                <img
                    src={car.image}
                    alt='Car'
                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                />

                {car.isAvailable && (
                    <p className='absolute top-4 left-4 bg-primary/90 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg z-10'>
                        Available Now
                    </p>
                )}

                <div className='absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-gray-900 px-4 py-2 rounded-xl shadow-lg border border-white/50 group-hover:bg-primary group-hover:text-white transition-colors duration-300 z-10'>
                    <span className='font-bold text-lg'>
                        {currency}{car.pricePerDay}
                    </span>
                    <span className='text-xs opacity-80'>
                        {car.pricingModel === 'perLiter' ? ' / liter' : ' / day'}
                    </span>
                </div>

            </div>

            <div className='p-5 sm:p-6 flex flex-col flex-grow justify-between'>

                <div className='flex justify-between items-start mb-4'>
                    <div>
                        <h3 className='text-xl font-bold text-gray-800 group-hover:text-primary transition-colors'>
                            {car.brand} {car.model}
                        </h3>

                        <p className='text-sm text-gray-500 mt-1 font-medium'>
                            {car.category} • {car.year}
                        </p>
                    </div>
                    
                    {car.averageRating > 0 && (
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-2 py-1 rounded-md font-bold text-sm border border-yellow-200">
                                ★ {car.averageRating.toFixed(1)}
                            </div>
                            <span className="text-xs text-gray-400 mt-1">({car.reviewCount} reviews)</span>
                        </div>
                    )}
                </div>

                <div className='mt-4 grid grid-cols-2 gap-y-2 text-gray-600'>

                    <div className='flex items-center text-sm'>
                        <img
                            src={assets.users_icon}
                            alt=''
                            className='h-4 mr-2'
                        />
                        <span>{car.seating_capacity} Seats</span>
                    </div>

                    <div className='flex items-center text-sm'>
                        <img
                            src={assets.fuel_icon}
                            alt=''
                            className='h-4 mr-2'
                        />
                        <span>{car.fuel_type}</span>
                    </div>

                    <div className='flex items-center text-sm'>
                        <img
                            src={assets.car_icon}
                            alt=''
                            className='h-4 mr-2'
                        />
                        <span>{car.transmission}</span>
                    </div>

                    <div className='flex items-center text-sm'>
                        <img
                            src={assets.location_icon}
                            alt=''
                            className='h-4 mr-2'
                        />
                        <span>{car.location}</span>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default CarCard