import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Carosel from '../components/Carosel'
import Testimonials from '../components/Testimonials'
import Feedback from '@/components/ContactForm'
import ContactForm from '@/components/ContactForm'



function Contact() {
  return (
    <>
    <Head>
      <title>About</title>
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
   </Head>
    <div>

      {/* About Us */}
      <section className="text-gray-600 bg-[#f7f7f7] body-font md:mb-44">
        <div className="container mx-auto flex px-5 md:px-10 py-12 md:py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="text-lg sm:text-2xl tracking-wider mb-3 md:text-4xl font-bold text-gray-900">Contact Us</h1>
            <p className="mt-8 mb-8 w-full leading-relaxed">Welcome to Artshark, where AI meets creativity to redefine the world of art. We are a team of four young and ambitious individuals with a shared passion for pushing the boundaries of innovation in the art industry.</p>
            <p className="w-full leading-relaxed">At Artshark, we believe that artificial intelligence has the power to unlock new realms of artistic expression. We harness cutting-edge AI algorithms and techniques to create breathtaking art that challenges conventions and captivates audiences. Contact us at artsharkbe@gmail.com.</p>
          </div>
          <div className="mb-0 lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded-3xl" alt="hero" src="https://media.istockphoto.com/id/1360092910/photo/words-with-about-us-web-concept-idea.webp?b=1&s=170667a&w=0&k=20&c=8ER5GnlVth7iPBW1_5rVcvaXOmpDWdkPfRqcqgnS-mc="/>
          </div>
        </div>
      </section>

      {/*<ContactForm/>*/}
      
    </div>
    </>
  )
}

export default Contact