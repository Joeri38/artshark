import React from 'react'
import Head from 'next/head';
import Link from 'next/link'
import Product from '../../models/Product';
import mongoose from "mongoose";
import { Stripe } from 'stripe';

function Items({ prices }) {

  return (
    <>
    <Head>
      <title>Products_Art Shark</title>
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
   </Head>
    <div className="bg-white text-black">
      <div className="mx-auto min-h-screen max-w-2xl py-16 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {prices.map((item, index)=>{
          return <Link key={index} href={`/product/${item.id}`} className="group">
          <div className="aspect-w-1 aspect-h-1 h-96 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
            <img
              src={item.product.images[0]}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
            <h3 className="mt-4 text-sm text-gray-700">{item.product.title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">€{item.unit_amount/100}</p>
        </Link>
        })}
        </div>

      </div>
    </div>
    </>
    )
  }



  export async function getServerSideProps() {
    
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const response = await stripe.prices.list({
      limit: 10,
      expand: ['data.product']
    })

    const prices = response.data.filter(price => {
      return price.active;
    })

  
    // Pass data to the page via props
    return {
        props: { prices } 
      }
  }

export default Items