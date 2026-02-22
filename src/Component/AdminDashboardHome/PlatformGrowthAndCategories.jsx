import React from 'react';
import {
    LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from "recharts";
import { useQuery } from '@tanstack/react-query';
import { popularcategorys, alluserssummary, productuploadsummary } from '../Api';

const PlatformGrowthAndCategories = () => {
    const { data: categoryData, isLoading: categoryLoading, isError: categoryError } = useQuery({
        queryKey: ["popularcategori"],
        queryFn: popularcategorys
    });

    const { data: usersData, isLoading: usersLoading, isError: usersError } = useQuery({
        queryKey: ["alluserssummary"],
        queryFn: alluserssummary
    });

    const { data: productsData, isLoading: productsLoading, isError: productsError } = useQuery({
        queryKey: ["productuploadsummary"],
        queryFn: productuploadsummary
    });
  
    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899', '#14b8a6', '#ff6b6b'];

    const processGrowthData = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const growthMap = new Map();
        
        if (usersData?.monthlySummary) {
            Object.entries(usersData.monthlySummary).forEach(([month, data]) => {
                const monthName = months[new Date(month).getMonth()];
                if (!growthMap.has(monthName)) {
                    growthMap.set(monthName, { month: monthName, users: 0, sellers: 0, products: 0 });
                }
                const entry = growthMap.get(monthName);
                entry.users += data.totalUsers || 0;
                entry.sellers += data.totalSellers || 0;
            });
        }

        if (productsData?.monthlyUpload) {
            Object.entries(productsData.monthlyUpload).forEach(([month, count]) => {
                const monthName = months[new Date(month).getMonth()];
                if (!growthMap.has(monthName)) {
                    growthMap.set(monthName, { month: monthName, users: 0, sellers: 0, products: 0 });
                }
                const entry = growthMap.get(monthName);
                entry.products += count || 0;
            });
        }

        const sortedData = Array.from(growthMap.values()).sort((a, b) => 
            months.indexOf(a.month) - months.indexOf(b.month)
        );
        
        return sortedData.length > 0 ? sortedData.slice(-6) : [];
    };

    const processCategoryData = () => {
        if (!categoryData || !Array.isArray(categoryData)) return [];
        
        const totalSold = categoryData.reduce((sum, item) => sum + item.totalSold, 0);
        
        return categoryData.map(item => ({
            name: item.category,
            value: Number(((item.totalSold / totalSold) * 100).toFixed(1)),
            sales: item.totalSold
        })).sort((a, b) => b.value - a.value);
    };

    const growthData = processGrowthData();
    const processedCategoryData = processCategoryData();
    
    const totalUsers = usersData?.monthlySummary ? 
        Object.values(usersData.monthlySummary).reduce((sum, m) => sum + (m.totalUsers || 0), 0) : 0;
    const totalSellers = usersData?.monthlySummary ? 
        Object.values(usersData.monthlySummary).reduce((sum, m) => sum + (m.totalSellers || 0), 0) : 0;
    const totalProducts = productsData?.totalProducts || 0;

    const isLoading = categoryLoading || usersLoading || productsLoading;
    const isError = categoryError || usersError || productsError;

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white rounded-xl p-4 sm:p-6 border">
                    <div className="h-5 sm:h-6 bg-gray-200 rounded w-36 sm:w-48 mb-3 sm:mb-4 animate-pulse"></div>
                    <div className="h-[220px] sm:h-[280px] bg-gray-100 rounded animate-pulse"></div>
                </div>
                <div className="bg-white rounded-xl p-4 sm:p-6 border">
                    <div className="h-5 sm:h-6 bg-gray-200 rounded w-36 sm:w-48 mb-3 sm:mb-4 animate-pulse"></div>
                    <div className="h-[220px] sm:h-[280px] bg-gray-100 rounded animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white rounded-xl p-4 sm:p-6 border">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Platform Growth</h3>
                    <div className="h-[220px] sm:h-[280px] flex items-center justify-center">
                        <p className="text-red-500 text-sm sm:text-base">Failed to load data</p>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 sm:p-6 border">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Categories</h3>
                    <div className="h-[220px] sm:h-[280px] flex items-center justify-center">
                        <p className="text-red-500 text-sm sm:text-base">Failed to load data</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl p-4 sm:p-6 border hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2">
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800">Platform Growth</h3>
                        <p className="text-xs text-gray-500 mt-1">Monthly platform statistics</p>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-3 text-xs">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            Users: {totalUsers}
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                            Sellers: {totalSellers}
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                            Products: {totalProducts}
                        </span>
                    </div>
                </div>

                {growthData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={growthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis
                                dataKey="month"
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                axisLine={{ stroke: '#e5e7eb' }}
                            />
                            <YAxis
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                axisLine={{ stroke: '#e5e7eb' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }}
                            />
                            <Legend
                                verticalAlign="top"
                                height={36}
                                wrapperStyle={{ fontSize: '12px' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="users"
                                name="Users"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="sellers"
                                name="Sellers"
                                stroke="#10b981"
                                strokeWidth={2}
                                dot={{ fill: '#10b981', strokeWidth: 2 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="products"
                                name="Products"
                                stroke="#f59e0b"
                                strokeWidth={2}
                                dot={{ fill: '#f59e0b', strokeWidth: 2 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-[280px] flex items-center justify-center">
                        <p className="text-gray-500 text-sm">No growth data available</p>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 border hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2">
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800">Categories</h3>
                        <p className="text-xs text-gray-500 mt-1">Sales distribution by category</p>
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                        {processedCategoryData.length} categories
                    </span>
                </div>

                {processedCategoryData.length > 0 ? (
                    <>
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={processedCategoryData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    innerRadius={45}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    labelLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
                                >
                                    {processedCategoryData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                            stroke="#fff"
                                            strokeWidth={2}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                    formatter={(value, name, props) => {
                                        if (name === 'value') {
                                            return [`${value}%`, 'Percentage'];
                                        }
                                        if (name === 'sales') {
                                            return [value.toLocaleString(), 'Units Sold'];
                                        }
                                        return [value, name];
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 max-h-[120px] overflow-y-auto">
                            {processedCategoryData.map((cat, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                                    <span className="text-xs text-gray-600 truncate">{cat.name}</span>
                                    <span className="text-xs font-medium text-gray-800 ml-auto">{cat.value}%</span>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="h-[280px] flex items-center justify-center">
                        <p className="text-gray-500 text-sm">No category data available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlatformGrowthAndCategories;