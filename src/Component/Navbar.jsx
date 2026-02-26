import React, { useEffect, useRef, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import {
  FaArrowRight,
  FaBox,
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
import { MdCollectionsBookmark, MdSell } from 'react-icons/md';
import { LiaStoreSolid } from 'react-icons/lia';
import { BiSolidContact } from 'react-icons/bi';
import { IoNotifications } from 'react-icons/io5';
import Logo from './Logo';
import { getuser } from './Api';

const Navbar = () => {
  const dropdownRef = useRef(null);
  const [open, setopen] = useState(false);
  const [profileopen, setprofileopen] = useState(false);
  const { user, logout } = Useauth();
  const [User, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/shop', name: 'Shop' },
    { path: '/hot-deal', name: 'Hot Deal' },
    { path: '/collection', name: 'Collection' },
    { path: '/local-stores', name: 'Local Stores' },
    { path: '/blog', name: 'Blog' },
    { path: '/contact', name: 'Contact' }
  ];

  useEffect(() => {
    if (!user?.email) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await getuser(user.email);
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

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
        title: 'Logged Out',
        text: 'Logged out successfully.',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      });
    });
  };

  return (
    <div className="sticky relative top-0 z-50 bg-white py-5">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>

          <div className="flex flex-1 items-center gap-2 border border-green-500 rounded px-2 mx-2 md:mx-4">
            <CiSearch className="text-xl text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              className="outline-none py-2 w-full text-sm"
            />
          </div>

          <div className="flex items-center gap-3 sm:gap-4 relative">
            <div className="relative">
              <Link to='/cart'>
                <LuShoppingCart className="text-2xl sm:text-3xl lg:text-4xl text-gray-700 hover:text-green-500 transition-colors" />
              </Link>
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                0
              </span>
            </div>

            <div className="relative hidden md:block">
              <Link to='/favorite'>
                <FaRegHeart className="text-2xl sm:text-3xl lg:text-4xl text-gray-700 hover:text-green-500 transition-colors" />
              </Link>
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                1
              </span>
            </div>

            <div className='relative hidden md:block'>
              <Link to='/massenger'>
                <LuMessageCircleMore className='text-2xl sm:text-3xl lg:text-4xl text-gray-700 hover:text-green-500 transition-colors' />
              </Link>
              <span className='absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                5
              </span>
            </div>

            <div className="relative hidden md:block">
              <Link to="/notification">
                <IoNotifications className="text-2xl sm:text-3xl lg:text-4xl text-gray-700 hover:text-green-500 transition-colors" />
              </Link>
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                0
              </span>
            </div>

            <div className="hidden md:block">
              {user ? (
                <button
                  onClick={() => setprofileopen(!profileopen)}
                  className="flex items-center gap-2 border border-green-500 rounded-xl px-3 py-1.5 hover:bg-green-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <h3 className="text-sm font-semibold text-gray-800">
                        {user.displayName ? user.displayName.split(' ')[0] : 'User'}
                      </h3>
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      ) : (
                        <p className="text-xs text-gray-500 capitalize">{User?.role || 'User'}</p>
                      )}
                    </div>
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <FaRegUserCircle className="text-3xl text-green-500" />
                    )}
                  </div>
                </button>
              ) : (
                <div className="flex gap-2">
                  <Link to="/sign-in">
                    <button className="border border-green-500 px-4 py-1.5 rounded text-green-500 font-semibold text-sm hover:bg-green-50 transition-colors">
                      Sign In
                    </button>
                  </Link>
                  <Link to="/sign-up">
                    <button className="bg-green-500 px-4 py-1.5 rounded text-white font-semibold text-sm hover:bg-green-600 transition-colors">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {profileopen && user && (
              <div
                ref={dropdownRef}
                className="absolute right-0 top-[60px] w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
              >
                <div className="bg-green-600 p-5 rounded-t-xl">
                  <div className="flex items-center gap-3">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="profile"
                        className="w-12 h-12 rounded-full border-2 border-white"
                      />
                    ) : (
                      <FaRegUserCircle className="text-5xl text-white" />
                    )}
                    <div>
                      <h2 className="text-white font-semibold">
                        {User?.displayName || user.displayName || 'User'}
                      </h2>
                      <p className="text-white/80 text-sm truncate max-w-[180px]">{user.email}</p>
                    </div>
                  </div>
                </div>

                <nav className="p-3">
                  <ProfileLink to="/dashboard/my-profile" icon={<FaUser />} text="My Profile" close={() => setprofileopen(false)} />
                  <ProfileLink to="/dashboard/myorder" icon={<FaBox />} text="My Orders" close={() => setprofileopen(false)} />
                  <ProfileLink to="/favorite" icon={<FaHeart />} text="Wishlist" close={() => setprofileopen(false)} />
                  <ProfileLink to="/dashboard" icon={<FaThLarge />} text="Dashboard" close={() => setprofileopen(false)} />
                  <ProfileLink to="/dashboard/becomeaseller" icon={<MdSell />} text="Become a Seller" close={() => setprofileopen(false)} />
                  <div className="border-t my-2"></div>
                  <ProfileLink to="/help" icon={<FaQuestionCircle />} text="Help & Support" close={() => setprofileopen(false)} />
                  <div className="border-t my-2"></div>
                  <button
                    onClick={handlelogout}
                    className="flex items-center gap-3 p-3 w-full hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FaSignOutAlt className="text-red-500 text-lg" />
                    <span className="font-medium text-red-600">Sign Out</span>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="mt-5 opacity-20" />

      <div className="container py-0">
        <div className="mb-2 mt-5 md:hidden flex items-center justify-between">
          <button onClick={() => setopen(true)} className="p-2">
            <HiOutlineBars3 className="text-3xl text-gray-700" />
          </button>

          <div className='flex items-center gap-4'>
            <div className='relative'>
              <Link to='/messenger'>
                <LuMessageCircleMore className='text-3xl text-gray-700' />
              </Link>
              <span className='absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                5
              </span>
            </div>

            <div className="relative">
              <Link to="/notification">
                <IoNotifications className="text-3xl text-gray-700" />
              </Link>
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                0
              </span>
            </div>
          </div>
        </div>

        {open && (
          <div className="fixed inset-0 bg-black/50 z-50">
            <div className="fixed inset-y-0 left-0 w-[280px] bg-white z-50 shadow-2xl flex flex-col">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold text-green-600">DESHIMART</h2>
                <button onClick={() => setopen(false)} className="p-2">
                  <RxCross2 className="text-2xl text-gray-600" />
                </button>
              </div>

              {user && (
                <div className="p-4 border-b bg-gray-50">
                  <div className="flex items-center gap-3">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="profile" className="w-12 h-12 rounded-full" />
                    ) : (
                      <FaRegUserCircle className="text-4xl text-green-500" />
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {user.displayName || 'User'}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize">{User?.role || 'User'}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-y-auto p-4">
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-green-600 tracking-wider mb-3">QUICK ACCESS</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Link to="/cart" onClick={() => setopen(false)} className="bg-gray-50 p-3 rounded-lg flex flex-col items-center gap-1">
                      <LuShoppingCart className="text-xl text-green-600" />
                      <span className="text-xs text-gray-600">Cart</span>
                    </Link>
                    <Link to="/favorite" onClick={() => setopen(false)} className="bg-gray-50 p-3 rounded-lg flex flex-col items-center gap-1">
                      <FaRegHeart className="text-xl text-green-600" />
                      <span className="text-xs text-gray-600">Wishlist</span>
                    </Link>
                    <Link to="/dashboard/myorder" onClick={() => setopen(false)} className="bg-gray-50 p-3 rounded-lg flex flex-col items-center gap-1">
                      <LuPackage className="text-xl text-green-600" />
                      <span className="text-xs text-gray-600">Orders</span>
                    </Link>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xs font-bold text-green-600 tracking-wider mb-3">MY ACCOUNT</h3>
                  <div className="space-y-1">
                    <MobileLink to="/dashboard/my-profile" icon={<FaRegUser />} text="My Profile" onClick={() => setopen(false)} />
                    <MobileLink to="/dashboard" icon={<FaThLarge />} text="Dashboard" onClick={() => setopen(false)} />
                    <MobileLink to="/dashboard/becomeaseller" icon={<MdSell />} text="Become a Seller" onClick={() => setopen(false)} />
                    <MobileLink to="/help" icon={<FaQuestionCircle />} text="Help & Support" onClick={() => setopen(false)} />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xs font-bold text-green-600 tracking-wider mb-3">NAVIGATION</h3>
                  <div className="space-y-1">
                    {navLinks.map((link, index) => (
                      <MobileLink 
                        key={index}
                        to={link.path} 
                        icon={
                          link.path === '/' ? <HiOutlineHome /> :
                          link.path === '/shop' ? <LuShoppingCart /> :
                          link.path === '/hot-deal' ? <LuFlame /> :
                          link.path === '/collection' ? <MdCollectionsBookmark /> :
                          link.path === '/local-stores' ? <LiaStoreSolid /> :
                          link.path === '/blog' ? <LuBookOpen /> :
                          <BiSolidContact />
                        } 
                        text={link.name} 
                        onClick={() => setopen(false)} 
                      />
                    ))}
                  </div>
                </div>

                {!user && (
                  <div className="flex gap-2 mt-4">
                    <Link to="/sign-in" onClick={() => setopen(false)} className="flex-1 border border-green-500 text-green-500 text-center py-2 rounded-lg font-semibold text-sm">
                      Sign In
                    </Link>
                    <Link to="/sign-up" onClick={() => setopen(false)} className="flex-1 bg-green-500 text-white text-center py-2 rounded-lg font-semibold text-sm">
                      Sign Up
                    </Link>
                  </div>
                )}

                {user && (
                  <button
                    onClick={() => {
                      handlelogout();
                      setopen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg font-medium mt-4"
                  >
                    <FaSignOutAlt className="text-lg" />
                    Sign Out
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="hidden md:flex justify-between items-center">
          <div className="flex justify-center gap-6 my-2.5">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  `font-medium text-sm border-b-2 pb-1 transition-colors ${isActive
                    ? 'text-green-600 border-green-600'
                    : 'text-gray-600 border-transparent hover:text-green-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <Link to="/dashboard" className="hidden md:flex items-center gap-2 text-green-600 font-medium text-sm hover:text-green-700">
            Go to Dashboard <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const ProfileLink = ({ to, icon, text, close }) => (
  <Link
    to={to}
    onClick={close}
    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
  >
    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg text-gray-600">
      {icon}
    </div>
    <span className="text-sm font-medium text-gray-700">{text}</span>
  </Link>
);

const MobileLink = ({ to, icon, text, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-colors"
  >
    <span className="text-lg w-5">{icon}</span>
    <span>{text}</span>
  </Link>
);

export default Navbar;