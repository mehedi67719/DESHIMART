import React from 'react';
import { Store, Users, Star, ShoppingBag, Package, DollarSign } from 'lucide-react';

const Topsellerandbuyer = () => {

    // ========== STATIC TOP SELLERS DATA ==========
    const topSellers = [
        { 
            name: 'TechZone', 
            products: 156, 
            revenue: 4567890, 
            rating: 4.9,
            avatar: 'T',
            category: 'Electronics',
            orders: 2345
        },
        { 
            name: 'FashionHub', 
            products: 234, 
            revenue: 6789012, 
            rating: 4.8,
            avatar: 'F',
            category: 'Fashion',
            orders: 3456
        },
        { 
            name: 'HomeDecor', 
            products: 89, 
            revenue: 2345678, 
            rating: 4.9,
            avatar: 'H',
            category: 'Home & Living',
            orders: 1234
        },
        { 
            name: 'BookWorld', 
            products: 345, 
            revenue: 3456789, 
            rating: 4.7,
            avatar: 'B',
            category: 'Books',
            orders: 4567
        },
        { 
            name: 'SportsZone', 
            products: 98, 
            revenue: 1987654, 
            rating: 4.8,
            avatar: 'S',
            category: 'Sports',
            orders: 1876
        }
    ];

    // ========== STATIC TOP BUYERS DATA ==========
    const topBuyers = [
        { 
            name: 'John Doe', 
            orders: 45, 
            spent: 234567, 
            items: 89,
            avatar: 'J',
            location: 'New York',
            lastOrder: '2024-01-15'
        },
        { 
            name: 'Jane Smith', 
            orders: 38, 
            spent: 198765, 
            items: 76,
            avatar: 'S',
            location: 'Los Angeles',
            lastOrder: '2024-01-14'
        },
        { 
            name: 'Bob Wilson', 
            orders: 32, 
            spent: 167890, 
            items: 54,
            avatar: 'W',
            location: 'Chicago',
            lastOrder: '2024-01-13'
        },
        { 
            name: 'Alice Brown', 
            orders: 29, 
            spent: 145678, 
            items: 48,
            avatar: 'B',
            location: 'Houston',
            lastOrder: '2024-01-12'
        },
        { 
            name: 'Charlie Lee', 
            orders: 27, 
            spent: 134567, 
            items: 42,
            avatar: 'L',
            location: 'Phoenix',
            lastOrder: '2024-01-11'
        }
    ];



    return (
        <div className="grid grid-cols-2 gap-6">
            {/* Top Sellers Section */}
            <div className="bg-white rounded-xl p-6 border hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Store className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-800">Top Sellers</span>
                    </h3>
               
                </div>

                <div className="space-y-3">
                    {topSellers.map((seller, index) => (
                        <div 
                            key={index} 
                            className="flex justify-between items-center border-b border-gray-100 py-3 hover:bg-gray-50 px-2 rounded-lg transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-md">
                                    {seller.avatar}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                        {seller.name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                            {seller.category}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {seller.orders} orders
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-green-600">
                                    ${(seller.revenue / 1000).toFixed(0)}K
                                </p>
                                <div className="flex items-center gap-1 mt-1 justify-end">
                                    <Package className="w-3 h-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">{seller.products}</span>
                                    <Star className="w-3 h-3 text-yellow-400 fill-current ml-1" />
                                    <span className="text-xs text-gray-500">{seller.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

         
            </div>

            {/* Top Buyers Section */}
            <div className="bg-white rounded-xl p-6 border hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Users className="w-5 h-5 text-green-600" />
                        <span className="text-gray-800">Top Buyers</span>
                    </h3>
                  
                </div>

                <div className="space-y-3">
                    {topBuyers.map((buyer, index) => (
                        <div 
                            key={index} 
                            className="flex justify-between items-center border-b border-gray-100 py-3 hover:bg-gray-50 px-2 rounded-lg transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center font-bold text-white shadow-md">
                                    {buyer.avatar}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                                        {buyer.name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-gray-400">
                                            📍 {buyer.location}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            🕐 {buyer.lastOrder}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-green-600">
                                    ${(buyer.spent / 1000).toFixed(0)}K
                                </p>
                                <div className="flex items-center gap-2 mt-1 justify-end">
                                    <ShoppingBag className="w-3 h-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">{buyer.orders}</span>
                                    <Package className="w-3 h-3 text-gray-400 ml-1" />
                                    <span className="text-xs text-gray-500">{buyer.items}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

           
            </div>
        </div>
    );
};

export default Topsellerandbuyer;