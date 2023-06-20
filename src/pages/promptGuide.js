import Head from 'next/head'
import React from 'react'

const PromptGuide = () => {

  const prompts = [
    {
      name: 'Shot type',
      paragraph: 'Wide shots give the audience a sense of the environment and surroundings, while portraits allow the audience to focus more closely on the subject.'
    },
    {
      name: 'Lighting',
      paragraph: 'Lighting can create a mood, set the tone, and help to bring out the details in the image. For example, a "dystopian lighting" can give the audience a sense of an oppressive or bleak environment.'
    },
    {
      name: 'Camera',
      paragraph: 'The choice of camera and lens can impact the style and quality of the image. In this case, the "Leica M9 Voigtländer 35mm classic" lens is used to create a cinematic look.'
    },
    {
      name: 'Color Grading',
      paragraph: 'The choice of colors can set the mood, evoke emotions, and create a certain atmosphere. For example, a "cinematic colorgrade" can give the audience a sense of a high-quality, professional-looking image.'
    },
    {
      name: 'Detail',
      paragraph: 'High levels of detail can bring the image to life and make it look more realistic. For example, a "highly detailed fabric" can give the subject a lifelike look and texture.'
    },
    {
      name: 'Chaos',
      paragraph: 'This term refers to the level of randomness and unpredictability in the image. A higher level of chaos can create a sense of unpredictability and action. Finally, you should think about how the final image will be presented. The aspect ratio, resolution, and quality can all impact the final image, and should be chosen based on the desired final outcome.'
    }
  ]


  return (
    <>
    <Head>
        <title>Prompt Guide</title>
        <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>

    <div className='min-h-screen text-black bg-[#f7f7f7] p-10 py-10 pb-20'>
      <div>
        <h1 className='text-2xl font-bold pt-5'>Prompt Guide</h1>
        <p className='text-sm'>For the image description of a hamster in a space suit floating away with a space explosion, I chose terms to emphasize the action, cinematic quality, and photorealism of the scene.</p>
      </div>

      {prompts.map((item, index)=>{
        return <div key={index} className='py-2'>
          <h1 className='text-xl font-semibold pt-5'>{item.name}</h1>
          <p className='text-sm'>{item.paragraph}</p>
        </div>})}



    </div>

      

    </>
  )
}

export default PromptGuide