import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { 
  FiActivity, FiArrowRight, FiBox, FiGrid, FiLayers, FiTarget, FiWind,
  FiGithub, FiSun, FiCloud, FiStar, FiZap, FiShoppingBag, FiHome, FiTool,
  FiHeart, FiSmile, FiAward
} from 'react-icons/fi';
import { popularcategorys } from './Api';

const PopularCategori = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["popularcategori"],
        queryFn: popularcategorys
    });

    const getCategoryIcon = (categoryName, index) => {
        const icons = [
            FiShoppingBag, FiBox, FiGrid, FiLayers, FiTarget, FiWind,
            FiActivity, FiGithub, FiSun, FiCloud, FiStar, FiZap,
            FiHome, FiTool, FiHeart, FiSmile, FiAward
        ];
        
        const iconIndex = (categoryName.length + index) % icons.length;
        const IconComponent = icons[iconIndex];
        
        return <IconComponent className="w-6 h-6" />;
    };

    const getCategoryColor = (index) => {
        const colors = [
            'from-green-500 to-emerald-600',
            'from-orange-500 to-red-500',
            'from-blue-500 to-indigo-600',
            'from-purple-500 to-pink-600',
            'from-yellow-500 to-amber-600',
            'from-teal-500 to-cyan-600',
            'from-rose-500 to-pink-600',
            'from-violet-500 to-purple-600'
        ];
        return colors[index % colors.length];
    };

    if (isLoading) {
        return (
            <section className="mt-25 font-sans w-full px-4">
                <div className="w-full text-center">
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <div className="h-[1px] w-12 bg-green-500"></div>
                        <h2 className="text-3xl font-bold text-gray-800">Popular Categories</h2>
                        <div className="h-[1px] w-12 bg-green-500"></div>
                    </div>
                    <p className="text-gray-500 text-sm mb-6">Loading amazing categories for you...</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1,2,3,4,5,6,7,8].map((n) => (
                            <div key={n} className="bg-white border border-gray-100 rounded-2xl p-6 animate-pulse">
                                <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-4"></div>
                                <div className="h-5 bg-gray-200 w-3/4 mx-auto mb-4 rounded"></div>
                                <div className="h-8 bg-gray-200 w-1/2 mx-auto rounded-full"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="mt-25 font-sans w-full px-4">
                <div className="w-full text-center">
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <div className="h-[1px] w-12 bg-green-500"></div>
                        <h2 className="text-3xl font-bold text-gray-800">Popular Categories</h2>
                        <div className="h-[1px] w-12 bg-green-500"></div>
                    </div>
                    <div className="max-w-md mx-auto bg-red-50 rounded-2xl p-8">
                        <p className="text-red-600 mb-4">Failed to load categories</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    const totalProducts = data?.reduce((acc, cat) => acc + (cat.totalSold || 0), 0) || 0;
    const formattedTotal = totalProducts >= 1000000 
        ? `${(totalProducts / 1000000).toFixed(1)}M+` 
        : totalProducts >= 1000 
            ? `${(totalProducts / 1000).toFixed(1)}K+` 
            : `${totalProducts}+`;

    return (
        <section className="mt-25 font-sans w-full px-4 lg:px-8">
            <div className="w-full max-w-7xl mx-auto text-center">
                {/* Header Section with Premium Design */}
                <div className="relative mb-12">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-full blur-3xl"></div>
                    </div>
                    
                    <div className="relative">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
                            <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-1.5 rounded-full">
                                <span className="text-green-700 font-semibold text-sm uppercase tracking-wider">
                                    Top Categories
                                </span>
                            </div>
                            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            <span className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 bg-clip-text text-transparent">
                                Popular Categories
                            </span>
                        </h2>
                        
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Explore our most loved collections, handpicked for quality and freshness
                        </p>
                    </div>
                </div>

                {/* Browse All Button */}
                <button className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-full flex items-center gap-2 mx-auto mb-12 hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <FiGrid className="w-4 h-4" />
                    <span className="font-semibold">Browse All Categories</span>
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Categories Grid with Premium Card Design */}
                <div className="relative">
                    {/* Background Decoration */}
                    <div className="absolute inset-0 bg-gradient-to-b from-green-50/50 to-transparent rounded-[40px] blur-3xl"></div>
                    
                    <div className="relative bg-white/80 backdrop-blur-sm border border-green-100/50 rounded-[40px] p-8 md:p-12 shadow-2xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                            {data?.map((category, index) => {
                                const totalSold = category.totalSold >= 1000 
                                    ? `${(category.totalSold / 1000).toFixed(1)}K+` 
                                    : `${category.totalSold}+`;
                                
                                const isHot = category.totalSold > 100000;
                                const isNew = index < 2;

                                return (
                                    <div
                                        key={category.category}
                                        className="group relative bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                                    >
                                        {/* Gradient Border Effect on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-emerald-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        
                                        {/* Hot/New Badges */}
                                        {isHot && (
                                            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg z-10">
                                                🔥 Hot
                                            </span>
                                        )}
                                        {isNew && !isHot && (
                                            <span className="absolute -top-2 -left-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg z-10">
                                                ✨ New
                                            </span>
                                        )}

                                        {/* Category Icon with Dynamic Gradient */}
                                        <div className={`
                                            relative w-20 h-20 rounded-2xl bg-gradient-to-br ${getCategoryColor(index)}
                                            flex items-center justify-center text-white text-3xl mb-4 
                                            transform group-hover:scale-110 transition-all duration-500
                                            shadow-lg group-hover:shadow-xl
                                        `}>
                                            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            {getCategoryIcon(category.category, index)}
                                        </div>

                                        {/* Category Name */}
                                        <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                                            {category.category}
                                        </h3>

                                        {/* Total Sold Badge */}
                                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-1.5 rounded-full mb-4 border border-amber-100">
                                            <span className="text-sm font-semibold text-amber-700">
                                                {totalSold} sold
                                            </span>
                                        </div>

                                        {/* Explore Button */}
                                        <button className="w-full group/btn inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-600 hover:to-emerald-600 rounded-xl border border-green-200 hover:border-transparent transition-all duration-300">
                                            <span className="text-sm font-semibold text-green-700 group-hover/btn:text-white transition-colors">
                                                Explore
                                            </span>
                                            <FiArrowRight className="text-green-600 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all duration-300 text-sm" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Stats Section with Premium Design */}
                        <div className="mt-16 pt-8 border-t border-gradient-to-r from-transparent via-gray-200 to-transparent">
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="relative group/stat">
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-emerald-500/0 rounded-2xl group-hover/stat:bg-gradient-to-r group-hover/stat:from-green-500/10 group-hover/stat:to-emerald-500/10 transition-all duration-300"></div>
                                    <div className="relative">
                                        <h4 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                            {data?.length}+
                                        </h4>
                                        <p className="text-xs text-gray-500 mt-1 font-medium">Categories</p>
                                    </div>
                                </div>
                                <div className="relative group/stat">
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-red-500/0 rounded-2xl group-hover/stat:bg-gradient-to-r group-hover/stat:from-orange-500/10 group-hover/stat:to-red-500/10 transition-all duration-300"></div>
                                    <div className="relative">
                                        <h4 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                            {formattedTotal}
                                        </h4>
                                        <p className="text-xs text-gray-500 mt-1 font-medium">Items Sold</p>
                                    </div>
                                </div>
                                <div className="relative group/stat">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-indigo-500/0 rounded-2xl group-hover/stat:bg-gradient-to-r group-hover/stat:from-blue-500/10 group-hover/stat:to-indigo-500/10 transition-all duration-300"></div>
                                    <div className="relative">
                                        <h4 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                            24/7
                                        </h4>
                                        <p className="text-xs text-gray-500 mt-1 font-medium">Support</p>
                                    </div>
                                </div>
                            </div>

                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 px-6 py-2.5 rounded-full shadow-sm">
                                <FiAward className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-gray-700 font-medium">
                                    Discover premium quality products in every category
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PopularCategori;