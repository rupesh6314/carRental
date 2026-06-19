import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Login = ({ setShowLogin, setShowSignup }) => {

    const { axios, setToken } = useAppContext()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {

            const { data } = await axios.post('/api/user/login', {
                email: formData.email,
                password: formData.password
            })

            if (data.success) {

                localStorage.setItem('token', data.token)
                setToken(data.token)

                toast.success('Login Successful')

                setShowLogin(false)

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(
                error.response?.data?.message ||
                error.message ||
                'Something went wrong'
            )
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
                className='w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 mx-4'
            >

                <div className='flex justify-center mb-6'>
                    <img
                        src={assets.logo}
                        alt="Logo"
                        className="h-28 w-auto object-contain"
                    />
                </div>

                <h2 className="text-2xl font-bold text-center text-indigo-600">
                    Sign In
                </h2>

                <p className="mt-2 text-center text-gray-500">
                    Please enter your email and password to continue
                </p>

                <div className="mt-8">
                    <label className="font-medium text-gray-700">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                        className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    />
                </div>

                <div className="mt-5">
                    <label className="font-medium text-gray-700">
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                        className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-8 w-full py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition cursor-pointer"
                >
                    Login
                </button>

                <p className="text-center mt-6 text-sm text-gray-600">
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