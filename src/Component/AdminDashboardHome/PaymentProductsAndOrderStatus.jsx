import React from 'react';
import { CreditCard, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from '@tanstack/react-query';
import { allProductsstatus, countpaymentstatus } from '../Api';

const PaymentProductsAndOrderStatus = () => {
    const { data: paymentData, isLoading: paymentLoading, error: paymentError } = useQuery({
        queryKey: ["count-payment-status"],
        queryFn: countpaymentstatus
    });
    
    const { data: productsData, isLoading: productsLoading, error: productsError } = useQuery({
        queryKey: ["all-products-status"],
        queryFn: allProductsstatus
    });

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
    
    const totalPayments = transformedPaymentData.reduce((sum, item) => sum + item.value, 0);
    const totalProducts = transformedProductsData.reduce((sum, item) => sum + item.value, 0);

    const SkeletonCard = () => (
        <div className="bg-white rounded-xl p-4 sm:p-6 border">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded"></div>
                    <div className="h-4 sm:h-5 bg-gray-200 rounded w-24 sm:w-32"></div>
                </div>
                <div className="h-5 sm:h-6 bg-gray-200 rounded w-16 sm:w-20"></div>
            </div>
            <div className="h-[180px] sm:h-[200px] bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-200"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-2">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-1">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-200"></div>
                        <div className="h-3 sm:h-4 bg-gray-200 rounded w-12 sm:w-16"></div>
                    </div>
                ))}
            </div>
        </div>
    );

    if (paymentLoading || productsLoading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <SkeletonCard />
                <SkeletonCard />
            </div>
        );
    }

    if (paymentError || productsError) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm sm:text-base">
                Error loading data. Please try again.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl p-4 sm:p-6 border hover:shadow-lg transition-shadow">
                <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mb-4 gap-2">
                    <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                        <h3 className="text-sm sm:text-base font-semibold text-gray-800">Payment Status</h3>
                    </div>
                    <span className="text-[10px] sm:text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full self-start xs:self-auto">
                        Total: {totalPayments.toLocaleString()}
                    </span>
                </div>

                <div className="w-full h-[200px] sm:h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={transformedPaymentData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={70}
                                label={({ name, percent }) => 
                                    percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ''
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
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                    fontSize: '12px'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4">
                    {transformedPaymentData.map((item, index) => (
                        <div key={index} className="flex items-center gap-1">
                            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                            <span className="text-[10px] sm:text-sm text-gray-600 whitespace-nowrap">
                                {item.name}: {item.value.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 border hover:shadow-lg transition-shadow">
                <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mb-4 gap-2">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                        <h3 className="text-sm sm:text-base font-semibold text-gray-800">Product Approval</h3>
                    </div>
                    <span className="text-[10px] sm:text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full self-start xs:self-auto">
                        Total: {totalProducts.toLocaleString()}
                    </span>
                </div>

                <div className="w-full h-[200px] sm:h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={transformedProductsData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={70}
                                label={({ name, percent }) => 
                                    percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ''
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
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                    fontSize: '12px'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4">
                    {transformedProductsData.map((item, index) => (
                        <div key={index} className="flex items-center gap-1">
                            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                            <span className="text-[10px] sm:text-sm text-gray-600 whitespace-nowrap">
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