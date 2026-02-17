import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
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
import Useauth from '../../../Component/Useauth';
import { buyerorder } from '../../../Component/Api';

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
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 sm:p-4">
                <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
                    <div className="sticky top-0 bg-white border-b-2 border-green-600 p-4 sm:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <div>
                            <div className="flex items-center gap-2 text-green-600 mb-1 sm:mb-2">
                                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="text-xs sm:text-sm font-medium">Transaction Details</span>
                            </div>
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black">Order #{order.tran_id?.slice(0, 12)}</h2>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1 flex items-center gap-2">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
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
                            className="self-end sm:self-start p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                        </button>
                    </div>

                    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                        <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
                            <h3 className="font-semibold text-black mb-3 sm:mb-4 flex items-center gap-2 text-base sm:text-lg">
                                <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                                </div>
                                Customer Information
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-600">Full Name</p>
                                    <p className="font-semibold text-black text-base sm:text-lg">{order.customer_name || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-600">Email Address</p>
                                    <p className="text-xs sm:text-sm font-medium text-black flex items-center gap-2 bg-white p-2 sm:p-3 rounded-lg border border-gray-200 break-all">
                                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                                        <span className="truncate">{order.userEmail}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                            <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                                <h3 className="font-semibold text-black flex items-center gap-2 text-base sm:text-lg">
                                    <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                                        <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                                    </div>
                                    Product Details
                                </h3>
                            </div>
                            <div className="p-4 sm:p-6">
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                    <img
                                        src={order.item?.Productimg}
                                        alt={order.item?.name}
                                        className="w-full sm:w-32 lg:w-40 h-48 sm:h-32 lg:h-40 object-cover rounded-lg border-2 border-gray-200"
                                    />
                                    <div className="flex-1 space-y-3 sm:space-y-4">
                                        <div>
                                            <h4 className="text-lg sm:text-xl font-bold text-black">{order.item?.name}</h4>
                                            <p className="text-xs sm:text-sm text-gray-600 mt-1 break-all">Product ID: {order.item?.id}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                                                <p className="text-xs sm:text-sm text-gray-600">Price</p>
                                                <p className="text-base sm:text-xl font-bold text-green-600">
                                                    ${order.item?.price?.toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                                                <p className="text-xs sm:text-sm text-gray-600">Quantity</p>
                                                <p className="text-base sm:text-xl font-bold text-black">{order.item?.quantity || 1}</p>
                                            </div>
                                            <div className="col-span-2 bg-gray-50 p-3 sm:p-4 rounded-lg">
                                                <p className="text-xs sm:text-sm text-gray-600">Seller</p>
                                                <p className="text-xs sm:text-sm font-medium text-black break-all">{order.item?.sellerEmail}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 rounded-xl p-4 sm:p-6 border border-green-200">
                            <h3 className="font-semibold text-black mb-3 sm:mb-4 flex items-center gap-2 text-base sm:text-lg">
                                <div className="p-1.5 sm:p-2 bg-green-600 rounded-lg">
                                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                Payment Summary
                            </h3>
                            <div className="space-y-2 sm:space-y-3">
                                <div className="flex justify-between items-center py-1.5 sm:py-2 border-b border-green-200">
                                    <span className="text-xs sm:text-sm text-gray-700">Subtotal</span>
                                    <span className="text-sm sm:text-base font-semibold text-black">${order.item?.price?.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center py-1.5 sm:py-2 border-b border-green-200">
                                    <span className="text-xs sm:text-sm text-gray-700">Shipping</span>
                                    <span className="text-xs sm:text-sm font-semibold text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between items-center py-1.5 sm:py-2 border-b border-green-200">
                                    <span className="text-xs sm:text-sm text-gray-700">Tax</span>
                                    <span className="text-xs sm:text-sm font-semibold text-black">$0.00</span>
                                </div>
                                <div className="flex justify-between items-center pt-3 sm:pt-4">
                                    <span className="text-sm sm:text-base lg:text-lg font-bold text-black">Total Amount</span>
                                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">${order.item?.price?.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 sm:gap-4 justify-end">
                            <button className="flex-1 sm:flex-none px-3 sm:px-6 py-2 sm:py-3 border-2 border-gray-200 rounded-lg hover:border-green-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                                <Printer className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">Print</span>
                            </button>
                            <button className="flex-1 sm:flex-none px-3 sm:px-6 py-2 sm:py-3 border-2 border-gray-200 rounded-lg hover:border-green-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                                <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">Share</span>
                            </button>
                            <button className="flex-1 sm:flex-none px-3 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium">
                                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">Download</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-sm sm:text-base lg:text-lg font-medium text-gray-700">Loading orders...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center max-w-md border border-gray-200">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-black mb-2">Error Loading Orders</h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-6">Please try again later</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
                <div className="mb-4 sm:mb-6 lg:mb-8">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                        <div className="p-1.5 sm:p-2 bg-green-600 rounded-lg">
                            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">Buyer Orders</h1>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">Manage and track all your customer orders</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
                    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 sm:p-5 lg:p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Orders</p>
                                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">{totalOrders}</p>
                                <p className="text-xs text-green-600 mt-1 sm:mt-2 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    All time
                                </p>
                            </div>
                            <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
                                <Package className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 sm:p-5 lg:p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
                                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">${totalRevenue.toFixed(2)}</p>
                                <p className="text-xs text-green-600 mt-1 sm:mt-2 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    Lifetime sales
                                </p>
                            </div>
                            <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
                                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 sm:p-5 lg:p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Average Order</p>
                                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">${averageOrderValue}</p>
                                <p className="text-xs text-gray-500 mt-1 sm:mt-2">Per transaction</p>
                            </div>
                            <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
                                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md border border-gray-200">
                    <div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                                <span className="text-sm sm:text-base font-medium text-black">Filter Orders</span>
                                {filterApplied && (
                                    <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" />
                                        Filter Applied
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                <select
                                    value={timeFilter}
                                    onChange={(e) => setTimeFilter(e.target.value)}
                                    className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-xs sm:text-sm text-gray-700"
                                >
                                    <option value="all">All Time</option>
                                    <option value="today">Today</option>
                                    <option value="week">This Week</option>
                                    <option value="month">This Month</option>
                                </select>

                                <div className="relative w-full sm:w-auto">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-9 pr-3 sm:pr-4 py-1.5 sm:py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-xs sm:text-sm"
                                    />
                                </div>

                                {filterApplied && (
                                    <button
                                        onClick={clearFilters}
                                        className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm text-gray-700 font-medium"
                                    >
                                        Clear
                                    </button>
                                )}

                                <button className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm font-medium">
                                    <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="hidden sm:inline">Export</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] lg:min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Transaction ID</th>
                                    <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Customer</th>
                                    <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Product</th>
                                    <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                                    <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
                                    <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {displayOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-3 sm:px-4 lg:px-6 py-8 sm:py-12 text-center">
                                            <Package className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400 mx-auto mb-2 sm:mb-3" />
                                            <p className="text-sm sm:text-base text-gray-600 font-medium mb-1">No orders found</p>
                                            <p className="text-xs sm:text-sm text-gray-500">Try adjusting your filters</p>
                                            {filterApplied && (
                                                <button
                                                    onClick={clearFilters}
                                                    className="mt-3 sm:mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm font-medium"
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
                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <span className="text-xs sm:text-sm font-mono font-medium text-black">
                                                    {order.tran_id?.slice(0, 8)}...
                                                </span>
                                            </td>
                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                        <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-gray-600" />
                                                    </div>
                                                    <div className="ml-2 sm:ml-3">
                                                        <p className="text-xs sm:text-sm font-medium text-black">
                                                            {order.customer_name || 'N/A'}
                                                        </p>
                                                        <p className="text-xs text-gray-500 hidden sm:block">{order.userEmail}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                                                <div className="flex items-center">
                                                    <img
                                                        src={order.item?.Productimg}
                                                        alt={order.item?.name}
                                                        className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg object-cover border border-gray-200"
                                                    />
                                                    <div className="ml-2 sm:ml-3">
                                                        <p className="text-xs sm:text-sm font-medium text-black">
                                                            {order.item?.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            Qty: {order.item?.quantity || 1}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <span className="text-xs sm:text-sm text-gray-600">
                                                    {new Date(order.paid_at).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </td>
                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <span className="text-sm sm:text-base lg:text-lg font-bold text-green-600">
                                                    ${order.item?.price?.toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedOrder(order);
                                                        setShowDetailsModal(true);
                                                    }}
                                                    className="p-1.5 sm:p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                                >
                                                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <p className="text-xs sm:text-sm text-gray-600">
                                Showing <span className="font-medium text-black">{displayOrders.length}</span> of <span className="font-medium text-black">{orders.length}</span> orders
                            </p>
                            {displayOrders.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <button className="p-1.5 sm:p-2 hover:bg-gray-200 rounded-lg transition-colors">
                                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
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