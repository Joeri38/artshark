import { Fragment, useState } from 'react'
import Link from 'next/link'
import { Dialog, Popover, Tab, Transition, Menu } from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { BiUserCircle } from 'react-icons/bi';


const products = {
  pages: [
    { name: 'Home', href: '/' },
    { name: 'Create', href: '/create' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Prompt Guide', href: '/promptGuide' },
    { name: 'About', href: '/about' },
  ],
}


export default function Example({logout , user, cart, subTotal, deleteItemFromCart }) {

  const [open, setOpen] = useState(false)
  const [OpenCart, setOpenCart] = useState(false)


  return (
    <div className="bg-white">

      
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
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
                  {products.pages.map((page) => (
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
      </Transition.Root>





      <header className="relative bg-white">

        {/* Laptop View */}
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button type="button" className="rounded-md bg-white p-2 text-gray-400 lg:hidden" onClick={() => setOpen(true)}>
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                {/* <span className="text-black font-bold">Art Shark</span> */}
                <img className='h-8' src="/logo.png" alt="" />
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">

                  {products.pages.map((page) => (
                    <Link key={page.name} href={page.href} className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">{page.name}</Link>
                  ))}

                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">

                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link href={'/login'} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Sign in
                  </Link>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <Link href={'/signup'} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Create account
                  </Link>
                </div>
                        
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex mt-2">
                      <BiUserCircle className='text-xl md:text-2xl cursor-pointer hover:text-gray-700' aria-hidden="true"/>
                    </Menu.Button>
                  </div>
                </Menu>



              
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <ShoppingBagIcon onClick={() => setOpenCart(true)} className="h-5 md:h-6 cursor-pointer items-center flex-shrink-0 text-black group-hover:text-gray-700" aria-hidden="true"/>
                </div>


                <div>
                  <Transition.Root show={OpenCart} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={setOpenCart}>
                      <Transition.Child as={Fragment} enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                      </Transition.Child>
                    <div className="fixed inset-0 overflow-hidden">
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                          <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-500 sm:duration-700" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                            <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                  <div className="flex items-start justify-between">
                                    <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                    <div className="ml-3 flex h-7 items-center">
                                      <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={() => setOpenCart(false)}>
                                        <span className="sr-only">Close panel</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                      </button>
                                    </div>
                                  </div>
                                  <div className="mt-8">
                                    <div className="flow-root">
                                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                                      {cart && Object.keys(cart).length == 0 && <div className='text-center mt-10 text-lg'>Your Cart is Empty!</div> }
                                      {cart && Object.keys(cart).map((item)=>{
                                          return <li key={item} className="flex py-6">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                              <img src={cart[item].img} alt="cart-image" className="h-full w-full object-cover object-center"/>
                                            </div>
                                            <div className="ml-4 flex flex-1 flex-col">
                                              <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                  <h3 className="w-10/12">
                                                    <Link href={`/product/${cart[item].slug}`}>{cart[item].name}</Link>
                                                  </h3>
                                                  <p className="ml-4">${cart[item].price}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">{cart[item].color}</p>
                                              </div>
                                              <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-gray-500">Qty: {cart[item].qty}</p>
                                                <div className="flex">
                                                  <button onClick={()=>{deleteItemFromCart(item,cart[item].name,1,cart[item].price,cart[item].size,cart[item].variant)}} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                        })}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>${subTotal}</p>
                                  </div>
                                  <p className="mt-0.5 text-sm text-gray-500">
                                    Shipping and taxes calculated at checkout.
                                  </p>
                                  <div className="mt-6">
                                    <Link href="/checkout" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</Link>
                                  </div>
                                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>or
                                      <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => setOpenCart(false)}>Continue Shopping
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
