import React from 'react'
import Image from 'next/image'
//import homeBeach from '/images/home_beach.png'

function HomeBanner() {
  return (
  <div className='bg-[#f7f7f7]'>
    <div className='container mx-auto px-12 py-6 sm:px-16 md:py-16 relative flex justify-center bg-[#f7f7f7]'>
      
      <div className='absolute z-10 sm:top-44 md:top-36 lg:top-44 md:w-2/3'>
      {/* <div className='absolute z-10 left-0 sm:top-44 md:top-40 md:left-36 xl:left-44 md:w-2/3 md:ml-10'> */}
        <h1 className='pt-12 mb-8 sm:mb-14 sm:pt-0 text-xs xxs:text-sm xs:text-lg sm:text-3xl md:text-4xl font-sans tracking-wide text-white text-center font-semibold'>What technology are we using?</h1>
        <p className='px-20 md:px-0 mb-20 md:w-10/12 mx-auto text-xs xxs:text-sm md:text-xl tracking-tighter sm:text-base  text-center text-white'>In a world buzzing with computing power and cutting-edge AI, we're riding the wave of generative artistry. Imagine AI conjuring up text, spouting speech, and crafting images that are mind-bogglingly lifelike or pure artistic magic. Well, guess what? We're inviting you to hop on this AI rollercoaster and wear the future, one design at a time!</p>
      </div>

      <div>
        <Image className='filter brightness-50 w-full md:mx-auto h-[400px] sm:h-[500px] object-cover object-bottom rounded-md' 
               src='/images/home_beach.png' alt="" width={500} height={300}/>
      </div>

    </div>
  </div>

  )
}

export default HomeBanner