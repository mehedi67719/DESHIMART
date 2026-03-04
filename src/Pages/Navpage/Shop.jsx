import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { products, categorys, brands } from '../../Component/Api';
import ShopFilter from '../../Component/ShopFilter';
import ShopCard from '../../Component/ShopCard';
import { FiFilter } from 'react-icons/fi';

const Shop = () => {
    const [activeCategory, setActiveCategory] = useState("");
    const [activeBrand, setActiveBrand] = useState('');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const loadMoreRef = useRef(null);

    const { data: categories, isLoading, error } = useQuery({
        queryKey: ["category"],
        queryFn: categorys
    });

    const { data: Brands, isLoading: brandsloading, error: branderror } = useQuery({
        queryKey: ["brands"],
        queryFn: brands
    });

    const { data: Allproducts, fetchNextPage, hasNextPage, isFetchingNextPage, isError, error: productserror, isLoading: productsLoading } = useInfiniteQuery({
        queryKey: ["Allproducts", activeCategory, activeBrand, priceRange],
        queryFn: ({ pageParam = null }) => products({ 
            pageParam, 
            category: activeCategory, 
            brand: activeBrand, 
            priceRange: `${priceRange[0]},${priceRange[1]}` 
        }),
        getNextPageParam: (lastPage) => lastPage?.length ? lastPage[lastPage.length - 1]._id : undefined
    });

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

    const productsList = Allproducts?.pages.flatMap((page) => page) || [];

    if (productsLoading) {
        return (
            <div className="container mx-auto px-4 mb-10">
                <div className="text-center mb-10">
                    <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 w-96 mx-auto mb-3 rounded animate-pulse"></div>
                    <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 w-80 mx-auto rounded animate-pulse"></div>
                </div>
                <div className="flex flex-col lg:flex-row md:flex-row gap-6">
                    <div className="lg:w-1/4 md:w-1/4 hidden md:block lg:block">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 w-32 mb-6 rounded animate-pulse"></div>
                            <div className="space-y-4">
                                {Array(5).fill(0).map((_, i) => (
                                    <div key={i} className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 w-full rounded animate-pulse"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-3/4 md:w-3/4 w-full rounded pb-4 shadow bg-white">
                        <div className="py-4 px-4 bg-green-100 pb-6">
                            <div className="h-8 bg-gradient-to-r from-gray-300 to-gray-400 w-48 rounded animate-pulse"></div>
                        </div>
                        <div className="pt-10 grid px-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
                            {Array(12).fill(0).map((_, i) => (
                                <div key={i} className="animate-pulse border border-gray-200 rounded-2xl overflow-hidden">
                                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 h-60 w-full"></div>
                                    <div className="p-4">
                                        <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 w-3/4 mb-3 rounded"></div>
                                        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 w-1/2 mb-3 rounded"></div>
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 w-20 rounded"></div>
                                            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 w-16 rounded"></div>
                                        </div>
                                        <div className="h-10 bg-gradient-to-r from-gray-300 to-gray-400 w-full rounded-xl"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 mb-10">
            <div className="text-center mb-10">
                <h2 className="text-4xl mt-10 font-bold text-gray-800 mb-3">Shop Products</h2>
                <p className="text-gray-600 text-lg">Discover amazing products tailored to your needs</p>
            </div>

            <div className="flex flex-col lg:flex-row md:flex-row gap-6">
             
                <div className="lg:w-1/4 md:w-1/4 hidden md:block lg:block">
                    <ShopFilter
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        activeBrand={activeBrand}
                        setActiveBrand={setActiveBrand}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        categories={categories}
                        isLoading={isLoading}
                        error={error}
                        Brands={Brands}
                        brandsloading={brandsloading}
                        branderror={branderror}
                    />
                </div>

                {showMobileFilter && (
                    <div className="fixed inset-0 z-50 md:hidden">
                        <div className="fixed inset-0 bg-black bg-opacity-50"></div>
                        <div className="fixed inset-y-0 left-0 w-72 bg-white p-6 overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-800">Filters</h3>
                                <button 
                                    onClick={() => setShowMobileFilter(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>
                            <ShopFilter
                                activeCategory={activeCategory}
                                setActiveCategory={setActiveCategory}
                                activeBrand={activeBrand}
                                setActiveBrand={setActiveBrand}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                categories={categories}
                                isLoading={isLoading}
                                error={error}
                                Brands={Brands}
                                brandsloading={brandsloading}
                                branderror={branderror}
                            />
                        </div>
                    </div>
                )}

                <div className="lg:w-3/4 md:w-3/4 w-full rounded pb-4 shadow bg-white">
                    <div className="py-4 px-4 bg-green-100 pb-6 flex justify-between items-center">
                        <h2 className="text-black text-2xl font-bold">{productsList.length} Products Found</h2>
                        <button
                            onClick={() => setShowMobileFilter(true)}
                            className="md:hidden flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded"
                        >
                            <FiFilter />
                            Filter
                        </button>
                    </div>

                    {isError ? <p className='text-center text-red-500'>{productserror.message || "Something went wrong"}</p> :
                        <div className="pt-10 grid px-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
                            {productsList.length > 0 ? productsList.map((item) => (
                                <ShopCard key={item._id} item={item} />
                            )) : (
                                <div className="col-span-full text-center py-16">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <h4 className="text-2xl font-bold text-gray-800 mb-3">No Products Found</h4>
                                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                        No products match your selected filters. Try adjusting your filters.
                                    </p>
                                </div>
                            )}
                            <div ref={loadMoreRef} className="h-10"></div>
                            {isFetchingNextPage && Array(3).fill(0).map((_, i) => (
                                <div key={`skeleton-${i}`} className="animate-pulse border border-gray-200 rounded-2xl overflow-hidden">
                                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 h-60 w-full"></div>
                                    <div className="p-4">
                                        <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 w-3/4 mb-3 rounded"></div>
                                        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 w-1/2 mb-3 rounded"></div>
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 w-20 rounded"></div>
                                            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 w-16 rounded"></div>
                                        </div>
                                        <div className="h-10 bg-gradient-to-r from-gray-300 to-gray-400 w-full rounded-xl"></div>
                                    </div>
                                </div>
                            ))}
                            {!hasNextPage && productsList.length > 0 && (
                                <div className="col-span-full text-center py-8 mt-4 border-t border-gray-200">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">All Products Loaded</h4>
                                    <p className="text-gray-600">
                                        You've reached the end of our product collection
                                    </p>
                                </div>
                            )}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Shop;