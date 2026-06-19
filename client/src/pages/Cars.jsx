import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CarCard from '../components/CarCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
const Car = ()=>{

    const [searchParams]= useSearchParams()

    const pickupLocation=searchParams.get('pickupLocation')
    const pickupDate=searchParams.get('pickupDate')
    const returnDate=searchParams.get('returnDate')
    const initialSearch = searchParams.get('search') || ''
    const [input, setInput]=useState(initialSearch)
    const isSearchData=pickupLocation && pickupDate && returnDate 
    const {cars, axios}= useAppContext()
    const [filteredCars,setFilteredCars]= useState([])

    const applyFilters = () => {
        if (input === '') {
            setFilteredCars(cars)
            return
        }

        const filtered = cars.filter((car) =>
            car.brand.toLowerCase().includes(input.toLowerCase()) ||
            car.model.toLowerCase().includes(input.toLowerCase()) ||
            car.category.toLowerCase().includes(input.toLowerCase()) ||
            car.transmission.toLowerCase().includes(input.toLowerCase())
        )

        setFilteredCars(filtered)
    }

    const searchCarAvailability=async()=>{
        const {data}= await axios.post('/api/booking/check-availability',{location:pickupLocation,pickupDate,returnDate})
        if(data.success){
            setFilteredCars(data.availableCars)
            if(data.availableCars.length==0){
                toast('No cars available')
            }
            return null
        }
    }
    useEffect(()=>{
        isSearchData && searchCarAvailability()
    },[])


    useEffect(()=>{
        cars.length>0 && !isSearchData && applyFilters()
    },[input,cars])

    return(
        <div className='min-h-screen bg-light/30'>
            <div className='flex flex-col items-center py-20 bg-gradient-to-b from-light to-transparent max-nd:px-4'>
                <Title title='Available Cars' subTitle='Browse our collection of premium vehicles available for you'/>
                <div className='flex items-center bg-white px-6 mt-8 max-w-140 w-full h-14 rounded-full shadow-md hover:shadow-xl focus-within:shadow-xl focus-within:ring-2 focus-within:ring-primary/50 transition-all duration-300 transform hover:-translate-y-1'>
                    <img src={assets.search_icon} alt='' className='w-5 h-5 mr-3 opacity-60'/>

                    <input onChange={(e)=>setInput(e.target.value)} value={input} className='w-full h-full outline-none text-gray-700 text-lg placeholder-gray-400' type='text' placeholder='Search by make, model, or features'/>

                    {input && (
                        <button onClick={() => setInput('')} className="mr-3 text-gray-400 hover:text-gray-700 transition-colors font-bold">✕</button>
                    )}
                    <img src={assets.filter_icon} alt='' className='w-5 h-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity'/>
                </div>
            </div>
            <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
                <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>Showing {filteredCars.length} Cars</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
                    {filteredCars.map((car, index)=>(
                        <div key={index}>
                            <CarCard car={car}/>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}
export default Car