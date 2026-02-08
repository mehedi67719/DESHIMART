import React, { useEffect, useState } from 'react';
import Useauth from '../../Component/Useauth';
import { order } from '../../Component/Api';
import { 
  ShoppingBagIcon, 
  CheckCircleIcon, 
  TruckIcon, 
  CurrencyDollarIcon,
  CalendarIcon,
  EyeIcon,
  ReceiptRefundIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MapPinIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import { LuPackage } from 'react-icons/lu';

const Myorder = () => {
    const { user } = Useauth()
    const [Orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        if (!user?.email) return;

        const loadOrders = async () => {
            try {
                setLoading(true);
                const res = await order(user.email);
                setOrders(res);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [user?.email]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const toggleOrderDetails = (orderId) => {
        if (expandedOrder === orderId) {
            setExpandedOrder(null);
        } else {
            setExpandedOrder(orderId);
        }
    };

    const stats = {
        total: Orders.length,
        totalSpent: Orders.reduce((sum, order) => sum + order.totalAmount, 0),
        totalItems: Orders.reduce((sum, order) => sum + order.items.length, 0)
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="relative inline-block">
                        <div className="w-16 h-16 border-4 border-emerald-200 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="mt-6 text-emerald-700 font-semibold">Loading your orders...</p>
                </div>
            </div>
        );
    }

    if (Orders.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-gray-200">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBagIcon className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">No Orders Yet</h2>
                    <p className="text-gray-600 mb-6">You haven't placed any orders yet. Start shopping to see your orders here.</p>
                    <button className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white rounded-2xl p-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
                    <p className="text-gray-600">Track and manage all your successful orders</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-emerald-100 rounded-xl">
                                <ShoppingBagIcon className="w-6 h-6 text-emerald-600" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{stats.total}</span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
                        <p className="text-xs text-gray-400 mt-1">Successful purchases</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <CurrencyDollarIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">৳{stats.totalSpent}</span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Total Spent</h3>
                        <p className="text-xs text-gray-400 mt-1">Overall amount spent</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <LuPackage className="w-6 h-6 text-purple-600" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{stats.totalItems}</span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Total Items</h3>
                        <p className="text-xs text-gray-400 mt-1">Items purchased</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {Orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-gray-900">Order #{order.tran_id?.slice(-8) || order._id?.slice(-8)}</h3>
                                            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold flex items-center gap-1">
                                                <CheckCircleIcon className="w-4 h-4" />
                                                Success
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <CalendarIcon className="w-4 h-4" />
                                                <span>{formatDate(order.created_at)}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <ShoppingBagIcon className="w-4 h-4" />
                                                <span>{order.items?.length || 0} items</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Total Amount</p>
                                            <p className="text-2xl font-bold text-gray-900">৳{order.totalAmount || 0}</p>
                                        </div>
                                        <button 
                                            onClick={() => toggleOrderDetails(order._id)}
                                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            {expandedOrder === order._id ? (
                                                <ChevronUpIcon className="w-5 h-5" />
                                            ) : (
                                                <ChevronDownIcon className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg">
                                            <CreditCardIcon className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Payment</p>
                                            <p className="font-medium text-gray-900">Completed</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg">
                                            <TruckIcon className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Delivery Status</p>
                                            <p className="font-medium text-emerald-600">Ready for Dispatch</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg">
                                            <MapPinIcon className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Customer</p>
                                            <p className="font-medium text-gray-900">{order.customer_name || 'Customer'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {expandedOrder === order._id && (
                                <div className="border-t border-gray-200 p-6 bg-gray-50">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h4>
                                    
                                    <div className="space-y-4 mb-6">
                                        {order.items?.map((item, idx) => (
                                            <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                                                <div className="w-full sm:w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img 
                                                        src={item.Productimg || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'} 
                                                        alt={item.name || 'Product'}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400';
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h5 className="font-semibold text-gray-900">{item.name || 'Product'}</h5>
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3">
                                                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2 sm:mb-0">
                                                            <span>Price: ৳{item.price || 0}</span>
                                                            <span>Quantity: {item.quantity || 1}</span>
                                                        </div>
                                                        <span className="font-semibold text-gray-900">
                                                            ৳{(item.price || 0) * (item.quantity || 1)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-white p-4 rounded-xl border border-gray-200">
                                            <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                <MapPinIcon className="w-5 h-5 text-gray-600" />
                                                Shipping Information
                                            </h5>
                                            <div className="space-y-2 text-sm text-gray-600">
                                                <p><span className="font-medium">Name:</span> {order.customer_name || 'Customer'}</p>
                                                <p><span className="font-medium">Email:</span> {order.userEmail || 'N/A'}</p>
                                                <p><span className="font-medium">Address:</span> Dhaka, Bangladesh</p>
                                                <p><span className="font-medium">Phone:</span> +880 1XXX-XXXXXX</p>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-white p-4 rounded-xl border border-gray-200">
                                            <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                <ReceiptRefundIcon className="w-5 h-5 text-gray-600" />
                                                Order Summary
                                            </h5>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Subtotal</span>
                                                    <span className="font-medium">৳{order.totalAmount || 0}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Shipping</span>
                                                    <span className="font-medium">৳60</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Tax</span>
                                                    <span className="font-medium">৳45</span>
                                                </div>
                                                <div className="border-t border-gray-200 pt-2 mt-2">
                                                    <div className="flex justify-between font-semibold text-gray-900">
                                                        <span>Total</span>
                                                        <span>৳{(order.totalAmount || 0) + 105}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                                        <button className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex-1">
                                            <EyeIcon className="w-5 h-5" />
                                            Track Order
                                        </button>
                                        <button className="flex items-center justify-center gap-2 border-2 border-gray-800 text-gray-800 font-semibold py-3 px-6 rounded-xl hover:bg-gray-800 hover:text-white transition-all duration-300 flex-1">
                                            <ReceiptRefundIcon className="w-5 h-5" />
                                            Download Invoice
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-200 rounded-2xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h4 className="text-xl font-bold text-gray-800 mb-2">Need Help with Your Order?</h4>
                            <p className="text-gray-600">Contact our support team for any order-related queries.</p>
                        </div>
                        <button className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 whitespace-nowrap">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Myorder;