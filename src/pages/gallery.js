import React from 'react'
import Head from 'next/head';
import Link from 'next/link'
import Product from '../../models/Product';
import mongoose from "mongoose";

function Gallery({ product }) {

  return (
    <>
    <Head>
      <title>Gallery</title>
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
   </Head>

    <div className="bg-white text-black">
      <div className="mx-auto min-h-screen max-w-2xl py-16 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        
        <h1 className ="text-2xl md:text-2xl font-bold">Gallery</h1>

        {/* No available stock */}
        {product.length === 0 && <div className="font-semibold text-center">Sorry! Currently Stock Unavailble right now. Please wait for the new Stock...!</div>}  

        <div className="grid pt-10 grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

          {product.map((item)=>{

              return <Link key={item._id} href={`/product/${item._id}`} className="group"> 
                <div className="aspect-w-1 aspect-h-1 h-96 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={item.img}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                  <h3 className="mt-4 text-base text-gray-800">{item.desc}</h3>
              </Link>

            })}

        </div>

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

    // Retrieve data and put in items
    let products = await Product.find()
    /*let items= {}
    for (let item of products){
      if (item.title in items) {
        if (!items[item.title].color.includes(item.color)) {
                  items[item.title].color.push(item.color)
        }
        if (!items[item.title].size.includes(item.size)) {
                  items[item.title].size.push(item.size)
        }
      }

      else {
        
        items[item.title] = JSON.parse(JSON.stringify(item))

        items[item.title].color = [item.color]
        items[item.title].size = [item.size]
              
      }
    };*/
  
    // Pass data to the page via props
    return {
        props: { product: JSON.parse(JSON.stringify(products)) } 
      }
  }

export default Gallery