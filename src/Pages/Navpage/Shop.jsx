import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { FaCheckCircle, FaFilter, FaHeart, FaRegCheckCircle, FaRegStar, FaShoppingCart, FaStar, FaStarHalf } from 'react-icons/fa';
import { RiMenu3Line } from 'react-icons/ri';
import { products, categorys, brands } from '../../Component/Api';

const Shop = () => {
    const [activeCategory, setActiveCategory] = useState("");
    const [activebrand, setactivebrand] = useState('');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [showAllBrands, setShowAllBrands] = useState(false);
    const loadMoreRef = useRef(null);

    const MAX_SHOW = 5;

    const { data: categories, isLoading, error } = useQuery({
        queryKey: ["category"],
        queryFn: categorys
    });

    const { data: Brands, isLoading: brandsloading, error: branderror } = useQuery({
        queryKey: ["brands"],
        queryFn: brands
    });

    const { data: Allproducts, fetchNextPage, hasNextPage, isFetchingNextPage, isError, error: productserror } = useInfiniteQuery({
        queryKey: ["Allproducts", activeCategory, activebrand, priceRange],
        queryFn: ({ pageParam = null }) => products({ pageParam, category: activeCategory, brand: activebrand, priceRange: `${priceRange[0]},${priceRange[1]}` }),
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

    const handleClick = (category) => setActiveCategory(category);
    const handlebrand = (brand) => setactivebrand(brand);
    const productsList = Allproducts?.pages.flatMap((page) => page) || [];

    const Stars = ({ rating }) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) stars.push(<FaStar key={i} className="text-yellow-400" />);
            else if (rating >= i - 0.5) stars.push(<FaStarHalf key={i} className="text-yellow-400" />);
            else stars.push(<FaRegStar key={i} className="text-yellow-400" />);
        }
        return <div className="flex items-center ">{stars}</div>;
    };

    return (
        <div className="container mx-auto px-4 mb-10">
            <div className="text-center mb-10">
                <h2 className="text-4xl mt-10 font-bold text-gray-800 mb-3">Shop Products</h2>
                <p className="text-gray-600 text-lg">Discover amazing products tailored to your needs</p>
            </div>

            <div className="flex flex-col lg:flex-row md:flex-row gap-6">

            
                <div className="lg:w-1/4 md:w-1/4 hidden md:block lg:block">
                    <div className="bg-white rounded-xl shadow h-[calc(100vh-200px)] sticky top-0 flex flex-col">
                        <div className="py-4 bg-green-100 sticky top-0 z-10">
                            <h2 className="text-black text-2xl font-bold text-center flex items-center justify-center gap-2">
                                <FaFilter /> Filters
                            </h2>
                        </div>
                        <div className="flex-1 overflow-y-auto px-4">
                            <div className='flex justify-between items-center mt-5'>
                                <h2 className='text-xl font-bold'>Category</h2>
                                <button className='mr-3 py-0.5 px-2 bg-green-300 rounded-2xl hover:bg-green-500' onClick={() => handleClick("")}>Clear</button>
                            </div>
                            {error ? <p className='text-center text-red-500'>{error.message || "Something went wrong"}</p> :
                                isLoading ? Array(4).fill(0).map((_, i) => <div key={i} className="h-12 w-full bg-gray-200 rounded-lg animate-pulse mt-2" />) :
                                    <div className="flex flex-col gap-2 mt-2">
                                        {(showAllCategories ? categories : categories?.slice(0, MAX_SHOW))?.map((cat, index) => (
                                            <button key={index} onClick={() => handleClick(cat.category)} className={`flex items-center gap-3 px-4 py-3 font-medium rounded-lg w-full text-left transition-all duration-200 ${activeCategory === cat.category ? "bg-green-50 text-green-600 border-l-4 border-green-500" : "text-gray-700 hover:bg-gray-50"}`}>
                                                {activeCategory === cat.category ? <FaCheckCircle className="text-green-500" /> : <FaRegCheckCircle className="text-gray-400" />}
                                                {cat.category}
                                            </button>
                                        ))}
                                        {categories?.length > MAX_SHOW && <button onClick={() => setShowAllCategories(!showAllCategories)} className="text-blue-500 text-sm mt-2 hover:underline">{showAllCategories ? "Show Less" : "Show More"}</button>}
                                    </div>
                            }

                            <div className='flex justify-between items-center mt-5'>
                                <h2 className='text-xl font-bold'>Brands</h2>
                                <button className='mr-3 py-0.5 px-2 bg-green-300 rounded-2xl hover:bg-green-500' onClick={() => handlebrand('')}>Clear</button>
                            </div>
                            {branderror ? <p className='text-center text-red-500'>{branderror.message || "Something went wrong"}</p> :
                                brandsloading ? Array(4).fill(0).map((_, i) => <div key={i} className="h-12 w-full bg-gray-200 rounded-lg animate-pulse mt-2" />) :
                                    <div className="flex flex-col gap-2 mt-2">
                                        {(showAllBrands ? Brands : Brands?.slice(0, MAX_SHOW))?.map((brand, index) => (
                                            <button key={index} onClick={() => handlebrand(brand.brand)} className={`flex items-center gap-3 px-4 py-3 font-medium rounded-lg w-full text-left transition-all duration-200 ${activebrand === brand.brand ? "bg-green-50 text-green-600 border-l-4 border-green-500" : "text-gray-700 hover:bg-gray-50"}`}>
                                                {activebrand === brand.brand ? <FaCheckCircle className="text-green-500" /> : <FaRegCheckCircle className="text-gray-400" />}
                                                {brand.brand}
                                            </button>
                                        ))}
                                        {Brands?.length > MAX_SHOW && <button onClick={() => setShowAllBrands(!showAllBrands)} className="text-blue-500 text-sm mt-2 hover:underline">{showAllBrands ? "Show Less" : "Show More"}</button>}
                                    </div>
                            }

                            <div className='flex justify-between items-center mt-5'>
                                <h2 className='text-xl font-bold'>Price Range</h2>
                                <button className='mr-3 py-0.5 px-2 bg-green-300 rounded-2xl hover:bg-green-500' onClick={() => setPriceRange([0, 10000])}>Clear</button>
                            </div>
                            <div className="mb-5">
                                <input type="range" min={0} max={10000} value={priceRange[1]} onChange={(e) => setPriceRange([0, Number(e.target.value)])} className="w-full" />
                                <div className="flex justify-between text-sm mt-1">
                                    <span>৳0</span>
                                    <span>৳{priceRange[1]}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        
                <div className="lg:hidden md:hidden mb-4">
                    <button onClick={() => setShowMobileFilter(!showMobileFilter)} className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold">
                        <RiMenu3Line className="text-xl" />
                        {showMobileFilter ? "Hide Filters" : "Show Filters"}
                    </button>
                </div>

        
                {showMobileFilter &&
                    <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowMobileFilter(false)}>
                        <div className="absolute left-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <div className="py-4 bg-green-100 flex justify-between items-center px-4">
                                <h2 className="text-black text-2xl font-bold flex items-center gap-2"><FaFilter /> Filters</h2>
                                <button onClick={() => setShowMobileFilter(false)} className="text-2xl text-gray-600 hover:text-gray-800">×</button>
                            </div>

                            <div className="px-4">
                                <div className='flex justify-between items-center mt-5'>
                                    <h2 className='text-xl font-bold'>Category</h2>
                                    <button className='mr-3 py-0.5 px-2 bg-green-300 rounded-2xl hover:bg-green-500' onClick={() => handleClick("")}>Clear</button>
                                </div>
                                {error ? <p className='text-center text-red-500'>{error.message || "Something went wrong"}</p> :
                                    isLoading ? Array(4).fill(0).map((_, i) => <div key={i} className="h-12 w-full bg-gray-200 rounded-lg animate-pulse mt-2" />) :
                                        (showAllCategories ? categories : categories?.slice(0, MAX_SHOW))?.map((cat, index) => (
                                            <button key={index} onClick={() => handleClick(cat.category)} className={`flex items-center gap-3 px-4 py-3 font-medium rounded-lg w-full text-left mt-2 ${activeCategory === cat.category ? "bg-green-50 text-green-600 border-l-4 border-green-500" : "text-gray-700 hover:bg-gray-50"}`}>
                                                {activeCategory === cat.category ? <FaCheckCircle className="text-green-500" /> : <FaRegCheckCircle className="text-gray-400" />}
                                                {cat.category}
                                            </button>
                                        ))
                                }
                                {categories?.length > MAX_SHOW && <button onClick={() => setShowAllCategories(!showAllCategories)} className="text-blue-500 text-sm mt-2 hover:underline">{showAllCategories ? "Show Less" : "Show More"}</button>}

                                <div className='flex justify-between items-center mt-5'>
                                    <h2 className='text-xl font-bold'>Brands</h2>
                                    <button className='mr-3 py-0.5 px-2 bg-green-300 rounded-2xl hover:bg-green-500' onClick={() => handlebrand('')}>Clear</button>
                                </div>
                                {Brands && (showAllBrands ? Brands : Brands?.slice(0, MAX_SHOW))?.map((brand, index) => (
                                    <button key={index} onClick={() => handlebrand(brand.brand)} className={`flex items-center gap-3 px-4 py-3 font-medium rounded-lg w-full text-left mt-2 ${activebrand === brand.brand ? "bg-green-50 text-green-600 border-l-4 border-green-500" : "text-gray-700 hover:bg-gray-50"}`}>
                                        {activebrand === brand.brand ? <FaCheckCircle className="text-green-500" /> : <FaRegCheckCircle className="text-gray-400" />}
                                        {brand.brand}
                                    </button>
                                ))}
                                {Brands?.length > MAX_SHOW && <button onClick={() => setShowAllBrands(!showAllBrands)} className="text-blue-500 text-sm mt-2 hover:underline">{showAllBrands ? "Show Less" : "Show More"}</button>}

                                <div className='flex justify-between items-center mt-5'>
                                    <h2 className='text-xl font-bold'>Price Range</h2>
                                    <button className='mr-3 py-0.5 px-2 bg-green-300 rounded-2xl hover:bg-green-500' onClick={() => setPriceRange([0, 10000])}>Clear</button>
                                </div>
                                <div className="mb-5">
                                    <input type="range" min={0} max={10000} value={priceRange[1]} onChange={(e) => setPriceRange([0, Number(e.target.value)])} className="w-full" />
                                    <div className="flex justify-between text-sm mt-1">
                                        <span>৳0</span>
                                        <span>৳{priceRange[1]}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            
                <div className="lg:w-3/4 md:w-3/4 w-full rounded pb-4 shadow bg-white">
                    <div className="py-4 px-4 bg-green-100 pb-6 flex justify-between items-center">
                        <h2 className="text-black text-2xl font-bold">{productsList.length} Products Found</h2>
                    </div>

                    {isError ? <p className='text-center text-red-500'>{productserror.message || "Something went wrong"}</p> :
                        <div className="pt-10 grid px-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
                            {productsList.length > 0 ? productsList.map((item) => (
                                <div key={item._id} className="group h-full flex flex-col relative border border-gray-200 rounded-2xl bg-white overflow-hidden transition-all duration-500 hover:shadow-xl">
                                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                                        {item.discount >= 15 ? <span className='px-3 py-1 text-xs font-semibold  text-white rounded-full bg-red-500'>Hot</span> :
                                            <span className={`px-3 py-1 text-xs font-semibold ${item.isNew == true ? "bg-green-500" : "bg-amber-500"}  text-white rounded-full`}>{item.isNew == true ? "New" : "Old"}</span>
                                        }
                                        <span className="px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-full">{item.discount}%</span>
                                    </div>

                                    <div className="absolute top-3 right-3 z-10 text-[#1E40AF] hover:text-red-500 transition-colors duration-300 cursor-pointer">
                                        <FaHeart className="w-6 h-6" />
                                    </div>

                                    <div className="overflow-hidden">
                                        <img src={item.image} alt={item.name} className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-110" />
                                    </div>

                                    <div className="p-4 flex flex-1 flex-col">
                                        <div className='flex gap-1.5 justify-between'>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                                            <p className='text-sm'>Sold : {item.sold}</p>
                                        </div>

                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-0.5">
                                                <span className="text-green-600 font-bold text-lg">{item.price}৳</span>
                                                <span className="text-gray-400 line-through text-sm">{item.oldPrice}</span>
                                            </div>

                                            <div className="flex items-center mb-2 text-yellow-400 text-sm">
                                                <Stars rating={item.rating} />
                                                <span className="text-gray-400 text-sm">{item.rating.toFixed(1)}</span>
                                            </div>
                                        </div>

                                        <button className="w-full mt-auto flex items-center justify-center gap-2 py-2.5 border border-green-500 text-green-500 rounded-xl font-medium transition-all duration-300 hover:bg-green-600 hover:text-white hover:shadow-lg active:scale-95">
                                            <FaShoppingCart /> Add to Cart
                                        </button>
                                    </div>
                                </div>
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
