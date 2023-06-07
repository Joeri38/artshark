import {React, useEffect} from 'react'
import Head from 'next/head';
import Order from '../../models/Order';
import mongoose from 'mongoose'
import { useRouter } from 'next/router';


function MyOrder ({ order, clearCart, user }) {

  const router = useRouter();


  useEffect(() => {

   if(router.query.clearCart == 1){
     clearCart();
   }
  }, [])


  return (
    <>
    <Head>
      <title>Order_Art Shark</title>
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
   </Head>
    <section className="bg-[#f7f7f7] text-gray-600 body-font overflow-hidden">
  <div className="container min-h-screen px-5 py-24 mx-auto">

    { order == null || user.email != order.email && <div>
      <h1 className='text-indigo-600 text-center font-semibold text-2xl'>No such order found!</h1>
    </div>}

    { order != null && user.email === order.email &&  <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">Art Shark</h2>

      
        <h1 className="text-gray-900 text-3xl title-font font-medium">Order Id: #{order && order.orderId}</h1>
        <p className="text-sm leading-relaxed mb-4">Order has been placed!</p>
        <div className="flex mb-4">
          <a className="flex-grow text-center text-[#44B0B7] border-b-2 border-gray-300 py-2 text-lg font-medium px-1">Products</a>
          <a className="flex-grow text-center text-[#44B0B7] border-b-2 border-gray-300 py-2 text-lg font-medium px-1">Quantity</a>
          <a className="flex-grow text-center text-[#44B0B7] border-b-2 border-gray-300 py-2 text-lg font-medium px-1">Item Total</a>
        </div>


        <div className='mb-10'>

        {order && Object.keys(order && order.products).map((item)=>{
          return <div key={item} className="flex w-full border-b-2 border-gray-200 py-2">
            <div className="w-1/3 text-center font-medium text-gray-500">{order.products[item].name} ( {order.products[item].size}/{order.products[item].variant} )</div>  
            <div className="w-1/3 text-center font-medium text-gray-900">{order.products[item].qty}</div>
            <div className="w-1/3 text-center font-medium text-gray-900">€{order.products[item].price}</div>
          </div>})} 
          
        </div>
        
        <div className="flex">
          <span className="title-font font-medium text-2xl text-[#44B0B7]">Total Amount: €{order && order.amount}</span>
          <button className="flex ml-auto items-center bg-[#29D0d1] hover:bg-[#44B0B7] text-white rounded-xl font-semibold border-0 py-2 px-5 focus:outline-none text-base mt-4 md:mt-0">Track Order</button>
        </div>
      </div>
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://media.istockphoto.com/id/1340117122/photo/cube-with-shopping-trolley-symbol-on-the-laptop-keyboard.jpg?b=1&s=170667a&w=0&k=20&c=PU8iTTvTj6TV6_Quy9Z7KQJoOgY-rp_rqI9FbFNFYEw="/>
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