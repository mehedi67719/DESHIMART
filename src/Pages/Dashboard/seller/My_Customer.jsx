import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import {
    Users,
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
    Package,
    AlertCircle,
    CheckCircle,
    Star,
    ShoppingCart
} from 'lucide-react';
import Useauth from '../../../Component/Useauth';
import { buyerorder } from '../../../Component/Api';


const My_Customer = () => {
    const { user } = Useauth();
    const email = user?.email;
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [timeFilter, setTimeFilter] = useState('all');

    const { data: orders = [], isLoading, error } = useQuery({
        queryKey: ["buyerOrders", email],
        enabled: !!email,
        queryFn: () => buyerorder(email)
    });

    const customers = useMemo(() => {
        const customerMap = new Map();

        orders.forEach(order => {
            const customerEmail = order.userEmail;
            if (!customerMap.has(customerEmail)) {
                customerMap.set(customerEmail, {
                    email: customerEmail,
                    name: order.customer_name || 'Unknown',
                    totalOrders: 1,
                    totalSpent: order.item?.price || 0,
                    lastOrder: order.paid_at,
                    recentProducts: [{
                        name: order.item?.name,
                        price: order.item?.price,
                        date: order.paid_at,
                        image: order.item?.Productimg
                    }]
                });
            } else {
                const existing = customerMap.get(customerEmail);
                existing.totalOrders += 1;
                existing.totalSpent += order.item?.price || 0;
                if (new Date(order.paid_at) > new Date(existing.lastOrder)) {
                    existing.lastOrder = order.paid_at;
                }
                existing.recentProducts.unshift({
                    name: order.item?.name,
                    price: order.item?.price,
                    date: order.paid_at,
                    image: order.item?.Productimg
                });
                if (existing.recentProducts.length > 5) {
                    existing.recentProducts = existing.recentProducts.slice(0, 5);
                }
            }
        });

        return Array.from(customerMap.values());
    }, [orders]);

    const filteredCustomers = useMemo(() => {
        return customers.filter(customer => {
            const matchesSearch = searchTerm === '' ||
                customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.recentProducts.some(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchesSearch;
        });
    }, [customers, searchTerm]);

    const displayCustomers = useMemo(() => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        switch (timeFilter) {
            case 'today':
                return filteredCustomers.filter(c => new Date(c.lastOrder) >= today);
            case 'week': {
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return filteredCustomers.filter(c => new Date(c.lastOrder) >= weekAgo);
            }
            case 'month': {
                const monthAgo = new Date();
                monthAgo.setMonth(monthAgo.getMonth() - 1);
                return filteredCustomers.filter(c => new Date(c.lastOrder) >= monthAgo);
            }
            default:
                return filteredCustomers;
        }
    }, [filteredCustomers, timeFilter]);

    const filterApplied = searchTerm !== '' || timeFilter !== 'all';
    const totalCustomers = customers.length;
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const averageOrderValue = totalCustomers > 0 ? (totalRevenue / totalCustomers).toFixed(2) : 0;

    const clearFilters = () => {
        setSearchTerm('');
        setTimeFilter('all');
    };

    const CustomerDetailsModal = ({ customer, onClose }) => {
        if (!customer) return null;

        return (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 sm:p-4">
                <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
                    <div className="sticky top-0 bg-white border-b-2 border-green-600 p-4 sm:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <div>
                            <div className="flex items-center gap-2 text-green-600 mb-1 sm:mb-2">
                                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="text-xs sm:text-sm font-medium">Customer Profile</span>
                            </div>
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black break-all">{customer.name}</h2>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1 flex items-center gap-2 break-all">
                                <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="truncate">{customer.email}</span>
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200">
                                <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Orders</p>
                                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-black">{customer.totalOrders}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200">
                                <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Spent</p>
                                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">${customer.totalSpent.toFixed(2)}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200 sm:col-span-2 lg:col-span-1">
                                <p className="text-xs sm:text-sm text-gray-600 mb-1">Last Order</p>
                                <p className="text-xs sm:text-sm font-bold text-black">
                                    {new Date(customer.lastOrder).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                            <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                                <h3 className="font-semibold text-black flex items-center gap-2 text-sm sm:text-base lg:text-lg">
                                    <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                                        <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                                    </div>
                                    Products Ordered ({customer.totalOrders} items)
                                </h3>
                            </div>
                            <div className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
                                {customer.recentProducts.map((product, idx) => (
                                    <div key={idx} className="p-3 sm:p-4 hover:bg-gray-50 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-cover rounded-lg border border-gray-200"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium text-black text-sm sm:text-base lg:text-lg">{product.name}</p>
                                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1">
                                                <span className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(product.date).toLocaleDateString()}
                                                </span>
                                                <span className="text-xs sm:text-sm font-bold text-green-600">
                                                    ${product.price?.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base font-medium">
                                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                                Download Report
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
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-sm sm:text-base lg:text-lg font-medium text-gray-700">Loading customers...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center max-w-md border border-gray-200">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-red-500" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-black mb-2">Error Loading Customers</h2>
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
                            <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">My Customers</h1>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">View customers and their ordered products</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
                    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 sm:p-5 lg:p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Customers</p>
                                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">{totalCustomers}</p>
                                <p className="text-xs text-green-600 mt-1 sm:mt-2 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    Active buyers
                                </p>
                            </div>
                            <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
                                <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" />
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
                                    From all orders
                                </p>
                            </div>
                            <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
                                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 sm:p-5 lg:p-6 border border-gray-200 sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Average per Customer</p>
                                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">${averageOrderValue}</p>
                                <p className="text-xs text-gray-500 mt-1 sm:mt-2">Lifetime value</p>
                            </div>
                            <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
                                <Star className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md border border-gray-200">
                    <div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                                <span className="text-sm sm:text-base font-medium text-black">Filter Customers</span>
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
                                    <option value="today">Active Today</option>
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
                        <table className="w-full min-w-[900px] lg:min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Customer</th>
                                    <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                                    <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Orders</th>
                                    <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Total</th>
                                    <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Last Order</th>
                                    <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Products</th>
                                    <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {displayCustomers.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-3 sm:px-4 lg:px-6 py-8 sm:py-12 text-center">
                                            <Users className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400 mx-auto mb-2 sm:mb-3" />
                                            <p className="text-sm sm:text-base text-gray-600 font-medium mb-1">No customers found</p>
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
                                    displayCustomers.map((customer) => (
                                        <tr
                                            key={customer.email}
                                            className="hover:bg-gray-50 transition-colors cursor-pointer border-l-2 border-transparent hover:border-green-600"
                                            onClick={() => {
                                                setSelectedCustomer(customer);
                                                setShowDetailsModal(true);
                                            }}
                                        >
                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                        <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-green-600" />
                                                    </div>
                                                    <div className="ml-2 sm:ml-3">
                                                        <p className="text-xs sm:text-sm font-medium text-black">
                                                            {customer.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <p className="text-xs sm:text-sm text-gray-600 truncate max-w-[120px] sm:max-w-[150px]">{customer.email}</p>
                                            </td>
                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <span className="text-xs sm:text-sm font-medium text-black">{customer.totalOrders}</span>
                                            </td>
                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <span className="text-sm sm:text-base lg:text-lg font-bold text-green-600">
                                                    ${customer.totalSpent.toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <span className="text-xs sm:text-sm text-gray-600">
                                                    {new Date(customer.lastOrder).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </td>
                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                                                <div className="flex flex-col gap-1">
                                                    {customer.recentProducts.slice(0, 2).map((product, idx) => (
                                                        <div key={idx} className="flex items-center gap-1 sm:gap-2">
                                                            <ShoppingCart className="w-2 h-2 sm:w-3 sm:h-3 text-green-600 flex-shrink-0" />
                                                            <span className="text-xs text-gray-700 truncate max-w-[80px] sm:max-w-[100px]">{product.name}</span>
                                                        </div>
                                                    ))}
                                                    {customer.recentProducts.length > 2 && (
                                                        <span className="text-xs text-green-600 font-medium">
                                                            +{customer.recentProducts.length - 2} more
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedCustomer(customer);
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
                                Showing <span className="font-medium text-black">{displayCustomers.length}</span> of <span className="font-medium text-black">{customers.length}</span> customers
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {showDetailsModal && (
                <CustomerDetailsModal
                    customer={selectedCustomer}
                    onClose={() => {
                        setShowDetailsModal(false);
                        setSelectedCustomer(null);
                    }}
                />
            )}
        </div>
    );
};

export default My_Customer;