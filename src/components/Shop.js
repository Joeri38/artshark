import React from 'react'
import Link from 'next/link'
import { AiOutlineArrowRight } from 'react-icons/ai';



const products = [
    {
      id: 1,
      name: 'Frames',
      href: '/',
      imageSrc: 'https://images.unsplash.com/photo-1609811692040-35b06faddb8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGZyYW1lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60',
      imageAlt: "Frames",
    },
    {
      id: 2,
      name: 'Clothing',
      href: '/',
      imageSrc: 'https://images.unsplash.com/photo-1619032468883-89a84f565cba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dHNoaXJ0JTIwZm9yJTIwc3RvcmV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60',
      imageAlt: "Clothing"
    },
    {
      id: 3,
      name: 'Assesories',
      href: '/',
      imageSrc: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2F0Y2hlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60',
      imageAlt: "Assesories"
    },
    {
      id: 4,
      name: 'Sneakers',
      href: '/sneakers',
      imageSrc: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60',
      imageAlt: "Front of men's Basic Tee in black."
    }
  ]


function Shop() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className='flex flex-col md:flex-row items-center justify-between'>
            <h2 className="text-xl md:text-2xl font-sans font-bold tracking-tight text-gray-900">Shop by Category</h2>
          </div>
  
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative flex flex-col-reverse md:flex-col">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img src={product.imageSrc} alt={product.imageAlt} className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                </div>
                <div className="mt-4 flex justify-between">
                    <h3 className="text-base text-gray-700">
                      <Link href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        <span className='font-semibold'>{product.name}</span>
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