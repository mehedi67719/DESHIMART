import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { statussummary } from '../Api';
import { CheckCircle, Clock, Package, TrendingUp, XCircle } from 'lucide-react';
import Useauth from '../Useauth';
import SellerDashboardchart from '../SellerDashboardHome/SellerDashboardchart';
import TopsellingsellerDashboard from '../SellerDashboardHome/TopsellingsellerDashboard';


const SellerDashboardHome = () => {
    const { user } = Useauth();
    const email = user?.email;

    const { data: datas, isLoading, error } = useQuery({
        queryKey: ["statusSummary", email],
        queryFn: () => statussummary(email),
        enabled: !!email
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-600 text-5xl mb-4">⚠️</div>
                    <p className="text-gray-800 font-semibold">Error loading dashboard data</p>
                    <p className="text-gray-600 mt-2">Please try again later</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const stats = datas || { approved: 0, pending: 0, rejected: 0 };

    const totalProducts = (stats.approved || 0) + (stats.pending || 0) + (stats.rejected || 0);
    const approved = stats.approved || 0;
    const pending = stats.pending || 0;
    const rejected = stats.rejected || 0;

    return (
        <div className=" w-full ">
            <div className="bg-white border-b border-gray-200 px-8 py-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
                        <p className="text-gray-500 text-sm mt-1">Welcome back, {user?.displayName || 'Seller'}</p>
                    </div>
                    <div className="bg-gray-50 px-4 py-2 rounded-lg">
                        <p className="text-sm text-gray-600">Total Products</p>
                        <p className="text-2xl font-semibold text-gray-800">{totalProducts}</p>
                    </div>
                </div>
            </div>

            <div className='mt-5'>
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Approved Products</p>
                                <h3 className="text-3xl font-semibold text-gray-800">{approved}</h3>
                                <p className="text-gray-400 text-xs mt-2">Ready for sale</p>
                            </div>
                            <div className="bg-green-50 p-3 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-sm text-gray-600">Success Rate: {totalProducts > 0 ? ((approved / totalProducts) * 100).toFixed(1) : 0}%</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Pending Review</p>
                                <h3 className="text-3xl font-semibold text-gray-800">{pending}</h3>
                                <p className="text-gray-400 text-xs mt-2">Awaiting approval</p>
                            </div>
                            <div className="bg-yellow-50 p-3 rounded-lg">
                                <Clock className="w-5 h-5 text-yellow-600" />
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-sm text-gray-600">In queue: {pending} items</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Rejected</p>
                                <h3 className="text-3xl font-semibold text-gray-800">{rejected}</h3>
                                <p className="text-gray-400 text-xs mt-2">Needs revision</p>
                            </div>
                            <div className="bg-red-50 p-3 rounded-lg">
                                <XCircle className="w-5 h-5 text-red-600" />
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-sm text-gray-600">Requires attention: {rejected} items</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Total Products</p>
                                <h3 className="text-3xl font-semibold text-gray-800">{totalProducts}</h3>
                                <p className="text-gray-400 text-xs mt-2">All time</p>
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg">
                                <Package className="w-5 h-5 text-purple-600" />
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-sm text-gray-600">Active: {approved} products</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-50 p-3 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Approval Rate</p>
                                <h4 className="text-2xl font-semibold text-gray-800">
                                    {totalProducts > 0 ? ((approved / totalProducts) * 100).toFixed(1) : 0}%
                                </h4>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="bg-yellow-50 p-3 rounded-lg">
                                <Clock className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Pending Percentage</p>
                                <h4 className="text-2xl font-semibold text-gray-800">
                                    {totalProducts > 0 ? ((pending / totalProducts) * 100).toFixed(1) : 0}%
                                </h4>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="bg-red-50 p-3 rounded-lg">
                                <XCircle className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Rejection Rate</p>
                                <h4 className="text-2xl font-semibold text-gray-800">
                                    {totalProducts > 0 ? ((rejected / totalProducts) * 100).toFixed(1) : 0}%
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                   <SellerDashboardchart/>
                   <TopsellingsellerDashboard/>
                </div>
            </div>
        </div>
    );
};

export default SellerDashboardHome;