import {React, useEffect} from 'react'
import Head from 'next/head';
import Order from '../../models/Order';
import mongoose from 'mongoose'
import { useRouter } from 'next/router';
import moment from 'moment/moment';
import Link from 'next/link';


function MyOrder ({ order, clearCart, user }) {

  const router = useRouter()

  useEffect(() => {

   if(router.query.clearCart == 1){
     clearCart();
   }
  }, [])


  return (
  <>

    <Head>
      <title>Order</title>
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>

    <section className="bg-[#f7f7f7] text-gray-600 body-font overflow-hidden">
      <div className="container min-h-screen px-5 py-24 mx-auto">

        { !order && <div>
          <h1 className='text-indigo-600 text-center font-semibold text-2xl'>No such order found!</h1>
        </div>}

        { order &&  

        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">

            {/* Order id */}
            <h2 className="text-sm title-font text-gray-500 tracking-widest">Art Shark</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id: #{order.orderId}</h1>

            {/* Date */}
            <p className="text-sm leading-relaxed mb-4">
              Order received on
              <span className='ml-1 font-semibold text-[#44B0B7]'>{moment(order.createdAt).utc().format("dddd, MMMM Do YYYY, h:mm:ss a")}</span> 
            </p>

            {/* Product table */}
            <div className="flex mb-4">
              <a className="flex-grow text-center border-b-2 border-gray-300 py-2 text-lg font-medium px-1">Products</a>
              <a className="flex-grow text-center border-b-2 border-gray-300 py-2 text-lg font-medium px-1">Quantity</a>
              <a className="flex-grow text-center border-b-2 border-gray-300 py-2 text-lg font-medium px-1">Item Total</a>
            </div>

            <div className='mb-6'>
              {order.products && order.products.map((item,index)=>{
                return <div key={index} className="flex w-full border-b-2 border-gray-200 py-2">
                  <div className="w-1/3 text-center font-medium text-gray-500">{item.description} 
                    {item.size || item.color && <span>( {item.size}/{item.color} )</span> }
                  </div>  
                  <div className="w-1/3 text-center font-medium text-gray-900">{item.quantity}</div>
                  <div className="w-1/3 text-center font-medium text-gray-900">€{item.amount_subtotal / 100}</div>
                </div>})}    
            </div>
        
            <div className="flex">
              <span className="title-font font-medium text-2xl">Total Amount: €{order.amount}</span>
            </div>
            
            {/* Address */}
            <div className='mt-6 mb-6 '>
              <h1 className='title-font font-medium text-lg  mb-2'>Shipping address:</h1>

              <p className='ml-8'>{order.streetAddress}</p>
              <p className='ml-8'>{order.zip} {order.city}</p>

            </div>
            
            {/* Payment info */}
            {user.email === process.env.NEXT_PUBLIC_WEBSITE_EMAIL && <div>
            <h1 className="text-gray-900 text-sm title-font my-1">Payment Id: 
              <span className='ml-1 font-semibold'>#{order.paymentId}</span> 
            </h1>
            <h1 className="text-gray-900 text-sm title-font my-1">Payment info on Stripe:  
              <Link href={`${process.env.STRIPE_PAYMENT_URL}/${order.paymentId}`} className='font-semibold text-[#44B0B7]'> Click Here!</Link>
            </h1>
            </div>}

          </div>

          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://media.istockphoto.com/id/1340117122/photo/cube-with-shopping-trolley-symbol-on-the-laptop-keyboard.jpg?b=1&s=170667a&w=0&k=20&c=PU8iTTvTj6TV6_Quy9Z7KQJoOgY-rp_rqI9FbFNFYEw="/>
          {/*<img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://cdn.discordapp.com/attachments/1105607692929749026/1120775848304312371/ArtShark_cute_baby_sharks_delivering_a_parcel_cartoon_style_8cc3d73c-7b39-424a-a2f1-ad46496c0afc.png"/>*/}

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