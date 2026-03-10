import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaClock, FaCar, FaStore, FaStar } from 'react-icons/fa';
import { useInfiniteQuery } from '@tanstack/react-query';
import { storesapi } from '../../Component/Api';

const Localstores = () => {
    const { 
        data, 
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage, 
        isError, 
        error,
        isLoading 
    } = useInfiniteQuery({
        queryKey: ["localstores"],
        queryFn: storesapi,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        initialPageParam: null
    });

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 mb-16">
                <div className="flex justify-center items-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent"></div>
                        <p className="mt-4 text-gray-600 text-xl">Loading stores...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container mx-auto px-4 mb-16">
                <div className="flex justify-center items-center min-h-[60vh]">
                    <div className="text-center bg-red-50 p-8 rounded-2xl max-w-md">
                        <div className="text-red-600 text-6xl mb-4">!</div>
                        <h3 className="text-2xl font-bold text-red-700 mb-2">Error Loading Stores</h3>
                        <p className="text-red-600 mb-6">{error?.message || 'Something went wrong'}</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700 transition duration-300 font-semibold"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const allStores = data?.pages?.flatMap((page) => page.stores) || [];
    const totalStores = allStores.length;
    const storesWithDelivery = allStores.filter(store => store.delivery === true).length;

    return (
        <div className="container mx-auto px-4 mb-16">
            <div className="text-center mb-12">
                <h2 className="text-5xl mt-10 font-bold text-black mb-4">Our Local Stores</h2>
                <p className="text-gray-600 text-xl">Find our premium stores near you for an exceptional shopping experience</p>
            </div>

            <div className="mb-8">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 shadow-lg">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="md:w-2/3">
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">Find Your Nearest Store</h3>
                            <p className="text-gray-600 mb-6">
                                Visit our physical stores to experience products firsthand, get personalized assistance, and enjoy exclusive in-store offers.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="bg-white rounded-xl p-4 shadow-sm flex-1 min-w-[200px]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                            <FaStore className="text-green-600 text-xl" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-800">{totalStores}</p>
                                            <p className="text-gray-600 text-sm">Stores Available</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm flex-1 min-w-[200px]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <FaCar className="text-blue-600 text-xl" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-800">{storesWithDelivery}</p>
                                            <p className="text-gray-600 text-sm">With Delivery</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/3">
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <h4 className="font-bold text-lg text-gray-800 mb-4">Store Locator</h4>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Enter Your Location</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="City, State or ZIP Code"
                                            className="w-full p-3 pl-10 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
                                        />
                                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>
                                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-300">
                                    Find Nearest Store
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allStores.map((store) => (
                    <div key={store._id} className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="relative h-48 overflow-hidden">
                            <img 
                                src={store.store_info?.image_url || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop"} 
                                alt={store.store_info?.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4">
                                <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                                    <FaStar className="text-yellow-500" />
                                    <span className="font-bold text-gray-800">{store.store_info?.rating || 4.5}</span>
                                </div>
                            </div>
                            {store.store_info?.status === "Open Now" && (
                                <div className="absolute top-4 left-4">
                                    <div className="bg-green-600 text-white rounded-full px-3 py-1 text-sm font-semibold">
                                        {store.store_info.status}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{store.store_info?.name}</h3>
                            <p className="text-gray-600 mb-4">{store.store_info?.distance || '2.5 miles away'}</p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3">
                                    <FaMapMarkerAlt className="text-gray-400" />
                                    <span className="text-gray-700">{store.location?.address || 'Address not available'}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaPhone className="text-gray-400" />
                                    <span className="text-gray-700">{store.contact?.phone || 'Phone not available'}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaClock className="text-gray-400" />
                                    <span className="text-gray-700">
                                        {store.operating_hours 
                                            ? `${store.operating_hours.open || '9:00 AM'} - ${store.operating_hours.close || '10:00 PM'}`
                                            : '9:00 AM - 10:00 PM'}
                                    </span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-800 mb-3">Store Features</h4>
                                <div className="flex flex-wrap gap-2">
                                    {store.features?.map((feature, index) => (
                                        <span 
                                            key={index}
                                            className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                    {(!store.features || store.features.length === 0) && (
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
                ))}
            </div>

            {hasNextPage && (
                <div className="text-center mt-8">
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isFetchingNextPage ? (
                            <span className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                Loading...
                            </span>
                        ) : (
                            'Load More Stores'
                        )}
                    </button>
                </div>
            )}

    
            {hasNextPage && !isFetchingNextPage && (
                <div 
                    className="h-10 w-full"
                    ref={(node) => {
                        if (node) {
                            const observer = new IntersectionObserver(
                                (entries) => {
                                    if (entries[0].isIntersecting) {
                                        fetchNextPage();
                                    }
                                },
                                { threshold: 0.5 }
                            );
                            observer.observe(node);
                        }
                    }}
                />
            )}

            <div className="mt-12 bg-gradient-to-r from-green-400 to-green-600 rounded-3xl p-8 text-white">
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Can't Find a Store Near You?</h3>
                    <p className="mb-6 max-w-2xl mx-auto">
                        Don't worry! We offer nationwide shipping with fast delivery. Shop online and get your favorite products delivered to your doorstep.
                    </p>
                    <button className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-xl transition duration-300">
                        Shop Online Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Localstores;