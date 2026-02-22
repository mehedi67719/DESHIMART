import React from 'react';
import { Star, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { topratingproducts } from '../Api';

const TopFiveProducts = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["topratingproducts"],
        queryFn: topratingproducts
    });

    const processProductsData = () => {
        if (!data || !Array.isArray(data)) return [];
        
        return data.slice(0, 5).map((product, index) => ({
            id: product._id,
            name: product.name,
            category: product.category,
            sold: product.sold || 0,
            revenue: (product.price * (product.sold || 0)),
            rating: product.rating || 0,
            image: product.image,
            discount: product.discount || 0,
            oldPrice: product.oldPrice || product.price
        }));
    };

    const topProducts = processProductsData();
    
    const totalSold = topProducts.reduce((sum, item) => sum + item.sold, 0);
    const totalRevenue = topProducts.reduce((sum, item) => sum + item.revenue, 0);
    const avgRating = topProducts.length > 0 
        ? (topProducts.reduce((sum, item) => sum + item.rating, 0) / topProducts.length).toFixed(1) 
        : 0;

    if (isLoading) {
        return (
            <div className="bg-white rounded-xl p-4 sm:p-6 border">
                <div className="h-5 sm:h-6 bg-gray-200 rounded w-36 sm:w-48 mb-3 sm:mb-4 animate-pulse"></div>
                <div className="space-y-3">
                    {[1,2,3,4,5].map((i) => (
                        <div key={i} className="h-12 sm:h-16 bg-gray-100 rounded animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-white rounded-xl p-4 sm:p-6 border">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">🏆 Top 5 Products</h3>
                <div className="h-[200px] sm:h-[300px] flex items-center justify-center">
                    <p className="text-red-500 text-sm sm:text-base">Failed to load products</p>
                </div>
            </div>
        );
    }

    if (topProducts.length === 0) {
        return (
            <div className="bg-white rounded-xl p-4 sm:p-6 border">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">🏆 Top 5 Products</h3>
                <div className="h-[200px] sm:h-[300px] flex items-center justify-center">
                    <p className="text-gray-500 text-sm sm:text-base">No products available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl p-4 sm:p-6 border hover:shadow-lg transition-shadow w-full overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
                <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">🏆 Top 5 Products</h3>
                    <p className="text-xs text-gray-500 mt-1">Best selling products</p>
                </div>
                <div className="flex flex-wrap gap-3 sm:gap-4 text-xs">
                    <span className="text-gray-600">Sold: {totalSold}</span>
                    <span className="text-green-600 font-medium">${(totalRevenue/1000).toFixed(0)}K</span>
                    <span className="text-yellow-600">⭐ {avgRating}</span>
                </div>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Product</th>
                                <th scope="col" className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                                <th scope="col" className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Sold</th>
                                <th scope="col" className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Revenue</th>
                                <th scope="col" className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Rating</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {topProducts.map((product, index) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            {product.image ? (
                                                <img 
                                                    src={product.image} 
                                                    alt={product.name}
                                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://via.placeholder.com/40x40?text=Product';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                                    📦
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <p className="text-xs sm:text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors truncate max-w-[120px] sm:max-w-[200px]">
                                                    {product.name}
                                                </p>
                                                <p className="text-xs text-gray-400">ID: {product.id.slice(-6)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full inline-block">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-right text-xs sm:text-sm font-medium text-gray-800">
                                        {product.sold.toLocaleString()}
                                    </td>
                                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-right">
                                        <span className="text-xs sm:text-sm font-medium text-green-600">
                                            ${(product.revenue / 1000).toFixed(0)}K
                                        </span>
                                        {product.discount > 0 && (
                                            <span className="ml-1 text-[10px] sm:text-xs text-red-500">-{product.discount}%</span>
                                        )}
                                    </td>
                                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                                            <span className="text-xs sm:text-sm font-medium">{product.rating}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 pt-4 border-t">
                <div className="flex gap-3 sm:gap-4">
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                        View All Products →
                    </button>
                    <button className="text-xs text-gray-500 hover:text-gray-600 font-medium">
                        Export Report
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                    <span className="text-[10px] sm:text-xs text-green-600">+12.5% from last month</span>
                </div>
            </div>
        </div>
    );
};

export default TopFiveProducts;