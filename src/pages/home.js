import HomeIntro from '@/components/HomeIntro'
import HomeShop from '@/components/HomeShop'
import HomeContact from '@/components/HomeContact'
import HomeBanner from '@/components/HomeBanner'

import Head from 'next/head'
import React from 'react'

const Home = () => {
  return (
    <>
    <Head>
        <title>Art Shark</title>
        <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>

      <HomeIntro/>
      <HomeShop/>
      <HomeContact/>
      <HomeBanner/>
    </>
  )
}

export default Home