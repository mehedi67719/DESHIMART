import React from 'react';
import { Link } from 'react-router';
import banner from '../../assets/banner.png'
import {
    FiHome,
    FiTrendingUp,
    FiUsers,
    FiDollarSign,
    FiArrowRight,
    FiStar,
    FiWind, FiBox, FiTarget,
    FiGrid, FiActivity, FiLayers,
    FiShield,
    FiTruck,
    FiCreditCard,
    FiHeadphones,
    FiRefreshCw,
    FiAward,
    FiClock,
    FiHeart,
    FiCheckCircle,
    FiRotateCcw,



} from "react-icons/fi";
import { FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import FeaturedProducts from '../../Component/FeaturedProducts';
import PopularProducts from '../../Component/PopularProducts';
import SellingSection from '../../Component/SellingSection';
import PopularCategori from '../../Component/PopularCategori';
import WhyShopWithUs from '../../Component/WhyShopWithUs';
import WhyChooseUs from '../../Component/WhyChooseUs';


const Home = () => {





    return (

        <div>




            <div className='relative max-w-full overflow-hidden'>
                <img
                    src={banner}
                    className='w-full h-full object-cover'
                    alt="Fresh Deshi Products"
                />
                <div className='absolute inset-0 flex animate-pulse flex-col items-end justify-center px-[10%] bg-gradient-to-r from-transparent to-black/10'>
                    <div className='text-right animate-fadeIn'>
                        <button className='lg:mt-50 md:mt-35 mt-15 lg:mr-70 bg-green-500 text-white lg:py-4 lg:px-10 md:py-4 md:px-10 py-2 px-5 text-xl font-bold rounded-full shadow-xl hover:bg-gray-900 transition-all duration-300 transform hover:-translate-y-1 active:scale-95'>
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>





            <div className='container mb-10'>
                <FeaturedProducts />

                <PopularProducts />

                <SellingSection />


                <PopularCategori />



                <WhyShopWithUs />


                <WhyChooseUs />


            </div>




        </div>

    );
};

export default Home;