import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import { Package, Clock, CheckCircle, Users } from "lucide-react";


const TopsellingsellerDashboard = () => {

    const data = [
        { name: "Product A", units: 45 },
        { name: "Product B", units: 32 },
        { name: "Product C", units: 55 },
        { name: "Product D", units: 28 }
    ];
    return (
        <div className=" bg-gray-100 p-8">
            <div className="grid md:grid-cols-2 gap-6">

               
                <div className="bg-white rounded-2xl shadow p-6">
                    <h3 className="text-lg font-semibold mb-6">
                        Quick Stats
                    </h3>

                    <div className="space-y-5">

                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                            <div className="flex items-center gap-4">
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <Package className="text-green-600 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Products in Stock
                                    </p>
                                    <h4 className="text-lg font-bold">
                                        118
                                    </h4>
                                </div>
                            </div>
                            <span className="text-green-600 font-medium">
                                Active
                            </span>
                        </div>

                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <Clock className="text-blue-600 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Pending Orders
                                    </p>
                                    <h4 className="text-lg font-bold">
                                        12
                                    </h4>
                                </div>
                            </div>
                            <span className="text-yellow-500 font-medium">
                                Pending
                            </span>
                        </div>

                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                            <div className="flex items-center gap-4">
                                <div className="bg-purple-100 p-3 rounded-lg">
                                    <CheckCircle className="text-purple-600 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Completed Orders
                                    </p>
                                    <h4 className="text-lg font-bold">
                                        4
                                    </h4>
                                </div>
                            </div>
                            <span className="text-green-600 font-medium">
                                Completed
                            </span>
                        </div>

                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                            <div className="flex items-center gap-4">
                                <div className="bg-orange-100 p-3 rounded-lg">
                                    <Users className="text-orange-600 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Active Customers
                                    </p>
                                    <h4 className="text-lg font-bold">
                                        1
                                    </h4>
                                </div>
                            </div>
                            <span className="text-green-600 font-medium">
                                Active
                            </span>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default TopsellingsellerDashboard;