import React from 'react'

function Testimonials() {
  return (
<div className="bg-[#f7f7f7] container mx-auto md:px-6">
  <section className="text-center lg:text-left">
    <div className="py-12 md:px-6">
      <div className="container mx-auto xl:px-32">
        <div className="grid items-center lg:grid-cols-2">
          <div className="mb-12 md:mt-12 lg:mt-0 lg:mb-0">
            <div
              className="relative z-[1] block rounded-lg bg-[#29D0d1] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[25px] dark:bg-[#125c79] dark:shadow-black/20 md:px-12 lg:-mr-14">
              <h2 className="mb-2 text-3xl font-bold text-primary dark:text-primary-400">
                Anna Doe
              </h2>
              <p className="mb-4 font-semibold text-slate-100">Graphic designer</p>
              <p className="mb-3 text-slate-200 dark:text-slate-200">
                I recently stumbled upon an incredible AI image generator tool on a website, and I must say, it has revolutionized the way I approach creative projects! From the moment I started using it, I was blown away by its capabilities and the stunning results it produced.
              </p>
              <p className="mb-6 text-slate-200 dark:text-slate-200">
                The AI-powered image generator is nothing short of impressive. It utilizes advanced algorithms to generate realistic and visually striking images based on user inputs. Whether I needed breathtaking landscapes, unique characters, or abstract designs, this tool consistently delivered exceptional results. The variety and quality of the generated images were truly outstanding, surpassing my expectations.
              </p>
              
              <ul className="flex justify-center lg:justify-start">
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"
                    className="w-5 text-primary dark:text-yellow-400">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"
                    className="w-5 text-primary dark:text-yellow-400">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"
                    className="w-5 text-primary dark:text-yellow-400">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"
                    className="w-5 text-primary dark:text-yellow-400">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"
                    className="w-5 text-primary dark:text-primary-400">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:mb-12 lg:mb-0">
            <img src="https://images.unsplash.com/photo-1503408024948-0a3e1b2b519c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGdpcmwlMjBpbiUyMGdyZWVuJTIwZHJlc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
              className="lg:rotate-[6deg] w-full rounded-lg shadow-lg dark:shadow-black/20" alt="image" />
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
  )
}

export default Testimonials