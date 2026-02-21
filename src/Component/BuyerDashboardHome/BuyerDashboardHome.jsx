import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Useauth from '../../Component/Useauth';
import { order, paymentHistory } from '../../Component/Api';
import {
    ShoppingBagIcon,
    CurrencyDollarIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    CalendarIcon,
    ChartBarIcon,
    CircleStackIcon
} from '@heroicons/react/24/outline';
import { 
    LineChart, 
    Line, 
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from 'recharts';

const BuyerDashboardHome = () => {
    const { user } = Useauth();
    const [orders, setOrders] = useState([]);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeframe, setTimeframe] = useState('month');

    useEffect(() => {
        if (!user?.email) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const [ordersRes, paymentsRes] = await Promise.all([
                    order(user.email),
                    paymentHistory(user.email)
                ]);
                setOrders(ordersRes || []);
                setPayments(paymentsRes || []);
            } catch (err) {
                console.log('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user?.email]);


    const getFilteredData = () => {
        const now = new Date();
        const filterDate = new Date();
        
        switch(timeframe) {
            case 'week': filterDate.setDate(now.getDate() - 7); break;
            case 'month': filterDate.setMonth(now.getMonth() - 1); break;
            case 'year': filterDate.setFullYear(now.getFullYear() - 1); break;
            default: filterDate.setMonth(now.getMonth() - 1);
        }

        const filtered = {
            payments: payments.filter(p => new Date(p.created_at) >= filterDate),
            orders: orders.filter(o => new Date(o.created_at) >= filterDate)
        };
        
        filtered.successful = filtered.payments.filter(p => p.status === 'SUCCESS');
        return filtered;
    };

    const current = getFilteredData();
    

    const stats = {
        orders: current.orders.length,
        spent: current.successful.reduce((sum, p) => sum + (p.totalAmount || 0), 0),
        successful: current.successful.length,
        cancelled: current.payments.filter(p => p.status === 'CANCLE').length,
        pending: current.payments.filter(p => p.status === 'PENDING').length,
        items: current.orders.reduce((sum, o) => sum + (o.items?.length || 0), 0),
        avgOrder: current.orders.length ? 
            Math.round(current.orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0) / current.orders.length) : 0,
        successRate: current.payments.length ? 
            Math.round((current.successful.length / current.payments.length) * 100) : 0
    };


    const getDailyData = () => {
        const days = {};
        const now = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            days[dayName] = { name: dayName, amount: 0 };
        }

        current.successful.forEach(p => {
            const date = new Date(p.created_at);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            if (days[dayName]) {
                days[dayName].amount += p.totalAmount || 0;
            }
        });

        return Object.values(days);
    };

   
    const getCategoryData = () => {
        const cats = {};
        current.orders.forEach(o => {
            o.items?.forEach(item => {
                const cat = item.category || 'Other';
                cats[cat] = (cats[cat] || 0) + ((item.price || 0) * (item.quantity || 1));
            });
        });

        return Object.entries(cats)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);
    };

  
    const getMonthlyData = () => {
        const months = {};
        current.successful.forEach(p => {
            const date = new Date(p.created_at);
            const month = date.toLocaleDateString('en-US', { month: 'short' });
            months[month] = (months[month] || 0) + (p.totalAmount || 0);
        });
        return Object.entries(months).map(([name, amount]) => ({ name, amount }));
    };

    const dailyData = getDailyData();
    const categoryData = getCategoryData();
    const monthlyData = getMonthlyData();
    
    const PIE_COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];
    const CHART_COLOR = '#10b981';

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-emerald-600 font-medium">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (!current.orders.length) {
        return (
            <div className="min-h-screen flex items-center justify-center ">
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingBagIcon className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
                    <p className="text-gray-600 mb-6">Start shopping to see your dashboard analytics</p>
                    <Link 
                        to="/shop" 
                        className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="w-full">
          
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
                        <p className="text-gray-600">Welcome back, {user?.displayName?.split(' ')[0] || 'Buyer'}</p>
                    </div>
                    <div className="flex gap-2 mt-3 md:mt-0">
                        <select 
                            value={timeframe}
                            onChange={(e) => setTimeframe(e.target.value)}
                            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="week">Last 7 Days</option>
                            <option value="month">Last 30 Days</option>
                            <option value="year">Last 12 Months</option>
                        </select>
                        <Link 
                            to="/buyer/orders" 
                            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                        >
                            View Orders
                        </Link>
                    </div>
                </div>

           
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2 bg-emerald-100 rounded-lg">
                                <ShoppingBagIcon className="w-5 h-5 text-emerald-600" />
                            </div>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                {stats.items} items
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-800">{stats.orders}</p>
                        <p className="text-sm text-gray-500">Total Orders</p>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <CurrencyDollarIcon className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-800">৳{stats.spent.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Total Spent</p>
                        <p className="text-xs text-gray-400 mt-1">Avg ৳{stats.avgOrder} per order</p>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                {stats.successRate}% rate
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-800">{stats.successful}</p>
                        <p className="text-sm text-gray-500">Successful</p>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <XCircleIcon className="w-5 h-5 text-red-600" />
                            </div>
                            <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                                {stats.pending} pending
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-800">{stats.cancelled}</p>
                        <p className="text-sm text-gray-500">Cancelled</p>
                    </div>
                </div>

              
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                <ChartBarIcon className="w-5 h-5 text-emerald-600" />
                                Daily Spending
                            </h3>
                            <span className="text-xs text-gray-500">Last 7 days</span>
                        </div>
                        {dailyData.some(d => d.amount > 0) ? (
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={dailyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                                    <YAxis stroke="#6b7280" fontSize={12} />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: '#1f2937',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#fff',
                                            fontSize: '12px'
                                        }}
                                        formatter={(value) => [`৳${value}`, 'Spent']}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="amount" 
                                        stroke={CHART_COLOR}
                                        strokeWidth={2}
                                        dot={{ fill: CHART_COLOR, r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-[200px] flex items-center justify-center text-gray-400">
                                No spending data for this period
                            </div>
                        )}
                    </div>

                  
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-4">
                            <CircleStackIcon className="w-5 h-5 text-purple-600" />
                            Top Categories
                        </h3>
                        {categoryData.length > 0 ? (
                            <div className="flex items-center">
                                <ResponsiveContainer width="45%" height={180}>
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={35}
                                            outerRadius={60}
                                            paddingAngle={3}
                                            dataKey="value"
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            formatter={(value) => [`৳${value}`, 'Amount']}
                                            contentStyle={{ 
                                                backgroundColor: '#fff',
                                                border: 'none',
                                                borderRadius: '8px',
                                                color: '#fff',
                                                fontSize: '12px'
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="flex-1 space-y-3">
                                    {categoryData.map((cat, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}></span>
                                                <span className="text-sm text-gray-600 truncate max-w-[100px]">{cat.name}</span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-800">৳{cat.value.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="h-[180px] flex items-center justify-center text-gray-400">
                                No category data
                            </div>
                        )}
                    </div>
                </div>

           
                {monthlyData.length > 0 && (
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
                        <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-4">
                            <CalendarIcon className="w-5 h-5 text-emerald-600" />
                            Monthly Spending Overview
                        </h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                                <YAxis stroke="#6b7280" fontSize={12} />
                                <Tooltip 
                                    formatter={(value) => [`৳${value}`, 'Spent']}
                                    contentStyle={{ 
                                        backgroundColor: '#1f2937',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontSize: '12px'
                                    }}
                                />
                                <Bar dataKey="amount" fill={CHART_COLOR} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                            <ClockIcon className="w-5 h-5 text-emerald-600" />
                            Recent Orders
                        </h3>
                        <Link to="/buyer/orders" className="text-sm text-emerald-600 hover:text-emerald-700">
                            View All
                        </Link>
                    </div>
                    
                    <div className="space-y-3">
                        {current.orders.slice(0, 5).map((order, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-lg">
                                        <ShoppingBagIcon className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">
                                            Order #{order.tran_id?.slice(-8) || order._id?.slice(-8)}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(order.created_at).toLocaleDateString()} • {order.items?.length || 0} items
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-gray-800">৳{order.totalAmount}</p>
                                    <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                        Completed
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyerDashboardHome;