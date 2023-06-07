import {React, useEffect} from 'react'
import Head from 'next/head';
import Order from '../../models/Order';
import mongoose from 'mongoose'
import { useRouter } from 'next/router';


function MyOrder ({ order, clearCart }) {

  const router = useRouter()

  useEffect(() => {

   if(router.query.clearCart == 1){
     clearCart();
   }
  }, [])


  return (
    <>
    <Head>
      <title>Orders_Art Shark</title>
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
   </Head>
    <section className="bg-[#f7f7f7] text-gray-600 body-font overflow-hidden">
  <div className="container min-h-screen px-5 py-10 mx-auto">

    { order == null && <div>
      <h1 className='text-[#44B0B7] text-center font-semibold text-2xl'>No such order found!</h1>
    </div>}

    { order &&  <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="w-full lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">Art Shark</h2>

        <h1 className="text-gray-900 text-3xl title-font font-medium">Order Id: #{order && order.orderId}</h1>
        <p className="leading-relaxed mb-5">New Order Received!</p>



        <h1 className="text-gray-900 pt-10 text-2xl title-font font-medium">User Details:</h1>
        <div className="flex mb-4 text-center items-center">
          <a className="flex-grow text-center text-[#44B0B7] border-b-2 border-gray-300 py-2 text-lg font-medium px-1">Name</a>
          <a className="flex-grow text-center text-[#44B0B7] border-b-2 border-gray-300 py-2 text-lg font-medium px-1">Email</a>
          <a className="flex-grow text-right text-[#44B0B7] border-b-2 border-gray-300 py-2 text-lg font-medium px-1">Phone No</a>
          <a className="flex-grow text-center text-[#44B0B7] border-b-2 border-gray-300 py-2 text-lg font-medium px-1">Street Address</a>
        </div>

        <div className='mb-10'>

            <div className="flex items-center w-full border-b-2 border-gray-200 py-2">
                <div className="w-1/3 text-center font-medium text-gray-900">{order.cardHolder}</div>  
                <div className="w-1/3 text-center font-medium text-gray-900">{order.email}</div>
                <div className="w-1/3 text-center font-medium text-gray-900">{order.phoneno}</div>
                <div className="w-1/3 text-center font-medium text-gray-900">{order.streetAddress}</div>
            </div>
          
        </div>


        <h1 className="text-gray-900 text-2xl title-font font-medium">Product Details:</h1>
        <div className="flex mb-4">
          <a className="flex-grow text-center text-[#44B0B7] border-b-2 border-gray-300 py-2 text-lg font-medium px-1">Products</a>
          <a className="flex-grow text-center text-[#44B0B7] border-b-2 border-gray-300 py-2 text-lg font-medium px-1">Quantity</a>
          <a className="flex-grow text-center text-[#44B0B7] border-b-2 border-gray-300 py-2 text-lg font-medium px-1">Item Total</a>
        </div>


        <div className='mb-10'>

        {order && Object.keys(order && order.products).map((item)=>{
          return <div key={item} className="flex w-full border-b-2 border-gray-200 py-2">
            <div className="w-1/3 text-center font-medium text-gray-900">{order.products[item].name} ( {order.products[item].size}/{order.products[item].variant} )</div>  
            <div className="w-1/3 text-center font-medium text-gray-900">{order.products[item].qty}</div>
            <div className="w-1/3 text-center font-medium text-gray-900">€{order.products[item].price}</div>
          </div>})} 
          
        </div>
        
        <div className="flex pt-5">
          <span className="title-font font-medium text-2xl text-[#44B0B7]">Total Amount: €{order && order.amount}</span>
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