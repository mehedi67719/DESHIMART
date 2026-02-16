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
                className="md:hidden fixed top-20 left-2 z-50 bg-green-600 text-white p-2 rounded-md shadow-lg"
            >
                {sidebarOpen ? '✕' : '☰'}
            </button>

            <div className="flex flex-1 container">
                <div className={`
                    fixed md:sticky md:top-16 top-20 left-0 
                    h-screen md:h-[calc(100vh-4rem)]
                    w-[240px] md:w-[180px] lg:w-[200px] xl:w-[220px]
                    bg-white border-r border-gray-200 z-40
                    transform transition-transform duration-300
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}>
                    <div className="h-full overflow-y-auto">
                        <Sidebar onItemClick={() => setSidebarOpen(false)} />
                    </div>
                </div>

                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                <div className="flex-1 w-full md:w-[calc(100%-180px)] lg:w-[calc(100%-200px)] xl:w-[calc(100%-220px)] ml-3">
                    <div className="min-h-[calc(100vh-12rem)]">
                        <Outlet />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DashboardRoot;