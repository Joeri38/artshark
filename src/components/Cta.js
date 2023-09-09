import React from 'react'
import Link from 'next/link'


function Cta () {
  return (
    <div className='relative'>

      <div className='absolute z-10 py-5 top-20 sm:top-44 md:top-40 md:left-36 xl:left-44 md:w-2/3 md:ml-10'>
        <h1 className='text-3xl sm:text-4xl mt-0 mb-14 font-sans tracking-wide text-blue-800 text-center font-semibold'>What technology are we using?</h1>
        <p className=' md:w-10/12 mx-auto text-sm tracking-tighter sm:text-base px-10 md:px-0 md:text-xl my-4 mb-7 text-center text-gray-200'>In a world buzzing with computing power and cutting-edge AI, we're riding the wave of generative artistry. Imagine AI conjuring up text, spouting speech, and crafting images that are mind-bogglingly lifelike or pure artistic magic. Well, guess what? We're inviting you to hop on this AI rollercoaster and wear the future, one design at a time!</p>
      </div>
      <div className=''>
        <img className='w-full md:w-11/12 mx-auto h-[400px] sm:h-[500px] object-cover object-bottom rounded-md' src="images/home_beach.png" alt="" />
      </div>

    </div>

  )
}

export default Cta