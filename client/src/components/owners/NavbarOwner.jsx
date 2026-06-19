import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const NavbarOwner = () => {
    const { user } = useAppContext()

    return (
        <div className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all bg-white'>
            <Link to='/'>
                <img src={assets.favicon} alt='' className='h-14' />
            </Link>
            
            <div className='flex items-center gap-4'>
                <p className='font-medium text-gray-700 hidden sm:block'>Welcome, {user?.name || "Owner"}</p>
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-md overflow-hidden'>
                    {user?.image ? (
                        <img src={user.image} alt='Profile' className='w-full h-full object-cover' />
                    ) : (
                        user?.name ? user.name.charAt(0).toUpperCase() : 'O'
                    )}
                </div>
            </div>
        </div>
    )
}

export default NavbarOwner