import React from 'react'
import Hero from '../components/Hero.jsx'
import FeaturedSection from '../components/FeaturedSection'
import Banner from '../components/Banner'
import Review from '../components/Reviews.jsx'
import CarCard from '../components/CarCard.jsx'
const Home = ()=>{
    return(
        <>
            <Hero/>
            <FeaturedSection/>
            <Banner/>
            <Review/>
            <CarCard/>
        </>
    )
}
export default Home