import React, { useEffect, useState } from 'react'
import { assets,} from '../../assets/assets'
import Title from '../../components/owners/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
const ManageBookings=()=>{


    const {currency, axios}=useAppContext()
    const [bookings,setBookings]=useState([])
    const fetchOwnerBookings=async()=>{
        try{
            const {data}=await axios.get('/api/booking/owner')
            data.success? setBookings(data.bookings): toast.error(data.message)
        }
        catch(err){
            toast.error(err.message)
        }
    }


    const changeBookingStatus = async (bookingId, status) => {
        try {

            const { data } = await axios.post(
                '/api/booking/change-status',
                {
                    bookingId,
                    status
                }
            )

            if (data.success) {
                toast.success(data.message)
                fetchOwnerBookings()
            } else {
                toast.error(data.message)
            }

        } catch (err) {
            toast.error(err.message)
        }
    }

    useEffect(()=>{
        fetchOwnerBookings()
    },[])
    return(
        <div className='px-4 pt-10 md:px-10 w-full'>
            <Title title='Manage Bookings' subTitle='Track all customer bookings, approve or cancel requests, and manage booking statuses.'/>
            <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
                <table className='w-full border-collapse text-left text-sm text-gray-600'>
                    <thead className='text-gray-500'>
                        <tr>
                            <th className='p-3 font-medium'>Car</th>
                            <th className='p-3 font-medium max-md:hidden'>Date Range</th>
                            <th className='p-3 font-medium'>Total</th>
                            <th className='p-3 font-medium max-md:hidden'>Payments</th>
                            <th className='p-3 font-medium'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((bookings,index)=>(
                            <tr key={index} className='border-t border-borderColor text-gray-500'>
                                <td className='p-3 flex items-center gap-3'>
                                    <img src={bookings.car.image} alt='' className='h-12 w-12 aspect-square rounded-md object-cover'/>
                                    <div className='max-md:hidden'>
                                        <p className='font-medium'>{bookings.car.brand} {bookings.car.model}</p>
                                    </div>
                                </td>

                                <td className='p-3 max-md:hidden'>
                                    {bookings.pickupDate.split('T')[0]} to {bookings.returnDate.split('T')[0]}
                                </td>
                                <td className='p-3'>
                                    {bookings.car.pricingModel === 'perLiter' ? (
                                        <span className="text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded text-xs">Consumption Based</span>
                                    ) : (
                                        <>{currency}{bookings?.price}</>
                                    )}
                                </td>
                                <td className='p-3 max-md:hidden'>
                                    <span className= 'bg-gray-100 px-3 py-1 rounded-full text-xs'>
                                    offline
                                    </span>
                                </td>

                                <td className='p-3'>
                                    {bookings.status==='pending'?(
                                        <select
                                            onChange={(e) =>
                                                changeBookingStatus(
                                                    bookings._id,
                                                    e.target.value
                                                )
                                            }>
                                            <option value='pending'>Pending</option>
                                            <option value='cancelled'>Cancelled</option>
                                            <option value='confirmed'>Confirmed</option>
                                        </select>
                                    ):(
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${bookings.status === 'confirmed' ?'bg-green-100 text-green-500':'bg-red-100 text-red-500'}`}>{bookings.status}</span>
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>   
    )
}
export default ManageBookings