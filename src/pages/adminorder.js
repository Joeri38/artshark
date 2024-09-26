import {React, useEffect} from 'react'
import Head from 'next/head';
import Order from '../../models/Order';
import mongoose from 'mongoose'
import { useRouter } from 'next/router';
import moment from 'moment/moment';
import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DeliveryStatus(order) {

  const [deliveryStatus, setDeliveryStatus] = useState(order.order.deliveryStatus);

  function updateStatus(event){
    setDeliveryStatus(event.target.value);
  };

  // Change status in mongoDB
  async function saveStatus(){

    const response = await fetch('/api/update-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: order.order._id,
        deliveryStatus: deliveryStatus
      }),
    });

    // Show toast message
    const data = await response.json();
    toast.success(data.message);
  }

  return <div class="order-status">
    <label className="title-font font-medium text-xl text-[#44B0B7] mr-2" for="delivery-status">Delivery status:</label>
    <select id="delivery-status" name="delivery-status" value={deliveryStatus} onChange={updateStatus}>
        <option value="order received">Order received</option>
        <option value="shipping">Shipping</option>
        <option value="delivered">Delivered</option>
        <option value="problem">Problem</option>
    </select>
    <button className="bg-[#44B0B7] text-white active:bg-[#44B0B7] font-bold uppercase text-sm ml-6 px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none" 
            type="button" style={{ transition: "all .15s ease" }} onClick={saveStatus}>Save</button>
    <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
  </div>
}


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
      <title>Admin order</title>
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>

    <section className="bg-[#f7f7f7] text-gray-600 body-font overflow-hidden">
      <div className="container min-h-screen px-5 py-6 mx-auto">

        { !order && <div>
          <h1 className='text-indigo-600 text-center font-semibold text-2xl'>No such order found!</h1>
        </div>}

        { order &&  

        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">

            {/* Back to orders */}
            <div className='py-6'>
              <button onClick={()=>router.push('/admin/allorders')} className="bg-white text-[#44B0B7] active:bg-[#44B0B7] font-bold uppercase text-sm px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none">
              &larr; All orders
              </button>
            </div>

            {/* Order id */}
            <h2 className="text-sm title-font text-gray-500 tracking-widest">Art Shark</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id: #{order.orderId}</h1>

            {/* Date */}
            <p className="text-md leading-relaxed mb-8">
              Order received on
              <span className='ml-1 font-semibold text-[#44B0B7]'>{moment(order.createdAt).utc().format("dddd, MMMM Do YYYY")}</span> 
            </p>

            {/* Product table */}
            <div className="flex mb-0">
              <a className="flex-grow w-1/2 text-center text-[#44B0B7] border-b-2 border-gray-300 py-2 text-lg font-medium px-1">Products</a>
              <a className="flex-grow w-1/4 text-center text-[#44B0B7] border-b-2 border-gray-300 py-2 text-lg font-medium px-1">Quantity</a>
              <a className="flex-grow w-1/4 text-center text-[#44B0B7] border-b-2 border-gray-300 py-2 text-lg font-medium px-1">Item Total</a>
            </div>

            <div className='mb-6'>
              {order.products && order.products.map((item,index)=>{

                {/* Get image */}
                const series_idx = item.series;
                const series_files = ['recently-added/', 'red-japan/', 'celebrities/', 'hockney/', 'ukiyo-e/'];
                let file;
                if (series_idx == -1) {
                  file = 'user-created/';
                } else {
                  file = 'collections/' + series_files[series_idx];
                }

                return <div key={index} className="flex w-full border-b-2 border-gray-200 py-2">
                  <div className="w-1/2 text-center font-medium text-gray-500 flex">
                    <div className="ml-10 h-24 w-24 overflow-hidden rounded-md border">
                      <img src={'/images/' + file + item.img} alt="product-image" className="h-full w-full object-cover object-center"/>
                    </div>
                    <div className="w-1/2">
                      <span>T-shirt {item.size} {item.sex}</span> 
                    </div>
                  </div>  
                  <div className="w-1/4 text-center font-medium text-gray-900">{item.qty}</div>
                  <div className="w-1/4 text-center font-medium text-gray-900">€{item.price}</div>
                </div>})}   

                {/* Subtotal */}
                <div className="flex w-full border-b-2 border-gray-200 py-2">
                  <div className="w-1/2 text-center font-medium text-gray-500"></div>  
                  <div className="w-1/4 text-center font-bold text-gray-900">Total:</div>  
                  <div className="w-1/4 text-center font-medium text-gray-900">€{order.amount}</div>
                </div> 

            </div>

            <div className='flex'>

              {/* Status */}
              <div className="flex mt-6 w-1/2">
                {/*<span className="title-font font-medium text-xl text-[#44B0B7]">Delivery status: {order.deliveryStatus}</span>*/}
                <DeliveryStatus order={order} />

              </div>

              {/* Contact info */}
              <div className='mt-6 mb-6 w-1/4'>
                    <h1 className='title-font font-medium text-lg mb-2'>Contact:</h1>

                    <p className='ml-8'>{order.name}</p>
                    <p className='ml-8'>{order.email}</p>
                    <p className='ml-8'>+{order.phone}</p>
              </div>
            
              {/* Address */}
              <div className='mt-6 mb-6 ml-16 w-1/4'>
                    <h1 className='title-font font-medium text-lg mb-2'>Shipping:</h1>

                    <p className='ml-8'>{order.name}</p>
                    <p className='ml-8'>{order.addressLine1}</p>
                    {order.addressLine2 && <p className='ml-8'>{order.addressLine2}</p>}
                    <p className='ml-8'>{order.zip} {order.city}</p>
              </div>

            </div>         

          </div>

          {/*<img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://media.istockphoto.com/id/1340117122/photo/cube-with-shopping-trolley-symbol-on-the-laptop-keyboard.jpg?b=1&s=170667a&w=0&k=20&c=PU8iTTvTj6TV6_Quy9Z7KQJoOgY-rp_rqI9FbFNFYEw="/>*/}
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