import { useState } from 'react';
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
import buttonOutlined from '@material-tailwind/react/theme/components/button/buttonOutlined';

const Item = ({addToCart , product}) => {
  const router = useRouter()

  const [color, setColor] = useState()
  const [size, setSize] = useState()

  let colorArray = ["White", "Black"];
  let sizeArray = ["XS", "S", "M", "L", "XL", "XXL"];

  function buttonClicked() {
    
    // Check if color and size are selected
    if (!color){
      toast.error('Choose color!')
    }
    else if (!size){
      toast.error('Choose size!')
    }
    else  {
      addToCart(product._id, size, color, product.title, product.stripePriceId, product.img, 1);
      toast.success("Item is added in your Cart!");
    }
    
  }

  return <>
    <Head>
      <title>Art Shark</title>
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
   </Head>

    <section className="text-gray-600 bg-white min-h-screen body-font overflow-hidden">
      <div className="container px-5 py-10 mx-auto">
        <div className="lg:w-4/5 mx-auto justify-center flex flex-wrap">

          <div className='lg:w-9/20'>
            <Carousel
                infiniteLoop={true}
                showIndicators={false}
                showStatus={false}
                thumbWidth={60}
                dynamicHeight={true}
                height={200}
                className="productCarousel"
            >
              <img src={product.img} className='h-[400px]' /> 
              <img src='/images/pigeon_rock_band.png' className='h-[400px]' />
              <img src='/images/pigeon_rock_band.png' className='h-[400px]' />
            </Carousel>
          </div>

          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">Art Shark</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.desc}</h1>

            <div className='py-3'>
              <FormControl variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Color</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={color}
                  label="Color"
                  onChange={(e)=>{setColor(e.target.value)}}
                >
                  <MenuItem>Select Color</MenuItem>
                  {colorArray.map((item,index)=>{
                    return <MenuItem key={index} value={item}>{item}</MenuItem>
                  })}
                </Select>
              </FormControl>
              
              <FormControl className='mb-4 ml-8' variant="standard" sx={{ mx: 1, minWidth: 120 }}>
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

            </div>


            {/*<p className="leading-relaxed mt-3">{product.desc}</p>*/}
            
            <div className="flex mt-5">
              <span className="title-font font-medium text-2xl text-gray-900">€40</span>
              <button onClick={buttonClicked} className="flex -mt-1 ml-auto bg-[#29D0d1] hover:bg-[#44B0B7] text-white rounded-xl font-semibold border-0 py-3 px-6 focus:outline-none text-sm md:text-base">Add to Cart</button>
              <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
            
              {/*<button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
                </button>*/}
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}




export async function getServerSideProps(context) {

  // Connect if needed
  if (!mongoose.connections[0].readyState){
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI)
  }

  // Retrieve Product from mongoDB
  let product = await Product.findOne({_id: context.query.id})
    
  // Pass data to the page via props
  return {
      props: { product: JSON.parse(JSON.stringify(product)) } 
    }

  }

export default Item
