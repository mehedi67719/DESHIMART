import React from 'react';
import { CreditCard, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from '@tanstack/react-query';
import { allProductsstatus, countpaymentstatus } from '../Api';

const PaymentProductsAndOrderStatus = () => {
    // Payment status query
    const { data: paymentData, isLoading: paymentLoading, error: paymentError } = useQuery({
        queryKey: ["count-payment-status"],
        queryFn: countpaymentstatus
    });

    // Products status query
    const { data: productsData, isLoading: productsLoading, error: productsError } = useQuery({
        queryKey: ["all-products-status"],
        queryFn: allProductsstatus
    });

    // Transform payment data for chart
    const transformedPaymentData = React.useMemo(() => {
        if (!paymentData) return [];
        
        return [
            { 
                name: 'Success', 
                value: paymentData.SUCCESS || 0, 
                color: '#10b981' 
            },
            { 
                name: 'Cancelled', 
                value: paymentData.CANCLE || 0, 
                color: '#ef4444' 
            }
        ];
    }, [paymentData]);

    // Transform products data for chart
    const transformedProductsData = React.useMemo(() => {
        if (!productsData) return [];
        
        return [
            { 
                name: 'Approved', 
                value: productsData.approved || 0, 
                color: '#10b981' 
            },
            { 
                name: 'Pending', 
                value: productsData.pending || 0, 
                color: '#f59e0b' 
            },
            { 
                name: 'Rejected', 
                value: productsData.rejected || 0, 
                color: '#ef4444' 
            }
        ];
    }, [productsData]);

    // Calculate totals
    const totalPayments = transformedPaymentData.reduce((sum, item) => sum + item.value, 0);
    const totalProducts = transformedProductsData.reduce((sum, item) => sum + item.value, 0);

    // Loading state
    if (paymentLoading || productsLoading) {
        return (
            <div className="grid grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                    <div key={i} className="bg-white rounded-xl p-6 border h-64 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="h-32 bg-gray-200 rounded"></div>
                    </div>
                ))}
            </div>
        );
    }

    // Error state
    if (paymentError || productsError) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                Error loading data. Please try again.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-6">
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

                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={transformedPaymentData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            label={({ name, percent }) => 
                                percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ''
                            }
                            labelLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
                        >
                            {transformedPaymentData.map((entry, index) => (
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

                {/* Legend */}
                <div className="flex justify-center gap-4 mt-4">
                    {transformedPaymentData.map((item, index) => (
                        <div key={index} className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                            <span className="text-sm text-gray-600">
                                {item.name}: {item.value.toLocaleString()}
                            </span>
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

                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={transformedProductsData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            label={({ name, percent }) => 
                                percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ''
                            }
                            labelLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
                        >
                            {transformedProductsData.map((entry, index) => (
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

                {/* Legend */}
                <div className="flex justify-center gap-4 mt-4">
                    {transformedProductsData.map((item, index) => (
                        <div key={index} className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                            <span className="text-sm text-gray-600">
                                {item.name}: {item.value.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PaymentProductsAndOrderStatus;