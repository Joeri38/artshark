import GalleryItem from '@/components/GalleryItem'
import React from 'react'

const Gallery = () => {
  return (
    <>
    <div className='min-h-screen bg-[#f7f7f7] text-black py-10'>
      <div className=''>
        <div className='pt-5 md:pt-10 pl-5 md:pl-10'>
          <h1 className='font-bold text-xl'>Art Gallery</h1>
          <p className='text-sm'>Do you want to add your creation?
            <span className='font-semibold ml-1'>Click here</span>
          </p>
        </div>
        <GalleryItem title={'Recently Added'}/>
        <GalleryItem title={'Popular'}/>
      </div>
    </div>

    </>
  )
}

export default Gallery