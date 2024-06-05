//'use client';
import React from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Router from 'next/router';

import { useState } from 'react';

// Click to buy product
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
      console.log('Upload successful')
    } else {
      console.error('Upload failed');
    }

     // Add to product database
    let res = await fetch('/api/addproducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            desc: imgPrompt,
            img: imgPrompt.toLowerCase().replaceAll(' ', '_') + '.png',
            collection: -1,
        }),
    })
    let response = await res.json()

    // Route to [id].js to buy
    Router.push(`product/${response.productID}`)
}

// Generate image
async function generate(){
    console.log('Generating image');
}

function PromptSection({ changeImg, changePrompt, imgPath, imgPrompt }){

    async function handleSubmit(e){

        // Prevent the browser from reloading the page
        e.preventDefault();
        alert('prompt submitted!');
    
        // Read the form data
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        const prompt = formJson['prompt'];
        
        // TODO: Send formJson to Midjourney API
        /*const response = await fetch('/api/form', {
            body: JSON.stringify(formJson),
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        }); 

        // Retrieve imgPath from response
        const data = await response.json();
        // alert(data.prompt);
        const imgPath = data['imgPath'];*/

        // Change imgPath and imgPrompt state 
        changeImg('https://cdn.discordapp.com/attachments/1105607692929749026/1201145209166233642/artshark.com_a_pidgeon_playing_an_electric_guitar_metal_single__d28a1497-056e-4e09-af16-4ea57113095e.png?ex=661294a6&is=66001fa6&hm=845a6f6f07852bfeacdb26898ac3fcc86b20020b2843b1048fdcb45dc6c4a864&');
        changePrompt(prompt);
    }

    return(<div className='mt-4'>
        <form id="myForm" onSubmit={handleSubmit} >
            <label htmlFor="prompt">Give your prompt</label><br/>
            <input className='bg-gray-300' type="text" 
            id="prompt" name="prompt" size="40"/> 
        </form> 
        <h1 className='mt-4'>Prompt: {imgPrompt}</h1>
    </div>
    );
}

function GenerateButton({}){
    return <button onClick={() => generate()}
    className='flex mt-4 bg-[#29D0d1] hover:bg-[#44B0B7] text-white rounded-xl border-0 py-3 px-6 focus:outline-none font-semibold text-sm md:text-base'>            
        Create
    </button>
}

function BuyButton({imgPath, imgPrompt}){
    return <button onClick={() => buyProduct(imgPath, imgPrompt)}
    className='flex ml-16 mt-4 bg-[#29D0d1] hover:bg-[#44B0B7] text-white rounded-xl border-0 py-3 px-6 focus:outline-none font-semibold text-sm md:text-base'>            
        Buy
    </button>
}

function Artwork({ imgPath }){

    return(<div className='mt-12 ml-8'>
        <Image src={imgPath} alt="Nothing generated yet" width={400} height={300}/>      
    </div>
    );
}

function Create({ changeImg, changePrompt }) {

    // Set state
    const [imgPath, setImgPath] = useState('https://cdn.discordapp.com/attachments/1105607692929749026/1201145209166233642/artshark.com_a_pidgeon_playing_an_electric_guitar_metal_single__d28a1497-056e-4e09-af16-4ea57113095e.png?ex=661294a6&is=66001fa6&hm=845a6f6f07852bfeacdb26898ac3fcc86b20020b2843b1048fdcb45dc6c4a864&');
    const [imgPrompt, setImgPrompt] = useState('no prompt yet');

    return <>
    <Head>
        <title>Create</title>
        <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>

    <section className="text-gray-600 bg-[#f7f7f7] body-font md:mb-16">
        <div className="container mx-auto flex px-12 py-16 sm:px-16 md:flex-row flex-col items-center">
            
            {/* Image */}
            <div className='w-1/2'>
                <h1 className='text-lg sm:text-2xl tracking-wider md:text-4xl font-bold text-gray-900'>Create your own art</h1>
                <Artwork imgPath={imgPath} />
            </div>
            
            {/* Prompsection */}
            <div className='w-1/2'>  
                <p>This page is currently not connected to a Midjourney API.</p>
                <PromptSection changeImg={setImgPath} changePrompt={setImgPrompt} 
                               imgPath={imgPath} imgPrompt={imgPrompt}/>   
                <div className='flex flex-row'>
                    <GenerateButton />
                    <BuyButton imgPath={imgPath} imgPrompt={imgPrompt}/>    
                </div>
            </div>

        </div>
    </section>        
    </>
  };

  export default Create