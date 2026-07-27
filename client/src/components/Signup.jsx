import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'

const Signup = ({ setShowSignup, setShowLogin }) => {


    const { axios, setToken, setUser } = useAppContext()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user'
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setShowSignup(false)
            }
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [setShowSignup])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (loading) return
        setLoading(true)

        const { name, email, password, confirmPassword, role } = formData

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setLoading(false)
            return toast.error("Please enter a valid email address", { id: 'auth-toast' })
        }

        // Validate password length
        if (password.length < 7) {
            setLoading(false)
            return toast.error("Password must be at least 7 characters long", { id: 'auth-toast' })
        }

        if (password !== confirmPassword) {
            setLoading(false)
            return toast.error("Passwords do not match", { id: 'auth-toast' })
        }

        try {
            const { data } = await axios.post('/api/user/register', {
                name,
                email,
                password,
                role
            })

            if (data.success) {
                localStorage.setItem('token', data.token)

                setToken(data.token)

                toast.success("Account created successfully!", { id: 'auth-toast' })

                setShowSignup(false)
            } else {
                toast.error(data.message, { id: 'auth-toast' })
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message, { id: 'auth-toast' })
        } finally {
            setLoading(false)
        }
    }


    return (
        <div
            onClick={() => setShowSignup(false)}
            className='fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm'
        >
            <form
                onSubmit={onSubmitHandler}
                onClick={(e) => e.stopPropagation()}
                className='w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 mx-4 max-h-[95vh] overflow-y-auto scrollbar-hide'
            >

                <div className='flex justify-center mb-4 relative'>
                    <button 
                        type="button" 
                        onClick={() => {
                            setShowSignup(false)
                            navigate('/')
                        }}
                        className="absolute left-0 top-1 text-xs font-semibold text-gray-500 hover:text-indigo-600 transition flex items-center gap-1 cursor-pointer"
                    >
                        &larr; Back to home
                    </button>
                    <h1 className="text-3xl font-extrabold tracking-widest text-primary drop-shadow-sm uppercase">Velora</h1>
                </div>

                <h2 className="text-3xl font-bold text-center text-indigo-600">
                    Create Account
                </h2>

                <p className="mt-1 text-center text-sm text-gray-500">
                    Create your Velora account to start booking cars.
                </p>

                <div className="mt-4">
                    <label className="font-medium text-sm text-gray-700">
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    />
                </div>

                <div className="mt-3">
                    <label className="font-medium text-sm text-gray-700">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                        className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    />
                </div>

                <div className="mt-3">
                    <label className="font-medium text-sm text-gray-700">
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Create a password"
                        className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    />
                </div>

                <div className="mt-3">
                    <label className="font-medium text-sm text-gray-700">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Confirm your password"
                        className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    />
                </div>

                <div className="mt-4">
                    <label className="font-medium text-sm text-gray-700 block mb-1">
                        Account Type
                    </label>
                    <div className="flex gap-4">
                        <label className={`flex-1 border rounded-lg p-2 text-sm cursor-pointer flex items-center justify-center gap-2 transition-all ${formData.role === 'user' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold shadow-sm' : 'border-gray-300 text-gray-500 hover:bg-gray-50'}`}>
                            <input type="radio" name="role" value="user" checked={formData.role === 'user'} onChange={handleChange} className="hidden" />
                            Renter
                        </label>
                        <label className={`flex-1 border rounded-lg p-2 text-sm cursor-pointer flex items-center justify-center gap-2 transition-all ${formData.role === 'owner' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold shadow-sm' : 'border-gray-300 text-gray-500 hover:bg-gray-50'}`}>
                            <input type="radio" name="role" value="owner" checked={formData.role === 'owner'} onChange={handleChange} className="hidden" />
                            Car Owner
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`mt-5 w-full py-2.5 rounded-lg bg-indigo-600 text-white font-medium transition cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </button>

                <p className="text-center mt-4 text-sm text-gray-600">
                    Already have an account?
                    <button
                        type="button"
                        onClick={() => {
                            setShowSignup(false)
                            setShowLogin(true)
                        }}
                        className="cursor-pointer text-indigo-600 font-medium ml-1 hover:underline"
                    >
                        Sign In
                    </button>
                </p>

            </form>
        </div>
    )
}

export default Signup