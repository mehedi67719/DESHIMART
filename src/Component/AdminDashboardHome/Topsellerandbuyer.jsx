import React from 'react';
import { Store, Users, ShoppingBag, Package } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { topfivebuyer, topfiveseller } from '../Api';

const Topsellerandbuyer = () => {
    const { data: sellerData, isLoading: sellerLoading, error: sellerError } = useQuery({
        queryKey: ["top-seller"],
        queryFn: topfiveseller
    });

    const { data: buyerData, isLoading: buyerLoading, error: buyerError } = useQuery({
        queryKey: ["top-buyer"],
        queryFn: topfivebuyer
    });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : 'U';
    };

    const SkeletonCard = () => (
        <div className="bg-white rounded-xl p-4 sm:p-6 border animate-pulse">
            <div className="h-5 sm:h-6 bg-gray-200 rounded w-1/3 mb-4 sm:mb-6"></div>
            <div className="space-y-2 sm:space-y-3">
                {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="flex justify-between items-center py-2 sm:py-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                            <div className="min-w-0 flex-1">
                                <div className="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24 mb-1 sm:mb-2"></div>
                                <div className="h-2 sm:h-3 bg-gray-200 rounded w-24 sm:w-32"></div>
                            </div>
                        </div>
                        <div className="text-right ml-2">
                            <div className="h-3 sm:h-4 bg-gray-200 rounded w-12 sm:w-16 mb-1 sm:mb-2"></div>
                            <div className="h-2 sm:h-3 bg-gray-200 rounded w-14 sm:w-20"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    if (sellerLoading || buyerLoading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <SkeletonCard />
                <SkeletonCard />
            </div>
        );
    }

    if (sellerError || buyerError) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm sm:text-base">
                Error loading data. Please try again.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl p-4 sm:p-6 border hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                        <Store className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        <span className="text-gray-800">Top Sellers</span>
                    </h3>
                </div>

                <div className="space-y-2 sm:space-y-3">
                    {sellerData && sellerData.length > 0 ? (
                        sellerData.map((seller, index) => (
                            <div 
                                key={index} 
                                className="flex flex-col xs:flex-row xs:justify-between xs:items-center border-b border-gray-100 py-2 sm:py-3 hover:bg-gray-50 px-2 rounded-lg transition-colors group gap-2"
                            >
                                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-md flex-shrink-0 text-xs sm:text-sm">
                                        {getInitials(seller.shopName || seller._id)}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors text-xs sm:text-sm truncate">
                                            {seller.shopName || seller._id}
                                        </p>
                                        <div className="flex items-center gap-1 sm:gap-2 mt-0.5">
                                            <span className="text-[10px] sm:text-xs bg-gray-100 text-gray-600 px-1.5 sm:px-2 py-0.5 rounded-full truncate max-w-[120px] sm:max-w-[180px]">
                                                {seller._id}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right ml-0 xs:ml-2 flex xs:block items-center justify-between">
                                    <p className="font-bold text-green-600 text-xs sm:text-sm">
                                        {formatCurrency(seller.totalSold || 0)}
                                    </p>
                                    <div className="flex items-center gap-1 mt-0 xs:mt-1 justify-end">
                                        <Package className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" />
                                        <span className="text-[10px] sm:text-xs text-gray-500">{seller.totalProducts || 0}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-4 text-xs sm:text-sm">No seller data available</p>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 border hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        <span className="text-gray-800">Top Buyers</span>
                    </h3>
                </div>

                <div className="space-y-2 sm:space-y-3">
                    {buyerData && buyerData.length > 0 ? (
                        buyerData.map((buyer, index) => (
                            <div 
                                key={index} 
                                className="flex flex-col xs:flex-row xs:justify-between xs:items-center border-b border-gray-100 py-2 sm:py-3 hover:bg-gray-50 px-2 rounded-lg transition-colors group gap-2"
                            >
                                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center font-bold text-white shadow-md flex-shrink-0 text-xs sm:text-sm">
                                        {getInitials(buyer.customerName || buyer._id)}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors text-xs sm:text-sm truncate">
                                            {buyer.customerName || buyer._id}
                                        </p>
                                        <div className="flex items-center gap-1 sm:gap-2 mt-0.5">
                                            <span className="text-[10px] sm:text-xs text-gray-400 truncate max-w-[120px] sm:max-w-[180px]">
                                                📍 {buyer._id}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right ml-0 xs:ml-2 flex xs:block items-center justify-between">
                                    <p className="font-bold text-green-600 text-xs sm:text-sm">
                                        {formatCurrency(buyer.totalSpent || 0)}
                                    </p>
                                    <div className="flex items-center gap-1 sm:gap-2 mt-0 xs:mt-1 justify-end">
                                        <ShoppingBag className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" />
                                        <span className="text-[10px] sm:text-xs text-gray-500">{buyer.totalOrders || 0}</span>
                                        <Package className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 ml-0.5" />
                                        <span className="text-[10px] sm:text-xs text-gray-500">{buyer.totalItems || 0}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-4 text-xs sm:text-sm">No buyer data available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Topsellerandbuyer;