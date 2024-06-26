import {React, useEffect} from 'react'
import Head from 'next/head';
import Order from '../../models/Order';
import Product from '../../models/Product';
import mongoose from 'mongoose'
import { useRouter } from 'next/router';

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment/moment';


function MyOrder ({ order, clearCart, user }) {

  const router = useRouter();

  // Maybe not needed as success page clears cart
  useEffect(() => {

    if(router.query.clearCart == 1){
     clearCart();
    }
  }, [router.query])

  return (
    <>
    <Head>
      <title>Order</title>
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
   </Head>

  <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable theme="light"/>
    <section className="bg-[#f7f7f7] text-gray-600 body-font overflow-hidden">
      <div className="container min-h-screen px-5 py-12 mx-auto">

        {/* If no order found */}
        { order == null || user.email != order.email && <div>
          <h1 className='text-indigo-600 text-center font-semibold text-2xl'>No such order found!</h1>
        </div>}

        {/* Main page */}
        { order != null && user.email === order.email &&  <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">

            {/* Intro text */}
            <h2 className="text-sm title-font text-gray-500 tracking-widest">Art Shark</h2>
            <h1 className="text-gray-900 text-2xl sm:text-3xl title-font font-medium mb-8">Order Id: #{order.orderId}</h1>
          
            <p className="text-sm sm:text-lg leading-relaxed mb-8">
              Your order has been placed on
              <span className='ml-1 font-semibold text-[#44B0B7]'>{moment(order.createdAt).utc().format("dddd, MMMM Do YYYY")}</span> 
            </p>

            {/* Product table header*/}
            <div className="flex mb-0">
              <a className="flex-grow w-1/2 text-left text-[#44B0B7] border-b-2 border-gray-300 py-2 text-sm sm:text-lg font-medium px-1">Products</a>
              <a className="flex-grow w-1/4 text-center text-[#44B0B7] border-b-2 border-gray-300 py-2 text-sm sm:text-lg font-medium px-1">Quantity</a>
              <a className="flex-grow w-1/4 text-center text-[#44B0B7] border-b-2 border-gray-300 py-2 text-sm sm:text-lg font-medium px-1">Item Total</a>
            </div>

             {/* Product table content*/}
            <div className='mb-8'>

              {/* Product table items */}
              {order.products && order.products.map((item,index)=>{

                const collection_idx = item.collection;
                const collection_files = ['recently-added/', 'red-japan/', 'celebrities/', 'hockney/', 'ukiyo-e/'];
                const file = collection_files[collection_idx];
                
                return <div key={index} className="flex w-full border-b-2 border-gray-200 py-2">
                  <div className="w-1/2 text-left font-medium text-gray-500 flex">
                    <div className="ml-0 h-16 w-16 sm:h-24 sm:w-24 overflow-hidden rounded-md border">
                        <img src={'/images/collections/' + file + item.img} alt="product-image" className="h-full w-full object-cover object-center"/>
                    </div>
                    <div className="ml-6 w-1/2">
                      <span className='text-sm sm:text-lg'>T-shirt {item.size} {item.color}</span> 
                    </div>
                  </div>  
                  <div className="w-1/4 text-center text-sm sm:text-lg font-medium text-gray-900">{item.qty}</div>
                  <div className="w-1/4 text-center text-sm sm:text-lg font-medium text-gray-900">€{item.price}</div>
                </div>})}   
                
                {/* Product table subtotal */}
                <div className="flex w-full border-b-2 border-gray-200 py-2">
                      <div className="w-1/2 text-center font-medium text-gray-500"></div>  
                      <div className="w-1/4 text-sm sm:text-lg text-center font-bold text-gray-900">Total:</div>  
                      <div className="w-1/4 text-sm sm:text-lg text-center font-medium text-gray-900">€{order.amount}</div>
                </div> 

            </div>
            
            {/* Delivery status and address */}
            <div className='flex flex-col sm:flex-row'>

              {/* Status */}
              <div className="flex mt-4 sm:mt-6 sm:w-2/3">
                <span className="title-font font-medium text-md sm:text-xl text-[#44B0B7]">Delivery status: {order.deliveryStatus}</span>
              </div>
            
              {/* Address */}
              <div className='mt-10 sm:mb-6 sm:w-1/3'>
                    <h1 className='title-font font-medium text-md sm:text-lg mb-0 sm:mb-2'>Shipping to:</h1>

                    <p className='ml-8'>{order.name}</p>
                    <p className='ml-8'>{order.addressLine1}</p>
                    {order.addressLine2 && <p className='ml-8'>{order.addressLine2}</p>}
                    <p className='ml-8'>{order.zip} {order.city}</p>
              </div>

            </div>

          </div>
        </div>}


      </div>
    </section>
  </>
  )
  }

  export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState){
      mongoose.set("strictQuery", false);
      await mongoose.connect(process.env.MONGO_URI)
    }
    let order = await Order.findById(context.query.id)

    // Pass data to the page via props
    return {
      props: { order: JSON.parse(JSON.stringify(order)) } 
    }

  }
  

export default MyOrder