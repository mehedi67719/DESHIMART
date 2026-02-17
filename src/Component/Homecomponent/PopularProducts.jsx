import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router';
import { topratingproducts } from '../Api';
import ShopCard from '../ShopCard';

const PopularProducts = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ["topratingproducts"],
        queryFn: topratingproducts
    });

    if (isLoading) {
        return (
            <div className='w-full py-16'>
                <div className='w-full px-4'>
                    <div className='text-center max-w-3xl mx-auto mb-16'>
                        <h2 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4'>
                            Popular Products
                        </h2>
                        <p className='text-xl text-gray-600'>Loading amazing products for you...</p>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                        {[1,2,3,4,5,6,7,8,9,10].map(n => (
                            <div key={n} className='border border-gray-200 rounded-2xl p-4 animate-pulse bg-white'>
                                <div className='bg-gray-200 h-60 w-full rounded-xl mb-4'></div>
                                <div className='h-6 bg-gray-200 w-3/4 mb-3 rounded'></div>
                                <div className='h-4 bg-gray-200 w-1/2 mb-4 rounded'></div>
                                <div className='h-8 bg-gray-200 w-24 rounded'></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className='w-full py-16'>
                <div className='w-full px-4'>
                    <div className='max-w-2xl mx-auto text-center bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-12'>
                        <div className='inline-flex items-center justify-center w-20 h-20 bg-red-200 rounded-full mb-6'>
                            <svg className='w-10 h-10 text-red-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                        </div>
                        <h2 className='text-3xl font-bold text-gray-900 mb-3'>Failed to Load Products</h2>
                        <p className='text-gray-600 mb-8'>Please try again.</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className='px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300'
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const uniqueCategories = ['all', ...new Set(data?.map(product => product.category).filter(Boolean))];
    
    const categories = uniqueCategories.map(cat => ({
        id: cat,
        name: cat === 'all' ? 'All Products' : cat
    }));

    const filteredProducts = selectedCategory === 'all' 
        ? data 
        : data?.filter(product => product.category === selectedCategory);

    return (
        <div className='w-full py-16 mt-25 rounded-2xl bg-white'>
            <div className='w-full px-4'>
                <div className='relative text-center max-w-4xl mx-auto mb-16'>
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-64 h-64 bg-gradient-to-r from-amber-200/30 to-orange-200/30 rounded-full blur-3xl'></div>
                    </div>
                    
                    <div className='relative'>
                        <div className='inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-5 py-2.5 rounded-full mb-6 shadow-sm'>
                            <FaStar className='w-4 h-4 text-amber-600' />
                            <span className='text-amber-700 font-semibold text-sm uppercase tracking-wider'>Top Rated</span>
                        </div>
                        
                        <h2 className='text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6'>
                            <span className='bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 bg-clip-text text-transparent'>
                                Popular Products
                            </span>
                        </h2>
                        
                        <p className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                            Most loved and highly rated products by our customers
                        </p>

                        <div className='flex items-center justify-center gap-8 mt-10'>
                            <div className='flex items-center gap-2'>
                                <div className='w-2 h-2 bg-amber-500 rounded-full'></div>
                                <span className='text-sm text-gray-600'>
                                    {data?.length}+ Products
                                </span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <FaStar className='w-4 h-4 text-yellow-500 fill-yellow-500' />
                                <span className='text-sm text-gray-600'>4.8+ Rating</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
                                <span className='text-sm text-gray-600'>Top Quality</span>
                            </div>
                        </div>
                    </div>
                </div>
 
                <div className='flex flex-wrap items-center justify-center gap-3 mb-12'>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`
                                px-6 py-2.5 rounded-full font-medium transition-all duration-300
                                ${selectedCategory === category.id 
                                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg scale-105' 
                                    : 'bg-white text-gray-700 border border-gray-200 hover:border-amber-400 hover:text-amber-600 hover:shadow-md'
                                }
                            `}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 '>
                    {filteredProducts?.slice(0, 10).map((product) => (
                        <ShopCard key={product._id} item={product} />
                    ))}
                </div>

                <div className='text-center mt-16'>
                    <Link 
                        to='/shop'
                        className='inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group'
                    >
                        View All Products
                        <svg className='w-5 h-5 group-hover:translate-x-1 transition-transform' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PopularProducts;