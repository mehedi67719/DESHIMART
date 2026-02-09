import React, { useState, useEffect } from 'react';
import {
    FaHome,
    FaBox,
    FaShoppingBag,
    FaUsers,
    FaChartBar,
    FaCreditCard,
    FaBell,
    FaCog,
    FaSignOutAlt,
    FaUserCircle,
    FaChevronRight,
    FaUser
} from 'react-icons/fa';
import Logo from '../../Component/Logo';
import { Link, useLocation } from 'react-router';
import { MdSell, MdUpload } from 'react-icons/md';

const Sidebar = ({ onItemClick }) => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);

    useEffect(() => {
        setActiveItem(location.pathname);
    }, [location.pathname]);

    const menuItems = [
        { path: "/dashboard", label: "Dashboard", icon: <FaHome /> },
        { path: "/dashboard/my-profile", label: "My Profile", icon: <FaUser /> },
        { path: "/dashboard/products", label: "My Uploaded Products", icon: <FaBox /> },
        { path: "/dashboard/upload-products", label: "Uploade New Product", icon: <MdUpload /> },
        { path: "/dashboard/myorder", label: "My Orders", icon: <FaShoppingBag /> },
        { path: "/dashboard/customers", label: "Customers", icon: <FaUsers /> },
        { path: "/dashboard/analytics", label: "Analytics", icon: <FaChartBar /> },
        { path: "/dashboard/payments", label: "Payment History", icon: <FaCreditCard /> },
        { path: "/dashboard/becomeaseller", label: "Become a Seller", icon: <MdSell/> },
        { path: "/dashboard/settings", label: "Settings", icon: <FaCog /> },
    ];

    const handleItemClick = (path) => {
        setActiveItem(path);
        if (onItemClick) onItemClick();
    };

    return (
        <div className="h-full flex flex-col bg-gradient-to-b from-white to-gray-50">
            <div className="p-5">
                <h2 className='text-3xl font-black text-black '>Dashboard</h2>
            </div>

            <nav className="flex-1 px-3">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                onClick={() => handleItemClick(item.path)}
                                className={`
                                    flex items-center px-4 py-3 rounded-xl transition-all duration-200 group
                                    ${activeItem === item.path 
                                        ? 'bg-green-600 text-white shadow-lg' 
                                        : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                                    }
                                `}
                            >
                                <span className={`text-xl ${activeItem === item.path ? 'text-white' : 'text-gray-500 group-hover:text-green-600'}`}>
                                    {item.icon}
                                </span>
                                <span className="ml-3 font-medium flex-1">{item.label}</span>
                                {activeItem === item.path ? (
                                    <FaChevronRight className="text-white" />
                                ) : (
                                    <div className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-green-400"></div>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                            <FaUserCircle className="text-white text-2xl" />
                        </div>
                        <div className="ml-3">
                            <p className="font-bold text-gray-800">Admin</p>
                            <p className="text-xs text-gray-600">Online</p>
                        </div>
                    </div>
                    <button className="w-full mt-4 flex items-center justify-center py-2 bg-white text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium">
                        <FaSignOutAlt className="mr-2" />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;