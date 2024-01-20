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
    <div className='min-h-screen bg-[#f7f7f7] text-black py-6'>
      <div className=''>
        <GalleryItem title={'Products'}/>
      </div>

      {/* 100% cotton */}
      <section className="text-gray-600 bg-[#f7f7f7] body-font">
        <div className="container mx-auto flex px-5 md:px-10 py-12 md:flex-row flex-col items-center">

          <div className="lg:flex-grow md:ml-20 md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-8 md:mb-0 items-center text-center">
            <h1 className="text-lg sm:text-2xl mb-3 md:text-3xl tracking-widest font-bold text-gray-900">100% cotton</h1>
            <p className="mb-2 w-full leading-relaxed">
              We chose to use 100% cotton for our t-shirts. There are a couple reasons for this:
            </p>
            <p className="mb-2 w-full leading-relaxed">
              <span className='font-bold mr-1'>Premium feel:</span>
              <span className='text-sm'>100% cotton shirts feel super comfotable.</span> 
            </p>
            <p className="mb-2 w-full leading-relaxed">
              <span className='font-bold mr-1'>Chemical free:</span>
              <span className='text-sm'>No Chemicals are used in the process of creating the t-shirts.</span> 
            </p>
            <p className="mb-2 w-full leading-relaxed">
              <span className='font-bold mr-1'>Breathable:</span>
              <span className='text-sm'>On a hot summer day, air passes through easy for cooling down better.</span> 
            </p>
            <p className="mb-2 w-full leading-relaxed">
              <span className='font-bold mr-1'>Sustainable:</span>
              <span className='text-sm'>It is made to last a lifetime, but not for ever.</span> 
            </p>
          </div>   
        </div>

        <div className="container mx-auto flex px-5 md:px-10 py-12 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:ml-20 md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="text-lg sm:text-2xl mb-3 md:text-3xl tracking-widest font-bold text-gray-900">Printing</h1>
            <p className="mb-2 w-full leading-relaxed">
            The technique we use is DTG (Direct to Garment). This is a high quality printing method especially for 100% cotton Tees. It can handle digital images with high density for or the best printing quality.
            </p>
          </div>

          <div className="lg:flex-grow md:ml-20 md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-8 md:mb-0 items-center text-center">
            <h1 className="text-lg sm:text-2xl mb-3 md:text-3xl tracking-widest font-bold text-gray-900">Supplier</h1>
            <p className="mb-2 w-full leading-relaxed">
            Fruit of Loom -  We chose this supplier because sustainability is high on their agenda. Their shirts are the comfortable and surpass the high quality our standards.
            </p>
          </div>

        </div>
      </section>
    </div>

    </>
  )
}

export default Products