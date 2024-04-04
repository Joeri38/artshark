import React from 'react';
import { Fragment, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'
import Image from 'next/image'

import { Transition, Dialog, Popover, Menu } from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { BiUserCircle } from 'react-icons/bi';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';

// Pages in the navigation menu
const pages = [
  { name: 'Home', href: '/' },
  { name: 'Gallery', href: '/gallery' },
  //{ name: 'Create', href: '/create' },
  { name: 'Products', href: '/products' },
  { name: 'Our Story', href: '/our-story' },
  { name: 'Contact Us', href: '/contact-us' },
]

// Unclear: for the Menu, space between user account and cart
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({logout, removeFromCart, addToCart, user, cart, subTotal, deleteItemFromCart}) {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [open, setOpen] = useState(false)
  const [openCart, setOpenCart] = useState(false)

  // Submit cart for checkout, send to api/checkout_sessions
  const submit = async(e)=>{
    e.preventDefault();
    setIsLoading(true)

    // Create line items: stripe price ID and quantity
    const lineItems = cart.map((item)=>{
      return {
        //price: item.stripePriceId, 
        //price: 'price_1OnM7FBIDAiFaigFKNyOAIIH',
        price: 'price_1OnM5QBIDAiFaigFe6620jhN',
        quantity: item.qty,
      }
    })

    try {
      
      const res = await fetch(`/api/checkout_sessions`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + process.env.STRIPE_SECRET_KEY,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ lineItems }),
      });
      const response = await res.json();
      router.push(response.url);
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      console.error(error)
    }
  }

  return (
    <div className="bg-[#f7f7f7]">

      {/* Transition of headless UI (for mobile menu) */}
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child as={Fragment} enter="transition ease-in-out duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button type="button" className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400" onClick={() => setOpen(false)}>
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  {pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  <div className="flow-root">
                    <Link href={'/login'} className="-m-2 block p-2 font-medium text-gray-900">
                      Sign in
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link href={'/signup'} className="-m-2 block p-2 font-medium text-gray-900">
                      Create account
                    </Link>
                  </div>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      
      {/* Navigation menu */}
      <header className="relative bg-[#f7f7f7]">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              
              {/* Button to open navbar (mobile) */}
              <button type="button" className="rounded-md bg-white p-2 text-gray-400 lg:hidden" onClick={() => setOpen(true)}>
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Artshark logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Image className="h-10" src="/logo.png" alt="" width={130} height={300} />
                </Link>
              </div>

              {/* Page navigation */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">

                  {pages.map((page) => (
                    <Link key={page.name} href={page.href} className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">{page.name}</Link>
                  ))}

                </div>
              </Popover.Group>
              
              {/* User account and cart */}
              <div className="ml-auto flex items-center">
                
                {/* User account */}
                {!user.value && <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link href={'/login'} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Log in
                  </Link>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <Link href={'/signup'} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Create account
                  </Link>
                </div>}
                
                {/* User icon and flyout menu */}
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex mt-2">
                      {user.value && <BiUserCircle className='text-xl text-black md:text-2xl cursor-pointer' aria-hidden="true"/>}
                    </Menu.Button>
                  </div>

                  <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className="absolute right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {user.email === process.env.NEXT_PUBLIC_WEBSITE_EMAIL && <Menu.Item>
                          {({ active }) => ( <Link href={'/admin/allproducts'} className={classNames( active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm' )}>Admin Account</Link>)}
                        </Menu.Item>}
                        <Menu.Item>
                          {({ active }) => ( <Link href={'/myaccount'} className={classNames( active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm' )}>Account settings</Link>)}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (<Link href={'/orders'} className={classNames( active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>My orders</Link>)}
                        </Menu.Item>
                        <div>
                          <Menu.Item> 
                            {({ active }) => (<button onClick={logout}  className={classNames( active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm')}>Log Out</button>)}
                          </Menu.Item>
                        </div>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* Cart button */}
                <div className="ml-4 flow-root lg:ml-6">
                  <ShoppingBagIcon onClick={() => setOpenCart(true)} className="h-5 md:h-6 cursor-pointer items-center flex-shrink-0 text-black group-hover:text-gray-700" aria-hidden="true"/>
                </div>

                {/* Cart with transition*/}            
                <div>
                  <Transition.Root show={openCart} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={setOpenCart}>
                      <Transition.Child as={Fragment} enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                      </Transition.Child>
                    <div className="fixed inset-0 overflow-hidden">
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                          <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-500 sm:duration-700" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                            
                          {/* Cart */}      
                          <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                              
                              {/* Title and cart items */}
                              <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                
                                {/* Title and close button */}
                                <div className="flex items-start justify-between">
                                  <Dialog.Title className="text-lg font-semibold text-black">Shopping cart</Dialog.Title>
                                  <div className="ml-3 flex h-7 items-center">
                                    <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={() => setOpenCart(false)}>
                                      <span className="sr-only">Close panel</span>
                                      <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                    </button>
                                  </div>
                                </div>

                                {/* Cart items */}
                                <div className="mt-8">
                                  <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">

                                    {/* Empty cart */}
                                    {cart && cart.length == 0 && <div className='text-center text-gray-600 mt-10 text-md'>Your Cart is Empty!</div> }
                                    
                                    {/* Full cart */}
                                    {cart && cart.map((item, index)=>{

                                        {/* Collection file name for images */}
                                        const collection_idx = item.collection;
                                        const collection_files = ['recently-added/', 'red-japan/', 'celebrities/', 'hockney/', 'ukiyo-e/'];
                                        const file = collection_files[collection_idx];

                                        return <li key={index} className="flex py-6">
                                          
                                          {/* Image */}
                                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img src={'/images/collections/' + file + item.img} alt="cart-image" className="h-full w-full object-cover object-center"/>
                                          </div>

                                          {/* Text */}
                                          <div className="ml-4 flex flex-1 flex-col">

                                            {/* Title and price */}
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3 className="w-10/12">
                                                  <Link href={`/product/${item.id}`}>T-shirt {item.size} {item.sex} {item.color} </Link>
                                                </h3>
                                                <p className="ml-4">€{item.price*item.qty}</p>
                                            </div>

                                            {/* Buttons to add and remove items */}
                                            <div className="flex flex-1 items-end justify-between text-sm">

                                              {/* Quantity button */}
                                              <p className="flex text-black text-sm ">Qty: 
                                                <AiFillMinusCircle onClick={()=>{removeFromCart(item.id, item.size, item.color, item.sex)}} className='my-auto ml-2 text-lg cursor-pointer'/> 
                                                <span className='mx-[9px]'>{item.qty}</span> 
                                                <AiFillPlusCircle onClick={()=>{addToCart(item.id, item.size, item.color, item.sex, item.name, item.collection, item.stripePriceId, item.img, 1)}} className='my-auto text-lg cursor-pointer'/>
                                              </p>

                                              {/* Remove button */}
                                              <div className="flex">
                                                <button onClick={()=>{deleteItemFromCart(item.id, item.size, item.color, item.sex)}} type="button" className="font-medium text-red-600 hover:text-red-500">Remove</button>
                                              </div>

                                            </div>

                                          </div>

                                        </li>
                                      })}

                                    </ul>
                                  </div>
                                </div>

                              </div>
                              
                              {/* Subtotal and checkout button */}
                              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">

                                {/* Subtotal */}
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <p>Subtotal</p>
                                  <p>€{subTotal}</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">
                                  Shipping and taxes calculated at checkout.
                                </p>   
                                
                                {/* Checkout button */}
                                <div className="mt-4">
                                  <form method="POST" onSubmit={submit}>

                                    {/* Terms and conditions */}
                                    <div className="flex items-start mb-4">
                                      <div className="flex items-center h-5">
                                        <input id="terms" required type="checkbox" aria-describedby="terms" className="w-4 h-4 border border-gray-300 rounded bg-[#f7f7f7] focus:ring-3 focus:ring-primary-300"/>
                                      </div>
                                      <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 ">I accept the <Link className="font-medium text-primary-600 hover:underline" href="/termsandconditions">Terms and Conditions</Link></label>
                                      </div>
                                    </div>
                                      
                                    {/* Button */}
                                    <div className='flex'>
                                      <button type='submit' className="flex items-center  mx-auto justify-center rounded-md border border-transparent bg-[#29D0d1] w-[20rem] sm:w-[25rem] py-3 text-base font-medium text-white shadow-sm hover:bg-[#44B0B7]"> 
                                        {isLoading && <div
                                          className="inline-block mr-3 h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                          role="status">
                                        </div>} {/* Loading icon when submitted */}
                                          Checkout
                                      </button>
                                    </div>

                                  </form>
                                </div>

                                {/* Continue shopping */}       
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                  <p>or
                                    <button type="button" className="font-medium ml-1 text-[#44B0B7]" onClick={() => setOpenCart(false)}>Continue Shopping
                                      <span aria-hidden="true"> &rarr;</span>
                                    </button>
                                  </p>
                                </div>
                              </div>

                            </div>
                          </Dialog.Panel>

                          </Transition.Child>
                        </div>
                      </div>
                    </div>
                    </Dialog>
                  </Transition.Root>
                </div>

              </div>
                   
            </div>
          </div>
        </nav>
      </header>

    </div>
  )
}