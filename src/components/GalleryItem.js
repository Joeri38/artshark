import React from 'react'
import Link from 'next/link'
import { AiOutlineArrowRight } from 'react-icons/ai';

const products = [
    {
      id: 1,
      href: '#',
      imageSrc: 'images/tshirt1.png',
      imageAlt: "Front of men's Basic Tee in black.",
    },
    {
      id: 2,
      href: '#',
      imageSrc: 'images/tshirt2.png',
      imageAlt: "Front of men's Basic Tee in black."
    },
    {
      id: 3,
      href: '#',
      imageSrc: 'images/tshirt3.png',
      imageAlt: "Front of men's Basic Tee in black."
    },
    {
      id: 4,
      href: '#',
      imageSrc: 'images/tshirt4.png',
      imageAlt: "Front of men's Basic Tee in black."
    }
  ]


function GalleryItem({title}) {
    return (
      <div className="bg-[#f7f7f7]">
        <div className="mx-auto max-w-2xl py-10 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className='flex flex-col md:flex-row items-center justify-between'>
            <h2 className="text-xl md:text-2xl font-sans font-semibold tracking-tight text-gray-900">{title}</h2>
            <Link href={'/gallery'} className='font-semibold text-sm md:text-base flex items-center text-[#44B0B7]'>Browse gallery <AiOutlineArrowRight className='ml-1'/></Link>
          </div>
      
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              
            {// Loop over products to show them
            products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-[34rem] w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                
              </div>
            ))}

          </div>
        </div>
      </div>
    )
  }


export default GalleryItem