import React, { useState, useEffect } from 'react';
import {
    FaHome,
    FaBox,
    FaShoppingBag,
    FaUsers,
    FaChartBar,
    FaCreditCard,
    FaCog,
    FaSignOutAlt,
    FaUserCircle,
    FaChevronRight,
    FaUser
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router';
import { MdSell, MdUpload } from 'react-icons/md';
import { getuser } from '../../Component/Api';
import Useauth from '../../Component/Useauth';

const Sidebar = ({ onItemClick }) => {
    const { user, logout } = Useauth();
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);
    const [userRole, setUserRole] = useState('buyer'); 
    const [userName, setUserName] = useState('User');

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user?.email) {
                try {
                    const userData = await getuser(user.email);
                    setUserRole(userData.role || 'buyer');
                    setUserName(userData.name || user?.displayName || 'User');
                } catch (error) {
                    console.error("Failed to fetch user role:", error);
                }
            }
        };
        fetchUserRole();
    }, [user?.email]);

    useEffect(() => {
        setActiveItem(location.pathname);
    }, [location.pathname]);

    const getMenuItems = () => {
        const commonMenu = [
            { path: "/dashboard", label: "Dashboard", icon: <FaHome />, key: "dashboard" },
            { path: "/dashboard/my-profile", label: "My Profile", icon: <FaUser />, key: "profile" },
            { path: "/dashboard/payments", label: "Payment History", icon: <FaCreditCard />, key: "payments" },
            
        ];

        if (userRole === 'buyer') {
            return [
                ...commonMenu,
                { path: "/dashboard/myorder", label: "My Orders", icon: <FaShoppingBag />, key: "buyer-orders" },
                { path: "/dashboard/becomeaseller", label: "Become a Seller", icon: <MdSell />, key: "become-seller" },
                { path: "/dashboard/settings", label: "Settings", icon: <FaCog />, key: "settings-buyer" },
            ];
        }
        
        if (userRole === 'seller') {
            return [
                ...commonMenu,
                { path: "/dashboard/products", label: "My Products", icon: <FaBox />, key: "my-products" },
                { path: "/dashboard/myorder", label: "My Orders", icon: <FaShoppingBag />, key: "buyer-orders" },
                { path: "/dashboard/buyer-order", label: "Buyer Orders", icon: <FaShoppingBag />, key: "buyer-orders-seller" },
                { path: "/dashboard/upload-products", label: "Upload New Product", icon: <MdUpload />, key: "upload-product" },
                { path: "/dashboard/my-customer", label: "My Customers", icon: <FaUsers />, key: "customers" },
                { path: "/dashboard/analytics", label: "Analytics", icon: <FaChartBar />, key: "analytics-seller" },
                { path: "/dashboard/settings", label: "Settings", icon: <FaCog />, key: "settings-seller" },
            ];
        }
   
        if (userRole === 'admin') {
            return [
                ...commonMenu,
                { path: "/dashboard/all-users", label: "All Users", icon: <FaUsers />, key: "all-users" },
                { path: "/dashboard/all-products", label: "All Products", icon: <FaBox />, key: "all-products" },
                { path: "/dashboard/pending-products", label: "Pending Approvals", icon: <MdUpload />, key: "pending" },
                { path: "/dashboard/myorder", label: "My Orders", icon: <FaShoppingBag />, key: "buyer-orders" },
                { path: "/dashboard/analytics", label: "Analytics", icon: <FaChartBar />, key: "analytics-admin" },
                { path: "/dashboard/settings", label: "Settings", icon: <FaCog />, key: "settings-admin" },
            ];
        }

        return commonMenu;
    };

    const menuItems = getMenuItems();

    const handleItemClick = (path) => {
        setActiveItem(path);
        if (onItemClick) onItemClick();
    };

    const getRoleText = () => {
        if (userRole === 'admin') return 'Admin';
        if (userRole === 'seller') return 'Seller';
        return 'Buyer';
    };

    return (
        <div className="h-full flex flex-col bg-gradient-to-b from-white to-gray-50">
            <div className="p-5">
                <h2 className='text-3xl font-black text-black'>Dashboard</h2>
            </div>

            <nav className="flex-1 px-3">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.key}>
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
                            <p className="font-bold text-gray-800">{userName}</p>
                            <p className="text-xs text-gray-600">{getRoleText()}</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => logout()}
                        className="w-full mt-4 flex items-center justify-center py-2 bg-white text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                    >
                        <FaSignOutAlt className="mr-2" />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;