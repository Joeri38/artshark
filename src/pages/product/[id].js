import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router'
import Product from '../../../models/Product';
import mongoose from "mongoose";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const Item = ({addToCart, product}) => {
  const router = useRouter()

  //const [color, setColor] = useState()
  const [size, setSize] = useState()
  const [sex, setSex] = useState()

  //let colorArray = ["White", "Black"];
  let sizeArray = ["S", "M", "L", "XL", "XXL"];
  let sexArray = ["men", "women"];

  // Get the collection file name
  //const idx = product.collection;
  const idx = product.series;
  let fileName;
  if(idx == -1){
    //fileName = '/images/user-created/' + product.img;
    fileName = product.img;
  } else {
    const collection_files = ['recently-added/', 'red-japan/', 'celebrities/', 'hockney/', 'ukiyo-e/'];
    fileName = '/images/collections/' + collection_files[idx] + product.img;
  }
  
  const sizeSquare = [true, true, false, false, false]
  
  function buttonClicked() {
    
    // Check if color and size are selected
    if (!size){
      toast.error('Choose size!')
    }
    else if (!sex){
      toast.error('Choose sex!')
    }
    /*else if (!color){
      toast.error('Choose color!')
    }*/
    else  {
      let color = undefined;
      addToCart(product._id, size, color, sex, product.title, product.series, 
                product.price, product.stripePriceId, product.img, 1);
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

          {/* Product image */}
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
              {/* Image doesn't work with the carousel */}
              <img src={fileName.replace('#', '%23')} /> 
              {sizeSquare ? <img src='/images/product-tshirt.png' /> 
                          : <img src='/images/product-tshirt-rect.png' /> }
              {/*<img src='/images/product-tshirt-rect.png' /> */}
              {/* className='h-[600px]'*/}
              {/*<Image src='/images/pigeon_rock_band.png' className='h-[400px]' />*/}
            </Carousel>
          </div>

          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">Art Shark</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.desc}</h1>

            {/* Size and sex */}
            <div className='py-3'>
              
              {/* Select size */}
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
              
              {/* Select sex */}
              <FormControl className='mb-4 ml-8' variant="standard" sx={{ mx: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sex}
                  label="Sex"
                  onChange={(e)=>setSex(e.target.value)}
                >
                  <MenuItem>Select Sex</MenuItem>
                  {sexArray.map((item, index)=>{
                    return <MenuItem key={index} value={item}>{item}</MenuItem>
                  })}
                </Select>
              </FormControl>

            </div>
            
            {/* Price and add to cart */}
            <div className="flex mt-5">
              <span className="title-font font-medium text-2xl text-gray-900">€35</span>
              <button onClick={buttonClicked} className="flex -mt-1 ml-auto bg-[#29D0d1] hover:bg-[#44B0B7] text-white rounded-xl font-semibold border-0 py-3 px-6 focus:outline-none text-sm md:text-base">Add to Cart</button>
              <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
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
