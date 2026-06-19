import React, { useState } from 'react'
import Title from '../../components/owners/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
const AddCar=()=>{
    const [image, setImage]=useState(null)
    const [car, setCar]=useState({
        brand:'',
        model:'',
        year:0,
        pricingModel: 'perDay',
        pricePerDay:0,
        category:'',
        transmission:'',
        fuel_type:'',
        seating_capacity:0,
        location:'',
        description:'',
    })

    const [isLoading,setIsLoading]=useState(false)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (isLoading) return

        setIsLoading(true)

        try {

            const formData = new FormData()

            formData.append("image", image)
            if(!image){
                return toast.error("Please upload a car image")
            }
            formData.append(
                "carData",
                JSON.stringify(car)
            )

            const { data } = await axios.post(
                "/api/owner/add-car",
                formData
            )

            if (data.success) {

                toast.success(data.message)

                setImage(null)

                setCar({
                    brand: '',
                    model: '',
                    year: 0,
                    pricingModel: 'perDay',
                    pricePerDay: 0,
                    category: '',
                    transmission: '',
                    fuel_type: '',
                    seating_capacity: 0,
                    location: '',
                    description: '',
                })

            } else {

                toast.error(data.message)

            }

        } catch (err) {

            console.log(err)

            toast.error(err.message)

        } finally {

            setIsLoading(false)

        }
    }

    const {axios, currency} =useAppContext()


    return(
        <div className='px-4 py-10 md:px-10 flex-1'>
            <Title title='Add New Car' subTitle='Fill in details to add your new car for booking, including pricing, availability, and car specifications.'/>
            <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>
                <div className='flex items-center gap-2 w-full'>
                    <label htmlFor='car-image'>
                        <img src={image ? URL.createObjectURL(image):assets.upload_icon} alt='' className='h-14 rounded cursor-pointer'/>
                        <input type='file' id='car-image' accept='image/*' hidden onChange={e=>setImage(e.target.files[0])}/>
                    </label>
                    <p className='text-sm text-gray-500'>Upload a picture of you car</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='flex flex-col w-full'>
                        <label className=''>Brand</label>
                        <input type='text' placeholder='e.g Hyundai, Honda, Fortuner...' required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.brand} onChange={e=>setCar({...car,brand: e.target.value})}/>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className=''>Model</label>
                        <input type='text' placeholder='Model Name...' required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.model} onChange={e=>setCar({...car,model: e.target.value})}/>
                    </div>

                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
                    <div className='flex flex-col w-full'>
                        <label className=''>Year</label>
                        <input type='number' placeholder='2026' required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.year} onChange={e=>setCar({...car,year: e.target.value})}/>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className=''>Pricing Model</label>
                        <select onChange={e=>setCar({...car, pricingModel:e.target.value})} value={car.pricingModel} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                            <option value='perDay'>Price Per Day</option>
                            <option value='perLiter'>Price Per Liter</option>
                        </select>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className=''>{car.pricingModel === 'perLiter' ? `Price per Liter ${currency}` : `Daily Price ${currency}`}</label>
                        <input
                            type='number'
                            placeholder={car.pricingModel === 'perLiter' ? 'eg. 15' : 'eg. 2000'}
                            required
                            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
                            value={car?.pricePerDay}
                            onChange={e =>
                                setCar({
                                    ...car,
                                    pricePerDay: Number(e.target.value)
                                })
                            }
                        />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className=''>Category</label>
                        <select onChange={e=>setCar({...car, category:e.target.value})} value={car.category} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                            <option value=''>Select a category</option>
                            <option value='4Seater'>4-Seater</option>
                            <option value='5Seater'>5-Seater</option>
                            <option value='7Seater'>7-Seater</option>
                            <option value='12Seater'>12-Seater</option>
                        </select>
                    </div>
                </div>
                
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    <div className='flex flex-col w-full'>
                        <label className=''>Transmission</label>
                        <select onChange={e=>setCar({...car, transmission:e.target.value})} value={car.transmission} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                            <option value=''>Select a transmission</option>
                            <option value='Auto'>Automatic</option>
                            <option value='manual'>Manual</option>
                            <option value='semi'>Semi-Automatic</option>
                        </select>
                    </div>

                    <div className='flex flex-col w-full'>
                        <label className=''>Fuel Type</label>
                        <select onChange={e=>setCar({...car, fuel_type:e.target.value})} value={car.fuel_type} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                            <option value=''>Selct a fuel type</option>
                            <option value='petrol'>Petrol</option>
                            <option value='diesel'>Diesel</option>
                            <option value='gas'>Gas</option>
                            <option value='electric'>Electric</option>
                        </select>
                    </div>

                    <div className='flex flex-col w-full'>
                        <label className=''>Seating Capacity</label>
                        <input type='number' placeholder='eg. 4-seater' required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.seating_capacity} onChange={e=>setCar({...car,seating_capacity: e.target.value})}/>
                    </div>
                    
                </div>

                <div className='flex flex-col w-full'>
                    <label className=''>Location</label>
                    <select onChange={e=>setCar({...car, location:e.target.value})} value={car.location} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                        <option value=''>Selct a location</option>
                        <option value='Andhra Pradesh'>Andhra Pradesh</option>
                        <option value='Hyderabad'>Hyderabad</option>
                        <option value='Tamil Nadu'>Tamil Nadu</option>
                        <option value='Bangalore'>Bangalore</option>
                    </select>
                </div>
                
                <div className='flex flex-col w-full'>
                    <label className=''>Description</label>
                    <textarea rows={5} placeholder='Tell abouot your car specifications and functionalities...' required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.description} onChange={e=>setCar({...car,description: e.target.value})}></textarea>
                </div>

                <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer'>
                    <img src={assets.tick_icon} alt=''/>
                    {isLoading?'Listing..':'List your Car'}
                </button>
            </form>


        </div>   
    )
}
export default AddCar