import React, { useState, useMemo } from 'react';
import Useauth from '../../Component/Useauth';
import { useQuery } from '@tanstack/react-query';
import { buyerorder } from '../../Component/Api';
import {
    Package,
    Search,
    Filter,
    Download,
    Eye,
    Calendar,
    User,
    ShoppingBag,
    DollarSign,
    Mail,
    XCircle,
    TrendingUp,
    Clock,
    CreditCard,
    ChevronRight,
    Printer,
    Share2,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

const Buyer_Order = () => {
    const { user } = Useauth();
    const email = user?.email;
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [timeFilter, setTimeFilter] = useState('all');

    const { data: orders = [], isLoading, error } = useQuery({
        queryKey: ["buyerOrders", email],
        enabled: !!email,
        queryFn: () => buyerorder(email)
    });

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.item?.price || 0), 0);
    const averageOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesSearch = searchTerm === '' ||
                order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.tran_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.userEmail?.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        });
    }, [orders, searchTerm]);

    const displayOrders = useMemo(() => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        switch (timeFilter) {
            case 'today':
                return filteredOrders.filter(order => new Date(order.paid_at) >= today);

            case 'week': {
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return filteredOrders.filter(order => new Date(order.paid_at) >= weekAgo);
            }

            case 'month': {
                const monthAgo = new Date();
                monthAgo.setMonth(monthAgo.getMonth() - 1);
                return filteredOrders.filter(order => new Date(order.paid_at) >= monthAgo);
            }

            default:
                return filteredOrders;
        }
    }, [filteredOrders, timeFilter]);


    const filterApplied = searchTerm !== '' || timeFilter !== 'all';

    const clearFilters = () => {
        setSearchTerm('');
        setTimeFilter('all');
    };

    const OrderDetailsModal = ({ order, onClose }) => {
        if (!order) return null;

        return (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                    <div className="sticky top-0 bg-white border-b-2 border-green-600 p-6 flex justify-between items-center">
                        <div>
                            <div className="flex items-center gap-2 text-green-600 mb-2">
                                <CreditCard className="w-5 h-5" />
                                <span className="text-sm font-medium">Transaction Details</span>
                            </div>
                            <h2 className="text-2xl font-bold text-black">Order #{order.tran_id?.slice(0, 12)}</h2>
                            <p className="text-gray-600 mt-1 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {new Date(order.paid_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <XCircle className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <h3 className="font-semibold text-black mb-4 flex items-center gap-2 text-lg">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <User className="w-5 h-5 text-green-600" />
                                </div>
                                Customer Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-gray-600">Full Name</p>
                                    <p className="font-semibold text-black text-lg">{order.customer_name || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Email Address</p>
                                    <p className="font-medium text-black flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-200">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        {order.userEmail}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                <h3 className="font-semibold text-black flex items-center gap-2 text-lg">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <ShoppingBag className="w-5 h-5 text-green-600" />
                                    </div>
                                    Product Details
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <img
                                        src={order.item?.Productimg}
                                        alt={order.item?.name}
                                        className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg border-2 border-gray-200"
                                    />
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <h4 className="text-xl font-bold text-black">{order.item?.name}</h4>
                                            <p className="text-sm text-gray-600 mt-1">Product ID: {order.item?.id}</p>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-sm text-gray-600">Price</p>
                                                <p className="text-xl font-bold text-green-600">
                                                    ${order.item?.price?.toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-sm text-gray-600">Quantity</p>
                                                <p className="text-xl font-bold text-black">{order.item?.quantity || 1}</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg col-span-2 md:col-span-1">
                                                <p className="text-sm text-gray-600">Seller</p>
                                                <p className="text-sm font-medium text-black truncate">{order.item?.sellerEmail}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                            <h3 className="font-semibold text-black mb-4 flex items-center gap-2 text-lg">
                                <div className="p-2 bg-green-600 rounded-lg">
                                    <DollarSign className="w-5 h-5 text-white" />
                                </div>
                                Payment Summary
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-green-200">
                                    <span className="text-gray-700">Subtotal</span>
                                    <span className="font-semibold text-black">${order.item?.price?.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-green-200">
                                    <span className="text-gray-700">Shipping</span>
                                    <span className="font-semibold text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-green-200">
                                    <span className="text-gray-700">Tax</span>
                                    <span className="font-semibold text-black">$0.00</span>
                                </div>
                                <div className="flex justify-between items-center pt-4">
                                    <span className="text-lg font-bold text-black">Total Amount</span>
                                    <span className="text-2xl font-bold text-green-600">${order.item?.price?.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-end">
                            <button className="px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-green-600 hover:bg-gray-50 transition-all flex items-center gap-2 text-gray-700 font-medium">
                                <Printer className="w-5 h-5" />
                                Print
                            </button>
                            <button className="px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-green-600 hover:bg-gray-50 transition-all flex items-center gap-2 text-gray-700 font-medium">
                                <Share2 className="w-5 h-5" />
                                Share
                            </button>
                            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2 font-medium">
                                <Download className="w-5 h-5" />
                                Download Invoice
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-lg font-medium text-gray-700">Loading orders...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md border border-gray-200">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-10 h-10 text-red-500" />
                    </div>
                    <h2 className="text-xl font-bold text-black mb-2">Error Loading Orders</h2>
                    <p className="text-gray-600 mb-6">Please try again later</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-600 rounded-lg">
                            <ShoppingBag className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-black">Buyer Orders</h1>
                    </div>
                    <p className="text-gray-600">Manage and track all your customer orders</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Total Orders</p>
                                <p className="text-3xl font-bold text-black">{totalOrders}</p>
                                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    All time
                                </p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-lg">
                                <Package className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
                                <p className="text-3xl font-bold text-black">${totalRevenue.toFixed(2)}</p>
                                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    Lifetime sales
                                </p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-lg">
                                <DollarSign className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Average Order</p>
                                <p className="text-3xl font-bold text-black">${averageOrderValue}</p>
                                <p className="text-xs text-gray-500 mt-2">Per transaction</p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-lg">
                                <CreditCard className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md border border-gray-200 mb-6">
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <Filter className="w-5 h-5 text-green-600" />
                                <span className="font-medium text-black">Filter Orders</span>
                                {filterApplied && (
                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" />
                                        Filter Applied
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <select
                                    value={timeFilter}
                                    onChange={(e) => setTimeFilter(e.target.value)}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-700"
                                >
                                    <option value="all">All Time</option>
                                    <option value="today">Today</option>
                                    <option value="week">This Week</option>
                                    <option value="month">This Month</option>
                                </select>

                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search orders..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent w-full sm:w-64"
                                    />
                                </div>

                                {filterApplied && (
                                    <button
                                        onClick={clearFilters}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                                    >
                                        Clear Filters
                                    </button>
                                )}

                                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-medium">
                                    <Download className="w-4 h-4" />
                                    Export
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Transaction ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {displayOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                            <p className="text-gray-600 font-medium mb-1">No orders found</p>
                                            <p className="text-gray-500 text-sm">Try adjusting your filters</p>
                                            {filterApplied && (
                                                <button
                                                    onClick={clearFilters}
                                                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                                >
                                                    Clear Filters
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ) : (
                                    displayOrders.map((order) => (
                                        <tr
                                            key={order.tran_id}
                                            className="hover:bg-gray-50 transition-colors cursor-pointer border-l-2 border-transparent hover:border-green-600"
                                            onClick={() => {
                                                setSelectedOrder(order);
                                                setShowDetailsModal(true);
                                            }}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-mono font-medium text-black">
                                                    {order.tran_id}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                        <User className="w-4 h-4 text-gray-600" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-black">
                                                            {order.customer_name || 'N/A'}
                                                        </p>
                                                        <p className="text-xs text-gray-500">{order.userEmail}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <img
                                                        src={order.item?.Productimg}
                                                        alt={order.item?.name}
                                                        className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                                                    />
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-black">
                                                            {order.item?.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            Qty: {order.item?.quantity || 1}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-600">
                                                    {new Date(order.paid_at).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-lg font-bold text-green-600">
                                                    ${order.item?.price?.toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedOrder(order);
                                                        setShowDetailsModal(true);
                                                    }}
                                                    className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-medium text-black">{displayOrders.length}</span> of <span className="font-medium text-black">{orders.length}</span> orders
                            </p>
                            {displayOrders.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                                        <ChevronRight className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showDetailsModal && (
                <OrderDetailsModal
                    order={selectedOrder}
                    onClose={() => {
                        setShowDetailsModal(false);
                        setSelectedOrder(null);
                    }}
                />
            )}
        </div>
    );
};

export default Buyer_Order;