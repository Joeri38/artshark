import React from 'react'
import Head from 'next/head';
import Link from 'next/link'
import Product from '../../models/Product';
import mongoose from "mongoose";

function Items({ product, user }) {

  return (
    <>
    <Head>
      <title>Products_Art Shark</title>
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
   </Head>
    <div className="bg-white text-black">
      <div className="mx-auto min-h-screen max-w-2xl py-16 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        {Object.keys(product).length === 0 && <div className="font-semibold text-center">Sorry! Currently Stock Unavailble right now. Please wait for the new Stock...!</div>}  
        {console.log(`mail: ${user.email}`)}
        {console.log(`env: ${process.env.NEXT_PUBLIC_WEBSITE_EMAIL}`)}
        {user.email === process.env.NEXT_PUBLIC_WEBSITE_EMAIL &&  <div className="text-sm text-right mt-5">Do you want to add Products? <span className='font-semibold text-[#44B0B7]'><Link href={'/admin/addproducts'}>Click here!</Link></span></div>}  

        <div className="grid pt-10 grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {Object.keys(product).map((item)=>{
            return <Link key={product[item]._id} href={`/product/${product[item].stripePriceId}`} className="group">
              <div className="aspect-w-1 aspect-h-1 h-96 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product[item].img1}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
                <h3 className="mt-4 text-sm text-gray-700">{product[item].title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">€{product[item].price}</p>
            </Link>
            })}
        </div>
      </div>
    </div>
    </>
    )
  }



  export async function getServerSideProps() {
    if (!mongoose.connections[0].readyState){
      mongoose.set("strictQuery", false);
      await mongoose.connect(process.env.MONGO_URI)
    }
    let products = await Product.find()
    let items= {}
      for (let item of products){
          if (item.title in items) {
              if (!items[item.title].color.includes(item.color) && item.avilableQty > 0) {
                  items[item.title].color.push(item.color)
              }
              if (!items[item.title].size.includes(item.size) && item.avilableQty > 0) {
                  items[item.title].size.push(item.size)
              }
          }
          else {
              // items[item.title] is key and its value is whole object(item)
              items[item.title] = JSON.parse(JSON.stringify(item))
              if(item.avilableQty > 0) {
                  items[item.title].color = [item.color]
                  items[item.title].size = [item.size]
              }
              else {
                  items[item.title].color = []
                  items[item.title].size = []
              }
          }
      };

  
    // Pass data to the page via props
    return {
        props: { product: JSON.parse(JSON.stringify(items)) } 
      }
  }

export default Items