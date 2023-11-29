import React from 'react'
import Link from 'next/link'

function Carosel() {
  return (
    <section className="text-gray-600 bg-[#f7f7f7] body-font">
        <div className="container mx-auto px-12 py-6 sm:px-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="text-xl sm:text-2xl pb-10 md:pb-8 tracking-wider md:text-4xl font-bold text-gray-900">AI infused Art for the Future</h1>
            <p className="mb-6 md:mb-8 md:w-11/12 leading-relaxed">Artshark offers a unique shopping experience, showcasing a diverse collection of T-shirts with AI generated artwork. Elevate your style with wearable masterpieces crafted by Artificial Intelligence. </p>
            <div className="flex justify-center">
              <button className="inline-flex items-center bg-[#29D0d1] hover:bg-[#44B0B7] text-white rounded-xl font-semibold border-0 py-2 px-8 focus:outline-none text-base mt-4 md:mt-0 "><Link href={"/gallery"}>Get Started</Link></button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded" alt="hero" src="images/home_ai.png"/>
          </div>
        </div>
      </section>
  )
}

export default Carosel;