import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router';

const PopularProducts = () => {
    return (
        <div className='border rounded shadow border-gray-200 p-4 mt-25'>
            <h2 className='text-6xl font-bold text-black text-center '>Popular Products</h2>
            <div className='flex items-center gap-2 mt-10 overflow-x-scroll'>
                <Link className='px-5 py-0.5 hover:bg-green-500 active:bg-green-500 font-bold border border-green-500 rounded-4xl'>Vegetables</Link>
                <Link className='px-5 py-0.5 hover:bg-green-500 active:bg-green-500 font-bold border border-green-500 rounded-4xl'>Fruits</Link>
                <Link className='px-5 py-0.5 hover:bg-green-500 active:bg-green-500 font-bold border border-green-500 rounded-4xl'>Fish</Link>
                <Link className='px-5 py-0.5 hover:bg-green-500 active:bg-green-500 font-bold border border-green-500 rounded-4xl'>Spices</Link>
            </div>

            <div >

                {/* <hr className='text-green-500 mt-2' /> */}

                {/* electronics */}
                <div className='mt-20 border border-gray-200 p-4 shadow-xl rounded-2xl'>
                    <div className='flex items-center justify-between'>
                        <div className='flex md:flex-row  flex-col lg:flex-row items-center gap-4'>
                            <h2 className='text-3xl font-bold md:items-start items-center lg:items-start'>Vegetables</h2>
                            <div className='bg-red-100  p-1 rounded-2xl'>
                                <p className='text-green-500 font-bold'>10 products</p>
                            </div>
                        </div>
                        <Link className='text-green-500 font-bold'> View More ➡️</Link>
                    </div>






                    <div className='  mt-10 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5'>
                        <div className="group relative border border-gray-200 rounded-2xl bg-white overflow-hidden transition-all duration-500 hover:shadow-xl">
                            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                                <span className="px-3 py-1 text-xs font-semibold bg-green-500 text-white rounded-full">New</span>
                                <span className="px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-full">-10%</span>
                            </div>

                            <div className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500 transition-all duration-300 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </div>

                            <div className="overflow-hidden">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaY-gJAef0oME8WFQsUn3-PtD809kNa6Y4Sw&s"
                                    alt="Almond"
                                    className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>


                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">Onion</h3>
                                <div className="flex items-center mb-2 text-yellow-400 text-sm">
                                    ★★★★★ <span className="text-gray-400 ml-2">(0)</span>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-600 font-bold text-lg">$31.50</span>
                                        <span className="text-gray-400 line-through text-sm">$35.00</span>
                                    </div>
                                </div>

                                <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-green-500 text-green-500 rounded-xl font-medium transition-all duration-300 hover:bg-green-600 hover:text-white hover:shadow-lg active:scale-95">
                                    <FaShoppingCart /> Add to Cart
                                </button>
                            </div>
                        </div>
                        <div className="group relative border border-gray-200 rounded-2xl bg-white overflow-hidden transition-all duration-500 hover:shadow-xl">
                            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                                <span className="px-3 py-1 text-xs font-semibold bg-green-500 text-white rounded-full">New</span>
                                <span className="px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-full">-10%</span>
                            </div>

                            <div className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500 transition-all duration-300 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </div>

                            <div className="overflow-hidden">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaY-gJAef0oME8WFQsUn3-PtD809kNa6Y4Sw&s"
                                    alt="Almond"
                                    className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>


                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">Onion</h3>
                                <div className="flex items-center mb-2 text-yellow-400 text-sm">
                                    ★★★★★ <span className="text-gray-400 ml-2">(0)</span>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-600 font-bold text-lg">$31.50</span>
                                        <span className="text-gray-400 line-through text-sm">$35.00</span>
                                    </div>
                                </div>

                                <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-green-500 text-green-500 rounded-xl font-medium transition-all duration-300 hover:bg-green-600 hover:text-white hover:shadow-lg active:scale-95">
                                    <FaShoppingCart /> Add to Cart
                                </button>
                            </div>
                        </div>
                        <div className="group relative border border-gray-200 rounded-2xl bg-white overflow-hidden transition-all duration-500 hover:shadow-xl">
                            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                                <span className="px-3 py-1 text-xs font-semibold bg-green-500 text-white rounded-full">New</span>
                                <span className="px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-full">-10%</span>
                            </div>

                            <div className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500 transition-all duration-300 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </div>

                            <div className="overflow-hidden">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaY-gJAef0oME8WFQsUn3-PtD809kNa6Y4Sw&s"
                                    alt="Almond"
                                    className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>


                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">Onion</h3>
                                <div className="flex items-center mb-2 text-yellow-400 text-sm">
                                    ★★★★★ <span className="text-gray-400 ml-2">(0)</span>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-600 font-bold text-lg">$31.50</span>
                                        <span className="text-gray-400 line-through text-sm">$35.00</span>
                                    </div>
                                </div>

                                <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-green-500 text-green-500 rounded-xl font-medium transition-all duration-300 hover:bg-green-600 hover:text-white hover:shadow-lg active:scale-95">
                                    <FaShoppingCart /> Add to Cart
                                </button>
                            </div>
                        </div>
                        <div className="group relative border border-gray-200 rounded-2xl bg-white overflow-hidden transition-all duration-500 hover:shadow-xl">
                            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                                <span className="px-3 py-1 text-xs font-semibold bg-green-500 text-white rounded-full">New</span>
                                <span className="px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-full">-10%</span>
                            </div>

                            <div className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500 transition-all duration-300 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </div>

                            <div className="overflow-hidden">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaY-gJAef0oME8WFQsUn3-PtD809kNa6Y4Sw&s"
                                    alt="Almond"
                                    className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>


                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">Onion</h3>
                                <div className="flex items-center mb-2 text-yellow-400 text-sm">
                                    ★★★★★ <span className="text-gray-400 ml-2">(0)</span>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-600 font-bold text-lg">$31.50</span>
                                        <span className="text-gray-400 line-through text-sm">$35.00</span>
                                    </div>
                                </div>

                                <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-green-500 text-green-500 rounded-xl font-medium transition-all duration-300 hover:bg-green-600 hover:text-white hover:shadow-lg active:scale-95">
                                    <FaShoppingCart /> Add to Cart
                                </button>
                            </div>
                        </div>



                    </div>

                </div>







            </div>
        </div>
    );
};

export default PopularProducts;