import React, { useEffect, useState } from 'react';
import Useauth from '../../Component/Useauth';
import { paymentHistory } from '../../Component/Api';
import { 
  ClockIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  DocumentTextIcon,
  ReceiptRefundIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CreditCardIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router';

const PaymentHistory = () => {
    const { user } = Useauth();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedPayment, setExpandedPayment] = useState(null);
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        if (!user?.email) return;

        const fetchhistory = async () => {
            try {
                setLoading(true);
                const res = await paymentHistory(user.email);
                setHistory(res);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchhistory();
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


    const getStatusColor = (status) => {
        switch (status) {
            case 'SUCCESS': return 'bg-emerald-100 text-emerald-800';
            case 'CANCLE': return 'bg-red-100 text-red-800';
            case 'PENDING': return 'bg-amber-100 text-amber-800';
            case 'FAILED': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'SUCCESS': return <CheckCircleIcon className="w-5 h-5" />;
            case 'CANCLE': return <XCircleIcon className="w-5 h-5" />;
            case 'PENDING': return <ClockIcon className="w-5 h-5" />;
            default: return <ExclamationTriangleIcon className="w-5 h-5" />;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'SUCCESS': return 'Successful';
            case 'CANCLE': return 'Cancelled';
            case 'PENDING': return 'Pending';
            case 'FAILED': return 'Failed';
            default: return status;
        }
    };

    const togglePaymentDetails = (paymentId) => {
        if (expandedPayment === paymentId) {
            setExpandedPayment(null);
        } else {
            setExpandedPayment(paymentId);
        }
    };

    const filteredHistory = statusFilter === 'all' 
        ? history 
        : history.filter(payment => payment.status === statusFilter);

    const stats = {
        total: history.length,
        successful: history.filter(p => p.status === 'SUCCESS').length,
        cancelled: history.filter(p => p.status === 'CANCLE').length,
        totalAmount: history.filter(p => p.status === 'SUCCESS').reduce((sum, p) => sum + p.totalAmount, 0)
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="relative inline-block">
                        <div className="w-16 h-16 border-4 border-emerald-200 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="mt-6 text-emerald-700 font-semibold">Loading payment history...</p>
                </div>
            </div>
        );
    }

    if (history.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-gray-200">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <DocumentTextIcon className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">No Payment History</h2>
                    <p className="text-gray-600 mb-6">You haven't made any payments yet. Your payment history will appear here.</p>
                    <Link to='/shop' className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white  p-4 rounded-2xl">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Payment History</h1>
                    <p className="text-gray-600">View and manage all your payment transactions</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-emerald-100 rounded-xl">
                                <DocumentTextIcon className="w-6 h-6 text-emerald-600" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{stats.total}</span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Total Transactions</h3>
                        <p className="text-xs text-gray-400 mt-1">All payment records</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <CurrencyDollarIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">৳{stats.totalAmount}</span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Total Spent</h3>
                        <p className="text-xs text-gray-400 mt-1">Successful payments only</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-100 rounded-xl">
                                <CheckCircleIcon className="w-6 h-6 text-green-600" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{stats.successful}</span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Successful</h3>
                        <p className="text-xs text-gray-400 mt-1">Completed payments</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-red-100 rounded-xl">
                                <XCircleIcon className="w-6 h-6 text-red-600" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{stats.cancelled}</span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Cancelled</h3>
                        <p className="text-xs text-gray-400 mt-1">Cancelled payments</p>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setStatusFilter('all')}
                                className={`px-4 py-2 rounded-xl font-medium transition-all ${statusFilter === 'all' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                            >
                                All
                            </button>
                            <button 
                                onClick={() => setStatusFilter('SUCCESS')}
                                className={`px-4 py-2 rounded-xl font-medium transition-all ${statusFilter === 'SUCCESS' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                            >
                                Successful
                            </button>
                            <button 
                                onClick={() => setStatusFilter('CANCLE')}
                                className={`px-4 py-2 rounded-xl font-medium transition-all ${statusFilter === 'CANCLE' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                            >
                                Cancelled
                            </button>
                        </div>
                        <div className="text-gray-600 text-sm">
                            Showing {filteredHistory.length} of {history.length} payments
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredHistory.map((payment) => (
                        <div key={payment._id} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${getStatusColor(payment.status)}`}>
                                            {getStatusIcon(payment.status)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">Payment #{payment.tran_id?.slice(-8) || payment._id?.slice(-8)}</h3>
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-1">
                                                <div className="flex items-center gap-1">
                                                    <CalendarIcon className="w-4 h-4" />
                                                    <span>{formatDate(payment.created_at)}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <CreditCardIcon className="w-4 h-4" />
                                                    <span>{payment.items?.length || 0} items</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Amount</p>
                                            <p className="text-2xl font-bold text-gray-900">৳{payment.totalAmount || 0}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(payment.status)}`}>
                                                {getStatusText(payment.status)}
                                            </span>
                                            <button 
                                                onClick={() => togglePaymentDetails(payment._id)}
                                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                            >
                                                {expandedPayment === payment._id ? (
                                                    <ChevronUpIcon className="w-5 h-5" />
                                                ) : (
                                                    <ChevronDownIcon className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {expandedPayment === payment._id && (
                                <div className="border-t border-gray-200 p-6 bg-gray-50">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-6">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-3">Transaction Details</h4>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Transaction ID</span>
                                                        <span className="font-medium text-gray-900">{payment.tran_id || 'N/A'}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Payment Date</span>
                                                        <span className="font-medium text-gray-900">{formatDate(payment.created_at)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Customer Name</span>
                                                        <span className="font-medium text-gray-900">{payment.customer_name || 'N/A'}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Email</span>
                                                        <span className="font-medium text-gray-900">{payment.userEmail || 'N/A'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-3">Order Summary</h4>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">Subtotal</span>
                                                        <span className="font-medium">৳{payment.totalAmount || 0}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">Shipping Fee</span>
                                                        <span className="font-medium">৳60</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">Tax</span>
                                                        <span className="font-medium">৳45</span>
                                                    </div>
                                                    <div className="border-t border-gray-200 pt-3 mt-3">
                                                        <div className="flex justify-between font-semibold text-gray-900">
                                                            <span>Total Amount</span>
                                                            <span>৳{(payment.totalAmount || 0) + 105}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-3">Purchased Items</h4>
                                            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                                                {payment.items?.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                                                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                                            <img 
                                                                src={item.Productimg || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'} 
                                                                alt={item.name || 'Product'}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-medium text-gray-900 text-sm truncate">{item.name || 'Product'}</p>
                                                            <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
                                                                <span>৳{item.price || 0} × {item.quantity || 1}</span>
                                                                <span className="font-medium">৳{(item.price || 0) * (item.quantity || 1)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
                                        <button className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex-1">
                                            <EyeIcon className="w-5 h-5" />
                                            View Invoice
                                        </button>
                                        <button className="flex items-center justify-center gap-2 border-2 border-gray-800 text-gray-800 font-semibold py-3 px-6 rounded-xl hover:bg-gray-800 hover:text-white transition-all duration-300 flex-1">
                                            <ReceiptRefundIcon className="w-5 h-5" />
                                            Download Receipt
                                        </button>
                                        {payment.status === 'CANCLE' && (
                                            <button className="flex items-center justify-center gap-2 border-2 border-red-600 text-red-600 font-semibold py-3 px-6 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 flex-1">
                                                <ExclamationTriangleIcon className="w-5 h-5" />
                                                Report Issue
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {filteredHistory.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-200">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <DocumentTextIcon className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No Payments Found</h3>
                        <p className="text-gray-600">No payments match the selected filter.</p>
                    </div>
                )}

                <div className="mt-8 p-6 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-200 rounded-2xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h4 className="text-xl font-bold text-gray-800 mb-2">Need Help with Payments?</h4>
                            <p className="text-gray-600">Contact our support team for any payment-related queries or issues.</p>
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

export default PaymentHistory;