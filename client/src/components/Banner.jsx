import React from 'react'
import {assets} from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Banner=()=>{
    const { user, isOwner, setShowLogin, navigate, axios, setIsOwner } = useAppContext()

    const handleListCar = async () => {
        if (!user) {
            setShowLogin(true)
            return
        }
        if (isOwner) {
            navigate('/owner')
        } else {
            toast.error('You are registered as a Renter. To list cars, you must sign up as a Car Owner.')
        }
    }

    return(
        <div className='flex flex-col md:flex-row md:items-start items-center justify-between px-8 min-md:pl-14 pt-10 bg-gradient-to-r from-primary to-primary-dull max-w-6xl mx-3 md:mx-auto rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0px_20px_40px_rgba(79,70,229,0.25)] transition-shadow duration-500 my-20'>
            <div className='text-white md:py-10'>
                <h2 className='text-4xl md:text-5xl font-bold tracking-tight'>Do You Own a Car?</h2>
                <p className='mt-4 text-lg text-white/90 font-medium'>Monetize your vehicle effortlessly by listing it on Velora.</p>
                <p className='max-w-130 mt-2 text-white/80 leading-relaxed'>We take care of insurance, driver verification and secure payments - so you can earn passive income, stress-free.</p>
                <button onClick={handleListCar} className='px-8 py-3 bg-white hover:bg-light transition-all text-primary rounded-full font-bold text-sm mt-8 shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer'>List your Car</button>
            </div>
            <img src={assets.banner_car_image} alt="car" className='max-h-56 mt-10 md:mt-0 object-contain hover:scale-105 transition-transform duration-700'/>
        </div>
    )
}
export default Banner