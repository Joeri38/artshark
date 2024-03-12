//'use client';
//import Link from 'next/link';
import React from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Router from 'next/router';

import { useState } from 'react';

async function buttonClicked(imgPath, imgPrompt){

    // Save image as png
    const response = await fetch(imgPath);
    const blob = await response.blob();
    console.log(blob)

    const file = new File([blob], 'downloaded_image.png', { type: 'image/png' });
    console.log(file)

    const url = URL.createObjectURL(file)
    console.log(url)

    /*const formData = new FormData();
    formData.append('image', file);*/

    /*const uploadResponse = await fetch('/api/save-image', {
      method: 'POST',
      body: formData,
    });

    if (uploadResponse.ok) {
      console.log('Upload successful')
    } else {
      console.error('Upload failed');
    }*/

    // Save image as pdf
    // Create product in database

    // Route to [id].js to buy
    //Router.push('product/65b2c916c197029aa5743987')
}

function PromptSection({ changeImg, changePrompt, imgPath, imgPrompt }){

    async function handleSubmit(e){

        // Prevent the browser from reloading the page
        e.preventDefault();
        alert('prompt submitted!');
    
        // Read the form data
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());

        // Print data
        console.log(formJson);
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

        // Change imgPath and imgPrompt state of page.txs
        changeImg('https://cdn.discordapp.com/attachments/1105907434230386820/1114327067434164284/ArtShark_homeless_Kim_Kardashian_in_downtown_newyork_37b0c598-75a8-449d-b340-3a56161f11ed.png?ex=65fe0cf4&is=65eb97f4&hm=73c202e6b84830a498b1262f28cfd5c85c9a1eecd3d002bf432a7fae0727e5df&');
        changePrompt(prompt);
    }

    return(<div className='mt-4'>
        <form id="myForm" onSubmit={handleSubmit} >
            <label htmlFor="prompt">Give your prompt</label><br/>
            <input className='bg-gray-300' type="text" 
            id="prompt" name="prompt" size="40"/> 
        </form> 
        <h1 className='mt-4'>Prompt: {imgPrompt}</h1>
            <button onClick={() => buttonClicked(imgPath, imgPrompt)}
                    className='flex mt-4 bg-[#29D0d1] hover:bg-[#44B0B7] text-white rounded-xl border-0 py-3 px-6 focus:outline-none font-semibold text-sm md:text-base'>            
                Buy
            </button>
    </div>
    );
}

function Artwork({ imgPath }){

    return(<div className='mt-12 ml-8'>
        <Image src={imgPath} alt="Nothing generated yet" width={400} height={300}/>      
    </div>
    );
}

//export default 
function Create({ changeImg, changePrompt }) {

    // Set state
    const [imgPath, setImgPath] = useState('https://cdn.discordapp.com/attachments/1105907434230386820/1114327066679193750/ArtShark_homeless_Kayne_west_in_downtown_newyork_3f9e58db-98f6-456a-b769-1349a9f13a4a.png?ex=65fe0cf3&is=65eb97f3&hm=6c9dfb20ce7d6d9572ad03d49467f53ec89f60e48e7cc2bf4f3165f58e7f16ba&');
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
            </div>

        </div>
    </section>        
    </>
  };

  export default Create