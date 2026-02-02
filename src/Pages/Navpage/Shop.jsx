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

    const { data: Allproducts, fetchNextPage, hasNextPage, isFetchingNextPage, isError, error: productserror } = useInfiniteQuery({
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


    // console.log(productsList)

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
                            )) : Array(6).fill(0).map((_, i) => (
                                <div key={i} className="h-72 bg-gray-200 rounded-2xl animate-pulse" />
                            ))}
                            <div ref={loadMoreRef} className="h-10"></div>
                            {isFetchingNextPage && Array(3).fill(0).map((_, i) => <div key={`skeleton-${i}`} className="h-72 bg-gray-200 rounded-2xl animate-pulse" />)}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Shop;