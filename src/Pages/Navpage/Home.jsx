import React from 'react';
import Banner from '../../Component/Homecomponent/Banner';
import FeaturedProducts from '../../Component/Homecomponent/FeaturedProducts';
import PopularProducts from '../../Component/Homecomponent/PopularProducts';
import SellingSection from '../../Component/Homecomponent/SellingSection';
import PopularCategori from '../../Component/Homecomponent/PopularCategori';
import WhyShopWithUs from '../../Component/Homecomponent/WhyShopWithUs';
import WhyChooseUs from '../../Component/Homecomponent/WhyChooseUs';


const Home = () => {





    return (

        <div>



            <Banner />

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