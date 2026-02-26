import React, { useState } from 'react';
import {
    Home, ShoppingCart, PieChart as PieChartIcon, BarChart3
} from 'lucide-react';

import Useauth from '../Useauth';
import BuyerDashboardHome from '../BuyerDashboardHome/BuyerDashboardHome';
import PlatformGrowthAndCategories from './PlatformGrowthAndCategories';
import PaymentProductsAndOrderStatus from './PaymentProductsAndOrderStatus';
import TopFiveProducts from './TopFiveProducts';
import Topsellerandbuyer from './Topsellerandbuyer';
import SellingAndOrder from './SellingAndOrder';
import DashboardHeader from './DashboardHeader';

const AdminDashboardHome = () => {
    const { user } = Useauth();
    const [activeView, setActiveView] = useState('admin');




    const AdminView = () => (
        <div className="space-y-6">


            <DashboardHeader />


            <SellingAndOrder />


            <PlatformGrowthAndCategories />

            <PaymentProductsAndOrderStatus />


            <TopFiveProducts />


            <Topsellerandbuyer />
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-white border-b px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-10">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Dashboard</h1>
                        <p className="text-xs sm:text-sm text-gray-500 truncate max-w-[200px] sm:max-w-none">
                            Welcome back, {user?.displayName || 'Admin'}
                        </p>
                    </div>
                    <div className="flex gap-1 sm:gap-2 bg-gray-100 p-1 rounded-lg self-start sm:self-auto">
                        <button
                            onClick={() => setActiveView('admin')}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 transition-all text-xs sm:text-sm ${activeView === 'admin'
                                    ? 'bg-white shadow text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <Home className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden xs:inline">As</span> Admin
                        </button>
                        <button
                            onClick={() => setActiveView('buyer')}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 transition-all text-xs sm:text-sm ${activeView === 'buyer'
                                    ? 'bg-white shadow text-green-600'
                                    : 'text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden xs:inline">As</span> Buyer
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-4">
                {activeView === 'admin' ? <AdminView /> : <BuyerDashboardHome />}
            </div>
        </div>
    );
};

export default AdminDashboardHome;