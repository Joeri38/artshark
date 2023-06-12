import React from 'react'
import Link from 'next/link'

function LowerCarousel() {
  return (
    <section className="text-gray-600 bg-[#f7f7f7] body-font">
        <div className="container mx-auto flex px-5 md:px-10 py-24 md:flex-row flex-col items-center">

          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded" alt="hero" src="https://media.istockphoto.com/id/585488832/photo/typing-on-laptop-closeup-chatting-in-facebook.webp?b=1&s=170667a&w=0&k=20&c=qNHtdVUYqmPwUlAHtbdUUTfEG1uHRONdB2-k8ymfk9o="/>
          </div>
          <div className="mt-5 md:mt-0 lg:flex-grow md:ml-20 md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="text-lg sm:text-2xl md:text-3xl tracking-widest font-bold text-gray-900">Created by your own</h1>
            <h1 className="text-lg sm:text-2xl mb-3 md:text-3xl tracking-widest font-bold text-gray-900">prompts</h1>
            <p className="mb-2 w-full leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag.</p>
            <p className="md:mb-8 w-full leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag.</p>
            <div className="flex justify-center">
              <button className="inline-flex items-center bg-[#29D0d1] text-white rounded-xl font-semibold border-0 py-2 px-8 focus:outline-none hover:bg-[#44B0B7] text-base mt-4 md:mt-0 "><Link href={"/create"}>Get Started</Link></button>
            </div>
          </div>
          
        </div>
      </section>
  )
}

export default LowerCarousel;