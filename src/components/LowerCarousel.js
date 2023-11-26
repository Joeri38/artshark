import React from 'react'
import Link from 'next/link'

function LowerCarousel() {
  return (
    <section className="text-gray-600 bg-[#f7f7f7] body-font">
        <div className="container mx-auto flex py-6 px-12 sm:py-6 sm:px-6 md:flex-row flex-col items-center">

          <div className="hidden md:block lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded" alt="hero" src="https://media.istockphoto.com/id/585488832/photo/typing-on-laptop-closeup-chatting-in-facebook.webp?b=1&s=170667a&w=0&k=20&c=qNHtdVUYqmPwUlAHtbdUUTfEG1uHRONdB2-k8ymfk9o="/>
          </div>
          <div className="mt-5 md:mt-0 lg:flex-grow md:ml-20 md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="text-lg sm:text-2xl md:text-3xl mb-8 md:mb-8 tracking-widest font-bold text-gray-900">Together, we make art happen</h1>
            {/* <h1 className="text-lg sm:text-2xl mb-3 md:text-3xl tracking-widest font-bold text-gray-900"> </h1> */}
            <p className="mb-4 w-full leading-relaxed">Can't find the perfect design? No worries!</p>
            <p className="mb-6 md:mb-8 w-full leading-relaxed">Our passionate design team is all about crafting art that resonates with you. Let us know if you have any themes that you would like to be shown here!  </p>
            <div className="flex justify-center"> 
              <button className="inline-flex items-center bg-[#29D0d1] text-white rounded-xl font-semibold border-0 py-2 px-8 focus:outline-none hover:bg-[#44B0B7] text-base mt-4 md:mt-0 "><Link href={"/contact-us"}>Contact us</Link></button>
            </div>
          </div>
          
        </div>
      </section>
  )
}

export default LowerCarousel;