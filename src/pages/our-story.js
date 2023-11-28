import Head from 'next/head'
import React from 'react'

const OurStory = () => {

  return (
    <>
    <Head>
        <title>Our Story</title>
        <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>

    <div className='min-h-screen text-black bg-[#f7f7f7] p-10 py-10 pb-20'>
      
      {/* About Us */}
      <section className="text-gray-600 bg-[#f7f7f7] body-font">
        <div className="container mx-auto flex px-12 py-6 sm:px-16 md:py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="text-lg sm:text-2xl tracking-wider mb-3 md:text-4xl font-bold text-gray-900">Our Story</h1>
            <p className="mb-2 w-full leading-relaxed">Welcome to Artshark, where AI meets creativity to redefine the world of art. We are a team of four young and ambitious individuals with a shared passion for pushing the boundaries of innovation in the art industry.</p>
            <p className="pt-6 md:pt-0 w-full leading-relaxed">At Artshark, we believe that artificial intelligence has the power to unlock new realms of artistic expression. We harness cutting-edge AI algorithms and techniques to create breathtaking art that challenges conventions and captivates audiences.</p>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded-3xl" alt="hero" src="https://media.istockphoto.com/id/1360092910/photo/words-with-about-us-web-concept-idea.webp?b=1&s=170667a&w=0&k=20&c=8ER5GnlVth7iPBW1_5rVcvaXOmpDWdkPfRqcqgnS-mc="/>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="text-gray-600 bg-[#f7f7f7] body-font">
        <div className="container mx-auto flex px-12 py-6 sm:px-16 md:py-24 md:flex-row flex-col items-center">

          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded-3xl" alt="hero" src="https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmlzaW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"/>
          </div>
          <div className="lg:flex-grow pt-6 m:pt-0 md:ml-20 md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="text-lg sm:text-2xl mb-3 md:text-3xl tracking-widest font-bold text-gray-900">Our Vision</h1>
            <p className="mb-2 w-full leading-relaxed">We envision a future where AI-driven art becomes a prominent force, seamlessly integrating technology and creativity. Through our work, we aim to redefine traditional notions of art, sparking imagination and inspiring conversations.</p>
          </div>
          
        </div>
      </section>

      {/* Our Mission */}
      {/* 
      <section className="text-gray-600 bg-[#f7f7f7] body-font">
        <div className="container mx-auto flex px-5 md:px-10 md:py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="text-lg sm:text-2xl tracking-wider mb-3 md:text-4xl font-bold text-gray-900">Our Mission</h1>
            <p className="w-full leading-relaxed">At Artshark, our mission is to stun the world with our AI art. We strive to create unique and mesmerizing artworks that evoke emotion, spark curiosity, and blur the lines between human ingenuity and machine intelligence. We are committed to pushing the boundaries of what's possible, forging new paths in the intersection of art and technology.</p>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded-3xl" alt="hero" src="https://images.unsplash.com/photo-1521316730702-829a8e30dfd0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWlzc2lvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"/>
          </div>
        </div>
      </section>
      */}

      {/* What sets us apart: */}
      <section className="text-gray-600 bg-[#f7f7f7] body-font">
        <div className="container mx-auto flex px-5 md:px-10 py-24 md:flex-row flex-col items-center">

          <div className="lg:flex-grow md:ml-20 md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="text-lg sm:text-2xl mb-3 md:text-3xl tracking-widest font-bold text-gray-900">What sets us apart</h1>
            <p className="mb-2 w-full leading-relaxed">
              <span className='font-bold mr-1'>Creative Excellence:</span>
              <span className='text-sm'>Our team of talented artists and AI experts collaborate to produce art that seamlessly blends human creativity with the power of artificial intelligence. We carefully curate and refine every piece to ensure it embodies the vision and spirit of Artshark.</span> 
            </p>
            <p className="mb-2 w-full leading-relaxed">
              <span className='font-bold mr-1'>Technological Innovation:</span>
              <span className='text-sm'>We leverage the latest advancements in AI algorithms and machine learning techniques to generate art that surpasses traditional boundaries. Our AI models learn from vast datasets, enabling us to create stunning and unique masterpieces that captivate the senses.</span> 
            </p>
            <p className="mb-2 w-full leading-relaxed">
            <span className='font-bold mr-1'>Ethical Approach:</span>
              <span className='text-sm'>As advocates of responsible AI usage, we prioritize ethical considerations in every aspect of our work. We strive to foster transparency, respect for intellectual property rights, and the ethical treatment of data, ensuring that our AI art aligns with ethical standards.</span> 
            </p>
          </div>
          
        </div>
      </section>

      {/* Join Us in the AI Art Revolution: */}
      {/* 
      <section className="text-gray-600 bg-[#f7f7f7] body-font">
        <div className="container mx-auto flex px-5 md:px-10 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="text-lg sm:text-2xl tracking-wider mb-3 md:text-4xl font-bold text-gray-900">Join Us in the AI Art Revolution:</h1>
            <p className="w-full leading-relaxed">We invite you to embark on this exciting journey with us. Witness the magic of AI-infused art and experience the awe-inspiring fusion of technology and creativity. Whether you're an art enthusiast, a collector, or simply curious about the future of art, Artshark welcomes you to explore our gallery and be part of the AI art revolution.</p>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded-3xl" alt="hero" src="https://media.istockphoto.com/id/1403390070/photo/join-our-team-alphabet-letters-on-wooden-background.webp?b=1&s=170667a&w=0&k=20&c=JJjrdjZ9Je6_Zr7gW4CKIYYTcN94jpBgig0t41o0euM="/>
          </div>
        </div>
      </section>
      */}

    </div>

    </>
  )
}

export default OurStory