import React from 'react';
import { Link } from 'react-router';
import banner from '../../assets/banner.png'
import {
    FiHome,
    FiTrendingUp,
    FiUsers,
    FiDollarSign,
    FiArrowRight,
    FiStar,
    FiWind, FiBox, FiTarget,
    FiGrid, FiActivity, FiLayers,
    FiShield,
    FiTruck,
    FiCreditCard,
    FiHeadphones,
    FiRefreshCw,
    FiAward,
    FiClock,
    FiHeart,
    FiCheckCircle,
    FiRotateCcw,



} from "react-icons/fi";
import { FaRegHeart, FaShoppingCart } from 'react-icons/fa';


const Home = () => {



    const cardStyle = "bg-white border border-gray-100 hover:shadow-xl rounded-2xl p-6 flex flex-col items-center text-center hover:border-orange-200 transition-all shadow-sm";
    const iconBg = "w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-3xl text-orange-500 mb-4 relative";

    const categories = [

        { id: 2, name: "Ice and Cold", icon: <FiWind /> },
        { id: 3, name: "Vegetables", icon: <FiLayers /> },
        { id: 4, name: "Meat", icon: <FiBox /> },
        { id: 5, name: "Fish", icon: <FiActivity /> },
        {
            id: 6,
            name: "Fruit",
            icon: <FiTarget />,
            isHot: true,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
        },
        { id: 7, name: "Fast Food", icon: <FiGrid /> },
        { id: 8, name: "Dry Food", icon: <FiBox /> },
    ];

    const stats = [
        { label: "Active Vendors", value: "500+" },
        { label: "Monthly Orders", value: "10K+" },
        { label: "Success Rate", value: "98%" },
    ];

    const features = [
        {
            title: "Your Storefront",
            desc: "Create your own digital store",
            icon: <FiHome />,
        },
        {
            title: "Grow Sales",
            desc: "Reach thousands of customers",
            icon: <FiTrendingUp />,
        },
        {
            title: "Customer Base",
            desc: "Access our loyal community",
            icon: <FiUsers />,
        },
        {
            title: "Earn More",
            desc: "Competitive commission rates",
            icon: <FiDollarSign />,
        },
    ];



    return (

        <div>

            {/* banner */}


            <div className='relative max-w-full overflow-hidden'>
                <img
                    src={banner}
                    className='w-full h-full object-cover'
                    alt="Fresh Deshi Products"
                />
                <div className='absolute inset-0 flex animate-pulse flex-col items-end justify-center px-[10%] bg-gradient-to-r from-transparent to-black/10'>
                    <div className='text-right animate-fadeIn'>
                        <button className='lg:mt-50 md:mt-35 mt-15 lg:mr-70 bg-green-500 text-white lg:py-4 lg:px-10 md:py-4 md:px-10 py-2 px-5 text-xl font-bold rounded-full shadow-xl hover:bg-gray-900 transition-all duration-300 transform hover:-translate-y-1 active:scale-95'>
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>





            <div className='container mb-10'>
                <h2 className='title'>Featured Products</h2>
                <p className='subtitle'>Discover our carefully curated selection of premium products</p>

                {/* electronics */}
                <div className=' border border-gray-200 p-4 shadow-xl rounded-2xl'>
                    <div className='flex items-center justify-between'>
                        <div className='flex md:flex-row  flex-col lg:flex-row items-center gap-4'>
                            <h2 className='text-3xl font-bold md:items-start items-center lg:items-start'>Vegetables</h2>
                            <div className='bg-red-100  p-1 rounded-2xl'>
                                <p className='text-green-500 font-bold'>10 products</p>
                            </div>
                        </div>
                        <Link className='text-green-500 font-bold'> View More ➡️</Link>
                    </div>


                    <hr className='text-gray-200 mt-2' />


                    <div className='  mt-10 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5'>
                        <div className="group relative border border-gray-200 rounded-2xl bg-white overflow-hidden transition-all duration-500 hover:shadow-xl">
                            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                                <span className="px-3 py-1 text-xs font-semibold bg-green-500 text-white rounded-full">New</span>
                                <span className="px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-full">-10%</span>
                            </div>

                            <div className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500 transition-colors duration-300 cursor-pointer">
                                <FaRegHeart className="w-6 h-6" />
                            </div>

                            <div className="overflow-hidden">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaY-gJAef0oME8WFQsUn3-PtD809kNa6Y4Sw&s"
                                    alt="Almond"
                                    className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>


                            <div className="p-4">
                                <div className='flex justify-between'>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Onion</h3>
                                    <div className="flex items-center mb-2 text-yellow-400 text-sm">
                                        ★★★★★ <span className="text-gray-400 ml-2">(0)</span>
                                    </div>
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

                            <div className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500 transition-colors duration-300 cursor-pointer">
                                <FaRegHeart className="w-6 h-6" />
                            </div>

                            <div className="overflow-hidden">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaY-gJAef0oME8WFQsUn3-PtD809kNa6Y4Sw&s"
                                    alt="Almond"
                                    className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>


                            <div className="p-4">
                                <div className='flex justify-between'>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Onion</h3>
                                    <div className="flex items-center mb-2 text-yellow-400 text-sm">
                                        ★★★★★ <span className="text-gray-400 ml-2">(0)</span>
                                    </div>
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

                            <div className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500 transition-colors duration-300 cursor-pointer">
                                <FaRegHeart className="w-6 h-6" />
                            </div>

                            <div className="overflow-hidden">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaY-gJAef0oME8WFQsUn3-PtD809kNa6Y4Sw&s"
                                    alt="Almond"
                                    className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>


                            <div className="p-4">
                                <div className='flex justify-between'>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Onion</h3>
                                    <div className="flex items-center mb-2 text-yellow-400 text-sm">
                                        ★★★★★ <span className="text-gray-400 ml-2">(0)</span>
                                    </div>
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

                            <div className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500 transition-colors duration-300 cursor-pointer">
                                <FaRegHeart className="w-6 h-6" />
                            </div>

                            <div className="overflow-hidden">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaY-gJAef0oME8WFQsUn3-PtD809kNa6Y4Sw&s"
                                    alt="Almond"
                                    className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>


                            <div className="p-4">
                                <div className='flex justify-between'>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Onion</h3>
                                    <div className="flex items-center mb-2 text-yellow-400 text-sm">
                                        ★★★★★ <span className="text-gray-400 ml-2">(0)</span>
                                    </div>
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


                    <hr className='text-gray-200 mt-2' />

                    <div className='  mt-10 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5'>
                        <div className="group relative border border-gray-200 rounded-2xl bg-white overflow-hidden transition-all duration-500 hover:shadow-xl">
                            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                                <span className="px-3 py-1 text-xs font-semibold bg-green-500 text-white rounded-full">New</span>
                                <span className="px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-full">-10%</span>
                            </div>

                            <div className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500 transition-colors duration-300 cursor-pointer">
                                <FaRegHeart className="w-6 h-6" />
                            </div>

                            <div className="overflow-hidden">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaY-gJAef0oME8WFQsUn3-PtD809kNa6Y4Sw&s"
                                    alt="Almond"
                                    className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>


                            <div className="p-4">
                                <div className='flex justify-between'>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Onion</h3>
                                    <div className="flex items-center mb-2 text-yellow-400 text-sm">
                                        ★★★★★ <span className="text-gray-400 ml-2">(0)</span>
                                    </div>
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

                            <div className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500 transition-colors duration-300 cursor-pointer">
                                <FaRegHeart className="w-6 h-6" />
                            </div>

                            <div className="overflow-hidden">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaY-gJAef0oME8WFQsUn3-PtD809kNa6Y4Sw&s"
                                    alt="Almond"
                                    className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>


                            <div className="p-4">
                                <div className='flex justify-between'>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Onion</h3>
                                    <div className="flex items-center mb-2 text-yellow-400 text-sm">
                                        ★★★★★ <span className="text-gray-400 ml-2">(0)</span>
                                    </div>
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

                            <div className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500 transition-colors duration-300 cursor-pointer">
                                <FaRegHeart className="w-6 h-6" />
                            </div>

                            <div className="overflow-hidden">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaY-gJAef0oME8WFQsUn3-PtD809kNa6Y4Sw&s"
                                    alt="Almond"
                                    className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>


                            <div className="p-4">
                                <div className='flex justify-between'>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Onion</h3>
                                    <div className="flex items-center mb-2 text-yellow-400 text-sm">
                                        ★★★★★ <span className="text-gray-400 ml-2">(0)</span>
                                    </div>
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

                            <div className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500 transition-colors duration-300 cursor-pointer">
                                <FaRegHeart className="w-6 h-6" />
                            </div>

                            <div className="overflow-hidden">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaY-gJAef0oME8WFQsUn3-PtD809kNa6Y4Sw&s"
                                    alt="Almond"
                                    className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>


                            <div className="p-4">
                                <div className='flex justify-between'>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Onion</h3>
                                    <div className="flex items-center mb-2 text-yellow-400 text-sm">
                                        ★★★★★ <span className="text-gray-400 ml-2">(0)</span>
                                    </div>
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







                {/* popular products */}


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




                <section className="w-full mt-20 rounded-2xl py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-white overflow-hidden">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">


                        <div className="space-y-8">

                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8F5E9] text-green-500 text-sm font-medium">
                                <FiStar className="fill-current" />
                                Join Our Selling Community
                            </div>


                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                                    Start Selling on <span className="text-green-500">DESHIMART</span>
                                </h1>
                                <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-xl">
                                    Turn your passion into profit. Join thousands of successful vendors who trust DESHIMART to grow their business and reach new customers every day.
                                </p>
                            </div>


                            <div className="flex flex-wrap gap-4">
                                <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg shadow-green-100">
                                    Become a Seller <FiArrowRight strokeWidth={3} />
                                </button>
                                <button className="px-8 py-4 rounded-lg font-bold border-2 border-green-500 text-green-500 hover:bg-green-50 transition-all">
                                    Learn More
                                </button>
                            </div>

                            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
                                {stats.map((stat, index) => (
                                    <div key={index}>
                                        <h3 className="text-2xl md:text-3xl font-bold text-green-500">{stat.value}</h3>
                                        <p className="text-gray-500 text-sm md:text-base">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col items-center text-center"
                                >
                                    <div className="w-16 h-16 mb-6 flex items-center justify-center bg-green-500 text-white text-3xl rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                                    <p className="text-gray-500 leading-relaxed text-sm">
                                        {feature.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>






                <section className="mt-25 font-sans">
                    <div className=" w-full text-center">

                        <div className="flex items-center justify-center gap-4 mb-2">
                            <div className="h-[1px] w-12 bg-green-500"></div>
                            <h2 className="text-3xl font-bold text-gray-800">Popular Categories</h2>
                            <div className="h-[1px] w-12 bg-green-500"></div>
                        </div>
                        <p className="text-gray-500 text-sm mb-6">
                            Explore our most popular product categories and find what you need <br />
                            <span className="text-green-500 text-xs italic">✨ Curated collections for your convenience</span>
                        </p>

                        <button className="bg-green-600 text-white px-6 py-2 rounded-full flex items-center gap-2 mx-auto mb-12 hover:bg-green-700 transition-all">
                            <FiGrid /> Browse All Categories <FiArrowRight />
                        </button>


                        <div className="border border-green-100 rounded-[40px] p-8 md:p-12 shadow-sm bg-gradient-to-b from-white to-green-50/20">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {categories.map((cat) => (
                                    <div
                                        key={cat.id}
                                        className={`relative bg-white border ${cat.isHot ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-100'} rounded-2xl p-6 flex flex-col items-center group hover:shadow-lg transition-all duration-300`}
                                    >

                                        {cat.isHot && (
                                            <span className="absolute -top-2 -right-2 bg-orange-400 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                                                Hot
                                            </span>
                                        )}


                                        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                            {cat.icon}
                                        </div>

                                        <h3 className="font-bold text-gray-800 mb-2">{cat.name}</h3>

                                        {cat.desc ? (
                                            <p className="text-[10px] text-gray-400 mb-4 px-2">{cat.desc}</p>
                                        ) : (
                                            <div className="h-[1px] w-full bg-gray-100 mb-6"></div>
                                        )}

                                        <button className="text-xs font-semibold text-green-600 border border-green-600 px-4 py-1.5 rounded-full flex items-center gap-1 hover:bg-green-600 hover:text-white transition-all">
                                            Explore Now <FiArrowRight className="text-[10px]" />
                                        </button>
                                    </div>
                                ))}
                            </div>


                            <div className="mt-16 pt-8 border-t border-gray-200">
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <div>
                                        <h4 className="text-2xl font-bold text-green-600">8+</h4>
                                        <p className="text-xs text-gray-500">Categories</p>
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-orange-400">43+</h4>
                                        <p className="text-xs text-gray-500">Products</p>
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-green-800 font-mono">24/7</h4>
                                        <p className="text-xs text-gray-500">Support</p>
                                    </div>
                                </div>

                                <div className="inline-flex items-center gap-2 bg-white border border-green-200 px-4 py-1.5 rounded-full shadow-sm text-[11px] text-gray-600">

                                    Discover amazing products in every category

                                </div>
                            </div>
                        </div>
                    </div>
                </section>





                <section className="bg-white mt-20 rounded-2xl py-16 px-4 font-sans">
                    <div className="max-w-6xl mx-auto text-center">


                        <div className="flex items-center justify-center gap-4 mb-3">
                            <div className="h-[2px] w-10 bg-green-500"></div>
                            <h2 className="text-3xl font-bold text-gray-900">Why Shop With Us</h2>
                            <div className="h-[2px] w-10 bg-green-500"></div>
                        </div>
                        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mb-10">
                            Experience the best online shopping with our commitment to quality, security, and exceptional service
                        </p>


                        <div className="border border-green-100 rounded-[32px] p-6 md:p-12 shadow-sm bg-[#FCFDFB]">


                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">


                                <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                        <FiShield />
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-sm mb-2">Secure Shopping</h3>
                                    <p className="text-[11px] text-gray-400 mb-6">100% secure payment with SSL encryption</p>
                                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="w-1/2 h-full bg-blue-500"></div>
                                    </div>
                                </div>


                                <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                                    <div className="w-12 h-12 bg-green-50 text-green-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                        <FiTruck />
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-sm mb-2">Free Delivery</h3>
                                    <p className="text-[11px] text-gray-400 mb-6">Free shipping on orders over $50</p>
                                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="w-1/3 h-full bg-green-500"></div>
                                    </div>
                                </div>


                                <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                                    <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                        <FiCreditCard />
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-sm mb-2">Easy Payments</h3>
                                    <p className="text-[11px] text-gray-400 mb-6">Multiple payment options available</p>
                                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="w-2/3 h-full bg-purple-500"></div>
                                    </div>
                                </div>


                                <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                                    <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                        <FiHeadphones />
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-sm mb-2">24/7 Support</h3>
                                    <p className="text-[11px] text-gray-400 mb-6">Dedicated customer support anytime</p>
                                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="w-1/4 h-full bg-orange-500"></div>
                                    </div>
                                </div>


                                <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                                    <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                        <FiRefreshCw />
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-sm mb-2">Easy Returns</h3>
                                    <p className="text-[11px] text-gray-400 mb-6">30-day hassle-free return policy</p>
                                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="w-1/2 h-full bg-pink-500"></div>
                                    </div>
                                </div>


                                <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                                    <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                        <FiAward />
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-sm mb-2">Quality Assured</h3>
                                    <p className="text-[11px] text-gray-400 mb-6">100% authentic products guaranteed</p>
                                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="w-1/3 h-full bg-yellow-600"></div>
                                    </div>
                                </div>


                                <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                                    <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                        <FiClock />
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-sm mb-2">Fast Processing</h3>
                                    <p className="text-[11px] text-gray-400 mb-6">Orders processed within 24 hours</p>
                                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="w-1/2 h-full bg-indigo-500"></div>
                                    </div>
                                </div>


                                <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                                    <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                        <FiHeart />
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-sm mb-2">Best Prices</h3>
                                    <p className="text-[11px] text-gray-400 mb-6">Competitive pricing with great deals</p>
                                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="w-1/4 h-full bg-red-500"></div>
                                    </div>
                                </div>

                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 pt-4">
                                <div className="text-center">
                                    <h4 className="text-3xl font-bold text-green-600">50K+</h4>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Happy Customers</p>
                                </div>
                                <div className="text-center">
                                    <h4 className="text-3xl font-bold text-green-600">100K+</h4>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Products Sold</p>
                                </div>
                                <div className="text-center">
                                    <h4 className="text-3xl font-bold text-green-600">99%</h4>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Satisfaction Rate</p>
                                </div>
                                <div className="text-center">
                                    <h4 className="text-3xl font-bold text-green-600">24/7</h4>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Customer Support</p>
                                </div>
                            </div>


                            <div className="inline-flex items-center gap-2 bg-white border border-yellow-100 px-6 py-2 rounded-full shadow-sm text-xs font-medium text-gray-700">
                                <FiCheckCircle className="text-green-500 text-base" />
                                Trusted by thousands of satisfied customers worldwide
                                <div className="flex gap-0.5 ml-2">
                                    <FiStar className="fill-yellow-400 text-yellow-400" />
                                    <FiStar className="fill-yellow-400 text-yellow-400" />
                                    <FiStar className="fill-yellow-400 text-yellow-400" />
                                    <FiStar className="fill-yellow-400 text-yellow-400" />
                                    <FiStar className="fill-yellow-400 text-yellow-400" />
                                </div>
                            </div>

                        </div>
                    </div>
                </section>






                <section className="bg-white py-12 rounded-2xl mt-25 px-4">

                    <div className="max-w-6xl mx-auto border border-gray-50 rounded-[32px] p-8 md:p-12 shadow-sm">

                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Why Choose Us?</h2>
                            <p className="text-gray-400 text-sm">We provide the best shopping experience with premium services</p>
                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">


                            <div className={cardStyle}>
                                <div className={iconBg}>
                                    <div className="absolute inset-0 bg-orange-100/40 rounded-full blur-sm"></div>
                                    <FiTruck className="relative z-10" />
                                </div>
                                <h3 className="font-bold text-gray-800 mb-1 text-base">Free Delivery</h3>
                                <p className="text-gray-400 text-[11px]">Free shipping over $100</p>
                            </div>


                            <div className={cardStyle}>
                                <div className={iconBg}>
                                    <div className="absolute inset-0 bg-orange-100/40 rounded-full blur-sm"></div>
                                    <FiRotateCcw className="relative z-10" />
                                </div>
                                <h3 className="font-bold text-gray-800 mb-1 text-base">Free Return</h3>
                                <p className="text-gray-400 text-[11px]">Free shipping over $100</p>
                            </div>


                            <div className={cardStyle}>
                                <div className={iconBg}>
                                    <div className="absolute inset-0 bg-orange-100/40 rounded-full blur-sm"></div>
                                    <FiHeadphones className="relative z-10" />
                                </div>
                                <h3 className="font-bold text-gray-800 mb-1 text-base">Customer Support</h3>
                                <p className="text-gray-400 text-[11px]">Friendly 24/7 customer support</p>
                            </div>


                            <div className={cardStyle}>
                                <div className={iconBg}>
                                    <div className="absolute inset-0 bg-orange-100/40 rounded-full blur-sm"></div>
                                    <FiShield className="relative z-10" />
                                </div>
                                <h3 className="font-bold text-gray-800 mb-1 text-base">Money Back guarantee</h3>
                                <p className="text-gray-400 text-[11px]">Quality checked by our team</p>
                            </div>

                        </div>


                        <div className="w-full h-[1px] bg-gray-100 mb-8"></div>


                        <div className="flex justify-center">
                            <div className="bg-orange-50/50 border border-orange-100 px-6 py-2 rounded-xl flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                                <p className="text-xs font-semibold text-gray-700">Trusted by thousands of customers worldwide</p>
                                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                            </div>
                        </div>

                    </div>
                </section>




            </div>




        </div>

    );
};

export default Home;