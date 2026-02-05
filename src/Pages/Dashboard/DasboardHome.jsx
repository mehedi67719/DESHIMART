import React from 'react';
import { 
    FaDollarSign, 
    FaShoppingCart, 
    FaUsers, 
    FaChartLine,
    FaArrowUp,
    FaEye,
    FaCheckCircle,
    FaClock,
    FaCogs,
    FaFileExport,
    FaBox,
    FaChartBar,
    FaArrowRight
} from 'react-icons/fa';
import { MdAttachMoney, MdTrendingUp } from 'react-icons/md';

const DasboardHome = () => {
    const statsCards = [
        {
            title: "Total Revenue",
            value: "৳ 24,580",
            change: "+12.5%",
            icon: <FaDollarSign className="w-6 h-6" />,
            color: "bg-gradient-to-br from-green-500 to-emerald-600",
            trend: "up"
        },
        {
            title: "Total Orders",
            value: "1,248",
            change: "+8.2%",
            icon: <FaShoppingCart className="w-6 h-6" />,
            color: "bg-gradient-to-br from-blue-500 to-cyan-600",
            trend: "up"
        },
        {
            title: "Total Customers",
            value: "5,842",
            change: "+15.3%",
            icon: <FaUsers className="w-6 h-6" />,
            color: "bg-gradient-to-br from-purple-500 to-violet-600",
            trend: "up"
        },
        {
            title: "Conversion Rate",
            value: "3.24%",
            change: "+2.1%",
            icon: <FaChartLine className="w-6 h-6" />,
            color: "bg-gradient-to-br from-orange-500 to-amber-600",
            trend: "up"
        }
    ];

    const recentOrders = [
        { id: 1001, items: 3, amount: "৳ 1,250", status: "Completed", time: "10:30 AM", customer: "John Doe" },
        { id: 1002, items: 2, amount: "৳ 890", status: "Processing", time: "11:15 AM", customer: "Jane Smith" },
        { id: 1003, items: 5, amount: "৳ 2,340", status: "Pending", time: "12:45 PM", customer: "Robert Johnson" },
        { id: 1004, items: 1, amount: "৳ 450", status: "Completed", time: "1:20 PM", customer: "Sarah Williams" },
        { id: 1005, items: 4, amount: "৳ 1,780", status: "Processing", time: "2:10 PM", customer: "Michael Brown" }
    ];

    const getStatusBadge = (status) => {
        const styles = {
            'Completed': 'bg-green-100 text-green-800 border border-green-200',
            'Processing': 'bg-blue-100 text-blue-800 border border-blue-200',
            'Pending': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
            'default': 'bg-gray-100 text-gray-800 border border-gray-200'
        };
        
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || styles.default} flex items-center`}>
                {status === 'Completed' && <FaCheckCircle className="mr-1.5 w-3 h-3" />}
                {status === 'Processing' && <FaCogs className="mr-1.5 w-3 h-3" />}
                {status === 'Pending' && <FaClock className="mr-1.5 w-3 h-3" />}
                {status}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-sm p-6 border border-green-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Welcome back, Admin! 👋</h1>
                        <p className="text-gray-600">Here's what's happening with your store today.</p>
                    </div>
                    <button className="mt-4 md:mt-0 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center shadow-md hover:shadow-lg">
                        <FaFileExport className="mr-2" />
                        Generate Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsCards.map((card, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
                        <div className={`${card.color} p-4 text-white`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium opacity-95">{card.title}</p>
                                    <p className="text-xl font-bold mt-1.5">{card.value}</p>
                                </div>
                                <div className="bg-white/20 p-2.5 rounded-lg">
                                    {card.icon}
                                </div>
                            </div>
                        </div>
                        <div className="p-3 bg-gray-50">
                            <div className={`flex items-center ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'} font-medium`}>
                                <FaArrowUp className={`w-3 h-3 mr-1.5 ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                                <span className="text-sm">{card.change} from last month</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center">
                            <FaShoppingCart className="mr-2.5 text-green-600" />
                            Recent Orders
                        </h2>
                        <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center">
                            View All
                            <FaArrowRight className="ml-1.5 w-3 h-3" />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="font-medium text-gray-900">Order #{order.id}</p>
                                        <span className="text-sm text-gray-500">{order.time}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-600">{order.customer}</p>
                                        <p className="text-sm font-medium text-gray-900">{order.amount}</p>
                                    </div>
                                    <div className="mt-1.5 flex items-center">
                                        <FaBox className="w-3 h-3 text-gray-400 mr-1.5" />
                                        <span className="text-xs text-gray-500">{order.items} items</span>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    {getStatusBadge(order.status)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center">
                        <MdTrendingUp className="mr-2.5 text-green-600" />
                        Quick Stats
                    </h2>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                    <MdAttachMoney className="text-green-600" />
                                </div>
                                <span className="text-gray-700">Average Order Value</span>
                            </div>
                            <span className="font-semibold text-green-600">৳ 89.42</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                    <FaUsers className="text-blue-600" />
                                </div>
                                <span className="text-gray-700">Customer Satisfaction</span>
                            </div>
                            <span className="font-semibold text-green-600">94.2%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                    <FaBox className="text-purple-600" />
                                </div>
                                <span className="text-gray-700">Products in Stock</span>
                            </div>
                            <span className="font-semibold">1,247</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                    <FaChartBar className="text-red-600" />
                                </div>
                                <span className="text-gray-700">Return Rate</span>
                            </div>
                            <span className="font-semibold text-red-600">2.4%</span>
                        </div>
                    </div>
                    
                    <div className="mt-6 pt-5 border-t border-gray-200">
                        <button className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                            Download Full Report
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Monthly Performance</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">৳ 45,280</div>
                        <div className="text-sm text-gray-600 mt-1">This Month</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">624</div>
                        <div className="text-sm text-gray-600 mt-1">Orders</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">2,890</div>
                        <div className="text-sm text-gray-600 mt-1">New Customers</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">4.2%</div>
                        <div className="text-sm text-gray-600 mt-1">Conversion</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DasboardHome;