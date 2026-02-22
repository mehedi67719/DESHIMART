import React from 'react';
import { CreditCard, CheckCircle, ShoppingBag } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const PaymentProductsAndOrderStatus = () => {

    // ========== STATIC DATA ==========
    const paymentData = [
        { name: 'Success', value: 44567, color: '#10b981' },
        { name: 'Failed', value: 567, color: '#ef4444' },
        { name: 'Refunded', value: 544, color: '#f59e0b' }
    ];

    const productApprovalData = [
        { name: 'Approved', value: 9876, color: '#10b981' },
        { name: 'Pending', value: 1567, color: '#f59e0b' },
        { name: 'Rejected', value: 902, color: '#ef4444' }
    ];

    const orderStatusData = [
        { name: 'Completed', value: 42345, color: '#10b981' },
        { name: 'Processing', value: 5678, color: '#3b82f6' },
        { name: 'Pending', value: 892, color: '#f59e0b' },
        { name: 'Cancelled', value: 1874, color: '#ef4444' }
    ];

    // Calculate percentages for tooltips
    const totalPayments = paymentData.reduce((sum, item) => sum + item.value, 0);
    const totalProducts = productApprovalData.reduce((sum, item) => sum + item.value, 0);
    const totalOrders = orderStatusData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="grid grid-cols-3 gap-6">
            {/* Payment Status Chart */}
            <div className="bg-white rounded-xl p-6 border hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-green-600" />
                        <h3 className="font-semibold text-gray-800">Payment Status</h3>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        Total: {totalPayments.toLocaleString()}
                    </span>
                </div>

                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={paymentData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
                        >
                            {paymentData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => [value.toLocaleString(), 'Count']}
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Mini Legend */}
                <div className="flex justify-center gap-4 mt-2">
                    {paymentData.map((item, index) => (
                        <div key={index} className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                            <span className="text-xs text-gray-600">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Approval Chart */}
            <div className="bg-white rounded-xl p-6 border hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h3 className="font-semibold text-gray-800">Product Approval</h3>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        Total: {totalProducts.toLocaleString()}
                    </span>
                </div>

                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={productApprovalData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
                        >
                            {productApprovalData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => [value.toLocaleString(), 'Products']}
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Mini Legend */}
                <div className="flex justify-center gap-4 mt-2">
                    {productApprovalData.map((item, index) => (
                        <div key={index} className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                            <span className="text-xs text-gray-600">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order Status Chart */}
            <div className="bg-white rounded-xl p-6 border hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-green-600" />
                        <h3 className="font-semibold text-gray-800">Order Status</h3>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        Total: {totalOrders.toLocaleString()}
                    </span>
                </div>

                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={orderStatusData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
                        >
                            {orderStatusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => [value.toLocaleString(), 'Orders']}
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Mini Legend */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                    {orderStatusData.map((item, index) => (
                        <div key={index} className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                            <span className="text-xs text-gray-600">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PaymentProductsAndOrderStatus;