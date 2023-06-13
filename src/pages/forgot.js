import { React, useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import mongoose from 'mongoose'
import Forgot from '../../models/Forgot'


import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



function ForgotPage({dbuser}) {

  const router = useRouter()
  const { token } = router.query
  const [email, setEmail] = useState('')
  const [npassword, setNpassword] = useState('')
  const [cnpassword, setCnpassword] = useState('')



  const handleChange = (e) => {
    if ( e.target.name === 'email') {
      setEmail(e.target.value)
    }
    else if ( e.target.name === 'npassword') {
      setNpassword(e.target.value)
    }
    else if ( e.target.name === 'cnpassword') {
      setCnpassword(e.target.value)
    }
  }
    
    
    
  const sendEmailDetails = async (e) => {
    e.preventDefault()
  
    // fetch the data from form to makes a file in local system
    const data = { email };
      let res = await fetch(`/api/sendemail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
      setEmail('')
  
    if (response.success === true) {
      toast.success(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    }
    else {
      toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    }
  }


  const setPassword = async (e) => {
    e.preventDefault()

    if( npassword !== cnpassword ){
      document.getElementById('checkPassword').innerHTML = "Your Password is not Match!"
    }
    else{
      document.getElementById('checkPassword').innerHTML = ""
      // fetch the data from form to makes a file in local system
      const data = { npassword, cnpassword , token };
        let res = await fetch(`/api/setpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      let response = await res.json()    

      if (response.success === true) {
        toast.success("Your Password has been changes successfully" , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
      }

      else {
        toast.error("Internal Server Error" , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
      }
    }
  }
    
    
  return (
    <>
    <Head>
      <title>Reset_Art Shark</title>
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
   </Head>
   {/* React tostify */}
   <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>

    <section className="bg-[#f7f7f7]">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <img className="w-40 h-16 mr-2" src="./logo.png" alt="logo"/>
      <div className="w-full bg-white rounded-lg shadow md:mt-5 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Forgot Password
            </h1>

              {dbuser === null  &&  <div>
              <form className="space-y-4 md:space-y-6" method='POST' onSubmit={sendEmailDetails}>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input onChange={handleChange} value={email} type="email" name="email" id="email" className="bg-[#f7f7f7] border border-[#245c70] focus:ring-[#245c70] focus:border-[#245c70] text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="name@company.com" required=""/>

                <div className="flex my-4 items-center justify-between">
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-gray-500">Remember me</label>
                      </div>
                  </div>
              </div>

                <button type="submit" className="w-full text-white bg-[#29D0d1] hover:bg-[#44B0B7] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
              </form>

              </div>}

              {dbuser && <div>
                <form  className="space-y-4 md:space-y-6" method='POST' onSubmit={setPassword}>
                  <div>
                    <label htmlFor="npassword" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                    <input onChange={handleChange} value={npassword} type="password" name="npassword" id="npassword" placeholder="••••••••" className="bg-[#f7f7f7] border border-[#245c70] focus:ring-[#245c70] focus:border-[#245c70] text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 " required=""/>
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                    <input onChange={handleChange} value={cnpassword} type="password" name="cnpassword" id="cnpassword" placeholder="••••••••" className="bg-[#f7f7f7] border border-[#245c70] focus:ring-[#245c70] focus:border-[#245c70] text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" required=""/>
                  </div>
                  <h1 id="checkPassword" className= 'text-sm text-red-600 mb-5'></h1>

                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-gray-500">Remember me</label>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="w-full text-white bg-[#29D0d1] hover:bg-[#44B0B7] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
                </form>
              </div>}

              <p className="text-sm font-light text-gray-500 ">
                Don’t have an account yet? <Link href={'signup'} className="font-medium text-[#44B0B7] hover:underline">Sign up</Link>
              </p>
          </div>
      </div>
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

    let dbuser = await Forgot.findOne({token: context.query.token})


  return {
    props: { dbuser: JSON.parse(JSON.stringify(dbuser)) } 
   }

}

export default ForgotPage