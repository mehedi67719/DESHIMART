import React, { useState } from 'react';
import { FaCheckCircle, FaFilter, FaRegCheckCircle } from 'react-icons/fa';
import { RiMenu3Line } from 'react-icons/ri';

const ShopFilter = ({
    activeCategory,
    setActiveCategory,
    activeBrand,
    setActiveBrand,
    priceRange,
    setPriceRange,
    categories,
    isLoading,
    error,
    Brands,
    brandsloading,
    branderror
}) => {
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [showAllBrands, setShowAllBrands] = useState(false);
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const MAX_SHOW = 5;

    const handleClick = (category) => setActiveCategory(category);
    const handlebrand = (brand) => setActiveBrand(brand);

    return (
        <>
           
            <div className="bg-white rounded-xl shadow h-[calc(100vh-100px)] sticky top-0 flex flex-col">
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
                                    <button key={index} onClick={() => handlebrand(brand.brand)} className={`flex items-center gap-3 px-4 py-3 font-medium rounded-lg w-full text-left transition-all duration-200 ${activeBrand === brand.brand ? "bg-green-50 text-green-600 border-l-4 border-green-500" : "text-gray-700 hover:bg-gray-50"}`}>
                                        {activeBrand === brand.brand ? <FaCheckCircle className="text-green-500" /> : <FaRegCheckCircle className="text-gray-400" />}
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
                                <button key={index} onClick={() => handlebrand(brand.brand)} className={`flex items-center gap-3 px-4 py-3 font-medium rounded-lg w-full text-left mt-2 ${activeBrand === brand.brand ? "bg-green-50 text-green-600 border-l-4 border-green-500" : "text-gray-700 hover:bg-gray-50"}`}>
                                    {activeBrand === brand.brand ? <FaCheckCircle className="text-green-500" /> : <FaRegCheckCircle className="text-gray-400" />}
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
        </>
    );
};

export default ShopFilter;