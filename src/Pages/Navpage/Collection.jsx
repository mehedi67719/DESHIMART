import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { collection } from '../../Component/Api';
import ShopCard from '../../Component/ShopCard';

const Collection = () => {
    const loadMoreRef = useRef();
    const [Type, setType] = useState('new');
    const [searchQuery, setSearchQuery] = useState('');

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ["Collection", Type],
        queryFn: ({ pageParam = null }) => collection({ pageParam, type: Type }),
        getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    });

    useEffect(() => {
        if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) fetchNextPage();
            },
            { threshold: 1 }
        );

        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, Type]);

    if (isError) return <div>Error: {error.message}</div>;

    const products = data?.pages.flatMap(page => page.products) ?? [];

    const filteredProducts = products.filter(product =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getTypeLabel = (type) => {
        switch(type) {
            case 'new': return 'New Arrivals';
            case 'hot': return 'Hot Products';
            case 'sale': return 'On Sale';
            default: return '';
        }
    };

    return (
        <div className='container mx-auto px-4 mb-16'>
            <div className='text-center mb-12'>
                <h2 className='text-5xl mt-10 font-bold text-black mb-4'>Product Collections</h2>
                <p className='text-gray-600 text-xl'>Discover our curated collection of premium products</p>
            </div>

            <div className='bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden'>
                <div className='bg-gradient-to-r from-green-50 to-white px-4 py-6'>
                    <div className='flex flex-col md:flex-row gap-6 items-center justify-between'>
                        <div className='relative w-full md:w-2/3'>
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='w-full p-4 pl-12 border-2 border-gray-200 bg-white rounded-2xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100 text-lg'
                                placeholder='Search products by name or category...' 
                            />
                            <svg className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        
                        <div className='flex items-center gap-3 bg-gray-50 p-2 rounded-2xl'>
                            <button 
                                onClick={() => setType("new")} 
                                className={`px-6 py-3 font-semibold text-lg rounded-xl transition-all duration-300 ${Type === "new" ? "bg-green-600 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                            >
                                New
                            </button>
                            <button 
                                onClick={() => setType("hot")} 
                                className={`px-6 py-3 font-semibold text-lg rounded-xl transition-all duration-300 ${Type === "hot" ? "bg-green-600 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                            >
                                Hot
                            </button>
                            <button 
                                onClick={() => setType("sale")} 
                                className={`px-6 py-3 font-semibold text-lg rounded-xl transition-all duration-300 ${Type === "sale" ? "bg-green-600 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                            >
                                Sale
                            </button>
                        </div>
                    </div>
                </div>

                <div >
                    <div className='flex items-center px-4 justify-between my-6'>
                        <div>
                            <h3 className='text-2xl font-bold text-black mb-2'>{getTypeLabel(Type)}</h3>
                            <p className='text-gray-600'>
                                Showing <span className='font-bold text-green-600'>{filteredProducts.length}</span> products
                                {searchQuery && <span> matching "<span className='font-semibold'>{searchQuery}</span>"</span>}
                            </p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className='flex items-center gap-2'>
                                <div className='w-3 h-3 rounded-full bg-green-500 animate-pulse'></div>
                                <span className='text-sm text-gray-600'>Active Collection</span>
                            </div>
                        </div>
                    </div>

                    <div className='border-t border-gray-200 '>
                        {filteredProducts.length > 0 ? (
                            <div className='pt-10 grid px-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5'>
                                {filteredProducts.map((product) => (
                                    <ShopCard key={product._id} item={product}/>
                                ))}
                            </div>
                        ) : (
                            <div className='text-center py-16'>
                                <div className='inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6'>
                                    <svg className='w-10 h-10 text-green-600' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <h4 className='text-2xl font-bold text-black mb-3'>No Products Found</h4>
                                <p className='text-gray-600 mb-8 max-w-md mx-auto'>
                                    {searchQuery ? `No products found matching "${searchQuery}". Try a different search term or clear the search.` : 
                                    'No products available in this collection.'}
                                </p>
                                {searchQuery && (
                                    <button 
                                        onClick={() => setSearchQuery('')}
                                        className='bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl transition duration-300'
                                    >
                                        Clear Search
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    <div ref={loadMoreRef} className='h-20 mt-8'></div>
                    
                    {isFetchingNextPage && (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8'>
                            {Array(5).fill("").map((_, idx) => (
                                <div key={idx} className="animate-pulse border border-gray-200 rounded-2xl p-5 overflow-hidden">
                                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 h-64 w-full mb-5 rounded-xl"></div>
                                    <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 w-3/4 mb-3 rounded"></div>
                                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 w-1/2 mb-4 rounded"></div>
                                    <div className="h-12 bg-gradient-to-r from-gray-300 to-gray-400 w-full rounded-xl"></div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!hasNextPage && filteredProducts.length > 0 && (
                        <div className='text-center py-12 mt-8 border-t border-gray-200'>
                            <div className='inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-6'>
                                <svg className='w-8 h-8 text-green-600' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h4 className='text-xl font-bold text-black mb-2'>All Products Loaded</h4>
                            <p className='text-gray-600'>
                                You've reached the end of our <span className='font-semibold'>{getTypeLabel(Type)}</span> collection
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Collection;