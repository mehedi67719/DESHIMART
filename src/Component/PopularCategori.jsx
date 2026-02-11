import React from 'react';
import { FiActivity, FiArrowRight, FiBox, FiGrid, FiLayers, FiTarget, FiWind } from 'react-icons/fi';

const PopularCategori = () => {



    const categories = [

        { id: 2, name: "Ice and Cold", icon: <FiWind /> },
        { id: 3, name: "Vegetables", icon: <FiLayers /> },
        { id: 4, name: "Meat", icon: <FiBox /> },
        { id: 5, name: "Fish", icon: <FiActivity /> },
        {
            id: 6,
            name: "Fruit",
            icon: <FiTarget />,
            isHot: true,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
        },
        { id: 7, name: "Fast Food", icon: <FiGrid /> },
        { id: 8, name: "Dry Food", icon: <FiBox /> },
    ];




    return (
        <section className="mt-25 font-sans">
            <div className=" w-full text-center">

                <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="h-[1px] w-12 bg-green-500"></div>
                    <h2 className="text-3xl font-bold text-gray-800">Popular Categories</h2>
                    <div className="h-[1px] w-12 bg-green-500"></div>
                </div>
                <p className="text-gray-500 text-sm mb-6">
                    Explore our most popular product categories and find what you need <br />
                    <span className="text-green-500 text-xs italic">✨ Curated collections for your convenience</span>
                </p>

                <button className="bg-green-600 text-white px-6 py-2 rounded-full flex items-center gap-2 mx-auto mb-12 hover:bg-green-700 transition-all">
                    <FiGrid /> Browse All Categories <FiArrowRight />
                </button>


                <div className="border border-green-100 rounded-[40px] p-8 md:p-12 shadow-sm bg-gradient-to-b from-white to-green-50/20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                className={`relative bg-white border ${cat.isHot ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-100'} rounded-2xl p-6 flex flex-col items-center group hover:shadow-lg transition-all duration-300`}
                            >

                                {cat.isHot && (
                                    <span className="absolute -top-2 -right-2 bg-orange-400 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                                        Hot
                                    </span>
                                )}


                                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                    {cat.icon}
                                </div>

                                <h3 className="font-bold text-gray-800 mb-2">{cat.name}</h3>

                                {cat.desc ? (
                                    <p className="text-[10px] text-gray-400 mb-4 px-2">{cat.desc}</p>
                                ) : (
                                    <div className="h-[1px] w-full bg-gray-100 mb-6"></div>
                                )}

                                <button className="text-xs font-semibold text-green-600 border border-green-600 px-4 py-1.5 rounded-full flex items-center gap-1 hover:bg-green-600 hover:text-white transition-all">
                                    Explore Now <FiArrowRight className="text-[10px]" />
                                </button>
                            </div>
                        ))}
                    </div>


                    <div className="mt-16 pt-8 border-t border-gray-200">
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div>
                                <h4 className="text-2xl font-bold text-green-600">8+</h4>
                                <p className="text-xs text-gray-500">Categories</p>
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-orange-400">43+</h4>
                                <p className="text-xs text-gray-500">Products</p>
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-green-800 font-mono">24/7</h4>
                                <p className="text-xs text-gray-500">Support</p>
                            </div>
                        </div>

                        <div className="inline-flex items-center gap-2 bg-white border border-green-200 px-4 py-1.5 rounded-full shadow-sm text-[11px] text-gray-600">

                            Discover amazing products in every category

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PopularCategori;