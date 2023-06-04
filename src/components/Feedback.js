import {React, useState } from 'react'

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Feedback() {

    

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')




    const handleChange = (e) => {
        if (e.target.name === 'name') {
          setName(e.target.value)
        }
        else if (e.target.name === 'email') {
          setEmail(e.target.value)
        }
        else if (e.target.name === 'message') {
          setMessage(e.target.value)
        }
      
      }
    
    
    
    
      const submit = async (e) => {
        e.preventDefault();
        
        
    
        // fetch the data from form to makes a file in local system
        const data = { name, email, message };
          let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/messages`, {
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
    
            setName('')
            setEmail('')
            setMessage('')
    
      }






  return (
    <>


    {/* React tostify */}
    <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>


    <section className="bg-[#f7f7f7] text-gray-600 body-font relative">
  <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
    <div className="lg:w-2/3 md:w-1/2 bg-[#f7f7f7] overflow-hidden p-10 flex items-end justify-start relative">
      <iframe width="100%" height="100%" className="absolute inset-0" frameBorder="0" title="map" marginHeight="0" marginWidth="0" scrolling="no" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3115.9011985920056!2d-121.34930762524391!3d38.651152061198076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809adec9872c8e4b%3A0xe05934eeb194f3b!2sAmerican%20River%20College!5e0!3m2!1sen!2s!4v1685894852335!5m2!1sen!2s" style={{filter: 'contrast(1.2)',filter: 'opacity(0.6)' }} />
      <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
        <div className="lg:w-1/2 px-6">
          <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
          <p className="mt-1 text-sm">4700 College Oak Dr, Sacramento, CA 95841, United States</p>
        </div>
        <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
            <div>
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                <a className="text-[#29D0d1] text-sm leading-relaxed">artshark@company.com</a>
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                <p className="leading-relaxed text-sm">925-791-6582</p>
            </div>  
        </div>
      </div>
    </div>

    
    <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:p-8 mt-8 md:mt-0">
      <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Feedback</h2>
      <p className="leading-relaxed text-sm text-gray-600">Please Give your Feedback!</p>
      <p className="leading-relaxed text-sm mb-5 text-gray-600">Our Team will assit you as soon as possible.</p>


      <form method='POST' onSubmit={submit}>
        <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-[#f7f7f7] rounded border border-[#245c70] focus:ring-[#245c70] focus:border-[#245c70] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        </div>
        <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-[#f7f7f7] rounded border border-[#245c70] focus:ring-[#245c70] focus:border-[#245c70] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        </div>
        <div className="relative mb-4">
            <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
            <textarea onChange={handleChange} value={message} id="message" name="message" className="w-full bg-[#f7f7f7] rounded border border-[#245c70] focus:ring-[#245c70] focus:border-[#245c70] h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
        </div>
        <button type="submit" className="w-full text-center py-3 bg-[#29D0d1] hover:bg-[#44B0B7] text-white rounded-xl font-semibold hover:bg-green-dark focus:outline-none my-1">
          <span>Submit</span>
        </button>
      </form>


    </div>
  </div>
</section>

</>
  )
}

export default Feedback