import React from 'react';
import { FiAward, FiCheckCircle, FiClock, FiCreditCard, FiHeadphones, FiHeart, FiRefreshCw, FiShield, FiStar, FiTruck } from 'react-icons/fi';

const WhyShopWithUs = () => {
    return (
        <section className="bg-white mt-20 rounded-2xl py-16 px-4 font-sans">
            <div className="max-w-6xl mx-auto text-center">


                <div className="flex items-center justify-center gap-4 mb-3">
                    <div className="h-[2px] w-10 bg-green-500"></div>
                    <h2 className="text-3xl font-bold text-gray-900">Why Shop With Us</h2>
                    <div className="h-[2px] w-10 bg-green-500"></div>
                </div>
                <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mb-10">
                    Experience the best online shopping with our commitment to quality, security, and exceptional service
                </p>


                <div className="border border-green-100 rounded-[32px] p-6 md:p-12 shadow-sm bg-[#FCFDFB]">


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">


                        <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                <FiShield />
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm mb-2">Secure Shopping</h3>
                            <p className="text-[11px] text-gray-400 mb-6">100% secure payment with SSL encryption</p>
                            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                <div className="w-1/2 h-full bg-blue-500"></div>
                            </div>
                        </div>


                        <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                <FiTruck />
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm mb-2">Free Delivery</h3>
                            <p className="text-[11px] text-gray-400 mb-6">Free shipping on orders over $50</p>
                            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                <div className="w-1/3 h-full bg-green-500"></div>
                            </div>
                        </div>


                        <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                            <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                <FiCreditCard />
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm mb-2">Easy Payments</h3>
                            <p className="text-[11px] text-gray-400 mb-6">Multiple payment options available</p>
                            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                <div className="w-2/3 h-full bg-purple-500"></div>
                            </div>
                        </div>


                        <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                <FiHeadphones />
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm mb-2">24/7 Support</h3>
                            <p className="text-[11px] text-gray-400 mb-6">Dedicated customer support anytime</p>
                            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                <div className="w-1/4 h-full bg-orange-500"></div>
                            </div>
                        </div>


                        <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                            <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                <FiRefreshCw />
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm mb-2">Easy Returns</h3>
                            <p className="text-[11px] text-gray-400 mb-6">30-day hassle-free return policy</p>
                            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                <div className="w-1/2 h-full bg-pink-500"></div>
                            </div>
                        </div>


                        <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                            <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                <FiAward />
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm mb-2">Quality Assured</h3>
                            <p className="text-[11px] text-gray-400 mb-6">100% authentic products guaranteed</p>
                            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                <div className="w-1/3 h-full bg-yellow-600"></div>
                            </div>
                        </div>


                        <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                            <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                <FiClock />
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm mb-2">Fast Processing</h3>
                            <p className="text-[11px] text-gray-400 mb-6">Orders processed within 24 hours</p>
                            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                <div className="w-1/2 h-full bg-indigo-500"></div>
                            </div>
                        </div>


                        <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                <FiHeart />
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm mb-2">Best Prices</h3>
                            <p className="text-[11px] text-gray-400 mb-6">Competitive pricing with great deals</p>
                            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                <div className="w-1/4 h-full bg-red-500"></div>
                            </div>
                        </div>

                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 pt-4">
                        <div className="text-center">
                            <h4 className="text-3xl font-bold text-green-600">50K+</h4>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Happy Customers</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-3xl font-bold text-green-600">100K+</h4>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Products Sold</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-3xl font-bold text-green-600">99%</h4>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Satisfaction Rate</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-3xl font-bold text-green-600">24/7</h4>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Customer Support</p>
                        </div>
                    </div>


                    <div className="inline-flex items-center gap-2 bg-white border border-yellow-100 px-6 py-2 rounded-full shadow-sm text-xs font-medium text-gray-700">
                        <FiCheckCircle className="text-green-500 text-base" />
                        Trusted by thousands of satisfied customers worldwide
                        <div className="flex gap-0.5 ml-2">
                            <FiStar className="fill-yellow-400 text-yellow-400" />
                            <FiStar className="fill-yellow-400 text-yellow-400" />
                            <FiStar className="fill-yellow-400 text-yellow-400" />
                            <FiStar className="fill-yellow-400 text-yellow-400" />
                            <FiStar className="fill-yellow-400 text-yellow-400" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyShopWithUs;