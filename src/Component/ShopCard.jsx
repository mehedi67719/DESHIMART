import React, { useState } from 'react';
import { FaHeart, FaRegStar, FaShoppingCart, FaStar, FaStarHalf } from 'react-icons/fa';
import { Link } from 'react-router';

const ShopCard = ({ item }) => {
    const [isLiked, setIsLiked] = useState(false);

    const Stars = ({ rating }) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) stars.push(<FaStar key={i} className="text-yellow-400" />);
            else if (rating >= i - 0.5) stars.push(<FaStarHalf key={i} className="text-yellow-400" />);
            else stars.push(<FaRegStar key={i} className="text-yellow-400" />);
        }
        return <div className="flex items-center">{stars}</div>;
    };

    const handleLikeClick = (e) => {
        e.preventDefault(); // লিঙ্কে যাওয়া বন্ধ করে
        e.stopPropagation(); // ইভেন্ট bubbling বন্ধ করে
        setIsLiked(!isLiked);
        // এখানে আপনি API কল করতে পারেন ফেভারিটে যোগ করার জন্য
        console.log('Liked item:', item._id);
    };

    return (
        <div className="group flex flex-col border border-gray-200 rounded-2xl bg-white overflow-hidden transition-shadow duration-500 hover:shadow-xl">
            <Link to={`/productsdetels/${item._id}`} className="flex flex-col flex-1">
                <div className="relative overflow-hidden">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                        {item.discount >= 15 ? (
                            <span className="px-3 py-1 text-xs font-semibold text-white rounded-full bg-red-500">Hot</span>
                        ) : (
                            <span className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${item.isNew ? "bg-green-500" : "bg-amber-500"}`}>
                                {item.isNew ? "New" : "Old"}
                            </span>
                        )}
                        {item.discount > 0 && (
                            <span className="px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-full">{item.discount}%</span>
                        )}
                    </div>

                    {/* হার্ট আইকন - আলাদা ইভেন্ট হ্যান্ডলার */}
                    <div 
                        className="absolute top-3 right-3 z-10 transition-colors duration-300 cursor-pointer"
                        onClick={handleLikeClick}
                    >
                        {isLiked ? (
                            <FaHeart className="w-6 h-6 text-red-500" />
                        ) : (
                            <FaHeart className="w-6 h-6 text-[#1E40AF] hover:text-red-500" />
                        )}
                    </div>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500">Sold: {item.sold}</p>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-1">
                            <span className="text-green-600 font-bold text-lg">{item.price}৳</span>
                            {item.oldPrice && <span className="text-gray-400 line-through text-sm">{item.oldPrice}৳</span>}
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400 text-sm">
                            <Stars rating={item.rating} />
                            <span className="text-gray-400 text-sm">{item.rating.toFixed(1)}</span>
                        </div>
                    </div>
                </div>
            </Link>

            <div className="px-4 pb-4">
                <button 
                    className="w-full flex items-center justify-center gap-2 py-2.5 border border-green-500 text-green-500 rounded-xl font-medium transition-all duration-300 hover:bg-green-600 hover:text-white hover:shadow-lg active:scale-95"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // এখানে Add to Cart লজিক যোগ করুন
                        console.log('Add to cart:', item._id);
                    }}
                >
                    <FaShoppingCart /> Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ShopCard;