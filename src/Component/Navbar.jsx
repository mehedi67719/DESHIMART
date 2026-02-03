import React, { useEffect, useRef, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import {
  FaArrowRight,
  FaBox,
  FaCog,
  FaHeart,
  FaQuestionCircle,
  FaRegHeart,
  FaRegUser,
  FaRegUserCircle,
  FaSignOutAlt,
  FaThLarge,
  FaUser
} from 'react-icons/fa';
import { HiOutlineBars3, HiOutlineHome } from 'react-icons/hi2';
import {
  LuBookOpen,
  LuFlame,
  LuLayoutGrid,
  LuMessageCircleMore,
  LuPackage,
  LuShoppingCart
} from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';
import { Link, NavLink } from 'react-router';
import Useauth from './Useauth';
import Swal from 'sweetalert2';
import { MdCollectionsBookmark } from 'react-icons/md';
import { LiaStoreSolid } from 'react-icons/lia';
import { BiSolidContact } from 'react-icons/bi';
import { IoNotifications } from 'react-icons/io5';

const Navbar = () => {
  const { user, logout } = Useauth();
  const dropdownRef = useRef(null);

  const [open, setopen] = useState(false);
  const [profileopen, setprofileopen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setprofileopen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlelogout = () => {
    logout().then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Account Login',
        text: 'Account Login successfully.',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      });
    });
  };

  return (
    <div className="sticky relative top-0 z-50 bg-white py-5">
      <div className="lg:max-w-[70%] md:max-w-[95%] max-w-[98%] mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <h2 className="text-2xl font-bold text-green-500">DESHIMART</h2>
          </Link>

          <div className="flex flex-1 items-center gap-2 border border-green-500 rounded px-2 mx-2 md:mx-4">
            <CiSearch className="text-xl font-bold" />
            <input
              type="text"
              placeholder="Search products..."
              className="outline-none py-2 w-full"
            />
          </div>

          <div className="flex items-center  gap-4">
            <div className="relative">
              <Link to='/cart'><LuShoppingCart  className="text-4xl font-bold hover:text-green-500" /></Link>
              <span className="font-bold text-white bg-green-500 rounded-full px-2 py-0.5 absolute -top-4 -right-4">
                0
              </span>
            </div>

            <div className="relative hidden md:flex">
              <Link to='/favorite'><FaRegHeart className="text-4xl font-bold hover:text-green-500" /></Link>
              <span className="font-bold text-white bg-green-500 rounded-full px-2 py-0.5 absolute -top-4 -right-4">
                1
              </span>
            </div>


            <div className='relative md:flex lg:flex hidden'>
              <Link to='/massenger'> <LuMessageCircleMore className='text-4xl font-bold hover:text-green-500'/></Link>
              <p className='text-white bg-green-500  -right-4 -top-4 px-2 py-0.5 absolute rounded-full text-center'>5</p>
            </div>

            <div className="relative md:flex lg:flex hidden">
              <Link to="/notification"><IoNotifications className="text-4xl font-bold hover:text-green-500" /></Link>
              <span className="font-bold text-white bg-green-500 rounded-full px-2 py-0.5 absolute -top-4 -right-4">
                0
              </span>
            </div>

            <div className="hidden md:flex">
              {user ? (
                <button
                  onClick={() => setprofileopen(!profileopen)}
                  className="p-2 border ml-1 relative border-green-500 rounded-xl"
                >
                  <div className="flex gap-2 items-center">
                    <div>
                      <h3 className="text-xl font-bold">
                        {user.displayName
                          ? user.displayName.split(' ')[0]
                          : 'User'}
                      </h3>
                      <p>Local User</p>
                    </div>

                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <FaRegUserCircle className="text-4xl text-green-500" />
                    )}
                  </div>

                  {profileopen && (
                    <div
                      ref={dropdownRef}
                      className="w-[300px] absolute z-60 md:right-0 top-full mt-2 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                    >
                      <div className="bg-[#38A144] p-6 flex items-center gap-4">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            className="w-14 h-14 rounded-full"
                          />
                        ) : (
                          <FaRegUserCircle className="text-4xl text-white" />
                        )}
                        <div>
                          <h2 className="text-white font-bold text-lg">
                            Mehadi Hasan
                          </h2>
                          <p className="text-white/80 text-sm">
                            meh67719@gmail.com
                          </p>
                        </div>
                      </div>

                      <nav className="p-4 space-y-1">
                        <ProfileLink to="/" icon={<FaUser />} text="My Profile" close={() => setprofileopen(false)} />
                        <ProfileLink to="/orders" icon={<FaBox />} text="My Orders" close={() => setprofileopen(false)} />
                        <ProfileLink to="/wishlist" icon={<FaHeart />} text="Wishlist" close={() => setprofileopen(false)} />
                        <ProfileLink to="/dashboard" icon={<FaThLarge />} text="Dashboard" close={() => setprofileopen(false)} />
                        <ProfileLink to="/settings" icon={<FaCog />} text="Settings" close={() => setprofileopen(false)} />

                        <hr className="my-2" />

                        <ProfileLink to="/help" icon={<FaQuestionCircle />} text="Help & Support" close={() => setprofileopen(false)} />

                        <hr className="my-2" />

                        <button
                          onClick={handlelogout}
                          className="flex items-center gap-4 p-3 w-full hover:bg-red-50 rounded-lg"
                        >
                          <FaSignOutAlt className="text-red-500" />
                          <span className="font-bold text-red-600">
                            Sign Out
                          </span>
                        </button>
                      </nav>
                    </div>
                  )}
                </button>
              ) : (
                <div className="flex gap-2">
                  <Link to="/sign-in">
                    <button className="border border-green-500 px-3 py-1.5 rounded text-green-500 font-bold hidden md:flex">
                      Sign In
                    </button>
                  </Link>
                  <Link to="/sign-up">
                    <button className="bg-green-500 px-3 py-1.5 rounded text-white font-bold hidden md:flex">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <hr className="mt-5 opacity-20" />

      <div className="container py-0">
        <div className="mb-2 mt-5 md:hidden lg:hidden flex items-center justify-between">
          <HiOutlineBars3
            onClick={() => setopen(true)}
            className="text-4xl font-bold"
          />

          <div className='relative'>
            <Link className='text-4xl font-bold'> <LuMessageCircleMore /></Link>
            <p className='text-white bg-green-500 right-0 -top-3 px-2 py-0.5 absolute rounded-full text-center'>5</p>
          </div>

          <div className="relative ">
            <IoNotifications className="text-4xl font-bold hover:text-green-500" />
            <span className="font-bold text-white bg-green-500 rounded-full px-2 py-0.5 absolute -top-4 -right-4">
              0
            </span>
          </div>

        </div>

        {open ? (
          <div className="fixed inset-y-0 left-0 w-[280px] bg-[#050505] z-50 shadow-2xl p-5 flex flex-col">
            <RxCross2
              onClick={() => setopen(false)}
              className="text-red-500 text-2xl my-5"
            />


            {
              user ? (
                <div className="flex sticky flex-col gap-2 items-center shrink-0 border-b">


                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      className="w-15 h-15 rounded-full"
                    />
                  ) : (
                    <FaRegUserCircle className="text-4xl text-green-500" />
                  )}

                  <div className='text-center'>
                    <h3 className="text-xl text-white font-bold">
                      {user.displayName
                        ? user.displayName
                        : 'User'}
                    </h3>
                    <p className='text-white'>Local User</p>
                  </div>
                </div>) : (<h2 className="text-2xl font-bold text-center text-green-500">DESHIMART</h2>)
            }

            <div className="mt-10 mb-8">
              <h3 className="text-[#84cc16] text-[10px] font-bold tracking-widest mb-4">
                QUICK ACCESS
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <Link onClick={() => setopen(false)}><Quick icon={<LuShoppingCart />} text="Cart" /></Link>
                <Link onClick={() => setopen(false)}><Quick icon={<FaRegHeart />} text="Wishlist" /></Link>
                <Link onClick={() => setopen(false)}><Quick icon={<LuPackage />} text="Orders" /></Link>
              </div>
            </div>

            <div className='flex-1 overflow-y-auto p-6'>
              <MobileSection title="My Account">
                <Link onClick={() => setopen(false)}><MobileLink icon={<FaRegUser />} text="My Account" /></Link>
                <Link onClick={() => setopen(false)}><MobileLink icon={<FaThLarge />} text="Dashboard" /></Link>
                <Link onClick={() => setopen(false)}><MobileLink icon={<FaCog />} text="Settings" /></Link>
                <Link onClick={() => setopen(false)} > <MobileLink icon={<FaArrowRight />} text="Help & Support" /></Link>
              </MobileSection>

              <MobileSection title="Navigation">
                <Link onClick={() => setopen(false)}><MobileNav to="/" icon={<HiOutlineHome />} text="Home" /></Link>
                <Link onClick={() => setopen(false)}><MobileNav to="/shop" icon={<LuShoppingCart />} text="Shop" /></Link>
                <Link onClick={() => setopen(false)}><MobileNav icon={<LuLayoutGrid />} text="Categories" /></Link>
                <Link onClick={() => setopen(false)}><MobileNav icon={<LuFlame />} text="Hot Deal" /></Link>
                <Link onClick={() => setopen(false)}><MobileNav icon={<LuBookOpen />} text="Blog" /></Link>
                <Link onClick={() => setopen(false)}><MobileNav icon={<MdCollectionsBookmark />} text="collection" /></Link>
                <Link onClick={() => setopen(false)}><MobileNav icon={<LiaStoreSolid />} text="clocal stores" /></Link>
                <Link onClick={() => setopen(false)}><MobileNav icon={<BiSolidContact />} text="contact" /></Link>
              </MobileSection>

              <hr className='text-2xl font-bold text-white' />

              {
                user ? (<button
                  onClick={handlelogout}
                  className="flex items-center gap-4 p-3 w-full hover:bg-red-50 rounded-lg"
                >
                  <FaSignOutAlt className="text-red-500" />
                  <span className="font-bold text-red-600">
                    Sign Out
                  </span>
                </button>) :
                  (<div className="flex gap-2 mt-5">
                    <Link onClick={() => setopen(false)} to="/sign-in">
                      <button className="border border-green-500 px-3 py-1.5 rounded text-green-500 font-bold ">
                        Sign In
                      </button>
                    </Link>
                    <Link onClick={() => setopen(false)} to="/sign-up">
                      <button className="bg-green-500 px-3 py-1.5 rounded text-white font-bold ">
                        Sign Up
                      </button>
                    </Link>
                  </div>)
              }



            </div>
          </div>
        ) : (
          <div className='flex justify-between items-center'>
            <div className="hidden md:flex justify-center gap-5 my-2.5">
              {['/', '/shop', '/hot-deal', '/collection', '/local-stores', '/blog', '/contact'].map((path, i) => (
                <NavLink
                  key={i}
                  to={path}
                  className={({ isActive }) =>
                    `font-bold border-b-2 pb-1 hover:text-green-500 ${isActive
                      ? 'text-green-500 border-green-500'
                      : 'border-transparent'
                    }`
                  }
                >
                  {path === '/' ? 'Home' : path.replace('/', '').replace('-', ' ')}
                </NavLink>
              ))}
            </div>

            <Link className='hidden hover:text-green-600 md:flex lg:flex items-center text-green-500 font-bold'>Go to Dashboard <FaArrowRight /></Link>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileLink = ({ to, icon, text, close }) => (
  <Link
    to={to}
    onClick={close}
    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg"
  >
    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
      {icon}
    </div>
    <span className="font-semibold">{text}</span>
  </Link>
);

const Quick = ({ icon, text }) => (
  <div className="bg-[#0a2e1a] p-3 rounded flex flex-col items-center gap-1 border border-white/5">
    <div className="text-green-500 text-lg">{icon}</div>
    <span className="text-white text-[10px]">{text}</span>
  </div>
);

const MobileSection = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-[#84cc16] text-[10px] font-bold tracking-widest mb-4 uppercase">
      {title}
    </h3>
    <div className="flex flex-col gap-4 pl-1">{children}</div>
  </div>
);

const MobileLink = ({ icon, text }) => (
  <Link className="text-gray-300 flex items-center gap-3 text-sm hover:text-white">
    {icon} {text}
  </Link>
);

const MobileNav = ({ to, icon, text }) => (
  <Link
    to={to}
    className="text-gray-300 flex items-center gap-3 p-3 rounded-md text-sm hover:bg-white/5"
  >
    {icon} {text}
  </Link>
);

export default Navbar;
