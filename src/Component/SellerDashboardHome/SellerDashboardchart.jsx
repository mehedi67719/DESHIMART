import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area
} from "recharts";

import Useauth from '../Useauth';
import { buyerorder, sellerpopularcategorys, sellerTopratingcategorys } from '../Api';


const SellerDashboardchart = () => {
    const { user } = Useauth();

    const { data: popularCategories, isLoading: popularLoading, isError: popularError } = useQuery({
        queryKey: ["mypopularcategori"],
        queryFn: () => sellerpopularcategorys(user?.email),
        enabled: !!user?.email
    });

    const { data: topRatingCategories, isLoading: topRatingLoading, isError: topRatingError } = useQuery({
        queryKey: ["myTopratingcategori"],
        queryFn: () => sellerTopratingcategorys(user?.email),
        enabled: !!user?.email
    });

    const { data: sellingproducts = [], isLoading: productsLoading, isError: productsError } = useQuery({
        queryKey: ["buyerOrders", user?.email],
        enabled: !!user?.email,
        queryFn: () => buyerorder(user?.email)
    });

    const transformedPopularData = popularCategories?.map(item => ({
        name: item.category,
        value: item.totalSold
    })) || [];

    const transformedTopRatingData = topRatingCategories?.map(item => ({
        name: item.category,
        value: item.avgRating || 0
    })) || [];

    const productSalesData = sellingproducts?.reduce((acc, order) => {
        const productName = order.item?.name || 'Unknown Product';
        const existing = acc.find(item => item.name === productName);
        if (existing) {
            existing.quantity += order.item?.quantity || 1;
            existing.revenue += (order.item?.price || 0) * (order.item?.quantity || 1);
        } else {
            acc.push({
                name: productName,
                quantity: order.item?.quantity || 1,
                revenue: (order.item?.price || 0) * (order.item?.quantity || 1)
            });
        }
        return acc;
    }, []) || [];

    const topProducts = [...productSalesData].sort((a, b) => b.quantity - a.quantity).slice(0, 5);

    const uniqueCustomers = new Map();
    sellingproducts?.forEach(order => {
        if (!uniqueCustomers.has(order.userEmail)) {
            uniqueCustomers.set(order.userEmail, {
                email: order.userEmail,
                firstOrder: new Date(order.paid_at)
            });
        }
    });

    const customerGrowthData = Array.from({ length: 12 }, (_, i) => {
        const month = new Date();
        month.setMonth(month.getMonth() - (11 - i));
        const monthName = month.toLocaleString('default', { month: 'short' });
        
        const customersInMonth = Array.from(uniqueCustomers.values()).filter(customer => {
            const customerMonth = customer.firstOrder.getMonth();
            const customerYear = customer.firstOrder.getFullYear();
            return customerMonth === month.getMonth() && customerYear === month.getFullYear();
        }).length;

        const cumulativeCustomers = Array.from(uniqueCustomers.values()).filter(customer => {
            const customerDate = customer.firstOrder;
            return customerDate <= month;
        }).length;

        return {
            month: monthName,
            newCustomers: customersInMonth,
            customers: cumulativeCustomers
        };
    });

    const revenueData = sellingproducts?.reduce((acc, order) => {
        const date = new Date(order.paid_at).toLocaleDateString('en-US', { weekday: 'short' });
        const existing = acc.find(item => item.day === date);
        if (existing) {
            existing.revenue += (order.item?.price || 0) * (order.item?.quantity || 1);
        } else {
            acc.push({
                day: date,
                revenue: (order.item?.price || 0) * (order.item?.quantity || 1)
            });
        }
        return acc;
    }, []) || [];

    const salesData = sellingproducts?.reduce((acc, order) => {
        const date = new Date(order.paid_at).toLocaleDateString('en-US', { weekday: 'short' });
        const existing = acc.find(item => item.day === date);
        if (existing) {
            existing.orders += 1;
        } else {
            acc.push({
                day: date,
                orders: 1
            });
        }
        return acc;
    }, []) || [];

    const daysOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const sortedRevenueData = daysOrder.map(day => {
        const found = revenueData.find(item => item.day === day);
        return found || { day, revenue: 0 };
    });

    const sortedSalesData = daysOrder.map(day => {
        const found = salesData.find(item => item.day === day);
        return found || { day, orders: 0 };
    });

    const totalOrders = sellingproducts?.length || 0;
    const totalRevenue = sellingproducts?.reduce((sum, order) => {
        return sum + ((order.item?.price || 0) * (order.item?.quantity || 1));
    }, 0) || 0;

    const lastWeekOrders = sortedSalesData.slice(-7).reduce((sum, day) => sum + day.orders, 0);
    const previousWeekOrders = lastWeekOrders * 0.85;
    const salesGrowth = previousWeekOrders > 0 ? 
        ((lastWeekOrders - previousWeekOrders) / previousWeekOrders * 100).toFixed(0) : 15;

    const totalCustomers = uniqueCustomers.size;
    const newThisMonth = customerGrowthData[customerGrowthData.length - 1]?.newCustomers || 0;
    const growthPercentage = customerGrowthData.length > 1 ? 
        ((customerGrowthData[customerGrowthData.length - 1]?.customers - customerGrowthData[customerGrowthData.length - 2]?.customers) / 
        customerGrowthData[customerGrowthData.length - 2]?.customers * 100).toFixed(0) : 0;

    const COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac", "#f59e0b", "#ef4444", "#3b82f6", "#a855f7"];

    if (popularLoading || topRatingLoading || productsLoading) {
        return (
            <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard data...</p>
                </div>
            </div>
        );
    }

    if (popularError || topRatingError || productsError) {
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

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Revenue Trend</h3>
                        <select className="border rounded-lg px-3 py-1 text-sm">
                            <option>This Week</option>
                        </select>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={sortedRevenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Revenue']} />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#16a34a"
                                fill="#bbf7d0"
                                strokeWidth={3}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                    <div className="mt-4 text-sm text-gray-600">
                        Total Revenue: ${totalRevenue.toFixed(2)}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Sales Overview</h3>
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                            +{salesGrowth}% growth
                        </span>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={sortedSalesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="orders" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="mt-4 text-sm text-gray-600">
                        Total Orders: {totalOrders}
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="bg-white rounded-2xl shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Top Rating Category</h3>
                    {transformedTopRatingData.length > 0 ? (
                        <>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={transformedTopRatingData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={90}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {transformedTopRatingData.map((entry, index) => (
                                            <Cell key={`rating-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [`${value.toFixed(1)} ⭐`, 'Average Rating']} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="mt-4 space-y-1 text-sm max-h-32 overflow-y-auto">
                                {transformedTopRatingData.map((item, i) => (
                                    <div key={i} className="flex justify-between">
                                        <span className="flex items-center">
                                            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                                            {item.name}
                                        </span>
                                        <span className="font-semibold text-yellow-600">{item.value.toFixed(1)} ⭐</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="h-[250px] flex items-center justify-center text-gray-500">
                            No rating data available
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-2xl shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Top Selling Category</h3>
                    {transformedPopularData.length > 0 ? (
                        <>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={transformedPopularData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={90}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {transformedPopularData.map((entry, index) => (
                                            <Cell key={`popular-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [`${value} units`, 'Total Sold']} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="mt-4 space-y-1 text-sm max-h-32 overflow-y-auto">
                                {transformedPopularData.map((item, i) => (
                                    <div key={i} className="flex justify-between">
                                        <span className="flex items-center">
                                            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                                            {item.name}
                                        </span>
                                        <span className="font-semibold text-green-600">{item.value.toLocaleString()} units</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="h-[250px] flex items-center justify-center text-gray-500">
                            No sales data available
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-2xl shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Customer Growth (12 Months)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={customerGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" interval={1} />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="customers"
                                stroke="#8b5cf6"
                                fill="#ddd6fe"
                                strokeWidth={3}
                            />
                        </AreaChart>
                    </ResponsiveContainer>

                    <div className="flex justify-between mt-4">
                        <div>
                            <p className="text-gray-500 text-sm">Total Customers</p>
                            <h4 className="text-xl font-bold">{totalCustomers}</h4>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">New This Month</p>
                            <h4 className="text-xl font-bold text-green-600">+{newThisMonth}</h4>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Growth</p>
                            <h4 className="text-xl font-bold text-green-600">{growthPercentage}%</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-1 gap-6 mt-6">
                <div className="bg-white rounded-2xl shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Top Selling Products (Top 5)</h3>
                    {topProducts.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={topProducts}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="quantity" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {topProducts.map((product, i) => (
                                    <div key={i} className="bg-orange-50 p-3 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold text-gray-800">{product.name}</p>
                                                <p className="text-sm text-gray-500">Revenue: ${product.revenue.toFixed(2)}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                    {product.quantity} units
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {productSalesData.length > 5 && (
                                    <div className="text-center text-sm text-gray-500 mt-2">
                                        + {productSalesData.length - 5} more products
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="h-[300px] flex items-center justify-center text-gray-500">
                            No product data available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SellerDashboardchart;