import React from 'react';
import { ShoppingBag, Package, Users, DollarSign } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { allTotal } from '../Api';

const DashboardHeader = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["all-total"],
        queryFn: allTotal
    });

    const SkeletonCard = () => (
        <div className="bg-white rounded-xl p-6 border animate-pulse">
            <div className="flex justify-between">
                <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="bg-gray-200 p-3 rounded-lg w-12 h-12"></div>
            </div>
            <div className="mt-3 h-3 bg-gray-200 rounded w-28"></div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="grid grid-cols-4 gap-4">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                Error loading data. Please try again.
            </div>
        );
    }

    const stats = data || { totalOrders: 0, totalUsers: 0, totalProducts: 0 };

    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-6 border hover:shadow-lg transition-shadow">
                <div className="flex justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Orders</p>
                        <h3 className="text-2xl font-bold mt-1 text-gray-800">
                            {stats.totalOrders?.toLocaleString() || 0}
                        </h3>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                        <ShoppingBag className="w-6 h-6 text-purple-600" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 border hover:shadow-lg transition-shadow">
                <div className="flex justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Products</p>
                        <h3 className="text-2xl font-bold mt-1 text-gray-800">
                            {stats.totalProducts?.toLocaleString() || 0}
                        </h3>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                        <Package className="w-6 h-6 text-orange-600" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 border hover:shadow-lg transition-shadow">
                <div className="flex justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Users</p>
                        <h3 className="text-2xl font-bold mt-1 text-gray-800">
                            {stats.totalUsers?.toLocaleString() || 0}
                        </h3>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 border hover:shadow-lg transition-shadow">
                <div className="flex justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                        <h3 className="text-2xl font-bold mt-1 text-gray-800">
                            $0
                        </h3>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                        <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;