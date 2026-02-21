import React, { useState } from 'react';
import { 
    Home, ShoppingCart, Users, DollarSign, ShoppingBag, Package, 
    CreditCard, CheckCircle, Store, Star, Clock, XCircle, 
    TrendingUp, PieChart as PieChartIcon, BarChart3 
} from 'lucide-react';
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, 
    LineChart, Line, Legend
} from "recharts";
import Useauth from '../Useauth';
import BuyerDashboardHome from '../BuyerDashboardHome/BuyerDashboardHome';


// Colors for charts
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899', '#14b8a6'];

const AdminDashboardHome = () => {
    const { user } = Useauth();
    const [activeView, setActiveView] = useState('admin'); // 'admin' or 'buyer'

    // ========== ADMIN MOCK DATA ==========
    const stats = {
        totalUsers: 25431, totalSellers: 3456, totalBuyers: 21975, newUsersToday: 127,
        totalOrders: 45678, completedOrders: 42345, pendingOrders: 567, processingOrders: 892, cancelledOrders: 1874,
        totalRevenue: 8923456, monthlyRevenue: 987654, todayRevenue: 34567,
        totalProducts: 12345, approvedProducts: 9876, pendingProducts: 1567, rejectedProducts: 902,
        successfulPayments: 44567, failedPayments: 567, refundedOrders: 544
    };

    const monthlyData = [
        { month: 'Jan', orders: 3200, revenue: 450000, users: 890, sellers: 45, products: 234 },
        { month: 'Feb', orders: 3500, revenue: 520000, users: 945, sellers: 52, products: 267 },
        { month: 'Mar', orders: 4100, revenue: 610000, users: 1023, sellers: 48, products: 289 },
        { month: 'Apr', orders: 3800, revenue: 580000, users: 987, sellers: 56, products: 312 },
        { month: 'May', orders: 4300, revenue: 670000, users: 1123, sellers: 63, products: 345 },
        { month: 'Jun', orders: 4800, revenue: 720000, users: 1245, sellers: 71, products: 378 },
    ];

    const categoryData = [
        { name: 'Electronics', value: 35, sales: 15234, revenue: 3124567 },
        { name: 'Fashion', value: 28, sales: 12345, revenue: 1987654 },
        { name: 'Home', value: 20, sales: 8765, revenue: 1234567 },
        { name: 'Books', value: 12, sales: 5432, revenue: 345678 },
        { name: 'Sports', value: 15, sales: 6543, revenue: 567890 },
    ];

    const topProducts = [
        { name: 'iPhone 15 Pro', category: 'Electronics', sold: 1234, revenue: 1845678, rating: 4.9 },
        { name: 'Nike Air Max', category: 'Fashion', sold: 2341, revenue: 678901, rating: 4.8 },
        { name: 'Samsung TV', category: 'Electronics', sold: 876, revenue: 1234567, rating: 4.7 },
        { name: 'Harry Potter Set', category: 'Books', sold: 2345, revenue: 234567, rating: 5.0 },
        { name: 'Sofa Set', category: 'Home', sold: 567, revenue: 890123, rating: 4.6 },
    ];

    const topSellers = [
        { name: 'TechZone', products: 156, revenue: 4567890, rating: 4.9 },
        { name: 'FashionHub', products: 234, revenue: 6789012, rating: 4.8 },
        { name: 'HomeDecor', products: 89, revenue: 2345678, rating: 4.9 },
        { name: 'BookWorld', products: 345, revenue: 3456789, rating: 4.7 },
    ];

    const topBuyers = [
        { name: 'John Doe', orders: 45, spent: 234567, items: 89 },
        { name: 'Jane Smith', orders: 38, spent: 198765, items: 76 },
        { name: 'Bob Wilson', orders: 32, spent: 167890, items: 54 },
        { name: 'Alice Brown', orders: 29, spent: 145678, items: 48 },
    ];

    // ========== ADMIN VIEW ==========
    const AdminView = () => (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    { title: 'Total Users', value: stats.totalUsers, sub: `Buyers: ${stats.totalBuyers}`, icon: Users, color: 'blue' },
                    { title: 'Total Revenue', value: `$${(stats.totalRevenue/1000000).toFixed(1)}M`, sub: `Monthly: $${(stats.monthlyRevenue/1000).toFixed(0)}K`, icon: DollarSign, color: 'green' },
                    { title: 'Total Orders', value: stats.totalOrders, sub: `${stats.completedOrders} completed`, icon: ShoppingBag, color: 'purple' },
                    { title: 'Total Products', value: stats.totalProducts, sub: `${stats.approvedProducts} approved`, icon: Package, color: 'orange' }
                ].map((card, i) => (
                    <div key={i} className="bg-white rounded-xl p-6 border">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">{card.title}</p>
                                <h3 className="text-2xl font-bold mt-1">{card.value.toLocaleString?.() || card.value}</h3>
                                <p className="text-xs text-gray-500 mt-2">{card.sub}</p>
                            </div>
                            <div className={`bg-${card.color}-50 p-3 rounded-lg`}>
                                <card.icon className={`w-6 h-6 text-${card.color}-600`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Revenue & Orders Charts */}
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Revenue</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Area dataKey="revenue" stroke="#3b82f6" fill="#93c5fd" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Orders</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="orders" fill="#10b981" radius={[8,8,0,0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Growth & Category Charts */}
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Platform Growth</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={monthlyData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line dataKey="users" stroke="#3b82f6" />
                            <Line dataKey="sellers" stroke="#10b981" />
                            <Line dataKey="products" stroke="#f59e0b" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Categories</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                {categoryData.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Status Charts */}
            <div className="grid grid-cols-3 gap-6">
                {[
                    { title: 'Payment Status', icon: CreditCard, data: [
                        { name: 'Success', value: stats.successfulPayments, color: '#10b981' },
                        { name: 'Failed', value: stats.failedPayments, color: '#ef4444' },
                        { name: 'Refunded', value: stats.refundedOrders, color: '#f59e0b' }
                    ]},
                    { title: 'Product Approval', icon: CheckCircle, data: [
                        { name: 'Approved', value: stats.approvedProducts, color: '#10b981' },
                        { name: 'Pending', value: stats.pendingProducts, color: '#f59e0b' },
                        { name: 'Rejected', value: stats.rejectedProducts, color: '#ef4444' }
                    ]},
                    { title: 'Order Status', icon: ShoppingBag, data: [
                        { name: 'Completed', value: stats.completedOrders, color: '#10b981' },
                        { name: 'Processing', value: stats.processingOrders, color: '#3b82f6' },
                        { name: 'Pending', value: stats.pendingOrders, color: '#f59e0b' },
                        { name: 'Cancelled', value: stats.cancelledOrders, color: '#ef4444' }
                    ]}
                ].map((chart, i) => (
                    <div key={i} className="bg-white rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <chart.icon className="w-5 h-5 text-green-600" />
                            <h3 className="font-semibold">{chart.title}</h3>
                        </div>
                        <ResponsiveContainer width="100%" height={180}>
                            <PieChart>
                                <Pie data={chart.data} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={70} label>
                                    {chart.data.map((entry, j) => <Cell key={j} fill={entry.color} />)}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                ))}
            </div>

            {/* Top Products Table */}
            <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Top Products</h3>
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left p-3">Product</th>
                            <th className="text-left p-3">Category</th>
                            <th className="text-right p-3">Sold</th>
                            <th className="text-right p-3">Revenue</th>
                            <th className="text-center p-3">Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topProducts.map((p, i) => (
                            <tr key={i} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-medium">{p.name}</td>
                                <td className="p-3 text-gray-500">{p.category}</td>
                                <td className="p-3 text-right">{p.sold}</td>
                                <td className="p-3 text-right text-green-600">${(p.revenue/1000).toFixed(0)}K</td>
                                <td className="p-3 text-center">⭐ {p.rating}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Top Sellers & Buyers */}
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Store className="text-blue-600" /> Top Sellers</h3>
                    {topSellers.map((s, i) => (
                        <div key={i} className="flex justify-between items-center border-b py-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold">{s.name[0]}</div>
                                <div>
                                    <p className="font-medium">{s.name}</p>
                                    <p className="text-xs text-gray-500">{s.products} products</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-green-600">${(s.revenue/1000).toFixed(0)}K</p>
                                <p className="text-xs">⭐ {s.rating}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-white rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Users className="text-green-600" /> Top Buyers</h3>
                    {topBuyers.map((b, i) => (
                        <div key={i} className="flex justify-between items-center border-b py-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center font-bold">{b.name[0]}</div>
                                <div>
                                    <p className="font-medium">{b.name}</p>
                                    <p className="text-xs text-gray-500">{b.orders} orders</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-green-600">${(b.spent/1000).toFixed(0)}K</p>
                                <p className="text-xs">{b.items} items</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b px-6 py-4 sticky top-0 z-10">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                        <p className="text-sm text-gray-500">Welcome back, {user?.displayName || 'Admin'}</p>
                    </div>
                    <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                        <button 
                            onClick={() => setActiveView('admin')}
                            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
                                activeView === 'admin' 
                                    ? 'bg-white shadow text-blue-600' 
                                    : 'text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            <Home className="w-4 h-4" /> As Admin
                        </button>
                        <button 
                            onClick={() => setActiveView('buyer')}
                            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
                                activeView === 'buyer' 
                                    ? 'bg-white shadow text-green-600' 
                                    : 'text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            <ShoppingCart className="w-4 h-4" /> As Buyer
                        </button>
                    </div>
                </div>
            </div>

           
            <div className="p-6">
                {activeView === 'admin' ? <AdminView /> : <BuyerDashboardHome />}
            </div>
        </div>
    );
};

export default AdminDashboardHome;