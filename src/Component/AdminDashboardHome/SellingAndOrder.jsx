import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
    AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { ordersummary } from '../Api';

const SellingAndOrder = () => {
    
    const {data, isLoading, error} = useQuery({
        queryKey: "ordersummary",
        queryFn: ordersummary
    })

    const processMonthlyData = () => {
        if (!data?.monthlySummary) return [];
        
        return Object.entries(data.monthlySummary).map(([month, values]) => ({
            month: new Date(month).toLocaleString('default', { month: 'short' }),
            revenue: values.totalRevenue || 0,
            orders: values.totalItems || 0
        })).reverse();
    }

    const monthlyData = processMonthlyData();

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border">
                    <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
                    <div className="h-[250px] bg-gray-100 rounded animate-pulse"></div>
                </div>
                <div className="bg-white rounded-xl p-6 border">
                    <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
                    <div className="h-[250px] bg-gray-100 rounded animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border">
                    <h3 className="text-lg font-semibold mb-4">Selling ($)</h3>
                    <div className="h-[250px] flex items-center justify-center">
                        <p className="text-red-500">Failed to load data</p>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 border">
                    <h3 className="text-lg font-semibold mb-4">Orders</h3>
                    <div className="h-[250px] flex items-center justify-center">
                        <p className="text-red-500">Failed to load data</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-4 sm:p-6 border w-full">
                <h3 className="text-lg font-semibold mb-4">Selling ($)</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={monthlyData.length ? monthlyData : [{ month: 'No Data', revenue: 0 }]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Area dataKey="revenue" stroke="#3b82f6" fill="#93c5fd" />
                    </AreaChart>
                </ResponsiveContainer>
                {!monthlyData.length && (
                    <p className="text-center text-gray-500 text-sm mt-2">No data available</p>
                )}
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 border w-full">
                <h3 className="text-lg font-semibold mb-4">Orders</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={monthlyData.length ? monthlyData : [{ month: 'No Data', orders: 0 }]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="orders" fill="#10b981" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
                {!monthlyData.length && (
                    <p className="text-center text-gray-500 text-sm mt-2">No data available</p>
                )}
            </div>
        </div>
    );
};

export default SellingAndOrder;