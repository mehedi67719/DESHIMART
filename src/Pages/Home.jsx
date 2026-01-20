import React from 'react';
import { Link } from 'react-router';
import banner from '../assets/banner.png'

const Home = () => {
    return (

        <div>

            {/* banner */}


            <div className='relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden'>
                <img
                    src={banner}
                    className='w-full h-full object-cover'
                    alt="Fresh Deshi Products"
                />
                <div className='absolute inset-0 flex flex-col items-end justify-center px-[10%] bg-gradient-to-r from-transparent to-black/10'>
                    <div className='text-right animate-fadeIn'>
                        <button className='mt-50 mr-70 bg-green-500 text-white py-4 px-10 text-xl font-bold rounded-full shadow-xl hover:bg-gray-900 transition-all duration-300 transform hover:-translate-y-1 active:scale-95'>
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>





            <div className='my-10 lg:max-w-[70%] mx-auto md:max-w-[95%] max-w-[98%]  px-4'>
                <h2 className='text-6xl font-bold text-black text-center mt-20'>Featured Products</h2>
                <p className='text-gray-700 text-center mt-5'>Discover our carefully curated selection of premium products</p>

                {/* electronics */}
                <div className='mt-20 border border-gray-200 p-4 shadow-xl rounded-2xl'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <h2 className='text-3xl font-bold'>Vegetables</h2>
                            <div className='bg-red-100 p-1 rounded-2xl'>
                                <p className='text-green-500 font-bold'>10 products</p>
                            </div>
                        </div>
                        <Link className='text-green-500 font-bold'> View More ➡️</Link>
                    </div>


                    <hr className='text-gray-200 mt-2' />

                    <div className='mt-10 grid grid-cols-4 gap-5'>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>



                    </div>

                </div>



                {/* electronics */}
                <div className='mt-20 border border-gray-200 p-4 shadow-xl rounded-2xl'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <h2 className='text-3xl font-bold'>Vegetables</h2>
                            <div className='bg-red-100 p-1 rounded-2xl'>
                                <p className='text-green-500 font-bold'>10 products</p>
                            </div>
                        </div>
                        <Link className='text-green-500 font-bold'> View More ➡️</Link>
                    </div>


                    <hr className='text-gray-200 mt-2' />

                    <div className='mt-10 grid grid-cols-4 gap-5'>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>



                    </div>

                </div>






                {/* electronics */}
                <div className='mt-20 border border-gray-200 p-4 shadow-xl rounded-2xl'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <h2 className='text-3xl font-bold'>Vegetables</h2>
                            <div className='bg-red-100 p-1 rounded-2xl'>
                                <p className='text-green-500 font-bold'>10 products</p>
                            </div>
                        </div>
                        <Link className='text-green-500 font-bold'> View More ➡️</Link>
                    </div>


                    <hr className='text-gray-200 mt-2' />

                    <div className='mt-10 grid grid-cols-4 gap-5'>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>



                    </div>

                </div>





                {/* electronics */}
                <div className='mt-20 border border-gray-200 p-4 shadow-xl rounded-2xl'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <h2 className='text-3xl font-bold'>Vegetables</h2>
                            <div className='bg-red-100 p-1 rounded-2xl'>
                                <p className='text-green-500 font-bold'>10 products</p>
                            </div>
                        </div>
                        <Link className='text-green-500 font-bold'> View More ➡️</Link>
                    </div>


                    <hr className='text-gray-200 mt-2' />

                    <div className='mt-10 grid grid-cols-4 gap-5'>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>



                    </div>

                </div>





                {/* electronics */}
                <div className='mt-20 border border-gray-200 p-4 shadow-xl rounded-2xl'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <h2 className='text-3xl font-bold'>Vegetables</h2>
                            <div className='bg-red-100 p-1 rounded-2xl'>
                                <p className='text-green-500 font-bold'>10 products</p>
                            </div>
                        </div>
                        <Link className='text-green-500 font-bold'> View More ➡️</Link>
                    </div>


                    <hr className='text-gray-200 mt-2' />

                    <div className='mt-10 grid grid-cols-4 gap-5'>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>



                    </div>

                </div>













                {/* popular products */}


                <div className='border rounded shadow border-gray-200 p-4 mt-25'>
                    <h2 className='text-6xl font-bold text-black text-center '>Popular Products</h2>

                    <div >


                        {/* electronics */}
                        <div className='mt-10 border border-gray-200 p-4 shadow-xl rounded-2xl'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-4'>
                                    <h2 className='text-3xl font-bold'>Vegetables</h2>
                                    <div className='bg-red-100 p-1 rounded-2xl'>
                                        <p className='text-green-500 font-bold'>10 products</p>
                                    </div>
                                </div>
                                <Link className='text-green-500 font-bold'> View More ➡️</Link>
                            </div>


                            <hr className='text-gray-200 mt-2' />

                            <div className='mt-10 grid grid-cols-4 gap-5'>
                                <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                                    <div className='flex flex-col'>
                                        <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                        <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                                    </div>
                                    <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                                    <h2 className='text-xl font-bold'>Onion</h2>
                                    <p>ratting</p>
                                    <div className='flex items-center gap-2'>
                                        <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                        <div className='flex items-center gap-1'>
                                            <p className='text-black font-bold text-xl'>$7.00</p>
                                            <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                        </div>
                                    </div>


                                    <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                                </div>
                                <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                                    <div className='flex flex-col'>
                                        <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                        <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                                    </div>
                                    <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                                    <h2 className='text-xl font-bold'>Onion</h2>
                                    <p>ratting</p>
                                    <div className='flex items-center gap-2'>
                                        <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                        <div className='flex items-center gap-1'>
                                            <p className='text-black font-bold text-xl'>$7.00</p>
                                            <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                        </div>
                                    </div>


                                    <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                                </div>
                                <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                                    <div className='flex flex-col'>
                                        <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                        <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                                    </div>
                                    <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                                    <h2 className='text-xl font-bold'>Onion</h2>
                                    <p>ratting</p>
                                    <div className='flex items-center gap-2'>
                                        <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                        <div className='flex items-center gap-1'>
                                            <p className='text-black font-bold text-xl'>$7.00</p>
                                            <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                        </div>
                                    </div>


                                    <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                                </div>
                                <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                                    <div className='flex flex-col'>
                                        <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                        <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                                    </div>
                                    <img src="https://gofarm.reactbd.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe7x8hhu6%2Fproduction%2F85ac88e07f70e96e5fa9000e705353fd4e6f7bc6-750x750.webp&w=750&q=75" alt="" />
                                    <h2 className='text-xl font-bold'>Onion</h2>
                                    <p>ratting</p>
                                    <div className='flex items-center gap-2'>
                                        <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                        <div className='flex items-center gap-1'>
                                            <p className='text-black font-bold text-xl'>$7.00</p>
                                            <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                        </div>
                                    </div>


                                    <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                                </div>



                            </div>

                        </div>



                   


                        
                    </div>
                </div>

            </div>




        </div>

    );
};

export default Home;