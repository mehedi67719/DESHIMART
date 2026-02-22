import React from 'react';
import { ShoppingBag, Package, Users, DollarSign } from 'lucide-react';

const DashboardHeader = () => {

    // ========== STATIC DATA ==========
    const staticStats = {
        // Order stats
        totalOrders: 45678,
        completedOrders: 42345,
        
        // Product stats
        totalProducts: 12345,
        
        // User stats
        totalUsers: 25431,
        totalBuyers: 21975,
        totalSellers: 3456,
        newUsersToday: 127,
        
        // Revenue stats
        totalRevenue: 8923456,
        monthlyRevenue: 987654,
        todayRevenue: 34567,
        
        // Product approval stats
        approvedProducts: 9876,
        pendingProducts: 1567,
        rejectedProducts: 902,
        
        // Payment stats
        successfulPayments: 44567,
        failedPayments: 567,
        refundedOrders: 544
    };

    return (
        <div className="grid grid-cols-4 gap-4">
            {/* Total Orders Card */}
            <div className="bg-white rounded-xl p-6 border hover:shadow-lg transition-shadow">
                <div className="flex justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Orders</p>
                        <h3 className="text-2xl font-bold mt-1 text-gray-800">
                            {staticStats.totalOrders.toLocaleString()}
                        </h3>
                        <p className="text-xs text-gray-500 mt-2">
                            Completed: {staticStats.completedOrders.toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                        <ShoppingBag className="w-6 h-6 text-purple-600" />
                    </div>
                </div>
                <div className="mt-3 text-xs text-green-600">
                    ↑ 12% from last month
                </div>
            </div>

            {/* Total Products Card */}
            <div className="bg-white rounded-xl p-6 border hover:shadow-lg transition-shadow">
                <div className="flex justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Products</p>
                        <h3 className="text-2xl font-bold mt-1 text-gray-800">
                            {staticStats.totalProducts.toLocaleString()}
                        </h3>
                        <p className="text-xs text-gray-500 mt-2">
                            Approved: {staticStats.approvedProducts.toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                        <Package className="w-6 h-6 text-orange-600" />
                    </div>
                </div>
                <div className="mt-3 text-xs text-green-600">
                    ↑ 8% from last month
                </div>
            </div>

            {/* Total Users Card */}
            <div className="bg-white rounded-xl p-6 border hover:shadow-lg transition-shadow">
                <div className="flex justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Users</p>
                        <h3 className="text-2xl font-bold mt-1 text-gray-800">
                            {staticStats.totalUsers.toLocaleString()}
                        </h3>
                        <div className="flex gap-3 mt-2">
                            <p className="text-xs text-gray-500">
                                Buyers: {staticStats.totalBuyers.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">
                                Sellers: {staticStats.totalSellers.toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600" />
                    </div>
                </div>
                <div className="mt-3 text-xs text-green-600">
                    ↑ {staticStats.newUsersToday} new today
                </div>
            </div>

            {/* Total Revenue Card */}
            <div className="bg-white rounded-xl p-6 border hover:shadow-lg transition-shadow">
                <div className="flex justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                        <h3 className="text-2xl font-bold mt-1 text-gray-800">
                            ${(staticStats.totalRevenue / 1000000).toFixed(1)}M
                        </h3>
                        <div className="flex gap-3 mt-2">
                            <p className="text-xs text-gray-500">
                                Monthly: ${(staticStats.monthlyRevenue / 1000).toFixed(0)}K
                            </p>
                            <p className="text-xs text-gray-500">
                                Today: ${(staticStats.todayRevenue / 1000).toFixed(0)}K
                            </p>
                        </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                        <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                </div>
                <div className="mt-3 text-xs text-green-600">
                    ↑ 15% from last month
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;