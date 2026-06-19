import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link, useLocation, useNavigate} from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Navbar = () => {

    const {setShowLogin, user, logOut, isOwner, axios, setIsOwner}=useAppContext()

    const location = useLocation()
    const [open, setOpen] = useState(false)  
    const navigate=useNavigate() 
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchValue.trim()) {
            navigate(`/cars?search=${encodeURIComponent(searchValue.trim())}`)
        }
    }

    return (
        <div
            className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-800 border-b border-white/20 sticky top-0 z-50 transition-all duration-300 shadow-sm ${
                location.pathname === "/" ? "glass" : "glass"
            }`}
        >
            <Link to="/">
                <img src={assets.favicon} alt="logo" className="h-20" />
            </Link>

            <div
                className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${
                    location.pathname === "/" ? "bg-light" : "bg-white"
                } ${
                    open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"
                }`}
            >
                {menuLinks.map((link, index) => (
                    <Link key={index} to={link.path}>
                        {link.name}
                    </Link>
                ))}

                <form 
                    onSubmit={handleSearch}
                    className='hidden lg:flex items-center text-sm gap-2 border border-borderColor px-4 py-2 rounded-full transition-all duration-500 ease-out focus-within:ring-2 focus-within:ring-primary/40 focus-within:shadow-lg focus-within:border-primary w-48 focus-within:w-72 bg-white/60 hover:bg-white/80'
                >
                    <input 
                        type="text" 
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-full bg-transparent outline-none placeholder-gray-500 text-gray-800" 
                        placeholder="Search cars..."/> 
                    {searchValue && (
                        <button type="button" onClick={() => setSearchValue('')} className="text-gray-400 hover:text-gray-700 font-bold transition-colors">
                            ✕
                        </button>
                    )}
                    <button type="submit" className="cursor-pointer flex items-center justify-center">
                        <img src={assets.search_icon} alt="search" className="w-4 h-4 opacity-60 hover:opacity-100 transition-opacity duration-300 hover:scale-110"/>
                    </button>
                </form>

                <div className='flex max-sm:flex-col items-start sm:items-center gap-6'>
                    <button onClick={() => {
                        if (!user) {
                            setShowLogin(true)
                        } else if (isOwner) {
                            navigate('/owner')
                        } else {
                            navigate('/my-bookings')
                        }
                    }}
                    className="cursor-pointer font-medium hover:text-primary transition-colors">
                        {!user ? 'List cars' : (isOwner ? 'Dashboard' : 'Profile')}
                    </button>
                    <button onClick={()=> {user ? logOut() : setShowLogin(true)}} 
                    className="cursor-pointer px-7 py-2.5 bg-gradient-to-r from-primary to-primary-dull hover:from-primary-dull hover:to-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-white rounded-full font-medium">{user?'Logout':'Login'}</button>
                </div>
            </div>

            <button className='sm:hidden cursor-pointer' aria-label="Menu" onClick={()=>setOpen(!open)}>
                <img src={open?assets.close_icon: assets.menu_icon} alt="menu"/>
            </button>
        </div>
    )
}

export default Navbar