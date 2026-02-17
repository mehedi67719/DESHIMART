import React from 'react';
import { FiHeadphones, FiRotateCcw, FiShield, FiTruck } from 'react-icons/fi';

const WhyChooseUs = () => {



    const cardStyle = "bg-white border border-gray-100 hover:shadow-xl rounded-2xl p-6 flex flex-col items-center text-center hover:border-orange-200 transition-all shadow-sm";
    const iconBg = "w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-3xl text-orange-500 mb-4 relative";


    return (
        <section className="bg-white py-12 rounded-2xl mt-25 px-4">

            <div className="max-w-6xl mx-auto border border-gray-50 rounded-[32px] p-8 md:p-12 shadow-sm">

                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Why Choose Us?</h2>
                    <p className="text-gray-400 text-sm">We provide the best shopping experience with premium services</p>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">


                    <div className={cardStyle}>
                        <div className={iconBg}>
                            <div className="absolute inset-0 bg-orange-100/40 rounded-full blur-sm"></div>
                            <FiTruck className="relative z-10" />
                        </div>
                        <h3 className="font-bold text-gray-800 mb-1 text-base">Free Delivery</h3>
                        <p className="text-gray-400 text-[11px]">Free shipping over $100</p>
                    </div>


                    <div className={cardStyle}>
                        <div className={iconBg}>
                            <div className="absolute inset-0 bg-orange-100/40 rounded-full blur-sm"></div>
                            <FiRotateCcw className="relative z-10" />
                        </div>
                        <h3 className="font-bold text-gray-800 mb-1 text-base">Free Return</h3>
                        <p className="text-gray-400 text-[11px]">Free shipping over $100</p>
                    </div>


                    <div className={cardStyle}>
                        <div className={iconBg}>
                            <div className="absolute inset-0 bg-orange-100/40 rounded-full blur-sm"></div>
                            <FiHeadphones className="relative z-10" />
                        </div>
                        <h3 className="font-bold text-gray-800 mb-1 text-base">Customer Support</h3>
                        <p className="text-gray-400 text-[11px]">Friendly 24/7 customer support</p>
                    </div>


                    <div className={cardStyle}>
                        <div className={iconBg}>
                            <div className="absolute inset-0 bg-orange-100/40 rounded-full blur-sm"></div>
                            <FiShield className="relative z-10" />
                        </div>
                        <h3 className="font-bold text-gray-800 mb-1 text-base">Money Back guarantee</h3>
                        <p className="text-gray-400 text-[11px]">Quality checked by our team</p>
                    </div>

                </div>


                <div className="w-full h-[1px] bg-gray-100 mb-8"></div>


                <div className="flex justify-center">
                    <div className="bg-orange-50/50 border border-orange-100 px-6 py-2 rounded-xl flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                        <p className="text-xs font-semibold text-gray-700">Trusted by thousands of customers worldwide</p>
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default WhyChooseUs;