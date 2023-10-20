import React from 'react'
import Link from 'next/link'
//import { AiOutlineArrowRight } from 'react-icons/ai';

const products = [
    {
      id: 1,
      name: 'T-shirts',
      href: '/products',
      imageSrc: 'https://images.unsplash.com/photo-1609811692040-35b06faddb8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGZyYW1lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60',
      imageAlt: "T-shirts",
      available: true,
    },
    {
      id: 2,
      name: 'Posters',
      href: '/items',
      //imageSrc: 'https://images.unsplash.com/photo-1619032468883-89a84f565cba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dHNoaXJ0JTIwZm9yJTIwc3RvcmV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60',
      imageSrc: '/images/poster_coming_soon.png',
      imageAlt: "Posters",
      available: false,
    },
    {
      id: 3,
      name: 'Merch',
      href: '/items',
      //imageSrc: 'https://plus.unsplash.com/premium_photo-1675195129732-4b74822023ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FudmFzfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60',
      imageSrc: '/images/mug_coming_soon.png',
      imageAlt: "Merch",
      available: false,
    },
  ]


function Shop() {
    return (
      <div className="bg-[#f7f7f7]">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className='flex flex-col md:flex-row items-center justify-between'>
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
                
                <div className="mt-4 flex justify-between">
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