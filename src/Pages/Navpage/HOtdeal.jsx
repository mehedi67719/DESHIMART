import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import { hotproducts } from '../../Component/Api';
import ShopCard from '../../Component/ShopCard';

const HOtdeal = () => {
    const loadMoreRef = useRef();
    
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ["HotProducts"],
        queryFn: ({ pageParam = null }) => hotproducts(pageParam),
        getNextPageParam: (lastPage) => {
            if (lastPage.length < 10) return undefined;
            return lastPage[lastPage.length - 1]?._id;
        }
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
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (isError) return <div>Error: {error.message}</div>;

    const products = data?.pages.flat() ?? [];

    return (
        <div className='container mx-auto px-4 mb-16'>
            <div className='text-center mb-12'>
                <h2 className='text-5xl mt-10 font-bold text-black mb-4'>Hot Deals</h2>
                <p className='text-gray-600 text-xl'>Hurry up! Best deals for a short time</p>
            </div>

            <div className='bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden'>
                <div className=' px-4 py-6'>
                    <div className='flex flex-col md:flex-row gap-6 items-center justify-between'>
                        <div className='relative w-full'>
                            <div className='flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-gray-100'>
                                <div className='flex items-center gap-2 bg-red-100 px-4 py-2 rounded-xl'>
                                    <div className='w-2 h-2 rounded-full bg-red-600 animate-pulse'></div>
                                    <span className='font-bold text-red-700'>LIMITED TIME OFFER</span>
                                </div>
                                <p className='text-gray-700 text-lg'>
                                    Don't miss out on these exclusive hot deals
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex items-center px-4 justify-between my-6'>
                        <div>
                            <h3 className='text-2xl font-bold text-black mb-2'>Hot Products</h3>
                            <p className='text-gray-600'>
                                Showing <span className='font-bold text-red-600'>{products.length}</span> hot deals
                            </p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className='flex items-center gap-2'>
                                <div className='w-3 h-3 rounded-full bg-red-500 animate-pulse'></div>
                                <span className='text-sm text-gray-600'>Limited Time Offers</span>
                            </div>
                        </div>
                    </div>

                    <div className='border-t border-gray-200'>
                        {products.length > 0 ? (
                            <div className='pt-10 grid px-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5'>
                                {products.map((product) => (
                                    <ShopCard key={product._id} item={product}/>
                                ))}
                            </div>
                        ) : (
                            <div className='text-center py-16'>
                                <div className='inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6'>
                                    <svg className='w-10 h-10 text-red-600' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <h4 className='text-2xl font-bold text-black mb-3'>No Hot Deals Available</h4>
                                <p className='text-gray-600 mb-8 max-w-md mx-auto'>
                                    Check back soon for new hot deals and limited time offers
                                </p>
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

                    {!hasNextPage && products.length > 0 && (
                        <div className='text-center py-12 mt-8 border-t border-gray-200'>
                            <div className='inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-6'>
                                <svg className='w-8 h-8 text-red-600' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h4 className='text-xl font-bold text-black mb-2'>All Hot Deals Loaded</h4>
                            <p className='text-gray-600'>
                                You've reached the end of our hot deals collection
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HOtdeal;