import React, { useEffect, useRef, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaBox, FaCog, FaHeart, FaQuestionCircle, FaRegHeart, FaRegUser, FaRegUserCircle, FaSignOutAlt, FaThLarge, FaUser } from 'react-icons/fa';
import { HiOutlineBars3, HiOutlineHome } from 'react-icons/hi2';
import { LuBookOpen, LuFlame, LuLayoutGrid, LuPackage, LuShoppingCart } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';
import { Link, NavLink } from 'react-router';
import Useauth from './Useauth';



const Navbar = () => {
    const { user } = Useauth()
    const dropdownRef = useRef(null);

    const [open, setopen] = useState(false);
    const [profileopen, setprofileopen] = useState(false)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setprofileopen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    return (

        <div className='sticky  relative top-0 z-50 bg-white py-5'>
            <div className='lg:max-w-[70%] mx-auto md:max-w-[95%] max-w-[98%]  px-4'>
                <div className='flex items-center justify-between '>
                    <Link to='/'><h2 className='text-2xl font-bold text-green-500'>DESHIMART</h2></Link>


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


                        <div className='hidden md:flex lg:flex'>
                            {
                                user ? (<button onClick={() => setprofileopen(true)} className='p-2 border relative border-green-500 rounded-xl'>
                                    <div className='flex gap-2 items-center'>
                                        <div>
                                            <h3 className='text-xl font-bold'>{user.displayName ? user.displayName.split(' ')[0] : 'User'}</h3>
                                            <p>Local User</p>
                                        </div>

                                        <div>
                                            {user && user.photoURL ? (
                                                <img
                                                    src={user.photoURL}
                                                    alt="User image"
                                                    className="w-12 h-12 rounded-full"
                                                />
                                            ) : (
                                                <FaRegUserCircle className="text-4xl  text-green-500" />
                                            )}
                                        </div>
                                    </div>


                                    {
                                        profileopen && <div ref={dropdownRef} className="max-w-[400px] top-17 md:right-0 absolute  bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 font-sans">
                                            <div className="bg-[#38A144] p-6 flex items-center gap-4">
                                                <img src="https://via.placeholder.com/60" className="w-14 h-14 rounded-full border-2 border-white/50 object-cover" alt="Profile" />
                                                <div>
                                                    <h2 className="text-white font-bold text-lg leading-tight">Mehadi Hasan</h2>
                                                    <p className="text-white/80 text-sm">meh67719@gmail.com</p>
                                                </div>
                                            </div>

                                            <nav className="p-4 space-y-1">
                                                <Link to="/" onClick={() => setprofileopen(false)} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg group transition-colors">
                                                    <div className="w-10 h-10 bg-blue-50 flex items-center justify-center rounded-lg text-blue-500"><FaUser /></div>
                                                    <span className="font-semibold text-gray-800">My Profile</span>
                                                </Link>

                                                <Link to="/orders" onClick={() => setprofileopen(false)} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                                    <div className="w-10 h-10 bg-purple-50 flex items-center justify-center rounded-lg text-purple-500"><FaBox /></div>
                                                    <span className="font-semibold text-gray-800">My Orders</span>
                                                </Link>

                                                <Link to="/wishlist" onClick={() => setprofileopen(false)} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                                    <div className="w-10 h-10 bg-pink-50 flex items-center justify-center rounded-lg text-pink-500"><FaHeart /></div>
                                                    <span className="font-semibold text-gray-800">Wishlist</span>
                                                </Link>

                                                <Link to="/dashboard" onClick={() => setprofileopen(false)} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                                    <div className="w-10 h-10 bg-green-50 flex items-center justify-center rounded-lg text-green-500"><FaThLarge /></div>
                                                    <span className="font-semibold text-gray-800">Dashboard</span>
                                                </Link>

                                                <Link to="/settings" onClick={() => setprofileopen(false)} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                                    <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-lg text-gray-500"><FaCog /></div>
                                                    <span className="font-semibold text-gray-800">Settings</span>
                                                </Link>

                                                <hr className="my-2 border-gray-100" />

                                                <Link to="/help" onClick={() => setprofileopen(false)} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                                    <div className="w-10 h-10 flex items-center justify-center text-gray-400 text-xl"><FaQuestionCircle /></div>
                                                    <span className="font-medium text-gray-600">Help & Support</span>
                                                </Link>

                                                <hr className="my-2 border-gray-100" />

                                                <Link to="/logout" onClick={() => setprofileopen(false)} className="flex items-center gap-4 p-3 hover:bg-red-50 rounded-lg transition-colors">
                                                    <div className="w-10 h-10 bg-red-50 flex items-center justify-center rounded-lg text-red-500"><FaSignOutAlt /></div>
                                                    <span className="font-bold text-red-600">Sign Out</span>
                                                </Link>
                                            </nav>
                                        </div>
                                    }


                                </button>) :
                                    (
                                        <div className='flex items-center gap-4'>
                                            <Link to='/sign-in'><button className='px-3 py-1.5 border-1 hover:bg-green-500 hover:text-white hidden lg:flex md:flex border-green-500 rounded text-green-500 font-bold'>Sign In</button></Link>
                                            <Link to='/sign-up'><button className='px-3 py-1.5 border-1  hidden hover:bg-white hover:text-green-500 lg:flex md:flex border-green-500 rounded bg-green-500 text-white font-bold'>Sign Up</button></Link>
                                        </div>
                                    )
                            }
                        </div>

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

                        <div><RxCross2 onClick={() => setopen(false)} className='text-red-500 font-bold text-2xl my-5' /></div>

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
                                <Link to='/' className=" text-white flex items-center gap-3 p-3 rounded-md text-sm">
                                    <HiOutlineHome className='text-white text-lg' /> Home
                                </Link>
                                <Link to="/shop" className="text-gray-300 flex items-center gap-3 p-3 rounded-md text-sm hover:bg-white/5 transition-all">
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

                    </div>) : (<div className='items-center justify-center my-2.5 flex gap-5 hidden md:flex lg:flex'>
                        <NavLink to="/" className={({ isActive }) => `font-bold hover:text-green-500 border-b-2 pb-1 ${isActive ? "text-green-500 border-green-500" : "text-black border-transparent"}`}>Home</NavLink>
                        <NavLink to="/shop" className={({ isActive }) => `font-bold hover:text-green-500 border-b-2 pb-1 ${isActive ? "text-green-500 border-green-500" : "text-black border-transparent"}`}>Shop</NavLink>
                        <NavLink to="/hot-deal" className={({ isActive }) => `font-bold hover:text-green-500 border-b-2 pb-1 ${isActive ? "text-green-500 border-green-500" : "text-black border-transparent"}`}>Hot Deal</NavLink>
                        <NavLink to="/collection" className={({ isActive }) => `font-bold hover:text-green-500 border-b-2 pb-1 ${isActive ? "text-green-500 border-green-500" : "text-black border-transparent"}`}>Collection</NavLink>
                        <NavLink to="/local-stores" className={({ isActive }) => `font-bold hover:text-green-500 border-b-2 pb-1 ${isActive ? "text-green-500 border-green-500" : "text-black border-transparent"}`}>Local Stores</NavLink>
                        <NavLink to="/blog" className={({ isActive }) => `font-bold hover:text-green-500 border-b-2 pb-1 ${isActive ? "text-green-500 border-green-500" : "text-black border-transparent"}`}>Blog</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => `font-bold hover:text-green-500 border-b-2 pb-1 ${isActive ? "text-green-500 border-green-500" : "text-black border-transparent"}`}>Contact</NavLink>



                    </div>)
                }
            </div >



        </div >





    );
};

export default Navbar;