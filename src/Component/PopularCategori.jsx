import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FiArrowRight, FiGrid } from 'react-icons/fi';
import { popularcategorys } from './Api';
import { Link } from 'react-router';

const PopularCategori = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["popularcategori"],
        queryFn: popularcategorys
    });

    if (isLoading) {
        return (
            <section className="mt-25 w-full">
                <div className="w-full bg-white">
                    <div className="w-full">
                        <div className="w-full text-center">
                            <div className="flex items-center justify-center gap-4 mb-2">
                                <div className="h-[1px] w-12 bg-green-500"></div>
                                <h2 className="text-3xl font-bold text-gray-800">Popular Categories</h2>
                                <div className="h-[1px] w-12 bg-green-500"></div>
                            </div>
                            <p className="text-gray-500 text-sm mb-6">Loading amazing categories for you...</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                    <div key={n} className="bg-white border border-gray-100 rounded-2xl p-6 animate-pulse">
                                        <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-4"></div>
                                        <div className="h-5 bg-gray-200 w-3/4 mx-auto mb-4 rounded"></div>
                                        <div className="h-8 bg-gray-200 w-1/2 mx-auto rounded-full"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="mt-25 w-full">
                <div className="w-full bg-white">
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
        <section className="mt-25 w-full">
            <div className="w-full bg-gradient-to-b from-green-50/40 to-transparent">
                <div className="w-full">
                    <div className="w-full text-center">
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


                        <Link to='/shop'>
                            <button className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-full flex items-center gap-2 mx-auto mb-12 hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                                <FiGrid className="w-4 h-4" />
                                <span className="font-semibold">Browse All Categories</span>
                                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>


                        <div className="w-full">
                            <div className="relative bg-white border border-green-100/50 rounded-2xl w-full">
                                <div className="w-full p-6 md:p-10">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full">
                                        {data?.map((category, index) => {
                                            const totalSold = category.totalSold >= 1000
                                                ? `${(category.totalSold / 1000).toFixed(1)}K+`
                                                : `${category.totalSold}+`;
                                            const isHot = category.totalSold > 100000;
                                            const colors = [
                                                'bg-gradient-to-br from-green-500 to-emerald-600',
                                                'bg-gradient-to-br from-orange-500 to-red-500',
                                                'bg-gradient-to-br from-blue-500 to-indigo-600',
                                                'bg-gradient-to-br from-purple-500 to-pink-600',
                                                'bg-gradient-to-br from-yellow-500 to-amber-600',
                                                'bg-gradient-to-br from-teal-500 to-cyan-600',
                                                'bg-gradient-to-br from-rose-500 to-pink-600',
                                                'bg-gradient-to-br from-violet-500 to-purple-600'
                                            ];
                                            const bgColor = colors[index % colors.length];

                                            return (
                                                <div
                                                    key={category.category}
                                                    className="group relative bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 w-full"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-emerald-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                                    {isHot && (
                                                        <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg z-10">
                                                            🔥 Hot
                                                        </span>
                                                    )}

                                                    <div className={`${bgColor} w-20 h-20 rounded-2xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-all duration-500 shadow-lg text-white text-3xl font-bold`}>
                                                        {category.category.charAt(0).toUpperCase()}
                                                    </div>

                                                    <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                                                        {category.category}
                                                    </h3>

                                                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-1.5 rounded-full mb-4 border border-amber-100">
                                                        <span className="text-sm font-semibold text-amber-700">
                                                            {totalSold} sold
                                                        </span>
                                                    </div>

                                                 
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-16 pt-8 border-t border-gray-200 w-full">
                                        <div className="grid grid-cols-3 gap-4 mb-8 w-full">
                                            <div>
                                                <h4 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                                    {data?.length}+
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-1 font-medium">Categories</p>
                                            </div>
                                            <div>
                                                <h4 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                                    {formattedTotal}
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-1 font-medium">Items Sold</p>
                                            </div>
                                            <div>
                                                <h4 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                                    24/7
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-1 font-medium">Support</p>
                                            </div>
                                        </div>

                                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 px-6 py-2.5 rounded-full shadow-sm">
                                            <span className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></span>
                                            <span className="text-sm text-gray-700 font-medium">
                                                Discover premium quality products in every category
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default PopularCategori;
