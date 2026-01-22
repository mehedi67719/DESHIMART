import React, { useState } from 'react';
import { FaCheckCircle, FaFilter, FaHeart, FaRegCheckCircle, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { RiMenu3Line } from 'react-icons/ri';

const Shop = () => {
    const [activeCategory, setActiveCategory] = useState("");
    const [showMobileFilter, setShowMobileFilter] = useState(false);


    const categories = [
        { name: "Electronics", path: "/shop" },
        { name: "Fashion", path: "/category/fashion" },
        { name: "Home & Kitchen", path: "/category/home-kitchen" },
        { name: "Books", path: "/category/books" },
        { name: "Sports", path: "/category/sports" },
        { name: "Electronics", path: "/shop" },
        { name: "Fashion", path: "/category/fashion" },
        { name: "Home & Kitchen", path: "/category/home-kitchen" },
        { name: "Books", path: "/category/books" },
        { name: "Sports", path: "/category/sports" },

    ];

    const handleClick = (category) => {
        setActiveCategory(category);
    };

    const ProductCard = () => (
        <div className="group relative border border-gray-200 rounded-2xl bg-white overflow-hidden transition-all duration-500 hover:shadow-xl">
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                <span className="px-3 py-1 text-xs font-semibold bg-green-500 text-white rounded-full">New</span>
                <span className="px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-full">-10%</span>
            </div>

            <div className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500 transition-colors duration-300 cursor-pointer">
                <FaRegHeart className="w-6 h-6" />
            </div>

            <div className="overflow-hidden">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaY-gJAef0oME8WFQsUn3-PtD809kNa6Y4Sw&s"
                    alt="Almond"
                    className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>


            <div className="p-4">
                <div className='flex justify-between'>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Onion</h3>
                    <div className="flex items-center mb-2 text-yellow-400 text-sm">
                        ★★★★★ <span className="text-gray-400 ml-2">(0)</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-green-600 font-bold text-lg">$31.50</span>
                        <span className="text-gray-400 line-through text-sm">$35.00</span>
                    </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-green-500 text-green-500 rounded-xl font-medium transition-all duration-300 hover:bg-green-600 hover:text-white hover:shadow-lg active:scale-95">
                    <FaShoppingCart /> Add to Cart
                </button>
            </div>
        </div>
    );

    return (
        <div className='container mx-auto px-4 mb-10'>

            <div className='text-center mb-10'>
                <h2 className='title text-4xl font-bold text-gray-800 mb-3'>Shop Products</h2>
                <p className='subtitle text-gray-600 text-lg'>Discover amazing products tailored to your needs</p>
            </div>

            <div className='flex flex-col lg:flex-row md:flex-row gap-6'>

                <div className='lg:w-1/4 md:w-1/4 hidden md:block lg:block'>
                    <div className='bg-white rounded-xl shadow-lg h-[calc(100vh-200px)] sticky top-45 overflow-hidden'>
                        <div className='py-4 bg-green-100 sticky top-0 z-10'>
                            <h2 className='text-black text-2xl font-bold text-center flex items-center justify-center gap-2'>
                                <FaFilter /> Filters
                            </h2>
                        </div>
                        <div className="flex flex-col overflow-y-auto h-[calc(100%-80px)] gap-2 w-full p-4">
                            {categories.map((cat, index) => (
                                <button
                                    key={`${cat.name}-${index}`}
                                    onClick={() => handleClick(cat.name)}
                                    className={`flex items-center gap-3 px-4 py-3 font-medium rounded-lg w-full text-left transition-all duration-200 ${activeCategory === cat.name
                                        ? "bg-green-50 text-green-600 border-l-4 border-green-500"
                                        : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    {activeCategory === cat.name ?
                                        <FaCheckCircle className="text-green-500" /> :
                                        <FaRegCheckCircle className="text-gray-400" />
                                    }
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>


                <div className='lg:hidden md:hidden mb-4'>
                    <button
                        onClick={() => setShowMobileFilter(!showMobileFilter)}
                        className='flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold'
                    >
                        <RiMenu3Line className='text-xl' />
                        {showMobileFilter ? 'Hide Filters' : 'Show Filters'}
                    </button>
                </div>


                {showMobileFilter && (
                    <div className='lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50' onClick={() => setShowMobileFilter(false)}>
                        <div className='absolute left-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl overflow-y-auto'
                            onClick={(e) => e.stopPropagation()}>
                            <div className='py-4 bg-green-100 flex justify-between items-center px-4'>
                                <h2 className='text-black text-2xl font-bold flex items-center gap-2'>
                                    <FaFilter /> Filters
                                </h2>
                                <button
                                    onClick={() => setShowMobileFilter(false)}
                                    className="text-2xl text-gray-600 hover:text-gray-800"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="flex flex-col gap-2 p-4">
                                {categories.map((cat, index) => (
                                    <button
                                        key={`${cat.name}-mobile-${index}`}
                                        onClick={() => {
                                            handleClick(cat.name);
                                            setShowMobileFilter(false);
                                        }}
                                        className={`flex items-center gap-3 px-4 py-3 font-medium rounded-lg w-full text-left ${activeCategory === cat.name
                                            ? "bg-green-50 text-green-600 border-l-4 border-green-500"
                                            : "text-gray-700 hover:bg-gray-50"
                                            }`}
                                    >
                                        {activeCategory === cat.name ?
                                            <FaCheckCircle className="text-green-500" /> :
                                            <FaRegCheckCircle className="text-gray-400" />
                                        }
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}


                <div className='lg:w-3/4 md:w-3/4 w-full'>
                    <div className='py-4 px-4 bg-green-100 rounded-xl mb-6 flex justify-between items-center'>
                        <h2 className='text-black text-2xl font-bold'>15 Products Found</h2>
                        <p className='text-gray-600'>Showing 15 of 15</p>
                    </div>

                    <div className='mt-10 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5'>
                        {[...Array(15)].map((_, index) => (
                            <ProductCard key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;