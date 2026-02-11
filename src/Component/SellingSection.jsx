import React from 'react';
import { FiArrowRight, FiDollarSign, FiHome, FiStar, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router';

const SellingSection = () => {






    const stats = [
        { label: "Active Vendors", value: "500+" },
        { label: "Monthly Orders", value: "10K+" },
        { label: "Success Rate", value: "98%" },
    ];

    const features = [
        {
            title: "Your Storefront",
            desc: "Create your own digital store",
            icon: <FiHome />,
        },
        {
            title: "Grow Sales",
            desc: "Reach thousands of customers",
            icon: <FiTrendingUp />,
        },
        {
            title: "Customer Base",
            desc: "Access our loyal community",
            icon: <FiUsers />,
        },
        {
            title: "Earn More",
            desc: "Competitive commission rates",
            icon: <FiDollarSign />,
        },
    ];





    return (
        <section className="w-full mt-20 rounded-2xl py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">


                <div className="space-y-8">

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8F5E9] text-green-500 text-sm font-medium">
                        <FiStar className="fill-current" />
                        Join Our Selling Community
                    </div>


                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                            Start Selling on <span className="text-green-500">DESHIMART</span>
                        </h1>
                        <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-xl">
                            Turn your passion into profit. Join thousands of successful vendors who trust DESHIMART to grow their business and reach new customers every day.
                        </p>
                    </div>


                    <div className="flex flex-wrap gap-4">
                        <Link to="/dashboard/becomeaseller" className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg shadow-green-100">
                            Become a Seller <FiArrowRight strokeWidth={3} />
                        </Link>
                        <button className="px-8 py-4 rounded-lg font-bold border-2 border-green-500 text-green-500 hover:bg-green-50 transition-all">
                            Learn More
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
                        {stats.map((stat, index) => (
                            <div key={index}>
                                <h3 className="text-2xl md:text-3xl font-bold text-green-500">{stat.value}</h3>
                                <p className="text-gray-500 text-sm md:text-base">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 mb-6 flex items-center justify-center bg-green-500 text-white text-3xl rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default SellingSection;