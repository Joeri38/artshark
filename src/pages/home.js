import Carosel from '@/components/Carosel'
import Cta from '@/components/Cta'
import LowerCarousel from '@/components/LowerCarousel'
import Shop from '@/components/Shop'
import Head from 'next/head'
import React from 'react'

const Home = () => {
  return (
    <>
    <Head>
        <title>Art Shark</title>
        <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>

      <Carosel/>
      <Shop/>
      <LowerCarousel/>
      <Cta/>
      {/* <Testimonials/> */}
    </>
  )
}

export default Home