//'use client';
import React from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Router from 'next/router';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { set } from 'mongoose';

// Generate image
async function generate(imgPrompt, setImgPath, setIsGenerating) {

    // Set loading state
    setIsGenerating(true);

    // Send prompt to API route
    const response = await fetch('api/generate-image', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ prompt: imgPrompt }),
    })
    const data = await response.json();

    
    // Set image path 
    setImgPath(data.img_url);   
    setIsGenerating(false);
}

// Buy product
async function buyProduct(imgPath, imgPrompt){

    // Save image in database
    const uploadResponse = await fetch('/api/save-image', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            imgPath: imgPath, 
            imgPrompt: imgPrompt,
        }),
    });

    if (uploadResponse.ok) {
      console.log('Saving image successful')
    } else {
      console.error('Saving image failed');
    }

    const data = await uploadResponse.json();
    const fileName = await data.fileName;

     // Add to product database
    let res = await fetch('/api/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            desc: imgPrompt,
            //img: fileName,
            img: imgPath,
            series: -1,
        }),
    })
    let response = await res.json();

    // Route to [id].js to buy
    Router.push(`product/${response.productID}`)
}

function PromptSection({ changePrompt, imgPrompt }){

    return (
        <textarea
      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29D0d1] focus:border-transparent"
      placeholder="Describe the image you want to create..."
      value={imgPrompt}
      onChange={(e) => changePrompt(e.target.value)}
    />
    )
}

function GenerateButton({ imgPrompt, setImgPath, setIsGenerating }){
    return <button onClick={() => generate(imgPrompt, setImgPath, setIsGenerating)}
    className='w-full sm:w-auto px-6 py-3 flex mt-4 bg-[#29D0d1] hover:bg-[#44B0B7] text-white rounded-xl border-0 focus:outline-none font-semibold text-sm md:text-base transition duration-300 ease-in-out'>         
        Create
    </button>
}

function BuyButton({imgPath, imgPrompt}){
    return <button onClick={() => buyProduct(imgPath, imgPrompt)}
    className='flex mt-4 bg-[#29D0d1] hover:bg-[#44B0B7] text-white rounded-xl border-0 py-3 px-6 focus:outline-none font-semibold text-sm md:text-base'>            
        Buy
    </button>
}

function Artwork({ imgPath }){

    if (!imgPath) {
        return null; // or you can return an empty fragment: return <> </>;
    }

    return(
        <Image src={imgPath} className="w-full h-auto rounded-lg" width={400} height={300}/>
    );
}

function LoadingAnimation(){
    return (
        <div className="w-full h-96 flex items-center justify-center">
            <p>Generating image...</p>
        </div>
    )
}

function Create({ changeImg, changePrompt }) {

    // Set state
    const [imgPath, setImgPath] = useState(undefined);
    //const [imgPath, setImgPath] = useState('https://cdn.discordapp.com/attachments/1105607692929749026/1201145209166233642/artshark.com_a_pidgeon_playing_an_electric_guitar_metal_single__d28a1497-056e-4e09-af16-4ea57113095e.png?ex=661294a6&is=66001fa6&hm=845a6f6f07852bfeacdb26898ac3fcc86b20020b2843b1048fdcb45dc6c4a864&');
    const [imgPrompt, setImgPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    return <>
    <Head>
        <title>Create</title>
        <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>

    <section className="text-gray-600 bg-[#f7f7f7] body-font md:mb-16 min-h-screen py-16">
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row items-center justify-between gap-12"
            >

            {/* Title Section */}
            <div className="w-full lg:w-1/2 space-y-8">
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Create Your <span className="text-[#29D0d1]">Own Art</span>
                </h1>
            </div>

            {/* Prompt Section */}
            <div className="w-full lg:w-1/2 space-y-6">
                
                <PromptSection
                changePrompt={setImgPrompt}
                imgPrompt={imgPrompt}
                />
                <div className="flex flex-col sm:flex-row gap-4">
                <GenerateButton
                    imgPrompt={imgPrompt}
                    setImgPath={setImgPath}
                    setIsGenerating={setIsGenerating}
                />
                <BuyButton imgPath={imgPath} imgPrompt={imgPrompt} />
                </div>
            </div>

            {/* Image Creation Section */}
            <div className="w-full lg:w-1/2 space-y-8">
                <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                    {isGenerating ? (
                        <LoadingAnimation />
                    ) : (
                        <Artwork imgPath={imgPath} />
                    )}

                </motion.div>
            </div>

        </motion.div>
      </div>
         
    </section>        
    </>
  };

  export default Create