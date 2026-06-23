import React, {useState} from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import CarDetails from './pages/CarDetails.jsx'
import Cars from './pages/Cars.jsx'
import MyBookings from './pages/MyBookings.jsx'
import Layout from './pages/owners/Layout.jsx'
import Dashboard from './pages/owners/Dashboard.jsx'
import ManageCars from './pages/owners/ManageCars.jsx'
import AddCar from './pages/owners/AddCar.jsx'
import ManageBookings from './pages/owners/ManageBookings.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext.jsx'
import ChatWidget from './components/ChatWidget.jsx'
import Footer from './components/Footer.jsx'
import FloatingCallButton from './components/FloatingCallButton.jsx'

const App = () => {
  const location = useLocation()
  const isOwnerPath = location.pathname.startsWith('/owner')

  const {
    showLogin,
    setShowLogin,
    showSignup,
    setShowSignup
  } = useAppContext()

  return (
    <>
      <Toaster />
      <ChatWidget />
      <FloatingCallButton />

      {showLogin && (
        <Login
          setShowLogin={setShowLogin}
          setShowSignup={setShowSignup}
        />
      )}

      {showSignup && (
        <Signup
          setShowSignup={setShowSignup}
          setShowLogin={setShowLogin}
        />
      )}

      {!isOwnerPath && <Navbar />}

      <div key={location.pathname} className="animate-fadeIn w-full h-full">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/car-details/:id' element={<CarDetails />} />
          <Route path='/cars' element={<Cars />} />
          <Route path='/my-bookings' element={<MyBookings />} />

          <Route path='/owner' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='add-car' element={<AddCar />} />
            <Route path='manage-cars' element={<ManageCars />} />
            <Route path='manage-bookings' element={<ManageBookings />} />
          </Route>
        </Routes>
      </div>

      {!isOwnerPath && <Footer />}
    </>
  )
}
export default App