import React from 'react'
import Head from 'next/head'

function Contact() {
  return (
    <>
    <Head>
      <title>About</title>
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
   </Head>
    <div>

      {/* About Us */}
      <section className="text-gray-600 bg-[#f7f7f7] body-font md:mb-24">
        <div className="container mx-auto flex px-12 py-16 sm:px-16 md:py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-10 md:mb-0 items-center text-center">
            <h1 className="text-lg sm:text-2xl tracking-wider md:text-4xl font-bold text-gray-900">Contact Us</h1>
            <p className="mt-8 mb-8 w-full leading-relaxed">At Artshark, we believe that artificial intelligence has the power to unlock new realms of artistic expression. We harness cutting-edge AI algorithms and techniques to create breathtaking art that challenges conventions and captivates audiences.</p>
            <p className="w-full mb-12 leading-relaxed">Contact us at artsharkbe@gmail.com.</p>
            <p className="w-full leading-relaxed">Artshark is a brand of <b>Questwave (VOF)</b></p>
            <p className="w-full leading-relaxed">Pleinstraat 62</p>
            <p className="w-full leading-relaxed">3001 Heverlee</p>
            <p className="w-full leading-relaxed">Ondernemingsnummer: 1006237418</p>
          </div>
          <div className="mb-0 lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded-3xl" alt="hero" src="https://media.istockphoto.com/id/1360092910/photo/words-with-about-us-web-concept-idea.webp?b=1&s=170667a&w=0&k=20&c=8ER5GnlVth7iPBW1_5rVcvaXOmpDWdkPfRqcqgnS-mc="/>
          </div>
        </div>
      </section>
      
    </div>
    </>
  )
}

export default Contact