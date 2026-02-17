import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";
import { Package, Clock, CheckCircle, Users, TrendingUp, Star } from "lucide-react";
import { statussummary } from '../Api';
import Useauth from '../Useauth';
import { useQuery } from '@tanstack/react-query';

const TopsellingsellerDashboard = () => {
    const { user } = Useauth();
    const email = user?.email;

    const { data: datas, isLoading, error } = useQuery({
        queryKey: ["statusSummary", email],
        queryFn: () => statussummary(email),
        enabled: !!email
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-600 text-5xl mb-4">⚠️</div>
                    <p className="text-gray-800 font-semibold">Error loading dashboard data</p>
                    <p className="text-gray-600 mt-2">Please try again later</p>
                </div>
            </div>
        );
    }

    const statsData = datas || { approved: 0, pending: 0, rejected: 0 };
    
    const totalProducts = (statsData.approved || 0) + (statsData.pending || 0) + (statsData.rejected || 0);
    const completedOrders = statsData.approved || 0;
    const pendingOrders = statsData.pending || 0;
    const rejectedOrders = statsData.rejected || 0;

    const pieData = [
        { name: 'Approved', value: statsData.approved || 0, color: '#16a34a' },
        { name: 'Pending', value: statsData.pending || 0, color: '#f59e0b' },
        { name: 'Rejected', value: statsData.rejected || 0, color: '#ef4444' }
    ].filter(item => item.value > 0);

    const barData = [
        { name: 'Approved', value: statsData.approved || 0, color: '#16a34a' },
        { name: 'Pending', value: statsData.pending || 0, color: '#f59e0b' },
        { name: 'Rejected', value: statsData.rejected || 0, color: '#ef4444' }
    ];

    const COLORS = ['#16a34a', '#f59e0b', '#ef4444'];

    return (
        <div className="">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Seller Dashboard Overview</h2>
                <p className="text-gray-600">Welcome back, {user?.displayName || 'Seller'}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
    
                <div className="bg-white rounded-2xl shadow p-6">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <TrendingUp className="text-green-600 w-5 h-5" />
                        Quick Stats
                    </h3>

                    <div className="space-y-5">
                        <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-white p-4 rounded-xl border border-green-100">
                            <div className="flex items-center gap-4">
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <Package className="text-green-600 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">
                                        Total Products
                                    </p>
                                    <h4 className="text-2xl font-bold text-gray-800">
                                        {totalProducts}
                                    </h4>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                                    Active
                                </span>
                                <p className="text-xs text-gray-400 mt-1">All time</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-gradient-to-r from-yellow-50 to-white p-4 rounded-xl border border-yellow-100">
                            <div className="flex items-center gap-4">
                                <div className="bg-yellow-100 p-3 rounded-lg">
                                    <Clock className="text-yellow-600 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">
                                        Pending Orders
                                    </p>
                                    <h4 className="text-2xl font-bold text-gray-800">
                                        {pendingOrders}
                                    </h4>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-semibold">
                                    Pending
                                </span>
                                <p className="text-xs text-gray-400 mt-1">Awaiting review</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-white p-4 rounded-xl border border-purple-100">
                            <div className="flex items-center gap-4">
                                <div className="bg-purple-100 p-3 rounded-lg">
                                    <CheckCircle className="text-purple-600 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">
                                        Approved Products
                                    </p>
                                    <h4 className="text-2xl font-bold text-gray-800">
                                        {completedOrders}
                                    </h4>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
                                    Approved
                                </span>
                                <p className="text-xs text-gray-400 mt-1">Successfully verified</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-gradient-to-r from-red-50 to-white p-4 rounded-xl border border-red-100">
                            <div className="flex items-center gap-4">
                                <div className="bg-red-100 p-3 rounded-lg">
                                    <Package className="text-red-600 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">
                                        Rejected Products
                                    </p>
                                    <h4 className="text-2xl font-bold text-gray-800">
                                        {rejectedOrders}
                                    </h4>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                                    Rejected
                                </span>
                                <p className="text-xs text-gray-400 mt-1">Needs revision</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-white p-4 rounded-xl border border-orange-100">
                            <div className="flex items-center gap-4">
                                <div className="bg-orange-100 p-3 rounded-lg">
                                    <Star className="text-orange-600 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">
                                        Success Rate
                                    </p>
                                    <h4 className="text-2xl font-bold text-gray-800">
                                        {totalProducts > 0 ? ((completedOrders / totalProducts) * 100).toFixed(1) : 0}%
                                    </h4>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                                    {totalProducts > 0 ? ((completedOrders / totalProducts) * 100).toFixed(0) : 0}%
                                </span>
                                <p className="text-xs text-gray-400 mt-1">Approval rate</p>
                            </div>
                        </div>
                    </div>
                </div>

        
                <div className="space-y-6">
                  
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Package className="text-green-600 w-5 h-5" />
                            Product Status Overview
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                    {barData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-6 mt-4">
                            {barData.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                                    <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

             
                    {pieData.length > 0 && (
                        <div className="bg-white rounded-2xl shadow p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <TrendingUp className="text-green-600 w-5 h-5" />
                                Distribution Overview
                            </h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
            </div>

      
        </div>
    );
};

export default TopsellingsellerDashboard;