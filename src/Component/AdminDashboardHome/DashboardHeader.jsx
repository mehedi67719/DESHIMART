import React from 'react';
import { ShoppingBag, Package, Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { allTotal } from '../Api';

const DashboardHeader = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["all-total"],
        queryFn: allTotal
    });

    const SkeletonCard = () => (
        <div className="bg-white rounded-xl p-4 sm:p-6 border animate-pulse">
            <div className="flex justify-between">
                <div className="flex-1">
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-16 sm:w-24 mb-1 sm:mb-2"></div>
                    <div className="h-6 sm:h-8 bg-gray-200 rounded w-20 sm:w-32"></div>
                </div>
                <div className="bg-gray-200 p-2 sm:p-3 rounded-lg w-8 h-8 sm:w-12 sm:h-12"></div>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm sm:text-base">
                Error loading data. Please try again.
            </div>
        );
    }

    const stats = data || { totalOrders: 0, totalUsers: 0, totalProducts: 0 };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-white rounded-xl p-4 sm:p-6 border hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-xs sm:text-sm font-medium">Total Orders</p>
                        <h3 className="text-xl sm:text-2xl font-bold mt-0.5 sm:mt-1 text-gray-800">
                            {stats.totalOrders?.toLocaleString() || 0}
                        </h3>
                    </div>
                    <div className="bg-purple-50 p-2 sm:p-3 rounded-lg">
                        <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 border hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-xs sm:text-sm font-medium">Total Products</p>
                        <h3 className="text-xl sm:text-2xl font-bold mt-0.5 sm:mt-1 text-gray-800">
                            {stats.totalProducts?.toLocaleString() || 0}
                        </h3>
                    </div>
                    <div className="bg-orange-50 p-2 sm:p-3 rounded-lg">
                        <Package className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 border hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-xs sm:text-sm font-medium">Total Users</p>
                        <h3 className="text-xl sm:text-2xl font-bold mt-0.5 sm:mt-1 text-gray-800">
                            {stats.totalUsers?.toLocaleString() || 0}
                        </h3>
                    </div>
                    <div className="bg-blue-50 p-2 sm:p-3 rounded-lg">
                        <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;