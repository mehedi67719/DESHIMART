import React from 'react';
import banner from '../../assets/banner.png'
import FeaturedProducts from '../../Component/FeaturedProducts';
import PopularProducts from '../../Component/PopularProducts';
import SellingSection from '../../Component/SellingSection';
import PopularCategori from '../../Component/PopularCategori';
import WhyShopWithUs from '../../Component/WhyShopWithUs';
import WhyChooseUs from '../../Component/WhyChooseUs';
import Banner from '../../Component/Banner';


const Home = () => {





    return (

        <div>



<Banner></Banner>





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