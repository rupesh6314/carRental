import React, { useState, useEffect } from 'react'
import { assets, cityList, backgroundImages } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Hero = ()=>{

    const {pickupDate, setPickUpDate, returnDate, setReturnDate, navigate}=useAppContext()
    const [pickupLocation,setPickupLocation]=useState('')
    const [bgIndex, setBgIndex] = useState(0)
    
    useEffect(() => {
        const timer = setInterval(() => {
            setBgIndex((prev) => (prev + 1) % backgroundImages.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const handleSearch=(e)=>{
        e.preventDefault()
        navigate(`/cars?pickupLocation=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`)
    }

    return(
        <div className='relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center gap-8 md:gap-14 text-center pt-24 md:pt-20 pb-12 overflow-hidden bg-gray-900'>
            
            {/* Dynamic Background Carousel */}
            {backgroundImages.map((img, idx) => (
                <div 
                    key={idx}
                    className={`absolute inset-0 w-full h-full bg-cover md:bg-cover max-md:bg-contain max-md:bg-top max-md:bg-no-repeat transition-opacity duration-1000 ease-in-out ${idx === bgIndex ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundImage: `url(${img})` }}
                />
            ))}
            
            {/* Gradient Overlay for blending into dark background on mobile */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-gray-900 z-0"></div>

            <div className='relative z-10 flex flex-col items-center justify-center w-full px-4 mt-16 md:mt-0'>
                <h1 className='text-4xl md:text-7xl font-bold text-white drop-shadow-2xl animate-fadeIn pb-4 md:pb-6'>Luxury Cars on Rent</h1>
                
                <form onSubmit={handleSearch} className='flex flex-col md:flex-row items-start md:items-center justify-center p-6 rounded-3xl md:rounded-full w-full max-w-80 md:max-w-200 bg-white/10 backdrop-blur-md shadow-2xl hover:shadow-[0px_20px_40px_rgba(79,70,229,0.3)] transition-all duration-500 border border-white/20 animate-fadeIn'>
                    <div className='flex flex-col md:flex-row items-start md:items-center gap-6 min-md:ml-8 w-full'>
                        <div className='flex flex-col items-start gap-1 w-full'>
                            <select className="w-full bg-white/20 text-white border border-white/30 rounded-xl px-4 py-2 outline-none appearance-none" required value={pickupLocation} onChange={(e)=>setPickupLocation(e.target.value)}>
                                <option value="" className="text-gray-900">Pickup Location</option>
                                {cityList.map((city)=> <option className="text-gray-900" key={city} value={city}>{city}</option>)}
                            </select>
                        </div>
                        <div className='flex flex-col items-start gap-1 w-full'>
                            <label htmlFor='pickup-date' className="text-white/90 text-sm pl-2">Pick-up date</label>
                            <input type="date" value={pickupDate} onChange={e=>setPickUpDate(e.target.value)} id="pickup-date" min={new Date().toISOString().split('T')[0]} className='w-full bg-white/20 text-white border border-white/30 rounded-xl px-4 py-2 outline-none' required />
                        </div>
                        <div className='flex flex-col items-start gap-1 w-full'>
                            <label htmlFor='return-date' className="text-white/90 text-sm pl-2">Return date</label>
                            <input value={returnDate} onChange={e=>setReturnDate(e.target.value)} type="date" id="return-date" className='w-full bg-white/20 text-white border border-white/30 rounded-xl px-4 py-2 outline-none' required />
                        </div>
                        <button className='flex items-center justify-center gap-2 px-9 py-3.5 max-sm:mt-4 w-full md:w-auto bg-gradient-to-r from-primary to-primary-dull hover:from-primary-dull hover:to-primary text-white rounded-full cursor-pointer shadow-lg hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 font-bold'>
                            <img src={assets.search_icon} alt="search" className='w-4 h-4 brightness-0 invert'/>
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Hero