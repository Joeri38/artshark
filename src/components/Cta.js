import React from 'react'
import Link from 'next/link'


function Cta () {
  return (
    <div className='relative'>

      <div className='absolute z-10 py-5 top-20 sm:top-44 md:top-40 md:left-36 xl:left-44 md:w-2/3 md:ml-10'>
        <h1 className='text-3xl sm:text-4xl font-sans tracking-wide text-white text-center font-semibold'>Who we are as a Tool</h1>
        <p className=' md:w-10/12 mx-auto text-sm tracking-tighter sm:text-base px-10 md:px-0 md:text-xl my-4 mb-7 text-center text-gray-200'>Feel free to explore our website, try our tool, and unleash your imagination with the help of AI image generation. We are committed to continually improving our technology and providing you with an exceptional user experience.</p>
      </div>
      <div className=''>
        <img className='w-full md:w-11/12 mx-auto h-[400px] sm:h-[500px] object-cover object-bottom rounded-md' src="https://images.unsplash.com/photo-1631755218195-8d8e7b2c04d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjM1fHxkYXJrJTIwZGVza3xlbnwwfDB8MHx8&auto=format&fit=crop&w=600&q=60" alt="" />
      </div>

    </div>

  )
}

export default Cta