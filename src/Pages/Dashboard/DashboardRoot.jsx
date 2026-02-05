import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from '../../Component/Navbar';
import Footer from '../../Component/Footer';
import { Outlet } from 'react-router';


const DashboardRoot = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-40 left-2 z-50 bg-green-600 text-white p-2 rounded-md shadow-lg"
            >
                {sidebarOpen ? '✕' : '☰'}
            </button>

            <div className="flex container flex-1">
                <div className={`
                    fixed lg:sticky lg:top-16 top-43 left-0 
                    h-screen lg:h-[calc(100vh-4rem)]
                    w-[280px] lg:w-[19%] 
                    bg-white  border-r border-gray-200 z-40
                    transform transition-transform duration-300
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    <div className="h-full overflow-y-auto">
                        <Sidebar onItemClick={() => setSidebarOpen(false)} />
                    </div>
                </div>

                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                <div className="flex-1 lg:w-[81%] w-full ml-0 my-5 p-0">
                    <div className="lg:ml-5 md:ml-5 ml-0 min-h-[calc(100vh-12rem)] overflow-y-auto ">
                        <Outlet />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DashboardRoot;