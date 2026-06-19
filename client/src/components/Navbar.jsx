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
            className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 md:py-5 border-b z-50 transition-all duration-300 ${
                location.pathname === "/" ? "absolute w-full top-0 bg-transparent text-white border-white/20 shadow-none" : "sticky top-0 bg-white text-gray-800 border-gray-200 shadow-sm"
            }`}
        >
            <Link to="/">
                <h1 className={`text-2xl md:text-3xl font-extrabold tracking-widest drop-shadow-sm uppercase ${location.pathname === "/" ? "text-white drop-shadow-lg" : "text-primary"}`}>Velora</h1>
            </Link>

            <div
                className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 max-sm:bg-white max-sm:text-gray-800 ${
                    open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"
                }`}
            >
                {menuLinks.map((link, index) => (
                    <Link key={index} to={link.path} className="font-bold hover:text-primary transition-colors tracking-wide drop-shadow-sm">
                        {link.name}
                    </Link>
                ))}

                <form 
                    onSubmit={handleSearch}
                    className='hidden lg:flex items-center text-sm gap-2 border border-borderColor px-4 py-2 rounded-full transition-all duration-500 ease-out focus-within:ring-2 focus-within:ring-primary/40 focus-within:shadow-lg focus-within:border-primary w-48 focus-within:w-72 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white shadow-inner'
                >
                    <input 
                        type="text" 
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className={`w-full bg-transparent outline-none placeholder-gray-200 ${location.pathname === '/' ? 'text-white' : 'text-gray-800'}`} 
                        placeholder="Search cars..."/> 
                    {searchValue && (
                        <button type="button" onClick={() => setSearchValue('')} className="hover:text-gray-300 font-bold transition-colors">
                            ✕
                        </button>
                    )}
                    <button type="submit" className="cursor-pointer flex items-center justify-center">
                        <img src={assets.search_icon} alt="search" className={`w-4 h-4 transition-opacity duration-300 hover:scale-110 ${location.pathname === '/' ? 'brightness-0 invert opacity-90' : 'opacity-60 hover:opacity-100'}`}/>
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
                    className="cursor-pointer font-bold hover:text-primary transition-colors tracking-wide drop-shadow-sm">
                        {!user ? 'List cars' : (isOwner ? 'Dashboard' : 'Profile')}
                    </button>
                    <button onClick={()=> {user ? logOut() : setShowLogin(true)}} 
                    className="cursor-pointer px-7 py-2.5 bg-gradient-to-r from-primary to-primary-dull hover:from-primary-dull hover:to-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-white rounded-full font-bold shadow-md">{user?'Logout':'Login'}</button>
                </div>
            </div>

            <button className='sm:hidden cursor-pointer' aria-label="Menu" onClick={()=>setOpen(!open)}>
                <img src={open?assets.close_icon: assets.menu_icon} alt="menu"/>
            </button>
        </div>
    )
}

export default Navbar