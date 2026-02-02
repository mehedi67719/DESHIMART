import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { hotproducts } from '../../Component/Api';
import { Link } from 'react-router';
import ShopCard from '../../Component/ShopCard';

const HOtdeal = () => {


    const loadMoreRef = useRef(null);


    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, error } = useInfiniteQuery({
        queryKey: ["HotProducts"],
        queryFn: ({ pageParam = null }) => hotproducts(pageParam),
        getNextPageParam: (lastPage) => {
            if (lastPage.length < 10) return undefined;
            return lastPage[lastPage.length - 1]._id;
        }
    })




    const products = data?.pages.flat();

    // products?.map(p => console.log(p.name));





    useEffect(() => {
        if (!hasNextPage) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) fetchNextPage();
            },
            { threshold: 1 }
        );
        if (loadMoreRef.current) observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage]);



    return (
        <div className='container mx-auto px-4 mb-10'>

            <div className='text-center mb-10'>
                <h2 className='text-4xl mt-10 font-bold text-gray-800 mb-3'>Hot Deal</h2>
                <p className='text-gray-600 text-lg'>Hurry up! Best deals for a short time</p>
            </div>

            {
                isError ? (<p className='text-center text-red-500'>{error.message || "Something went wrong"}</p>) :
                    (
                        <div className='bg-white rounded'>

                            <div className="py-4 px-4 bg-green-100 pb-6 flex justify-between items-center">
                                <h2 className="text-black text-2xl font-bold">{products?.length} Products Found</h2>
                            </div>
                            <div className="pt-10 grid px-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
                                {products?.length > 0 ? products.map((item) => (
                                    <ShopCard key={item._id} item={item} />
                                )) : Array(6).fill(0).map((_, i) => (
                                    <div key={i} className="h-72 bg-gray-200 rounded-2xl animate-pulse" />
                                ))}
                                <div ref={loadMoreRef} className="h-10"></div>
                                {isFetchingNextPage && Array(8).fill(0).map((_, i) => <div key={`skeleton-${i}`} className="h-72 bg-gray-200 rounded-2xl animate-pulse" />)}
                            </div>
                        </div>


                    )
            }

        </div>
    );
};

export default HOtdeal;