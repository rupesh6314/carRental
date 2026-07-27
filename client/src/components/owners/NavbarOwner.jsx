import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const NavbarOwner = () => {
    const { user, logOut } = useAppContext()
    const [showDropdown, setShowDropdown] = useState(false)

    return (
        <div className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all bg-white'>
            <Link to='/'>
                <img src={assets.favicon} alt='' className='h-14' />
            </Link>
            
            <div className='relative'>
                <div 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className='flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors'
                >
                    <p className='font-medium text-gray-700 hidden sm:block'>Welcome, {user?.name || "Owner"}</p>
                    <div className='w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-md overflow-hidden'>
                        {user?.image ? (
                            <img src={user.image} alt='Profile' className='w-full h-full object-cover' />
                        ) : (
                            user?.name ? user.name.charAt(0).toUpperCase() : 'O'
                        )}
                    </div>
                </div>

                {/* Dropdown Menu */}
                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-fadeIn">
                        <div className="px-4 py-3 border-b border-gray-100 flex flex-col items-center">
                            <div className='w-16 h-16 mb-2 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-2xl shadow-md overflow-hidden'>
                                {user?.image ? (
                                    <img src={user.image} alt='Profile' className='w-full h-full object-cover' />
                                ) : (
                                    user?.name ? user.name.charAt(0).toUpperCase() : 'O'
                                )}
                            </div>
                            <p className="text-sm font-semibold text-gray-800 text-center">{user?.name}</p>
                            <p className="text-xs text-gray-500 truncate w-full text-center">{user?.email}</p>
                        </div>
                        <button 
                            onClick={() => {
                                setShowDropdown(false)
                                logOut()
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                        >
                            Log Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NavbarOwner