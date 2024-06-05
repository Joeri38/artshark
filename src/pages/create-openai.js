import { Configuration, OpenAIApi } from 'openai';
//import OpenAI from 'openai';

import React from 'react';

import Head from 'next/head';

/*const openai = new OpenAI({
    apiKey: process.env['NEXT_PUBLIC_OPENAI_API_KEY'], // This is the default and can be omitted
});*/

//const openai = new OpenAI();
  
const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function GenerateImage(){

    console.log('Generating image');

    const image = await openai.createImage({ 
        prompt: "A cute baby sea otter",
        n: 1,
        size: "1024x1024",
    })
    console.log(image.data);

}

function CreateOpenAI() {

    return <>
    
    <Head>
        <title>Create OpenAI</title>
        <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>
    
    <section className="text-gray-600 bg-[#f7f7f7] body-font min-h-screen">
        
        <div className="container mx-auto items-center flex flex-col px-12 py-16 sm:px-16">
            <h1>Create image with OpenAI GPT-4o</h1>

            <button onClick={() => GenerateImage()} className='flex mt-4 bg-[#29D0d1] hover:bg-[#44B0B7] text-white rounded-xl border-0 py-3 px-6 focus:outline-none font-semibold text-sm md:text-base'>
                Generate
            </button>
        </div>

        

    </section>
    
    </>
    
}

export default CreateOpenAI;