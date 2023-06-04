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



  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')


  const handleChange = (e) => {
    if (e.target.name === 'firstname') {
      setFirstname(e.target.value)
    }
    else if (e.target.name === 'lastname') {
      setLastname(e.target.value)
    }
    else if (e.target.name === 'email') {
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
    const data = { firstname, lastname, email, password, confirmpassword };
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
          setTimeout(() => {
            router.push(`/login`);
          }, 1500);
        }
        else{
          toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
          setTimeout(() => {
            router.push(`/login`);
          }, 1500);
        }

        setFirstname('')
        setLastname('')
        setEmail('')
        setPassword('')
        setConfirmpassword('')

    }
  }



  return (

    <>
    <Head>
        <title>SignUp_Hunting_Store</title>
        <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>
    {/* React tostify */}
    <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>


    <section class="bg-[#f7f7f7] py-[47px]">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img class="w-40 h-16 mr-2" src="./logo.png" alt="logo"/>
      </a>
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Create an account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                      <input type="email" name="email" id="email" class="bg-[#f7f7f7] border border-[#245c70] focus:ring-[#245c70] focus:border-[#245c70] text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-[#f7f7f7] border border-[#245c70] focus:ring-[#245c70] focus:border-[#245c70] text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 " required=""/>
                  </div>
                  <div>
                      <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                      <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-[#f7f7f7] border border-[#245c70] focus:ring-[#245c70] focus:border-[#245c70] text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" required=""/>
                  </div>
                  <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-[#f7f7f7] focus:ring-3 focus:ring-primary-300" required=""/>
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 ">I accept the <a class="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" class="w-full text-white bg-[#29D0d1] hover:bg-[#44B0B7] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                  <p class="text-sm font-light text-gray-500">
                      Already have an account? <a href="#" class="font-medium text-[#29D0d1] hover:underline">Login</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>


    {/* <form action="POST" onSubmit={submit}>
  
      <div className="bg-grey-lighter min-h-screen flex flex-col py-12">
        <div className="container min-h-screen max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <input type="text" onChange={handleChange} value={firstname} className="bg-gray-100 bg-opacity-50 mb-4 w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 p-3 resize-none leading-6 transition-colors duration-200 ease-in-out" name="firstname" placeholder="First Name"//>
            <input type="text" onChange={handleChange} value={lastname} className="bg-gray-100 bg-opacity-50 mb-4 w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 p-3 resize-none leading-6 transition-colors duration-200 ease-in-out" name="lastname" placeholder="Last Name"//>
            <input type="text" onChange={handleChange} value={email} className="bg-gray-100 bg-opacity-50 mb-4 w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 p-3 resize-none leading-6 transition-colors duration-200 ease-in-out" name="email" placeholder="Email"//>
            <input type="password" onChange={handleChange} value={password} className="bg-gray-100 bg-opacity-50 mb-4 w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 p-3 resize-none leading-6 transition-colors duration-200 ease-in-out" name="password" placeholder="Password"//>
            <input type="password" onChange={handleChange} value={confirmpassword} className="bg-gray-100 bg-opacity-50 mb-1 w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 p-3 resize-none leading-6 transition-colors duration-200 ease-in-out" name="confirmpassword" placeholder="Confirm Password"//>
            <h1 id="checkPassword" className= 'text-sm text-red-600 '></h1>

            <button type="submit" className="w-full mt-4 text-center py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 focus:outline-none my-1">Create Account</button>
      
            <div className="text-center text-sm text-grey-dark mt-4">By signing up, you agree to the
              <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">Terms of Service</a>{" "}and
              <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">Privacy Policy</a>
            </div>


          </div>

          <div className="text-grey-dark mt-6">Already have an account?
            <Link className="no-underline border-b border-blue text-blue" href={'login'}>Log in</Link>.
          </div>
        </div>
      </div>
    </form> */}
    </>
  );
}

export default Signup;
