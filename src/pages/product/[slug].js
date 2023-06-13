import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import Product from '../../../models/Product';
import mongoose from "mongoose";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


// React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';



const Slug = ({addToCart , product}) => {
  const router = useRouter()
  const { slug } = router.query

  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  const [whatDoYouWant, setWhatDoYouWant] = useState('')

  let colorArray = ["White", "Black", "Blue", "Red", "Green", "Yellow", "Orange"];
  let sizeArray = ["XS", "S", "M", "L", "XL", "XXL"];


  // React tostify
  const addcart = () => toast.success("Item is added in your Cart.!");


  return <>
    <Head>
      <title>ProductDetails_Art Shark</title>
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
   </Head>

    <section className="text-gray-600 bg-white min-h-screen body-font overflow-hidden">
      <div className="container px-5 py-10 mx-auto">
        <div className="lg:w-4/5 mx-auto justify-center flex flex-wrap">

          <div className='lg:w-2/5 mr-auto'>
            <Carousel
                infiniteLoop={true}
                showIndicators={false}
                showStatus={false}
                thumbWidth={60}
                className="productCarousel"
            >
              {product.img1 && <img src={product.img1} className='h-[400px]' />}
              {product.img2 && <img src={product.img2} className='h-[400px]' />}
              {product.img3 && <img src={product.img3} className='h-[400px]' />}
            </Carousel>
          </div>

          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">Art Shark</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>
            <div className="flex">
              <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>

            <div className='py-3'>
              <FormControl variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Color</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={color}
                  label="Color"
                  onChange={(e)=>setColor(e.target.value)}
                >
                  <MenuItem>Select Color</MenuItem>
                  {colorArray.map((item,index)=>{
                    return <MenuItem key={index} value={item}>{item}</MenuItem>
                  })}
                </Select>
              </FormControl>
              
              <FormControl className='mb-4' variant="standard" sx={{ mx: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Size</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={size}
                  label="Size"
                  onChange={(e)=>setSize(e.target.value)}
                >
                  <MenuItem>Select Size</MenuItem>
                  {sizeArray.map((item, index)=>{
                    return <MenuItem key={index} value={item}>{item}</MenuItem>
                  })}
                </Select>
              </FormControl>

              <TextField value={whatDoYouWant} onChange={(e)=> setWhatDoYouWant(e.target.value)} className='' multiline fullWidth id="standard-basic" label="What do you want!" variant="standard" />
            </div>


            <p className="leading-relaxed mt-3">{product.desc}</p>
            
            <div className="flex mt-5">
              <span className="title-font font-medium text-2xl text-gray-900">€{product.price}</span>
              <button onClick={()=>{ addcart() , addToCart(slug, product.title, 1 , product.price, product.img1, size, color, whatDoYouWant )}} className="flex -mt-1 ml-auto bg-[#29D0d1] hover:bg-[#44B0B7] text-white rounded-xl font-semibold border-0 py-3 px-6 focus:outline-none text-sm md:text-base">Add to Cart</button>
              <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
            
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}





export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState){
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI)
  }

    let product = await Product.findOne({stripePriceId: context.query.slug})
    

  // Pass data to the page via props
  return {
      props: { product: JSON.parse(JSON.stringify(product)) } 
    }

  }

export default Slug
