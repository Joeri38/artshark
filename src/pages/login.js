import React from 'react'
import Head from 'next/head';
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  const router = useRouter()  

  useEffect(() => {
    
  }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const submit = async (e) => {
    e.preventDefault()

    // fetch the data from form to makes a file in local system
    const data = { email, password };

    if (!email){
      document.getElementById('checkInputEmail').innerHTML = "Email required!"
      document.getElementById('checkInputPassword').innerHTML = ""
    }

    else if (!password){
      document.getElementById('checkInputEmail').innerHTML = ""
      document.getElementById('checkInputPassword').innerHTML = "Password required!"
    }

    else{

      document.getElementById('checkInputEmail').innerHTML = ""
      document.getElementById('checkInputPassword').innerHTML = ""

      let res = await fetch(`/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      let response = await res.json()
  
      if (response.success === true) {
        toast.success(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        localStorage.setItem('myUser', JSON.stringify({token: response.token, email: response.email}))
        setTimeout(() => {
        router.push(`/`);
        }, 1500);
      }
      if (!response.success == true){
        toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
      }
      if (response.success == "none"){
        toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        setEmail('')
        setPassword('')
      }

    }

    
        
  }

  const handleChange = (e) => {

    if ( e.target.name === 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  return (
   <> 
   <Head>
      <title>Login</title>
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
   </Head>
  {/* React tostify */}
  <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable theme="light"/>

  <section className="bg-[#f7f7f7]">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <img className="w-40 h-16 mr-2" src="./logo.png" alt="logo"/>
      <div className="w-full bg-white rounded-lg shadow md:mt-5 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Log in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" method='POST' onSubmit={submit}>
              <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                  <input onChange={handleChange} value={email} type="email" name="email" id="email" className="bg-[#f7f7f7] border border-[#245c70] focus:ring-[#245c70] focus:border-[#245c70] text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="name@company.com" required=""/>
                  <h1 id="checkInputEmail" className= 'text-sm text-red-600 '></h1>
              </div>
              <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                  <input onChange={handleChange} value={password} type="password" name="password" id="password" placeholder="••••••••" className="bg-[#f7f7f7] border border-[#245c70] focus:ring-[#245c70] focus:border-[#245c70] text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 " required=""/>
                  <h1 id="checkInputPassword" className= 'text-sm text-red-600 '></h1>
              </div>
              <div className="flex items-center justify-between">
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-gray-500">Remember me</label>
                      </div>
                  </div>
                  <Link href={'forgot'} className="text-sm font-medium text-[#44B0B7] hover:underline">Forgot password?</Link>
              </div>
              <button type="submit" className="w-full text-white bg-[#29D0d1] hover:bg-[#44B0B7] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log in</button>
              <p className="text-sm font-light text-gray-500 ">
                  Don’t have an account yet? <Link href={'signup'} className="font-medium text-[#44B0B7] hover:underline">Sign up</Link>
              </p>
            </form>
          </div>
      </div>
    </div>
  </section>
    </>
  )
}

export default Login