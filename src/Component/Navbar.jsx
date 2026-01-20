import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaRegHeart } from 'react-icons/fa';
import { LuShoppingCart } from 'react-icons/lu';

const Navbar = () => {
    return (
        <div className='bg-white py-5'>
            <div className='flex items-center justify-between lg:max-w-[70%] mx-auto md:max-w-[95%] max-w-[98%]  mx-4"'>
                <h2 className='text-2xl font-bold text-green-500'>DESHIMART</h2>


                <div className='flex flex-1 items-center gap-2 border border-green-500 rounded px-2 mx-2 md:mx-4'>
                    <span><CiSearch className='text-xl font-bold'/></span>
                    <input type="text"  placeholder='Search products...'  className='outline-none py-2 w-full '/>
                </div>

                <div className=' items-center gap-3 flex'>
                    <LuShoppingCart className='text-3xl font-bold' />
                    <FaRegHeart className='text-3xl font-bold  hidden lg:flex md:flex' />
                    <button className='px-3 py-1.5 border-1  hidden lg:flex md:flex border-green-500 rounded text-green-500 font-bold'>Sing In</button>
                    <button className='px-3 py-1.5 border-1  hidden lg:flex md:flex border-green-500 rounded bg-green-500 text-white font-bold'>Sing Up</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;