import { React, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

function MyOrders () {

  const [orders, setOrders] = useState([])
  const router = useRouter();

  useEffect(() => {

    // fetch the data from form to makes a file in local system
    const fetchOrder = async ()=>{
      let res = await fetch(`/api/myorders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myUser')).token }),
        })
        let response = await res.json()
        setOrders(response.orders)
      }

    if(!localStorage.getItem('myUser')){
      router.push('/')  
    }
    else{
      fetchOrder();
    }
      
  }, [])
  
  return (
    <>
    <Head>
      <title>Orders_Art Shark</title>
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
   </Head>
    <section className="bg-[#f7f7f7] text-gray-600 body-font">
    <div className="container min-h-screen px-5 py-16 mx-auto">
      <div className="flex flex-col text-center w-full mb-20">
        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">My Orders:</h1>
      </div>
      <div className="lg:w-2/3 w-full mx-auto overflow-auto">
        <table className="table-auto w-full text-left whitespace-no-wrap">
          <thead>
            <tr className='bg-gray-300'>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm rounded-tl rounded-bl">Order Id:</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm">Name</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm">Price</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm">Details</th>
            </tr>
          </thead>




          <tbody>

            {orders.map((item)=>{
              return <tr key={item._id}>
              <td className="px-4 py-3">#{item.orderId}</td>
              <td className="px-4 py-3">{item.cardHolder}</td>
              <td className="px-4 py-3">€{item.amount}</td>
              <td className="px-4 py-3">
                <Link href={`/order?id=${item._id}`} className='text-[#44B0B7] hover:underline cursor-pointer'>Details</Link>
              </td>
            </tr>
            })}

            {orders ? '' : <h1 className='text-[#44B0B7] text-center font-semibold text-2xl'>No such order found!</h1>}
          
          </tbody>
        </table>
      </div>
    </div>
    </section>
    </>
  )
}

export default MyOrders