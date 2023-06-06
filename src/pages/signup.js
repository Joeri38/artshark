import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";


import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Signup() {

  const router = useRouter();

  useEffect(() => {
    
  }, [])


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')


  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
    else if (e.target.name === 'confirmpassword') {
      setConfirmpassword(e.target.value)
    }
  }




  const submit = async (e) => {
    e.preventDefault()
    

    // fetch the data from form to makes a file in local system
    const data = { email, password, confirmpassword };
    if( password !== confirmpassword ){
      document.getElementById('checkPassword').innerHTML = "Your Password is not Match!"
    }
    else{
      document.getElementById('checkPassword').innerHTML = ""
      let res = await fetch(`/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      let response = await res.json();
        if (response.success === true) {
          toast.success(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        }
        else{
          toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        }
        setEmail('')
        setPassword('')
        setConfirmpassword('')
    }
  }



  return (

    <>
    <Head>
        <title>SignUp_Art Shark</title>
        <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>
    {/* React tostify */}
    <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>


    <section className="bg-[#f7f7f7] py-[47px]">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-40 h-16 mr-2" src="./logo.png" alt="logo"/>
      </a>
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" method="POST" onSubmit={submit}>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                      <input onChange={handleChange} value={email} type="email" name="email" id="email" className="bg-[#f7f7f7] border border-[#245c70] focus:ring-[#245c70] focus:border-[#245c70] text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                      <input onChange={handleChange} value={password} type="password" name="password" id="password" placeholder="••••••••" className="bg-[#f7f7f7] border border-[#245c70] focus:ring-[#245c70] focus:border-[#245c70] text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 " required=""/>
                  </div>
                  <div>
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                      <input onChange={handleChange} value={confirmpassword} type="password" name="confirmpassword" id="confirmpassword" placeholder="••••••••" className="bg-[#f7f7f7] border border-[#245c70] focus:ring-[#245c70] focus:border-[#245c70] text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" required=""/>
                      <h1 id="checkPassword" className= 'text-sm text-red-600 '></h1>
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-[#f7f7f7] focus:ring-3 focus:ring-primary-300" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 ">I accept the <Link className="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</Link></label>
                      </div>
                  </div>
                  <button type="submit" className="w-full text-white bg-[#29D0d1] hover:bg-[#44B0B7] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                  <p className="text-sm font-light text-gray-500">
                      Already have an account? <Link href={'/login'} className="font-medium text-[#44B0B7] hover:underline">Login</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </>
  );
}

export default Signup;
