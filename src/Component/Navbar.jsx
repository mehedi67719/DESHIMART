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
  LuMessageCircleMore,
  LuPackage,
  LuShoppingCart
} from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';
import { Link, NavLink, useNavigate } from 'react-router';
import Useauth from './Useauth';
import Swal from 'sweetalert2';
import { MdCollectionsBookmark, MdSell } from 'react-icons/md';
import { LiaStoreSolid } from 'react-icons/lia';
import { BiSolidContact } from 'react-icons/bi';
import { IoNotifications } from 'react-icons/io5';
import Logo from './Logo';
import { admin_notification_read_update, adminNotificationcount, cartCount, favoritecount, getuser, notification_read_update, unread_Count, searchproducts } from './Api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const Navbar = () => {
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);
  const searchInputRef = useRef(null);
  const [open, setopen] = useState(false);
  const [profileopen, setprofileopen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const { user, logout } = Useauth();
  const [User, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
      if (modalRef.current && !modalRef.current.contains(e.target) && searchModalOpen) {
        setSearchModalOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchModalOpen]);

  useEffect(() => {
    if (searchModalOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [searchModalOpen]);

  const { data: searchResults = [], isLoading: searchLoading } = useQuery({
    queryKey: ["search-products", searchTerm],
    queryFn: () => searchproducts(searchTerm),
    enabled: searchTerm?.length >= 2 && searchModalOpen
  });

  const { data: cartData } = useQuery({
    queryKey: ["cart-count", user?.email],
    queryFn: () => cartCount(user.email),
    enabled: !!user?.email
  });

  const { data: favoriteData } = useQuery({
    queryKey: ["favorite-count", user?.email],
    queryFn: () => favoritecount(user.email),
    enabled: !!user?.email
  });

  const cartcount = cartData?.count || 0;
  const favoriteCount = favoriteData?.count || 0;

  const { data: userNotificationData } = useQuery({
    queryKey: ["user-notification-count", user?.email],
    queryFn: () => unread_Count(user.email),
    enabled: !!user?.email
  });

  const { data: adminNotificationData } = useQuery({
    queryKey: ["admin-notification-count", user?.email],
    queryFn: () => adminNotificationcount(user.email),
    enabled: !!user?.email && User?.role === 'admin'
  });

  const userNotificationCount = userNotificationData?.unreadCount || 0;
  const adminNotificationCount = adminNotificationData?.unreadCount || 0;

  const totalNotificationCount = User?.role === 'admin' 
    ? userNotificationCount + adminNotificationCount 
    : userNotificationCount;

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

  const userMutation = useMutation({
    mutationFn: notification_read_update,
    onSuccess: () => {
      queryClient.invalidateQueries(["user-notification-count", user?.email]);
    }
  });

  const adminMutation = useMutation({
    mutationFn: admin_notification_read_update,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-notification-count", user?.email]);
    }
  });

  const handleNotification = () => {
    if (!user) return;
    userMutation.mutate(user.email);
    if (User?.role === 'admin') {
      adminMutation.mutate(user.email);
    }
  };

  const handleSearchClick = () => {
    setSearchModalOpen(true);
  };

  const handleCloseModal = () => {
    setSearchModalOpen(false);
    setSearchTerm('');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleProductClick = (productId) => {
    setSearchModalOpen(false);
    setSearchTerm('');
    navigate(`/productsdetels/${productId}`);
  };

  const handleViewAllResults = () => {
    setSearchModalOpen(false);
    navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
    setSearchTerm('');
  };

  return (
    <div className="sticky relative top-0 z-50 bg-white py-5">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>

          <div onClick={handleSearchClick} className="flex-1 mx-2 md:mx-4 cursor-pointer">
            <div className="flex items-center gap-2 border border-green-500 rounded px-2 py-2 hover:border-green-600 transition-colors">
              <CiSearch className="text-xl text-gray-500" />
              <span className="text-sm text-gray-400">Search products...</span>
            </div>
          </div>

          {searchModalOpen && (
            <div className="fixed inset-0 bg-black/50 z-[100] flex items-start justify-center pt-20">
              <div ref={modalRef} className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-4 border-b flex items-center gap-3">
                  <CiSearch className="text-2xl text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search for products..."
                    className="flex-1 outline-none text-lg"
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm('')} className="text-gray-400 hover:text-gray-600">
                      <RxCross2 className="text-2xl" />
                    </button>
                  )}
                  <button onClick={handleCloseModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    Cancel
                  </button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto">
                  {searchTerm.length < 2 ? (
                    <div className="p-8 text-center">
                      <CiSearch className="text-6xl text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Type at least 2 characters to start searching</p>
                    </div>
                  ) : searchLoading ? (
                    <div className="p-8 text-center">
                      <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="text-gray-500 mt-4">Searching products...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="p-2">
                      {searchResults.map((product) => (
                        <button
                          key={product._id}
                          onClick={() => handleProductClick(product._id)}
                          className="w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-center gap-4 border-b last:border-b-0"
                        >
                          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-800">{product.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">৳{product.price?.toLocaleString()}</p>
                            {product.category && (
                              <span className="text-xs text-green-600 mt-1 inline-block">{product.category}</span>
                            )}
                          </div>
                        </button>
                      ))}
                      {searchResults.length > 0 && (
                        <button onClick={handleViewAllResults} className="w-full p-4 text-center text-green-600 hover:bg-green-50 font-medium transition-colors flex items-center justify-center gap-2">
                          See all {searchResults.length} results <FaArrowRight className="text-sm" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CiSearch className="text-4xl text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">No results found</h3>
                      <p className="text-gray-500">We couldn't find any products matching "{searchTerm}"</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 relative">
            <div className="relative">
              <Link to='/cart'>
                <LuShoppingCart className="text-2xl sm:text-3xl lg:text-4xl text-gray-700 hover:text-green-500 transition-colors" />
              </Link>
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {user ? cartcount : 0}
              </span>
            </div>

            <div className="relative hidden md:block">
              <Link to='/favorite'>
                <FaRegHeart className="text-2xl sm:text-3xl lg:text-4xl text-gray-700 hover:text-green-500 transition-colors" />
              </Link>
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {user ? favoriteCount : 0}
              </span>
            </div>

            <div className='relative hidden md:block'>
              <Link to='/massenger'>
                <LuMessageCircleMore className='text-2xl sm:text-3xl lg:text-4xl text-gray-700 hover:text-green-500 transition-colors' />
              </Link>
              <span className='absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>5</span>
            </div>

            <div className="relative hidden md:block">
              <button onClick={handleNotification}>
                <Link to="/notification">
                  <IoNotifications className="text-2xl sm:text-3xl lg:text-4xl text-gray-700 hover:text-green-500 transition-colors" />
                </Link>
              </button>
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {user ? totalNotificationCount : 0}
              </span>
            </div>

            <div className="hidden md:block">
              {user ? (
                <button onClick={() => setprofileopen(!profileopen)} className="flex items-center gap-2 border border-green-500 rounded-xl px-3 py-1.5 hover:bg-green-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <h3 className="text-sm font-semibold text-gray-800">{user.displayName ? user.displayName.split(' ')[0] : 'User'}</h3>
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      ) : (
                        <p className="text-xs text-gray-500 capitalize">{User?.role || 'User'}</p>
                      )}
                    </div>
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="profile" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <FaRegUserCircle className="text-3xl text-green-500" />
                    )}
                  </div>
                </button>
              ) : (
                <div className="flex gap-2">
                  <Link to="/sign-in">
                    <button className="border border-green-500 px-4 py-1.5 rounded text-green-500 font-semibold text-sm hover:bg-green-50 transition-colors">Sign In</button>
                  </Link>
                  <Link to="/sign-up">
                    <button className="bg-green-500 px-4 py-1.5 rounded text-white font-semibold text-sm hover:bg-green-600 transition-colors">Sign Up</button>
                  </Link>
                </div>
              )}
            </div>

            {profileopen && user && (
              <div ref={dropdownRef} className="absolute right-0 top-[60px] w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                <div className="bg-green-600 p-5 rounded-t-xl">
                  <div className="flex items-center gap-3">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="profile" className="w-12 h-12 rounded-full border-2 border-white" />
                    ) : (
                      <FaRegUserCircle className="text-5xl text-white" />
                    )}
                    <div>
                      <h2 className="text-white font-semibold">{User?.displayName || user.displayName || 'User'}</h2>
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
                  <button onClick={handlelogout} className="flex items-center gap-3 p-3 w-full hover:bg-red-50 rounded-lg transition-colors">
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
              <Link to='/massenger'>
                <LuMessageCircleMore className='text-3xl text-gray-700' />
              </Link>
              <span className='absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>5</span>
            </div>
            <div className="relative">
              <Link to="/notification">
                <IoNotifications className="text-3xl text-gray-700" />
              </Link>
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {user ? totalNotificationCount : 0}
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
                      <h3 className="font-semibold text-gray-800">{user.displayName || 'User'}</h3>
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
                      {user && cartcount > 0 && (
                        <span className="text-xs bg-green-500 text-white px-1.5 rounded-full">{cartcount}</span>
                      )}
                    </Link>
                    <Link to="/favorite" onClick={() => setopen(false)} className="bg-gray-50 p-3 rounded-lg flex flex-col items-center gap-1">
                      <FaRegHeart className="text-xl text-green-600" />
                      <span className="text-xs text-gray-600">Wishlist</span>
                      {user && favoriteCount > 0 && (
                        <span className="text-xs bg-green-500 text-white px-1.5 rounded-full">{favoriteCount}</span>
                      )}
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
                    <Link to="/sign-in" onClick={() => setopen(false)} className="flex-1 border border-green-500 text-green-500 text-center py-2 rounded-lg font-semibold text-sm">Sign In</Link>
                    <Link to="/sign-up" onClick={() => setopen(false)} className="flex-1 bg-green-500 text-white text-center py-2 rounded-lg font-semibold text-sm">Sign Up</Link>
                  </div>
                )}
                {user && (
                  <button onClick={() => { handlelogout(); setopen(false); }} className="w-full flex items-center justify-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg font-medium mt-4">
                    <FaSignOutAlt className="text-lg" /> Sign Out
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
                  `font-medium text-sm border-b-2 pb-1 transition-colors ${isActive ? 'text-green-600 border-green-600' : 'text-gray-600 border-transparent hover:text-green-600'}`
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
  <Link to={to} onClick={close} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg text-gray-600">{icon}</div>
    <span className="text-sm font-medium text-gray-700">{text}</span>
  </Link>
);

const MobileLink = ({ to, icon, text, onClick }) => (
  <Link to={to} onClick={onClick} className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-colors">
    <span className="text-lg w-5">{icon}</span>
    <span>{text}</span>
  </Link>
);

export default Navbar;