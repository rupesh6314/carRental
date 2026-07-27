import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Login = ({ setShowLogin, setShowSignup }) => {

    const { axios, setToken } = useAppContext()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setShowLogin(false)
            }
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [setShowLogin])

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

        try {

            const { data } = await axios.post('/api/user/login', {
                email: formData.email,
                password: formData.password
            })

            if (data.success) {

                localStorage.setItem('token', data.token)
                setToken(data.token)

                toast.success('Login Successful', { id: 'auth-toast' })

                setShowLogin(false)

            } else {
                toast.error(data.message, { id: 'auth-toast' })
            }

        } catch (error) {
            console.log(error)
            toast.error(
                error.response?.data?.message ||
                error.message ||
                'Something went wrong',
                { id: 'auth-toast' }
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            onClick={() => setShowLogin(false)}
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
                            setShowLogin(false)
                            navigate('/')
                        }}
                        className="absolute left-0 top-1 text-xs font-semibold text-gray-500 hover:text-indigo-600 transition flex items-center gap-1 cursor-pointer"
                    >
                        &larr; Back to home
                    </button>
                    <h1 className="text-3xl font-extrabold tracking-widest text-primary drop-shadow-sm uppercase">Velora</h1>
                </div>

                <h2 className="text-3xl font-bold text-center text-indigo-600">
                    Sign In
                </h2>

                <p className="mt-1 text-center text-sm text-gray-500">
                    Please enter your email and password to continue
                </p>

                <div className="mt-6">
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
                        className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    />
                </div>

                <div className="mt-4">
                    <label className="font-medium text-sm text-gray-700">
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                        className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`mt-6 w-full py-2.5 rounded-lg bg-indigo-600 text-white font-medium transition cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <p className="text-center mt-4 text-sm text-gray-600">
                    Don't have an account?

                    <button
                        type="button"
                        onClick={() => {
                            setShowLogin(false)
                            setShowSignup(true)
                        }}
                        className="text-indigo-600 font-medium ml-1 hover:underline cursor-pointer"
                    >
                        Sign Up
                    </button>
                </p>

            </form>

        </div>
    )
}

export default Login