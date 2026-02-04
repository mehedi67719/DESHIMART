import React from 'react';
import { FaTrash } from 'react-icons/fa';

const AddtocartCard = ({ item, removeItem }) => {
    return (
        <div className="p-6 hover:bg-gray-50 transition duration-300">
            <div className="flex flex-col md:flex-row gap-6">
           
                <div className="md:w-1/4">
                    <div className="relative rounded-xl overflow-hidden">
                        <img
                            src={item.Productimg}
                            alt={item.name || 'Product'}
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>

               
                <div className="md:w-3/4">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                {item.ProductName || `Product ${item.productId}`}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                {item.description || 'Product description'}
                            </p>

                         
                            <div className="flex items-center gap-4">
                                <div className="text-gray-700 font-medium">
                                    Quantity: <span className="font-bold">{item.quantity}</span>
                                </div>

                                <button
                                    onClick={() => removeItem(item._id)}
                                    className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
                                >
                                    <FaTrash />
                                    Remove
                                </button>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="mb-2">
                                <span className="text-2xl font-bold text-gray-800">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                            <div className="text-gray-600 text-sm">
                                ${item.price.toFixed(2)} each
                            </div>
                            <div className="text-gray-500 text-sm mt-1">
                                Quantity: {item.quantity}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddtocartCard;