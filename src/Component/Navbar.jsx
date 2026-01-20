import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaRegHeart, FaRegUser } from 'react-icons/fa';
import { HiOutlineBars3, HiOutlineHome } from 'react-icons/hi2';
import { LuBookOpen, LuFlame, LuLayoutGrid, LuPackage, LuShoppingCart } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router';



const Navbar = () => {

    const [open, setopen] = useState(false);



    return (

        <div className='sticky  relative top-0 z-50 bg-white py-5'>
            <div className='lg:max-w-[70%] mx-auto md:max-w-[95%] max-w-[98%]  px-4'>
                <div className='flex items-center justify-between '>
                    <h2 className='text-2xl font-bold text-green-500'>DESHIMART</h2>


                    <div className='flex flex-1 items-center gap-2 border border-green-500 rounded px-2 mx-2 md:mx-4'>
                        <span><CiSearch className='text-xl font-bold' /></span>
                        <input type="text" placeholder='Search products...' className='outline-none py-2 w-full ' />
                    </div>

                    <div className=' items-center gap-4 flex'>
                        <div className='relative'>
                            <LuShoppingCart className='text-3xl font-bold hover:text-green-500' />
                            <span className='font-bold text-white bg-green-500 rounded-full px-1 absolute -top-2.5 -right-2.5'>0</span>
                        </div>

                        <div className='relative hidden lg:flex md:flex'>
                            <FaRegHeart className='text-3xl font-bold hover:text-green-500 ' />
                            <span className='font-bold text-white bg-green-500 rounded-full px-1 absolute -top-2.5 -right-2.5'>1</span>
                        </div>

                        <button className='px-3 py-1.5 border-1 hover:bg-green-500 hover:text-white hidden lg:flex md:flex border-green-500 rounded text-green-500 font-bold'>Sing In</button>
                        <button className='px-3 py-1.5 border-1  hidden hover:bg-white hover:text-green-500 lg:flex md:flex border-green-500 rounded bg-green-500 text-white font-bold'>Sing Up</button>
                    </div>
                </div>
            </div>
            <hr className='text-green-500 mt-5 opacity-20' />


            <div className='lg:max-w-[70%] mx-auto md:max-w-[95%] max-w-[98%]  px-4'>
                <div className=' my-2.5 md:hidden  lg:hidden'>
                    <HiOutlineBars3 onClick={() => setopen(true)} className="hover:text-green-500 font-bold text-2xl font-bold" />

                </div>

                {
                    open ? (<div className='bg-[#050505] p-6 absolute w-[280px] left-0 top-0 min-h-screen z-50 shadow-2xl overflow-y-auto'>

                        <div><RxCross2 onClick={()=>setopen(false)} className='text-red-500 font-bold text-2xl my-5'/></div>

                        <div className='mt-10 mb-8'>
                            <h3 className='text-[#84cc16] text-[10px] font-bold tracking-widest mb-4'>QUICK ACCESS</h3>
                            <div className='grid grid-cols-3 gap-2'>
                                <div className='bg-[#0a2e1a] p-3 rounded flex flex-col items-center gap-1 border border-white/5'>
                                    <LuShoppingCart className='text-green-500 text-lg' />
                                    <span className='text-white text-[10px]'>Cart</span>
                                </div>
                                <div className='bg-[#0a2e1a] p-3 rounded flex flex-col items-center gap-1 border border-white/5'>
                                    <FaRegHeart className='text-green-500 text-lg' />
                                    <span className='text-white text-[10px]'>Wishlist</span>
                                </div>
                                <div className='bg-[#0a2e1a] p-3 rounded flex flex-col items-center gap-1 border border-white/5'>
                                    <LuPackage className='text-green-500 text-lg' />
                                    <span className='text-white text-[10px]'>Orders</span>
                                </div>
                            </div>
                        </div>

                       
                        <div className='mb-8'>
                            <h3 className='text-[#84cc16] text-[10px] font-bold tracking-widest mb-4 uppercase'>My Account</h3>
                            <div className='flex flex-col gap-4 pl-1'>
                                <Link className="text-gray-300 flex items-center gap-3 text-sm hover:text-white transition-all">
                                    <FaRegUser className='text-lg' /> My Account
                                </Link>
                                <Link className="text-gray-300 flex items-center gap-3 text-sm hover:text-white transition-all">
                                    <LuPackage className='text-lg' /> My Orders
                                </Link>
                                <Link className="text-gray-300 flex items-center gap-3 text-sm hover:text-white transition-all">
                                    <FaRegHeart className='text-lg' /> Wishlist
                                </Link>
                            </div>
                        </div>

                      
                        <div className='mb-8'>
                            <h3 className='text-[#84cc16] text-[10px] font-bold tracking-widest mb-4 uppercase'>Navigation</h3>
                            <div className='flex flex-col gap-1'>
                                <Link className=" text-white flex items-center gap-3 p-3 rounded-md text-sm">
                                    <HiOutlineHome className='text-white text-lg' /> Home
                                </Link>
                                <Link className="text-gray-300 flex items-center gap-3 p-3 rounded-md text-sm hover:bg-white/5 transition-all">
                                    <LuShoppingCart className='text-lg' /> Shop
                                </Link>
                                <Link className="text-gray-300 flex items-center gap-3 p-3 rounded-md text-sm hover:bg-white/5 transition-all">
                                    <LuLayoutGrid className='text-lg' /> Categories
                                </Link>
                                <Link className="text-gray-300 flex items-center gap-3 p-3 rounded-md text-sm hover:bg-white/5 transition-all">
                                    <LuFlame className='text-orange-500 text-lg' /> Hot Deal
                                </Link>
                                <Link className="text-gray-300 flex items-center gap-3 p-3 rounded-md text-sm hover:bg-white/5 transition-all">
                                    <LuBookOpen className='text-lg' /> Blog
                                </Link>
                            </div>
                        </div>

                    </div>) : ("")
                }
            </div >



        </div >





    );
};

export default Navbar;