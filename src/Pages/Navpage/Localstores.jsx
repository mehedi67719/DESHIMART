import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaClock, FaCar, FaStore, FaStar } from 'react-icons/fa';
import Stores from '../../Component/Stores';
import { useInfiniteQuery } from '@tanstack/react-query';
import { storesapi } from '../../Component/Api';

const Localstores = () => {
    const stores = [
        {
            id: 1,
            name: "Downtown Mega Store",
            address: "123 Main Street, Downtown, NY 10001",
            phone: "(555) 123-4567",
            hours: "9:00 AM - 10:00 PM",
            delivery: true,
            distance: "2.5 miles",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop",
            features: ["Free Parking", "WiFi Available", "Gift Cards", "Curbside Pickup"]
        },
        {
            id: 2,
            name: "Uptown Fashion Hub",
            address: "456 Luxury Avenue, Uptown, NY 10028",
            phone: "(555) 987-6543",
            hours: "10:00 AM - 9:00 PM",
            delivery: true,
            distance: "3.2 miles",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w-800&auto=format&fit=crop",
            features: ["VIP Lounge", "Personal Shopper", "Valet Parking", "Gift Wrapping"]
        },
        {
            id: 3,
            name: "Riverside Outlet",
            address: "789 River Road, Riverside, NY 10044",
            phone: "(555) 456-7890",
            hours: "8:00 AM - 8:00 PM",
            delivery: true,
            distance: "5.1 miles",
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop",
            features: ["Bulk Discounts", "Warehouse Prices", "Family Deals", "Seasonal Sales"]
        },
        {
            id: 4,
            name: "Metro Center Mall",
            address: "101 Metro Plaza, Central, NY 10010",
            phone: "(555) 321-0987",
            hours: "9:30 AM - 10:30 PM",
            delivery: false,
            distance: "1.8 miles",
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&auto=format&fit=crop",
            features: ["Mall Access", "Food Court", "Entertainment Zone", "Kids Play Area"]
        },
        {
            id: 5,
            name: "Green Valley Store",
            address: "202 Nature Trail, Green Valley, NY 10022",
            phone: "(555) 654-3210",
            hours: "8:30 AM - 7:30 PM",
            delivery: true,
            distance: "6.3 miles",
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
            features: ["Eco-Friendly", "Organic Products", "Recycling Center", "Community Events"]
        },
        {
            id: 6,
            name: "Tech Haven",
            address: "303 Innovation Drive, Tech Park, NY 10033",
            phone: "(555) 789-0123",
            hours: "10:00 AM - 11:00 PM",
            delivery: true,
            distance: "4.0 miles",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop",
            features: ["Latest Gadgets", "Tech Support", "Demo Stations", "Installation Services"]
        }
    ];



    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, error } = useInfiniteQuery({
        queryKey: ["localstores"],
        queryFn: ({ pageParam = null }) => storesapi({
            pageParam
        }),
        getNextPageParam: (lastPage) => lastPage?.length ? lastPage[lastPage.length - 1]._id : undefined
    });



    // console.log(data)


  const allStores = data?.pages.flatMap((page) => page.stores || page) || [];
console.log("All stores after flatMap:", allStores);

    console.log(allStores)

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
                                            <p className="text-2xl font-bold text-gray-800">{stores.length}</p>
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
                                            <p className="text-2xl font-bold text-gray-800">{stores.filter(s => s.delivery).length}</p>
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
                                            className="w-full p-3 pl-10 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
                                            placeholder="City, State or ZIP Code"
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
                {stores?.map((store) => (
                    <Stores key={store._id} store={store} />
                    // <div key={store.id} className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    //     <div className="relative h-48 overflow-hidden">
                    //         <img 
                    //             src={store.image} 
                    //             alt={store.name}
                    //             className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    //         />
                    //         <div className="absolute top-4 right-4">
                    //             <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    //                 <FaStar className="text-yellow-500" />
                    //                 <span className="font-bold text-gray-800">{store.rating}</span>
                    //             </div>
                    //         </div>
                    //         {store.delivery && (
                    //             <div className="absolute top-4 left-4">
                    //                 <div className="bg-green-600 text-white rounded-full px-3 py-1 text-sm font-semibold">
                    //                     Delivery Available
                    //                 </div>
                    //             </div>
                    //         )}
                    //     </div>

                    //     <div className="p-6">
                    //         <h3 className="text-xl font-bold text-gray-800 mb-2">{store.name}</h3>
                    //         <p className="text-gray-600 mb-4">{store.distance} away</p>

                    //         <div className="space-y-3 mb-6">
                    //             <div className="flex items-center gap-3">
                    //                 <FaMapMarkerAlt className="text-gray-400" />
                    //                 <span className="text-gray-700">{store.address}</span>
                    //             </div>
                    //             <div className="flex items-center gap-3">
                    //                 <FaPhone className="text-gray-400" />
                    //                 <span className="text-gray-700">{store.phone}</span>
                    //             </div>
                    //             <div className="flex items-center gap-3">
                    //                 <FaClock className="text-gray-400" />
                    //                 <span className="text-gray-700">{store.hours}</span>
                    //             </div>
                    //         </div>

                    //         <div className="mb-6">
                    //             <h4 className="font-semibold text-gray-800 mb-3">Store Features</h4>
                    //             <div className="flex flex-wrap gap-2">
                    //                 {store.features.map((feature, index) => (
                    //                     <span 
                    //                         key={index}
                    //                         className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                    //                     >
                    //                         {feature}
                    //                     </span>
                    //                 ))}
                    //             </div>
                    //         </div>

                    //         <div className="flex gap-3">
                    //             <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-300">
                    //                 Get Directions
                    //             </button>
                    //             <button className="flex-1 bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-4 rounded-xl transition duration-300">
                    //                 Call Now
                    //             </button>
                    //         </div>
                    //     </div>
                    // </div>
                ))}
            </div>

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