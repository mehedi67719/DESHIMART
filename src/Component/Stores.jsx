import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaClock, FaStar } from 'react-icons/fa';

const Stores = ({ store }) => {
    if (!store) {
        return (
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 text-center text-red-500">
                    <div className="text-3xl mb-2">⚠️</div>
                    <p>Store data is missing</p>
                </div>
            </div>
        );
    }

    const storeInfo = store?.store_info || store;
    
    if (!storeInfo) {
        return (
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 text-center text-gray-500">
                    <div className="text-3xl mb-2">❓</div>
                    <p>Invalid store information</p>
                </div>
            </div>
        );
    }

    const {
        name = "Store Name",
        rating = 0,
        distance = "N/A",
        status = "",
        image_url = "",
        location = {},
        contact = {},
        operating_hours = {},
        features = []
    } = storeInfo;

    const { address = "", full_address = "" } = location;
    const { phone = "N/A" } = contact;
    const { formatted: hours = "N/A" } = operating_hours;

    const isDeliveryAvailable = status === "Delivery Available";

    return (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image_url || "https://via.placeholder.com/400x200?text=Store+Image"}
                    alt={name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x200?text=Store+Image";
                    }}
                />
                <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <span className="font-bold text-gray-800">{rating}</span>
                    </div>
                </div>
                {isDeliveryAvailable && (
                    <div className="absolute top-4 left-4">
                        <div className="bg-green-600 text-white rounded-full px-3 py-1 text-sm font-semibold">
                            Delivery Available
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
                <p className="text-gray-600 mb-4">{distance} away</p>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-gray-400 flex-shrink-0" />
                        <span className="text-gray-700">{full_address || address || "Address not available"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaPhone className="text-gray-400 flex-shrink-0" />
                        <span className="text-gray-700">{phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaClock className="text-gray-400 flex-shrink-0" />
                        <span className="text-gray-700">{hours}</span>
                    </div>
                </div>

                <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Store Features</h4>
                    <div className="flex flex-wrap gap-2">
                        {Array.isArray(features) && features.length > 0 ? (
                            features.map((feature, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                                >
                                    {feature}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-500 text-sm">No features listed</span>
                        )}
                    </div>
                </div>

                <div className="flex gap-3">
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-300">
                        Get Directions
                    </button>
                    <button className="flex-1 bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-4 rounded-xl transition duration-300">
                        Call Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Stores;