import Carosel from '@/components/Carosel'
import ClientsClouds from '@/components/ClientsClouds'
import Cta from '@/components/Cta'
import LowerCarousel from '@/components/LowerCarousel'
import Shop from '@/components/Shop'
import Testimonials from '@/components/Testimonials'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Carosel/>
      <Shop/>
      <LowerCarousel/>
      <Cta/>
      <ClientsClouds/>
      <Testimonials/>
    </div>
  )
}

export default Home