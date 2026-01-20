import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';
import Footer from './Footer';

const Root = () => {
    return (
        <div>
            <Navbar/>
            <div className='lg:max-w-[70%] mx-auto md:max-w-[95%] max-w-[98%]  mx-4'><Outlet/></div>
            <Footer/>
        </div>
    );
};

export default Root;