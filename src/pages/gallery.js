import GalleryItem from '@/components/GalleryItem'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const Gallery = () => {
  return (
    <>
    <Head>
      <title>Gallery_Art Shark</title>
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>
    <div className='min-h-screen bg-[#f7f7f7] text-black py-10'>
      <div className=''>
        <div className='pt-5 md:pt-10 pl-5 md:pl-10'>
          <h1 className='font-bold text-xl'>Art Gallery</h1>
          <p className='text-sm'>Do you want to add your creation?
            <Link href={'/create'} className='font-semibold ml-1 text-[#44B0B7] hover:underline'>Click here</Link>
          </p>
        </div>
        <GalleryItem title={'Recently Added'}/>
      </div>
    </div>

    </>
  )
}

export default Gallery