import React, { useState } from 'react'
import Link from 'next/link'
import {AiOutlineArrowRight} from 'react-icons/ai'
import Head from 'next/head'

const Create = ({getImages,message, setMessage, generatedImages }) => {
  

  return (
    <>
    <Head>
      <title>Create_Art Shark</title>
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>
    <div className='min-h-screen bg-[#f7f7f7] text-black pb-32'>

      <form method='POST' onSubmit={getImages}>
        <div className='py-10 px-10 md:px-20'>
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Enter Prompt</label>
          <textarea value={message} onChange={(e)=>{setMessage(e.target.value)}} name='message' id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-2 border-[#245c70] focus:ring-[#245c70] focus:border-[#245c70]" placeholder="Write your thoughts here..."></textarea>
        <div className="flex justify-center">
          <button type='submit' className="ml-4 inline-flex items-center bg-[#29D0d1] text-white rounded-xl font-semibold border-0 py-2 px-8 focus:outline-none hover:bg-[#44B0B7] text-base mt-2 md:mt-5"> <span className='mr-2'>Get Result</span>  <AiOutlineArrowRight/> </button>
        </div>
        </div>
      </form>

      {/* No Image Generated Yet */}
      {generatedImages.length == 0 && <h1 className='text-center text-red-700 font-semibold text-sm'>No Image Generated Yet!</h1>}

      <div className='px-10 md:px-20'>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {generatedImages && generatedImages.map((item, index) => (
            <div key={index} className="group relative flex flex-col-reverse md:flex-col">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img src={item.url} alt={index} className="h-[33rem] w-full object-cover object-center lg:h-full lg:w-full"/>
              </div>
              <div className="mt-4 flex justify-between">
                  <h3 className="text-base text-gray-700">
                    <Link href={item.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      <span className='font-semibold'>Version # {index + 1}</span>
                    </Link>
                  </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
    </>
  )
}

export default Create