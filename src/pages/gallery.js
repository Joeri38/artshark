import React from 'react'
import Head from 'next/head';
import Link from 'next/link'
import Image from 'next/image'
import Product from '../../models/Product';
import mongoose from "mongoose";

function Collection({title, file, product}) {

  return <>
        <h1 className ="pt-6 text-lg font-bold">{title}</h1>
        <div className="grid pt-10 grid-cols-3 gap-y-6 gap-x-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

          {product.map((item)=>{

              return <Link key={item._id} href={`/product/${item._id}`} className="group"> 
                <div className="aspect-w-1 aspect-h-1 h-full w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                  <Image src={'/images/' + file + item.img}
                         className="h-full w-full object-cover object-center group-hover:opacity-75"
                         width={500} height={300} />
                </div>
              </Link>

            })}

        </div>
  </>
}

function Gallery({ product }) {

  return (
    <>
    <Head>
      <title>Gallery</title>
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
   </Head>

    <div className="bg-white text-black">
      <div className="mx-auto min-h-screen max-w-2xl py-16 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        
        <h1 className ="text-2xl md:text-2xl font-bold">Gallery</h1>

        <Collection title="David Hockney style" file='hockney/' product={product[2]} />
        <Collection title="Ukiyo-e style" file='ukiyo-e/' product={product[3]} />
        <Collection title="Celebrities in different times" file='celebrities/' product={product[1]} />
        <Collection title="Red Japan" file='red-japan/' product={product[0]} />

        <Collection title="Recently added" file='recently-added/' product={product[product.length-1]} />

      </div>
    </div>
    </>
    )
  }

  export async function getServerSideProps() {

    // Connect to mongodb if not connected already
    if (!mongoose.connections[0].readyState){
      mongoose.set("strictQuery", false);
      await mongoose.connect(process.env.MONGO_URI);
    }

    // Retrieve data in array products
    let products = []

    // Add regular collections
    for (let i = 1; i < 5; i++) {
      let collection = await Product.find({ collection: i })
      products.push(collection)
    }

    // Add fan collection
    let collection = await Product.find({ collection: 0 })
    products.push(collection)
  
    // Pass data to the page via props
    return {
        props: { product: JSON.parse(JSON.stringify(products)) } 
      }
  }

export default Gallery