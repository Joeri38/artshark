import React from 'react'
import Link from 'next/link'
//import { AiOutlineArrowRight } from 'react-icons/ai';

const products = [
    {
      id: 1,
      name: 'T-shirts',
      href: '/products',
      imageSrc: '/images/product-tshirt.png',
      imageAlt: "T-shirts",
      available: true,
    },
    {
      id: 2,
      name: 'Posters',
      href: '/items',
      imageSrc: '/images/poster_coming_soon.png',
      imageAlt: "Posters",
      available: false,
    },
    {
      id: 3,
      name: 'Merch',
      href: '/items',
      imageSrc: '/images/mug_coming_soon.png',
      imageAlt: "Merch",
      available: false,
    },
  ]


function Shop() {
    return (
      <div className="bg-[#f7f7f7]">
        <div className="container mx-auto py-6 px-12 sm:py-6 sm:px-16">
          <div className='flex flex-col md:flex-row items-center justify-between mt-4'>
            <h2 className="text-xl md:text-2xl font-sans font-bold tracking-tight text-gray-900">Shop by Category</h2>
          </div>
  
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => ( 
              <div key={product.id} className="group relative flex flex-col-reverse md:flex-col">
                {product.available ? 
                (<div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                  <img src={product.imageSrc} alt={product.imageAlt} className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                </div>) : 
                (<div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 opacity-50 lg:aspect-none lg:h-80">
                <img src={product.imageSrc} alt={product.imageAlt} className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                </div>)}
                
                <div className="mb-4 flex justify-between sm:mb-0 md:mt-4">
                    <h3 className="text-base text-gray-700">
                      <Link href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        <span className='font-semibold text-xl'>{product.name}</span>
                      </Link>
                    </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }


export default Shop