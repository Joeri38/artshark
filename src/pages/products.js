import GalleryItem from '@/components/GalleryItem'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const Products = () => {
  return (
    <>
    <Head>
      <title>Products</title>
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>
    <div className='min-h-screen bg-[#f7f7f7] text-black py-10'>
      <div className=''>
        <GalleryItem title={'Available products'}/>
      </div>
    </div>

    </>
  )
}

export default Products