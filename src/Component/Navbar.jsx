import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaRegHeart } from 'react-icons/fa';
import { HiOutlineBars3 } from 'react-icons/hi2';
import { LuShoppingCart } from 'react-icons/lu';
import { Link } from 'react-router';



const Navbar = () => {
    return (

            <div className='sticky top-0 z-50 bg-white py-5'>
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
                    <div className=' my-2.5 md:hidden lg:hidden'>
                        <HiOutlineBars3 className="hover:text-green-500 font-bold text-2xl font-bold" />
                    </div>

                    <div className='items-center justify-center my-2.5 flex gap-5 hidden md:flex lg:flex'>

                        <Link className="hover:border-b hover:text-green-500 font-bold border-green-500">Home</Link>
                        <Link className="hover:border-b hover:text-green-500 font-bold border-green-500">Shop</Link>
                        <Link className="hover:border-b hover:text-green-500 font-bold border-green-500">Hot Deal</Link>
                        <Link className="hover:border-b hover:text-green-500 font-bold border-green-500">Collection</Link>
                        <Link className="hover:border-b hover:text-green-500 font-bold border-green-500">Local Stores</Link>
                        <Link className="hover:border-b hover:text-green-500 font-bold border-green-500">Blog</Link>
                        <Link className="hover:border-b hover:text-green-500 font-bold border-green-500">Contact</Link>


                    </div>
                </div>
            </div>





    );
};

export default Navbar;