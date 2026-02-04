import React, { useEffect, useState } from 'react';
import { FaHeart, FaShoppingCart, FaTag, FaEye, FaTrash, FaStar, FaPercentage, FaTruck, FaFilter, FaSort, FaChevronDown, FaChevronUp, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Useauth from '../../Component/Useauth';
import { getUserFavorites, removeFavorite, toggleFavorite, addtocart } from '../../Component/Api';

const Favorite = () => {
    const navigate = useNavigate();
    const { user } = Useauth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
    const [selectedItems, setSelectedItems] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({ category: 'all', minPrice: '', maxPrice: '' });

    useEffect(() => {
        if (user?.email) {
            loadFavorites();
        } else {
            setLoading(false);
        }
    }, [user]);

    const loadFavorites = async () => {
        try {
            setLoading(true);
            const data = await getUserFavorites(user.email);
            setFavorites(data || []);
        } catch (error) {
            console.error("Failed to load favorites:", error);
            setFavorites([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await removeFavorite({ productId: itemId, userEmail: user.email });
            setFavorites(prev => prev.filter(item => item._id !== itemId));
            setSelectedItems(prev => prev.filter(id => id !== itemId));
        } catch (error) {
            console.error("Failed to remove item:", error);
        }
    };

    const removeSelected = async () => {
        try {
            for (const itemId of selectedItems) {
                await removeFavorite({ productId: itemId, userEmail: user.email });
            }
            setFavorites(prev => prev.filter(item => !selectedItems.includes(item._id)));
            setSelectedItems([]);
        } catch (error) {
            console.error("Failed to remove selected items:", error);
        }
    };

    const handleAddToCart = async (item) => {
        if (!user) {
            alert("Please login first");
            return;
        }

        try {
            const cartdata = {
                userEmail: user.email,
                productId: item._id,
                ProductName: item.name,
                quantity: 1,
                Productimg: item.image,
                price: item.price
            };
            await addtocart(cartdata);
            alert("Added to cart successfully");
        } catch (error) {
            console.error("Failed to add to cart:", error);
            alert("Failed to add to cart");
        }
    };

    const handleAddSelectedToCart = async () => {
        if (!user) {
            alert("Please login first");
            return;
        }

        if (selectedItems.length === 0) {
            alert("Please select items to add to cart");
            return;
        }

        try {
            for (const itemId of selectedItems) {
                const item = favorites.find(f => f._id === itemId);
                if (item) {
                    const cartdata = {
                        userEmail: user.email,
                        productId: item._id,
                        ProductName: item.name,
                        quantity: 1,
                        Productimg: item.image,
                        price: item.price
                    };
                    await addtocart(cartdata);
                }
            }
            alert(`${selectedItems.length} items added to cart successfully`);
        } catch (error) {
            console.error("Failed to add to cart:", error);
            alert("Failed to add items to cart");
        }
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedItems(filteredFavorites.map(item => item._id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const calculateTotalSavings = () => {
        return favorites.reduce((total, item) => total + ((item.oldPrice || item.price) - item.price), 0);
    };

    const filteredFavorites = favorites
        .filter(item => {
            if (filters.category !== 'all' && item.category !== filters.category) return false;
            if (filters.minPrice && item.price < parseFloat(filters.minPrice)) return false;
            if (filters.maxPrice && item.price > parseFloat(filters.maxPrice)) return false;
            return true;
        })
        .sort((a, b) => {
            if (sortConfig.key === 'price') return sortConfig.direction === 'asc' ? a.price - b.price : b.price - a.price;
            if (sortConfig.key === 'rating') return sortConfig.direction === 'asc' ? a.rating - b.rating : b.rating - a.rating;
            if (sortConfig.key === 'discount') return sortConfig.direction === 'asc' ? a.discount - b.discount : b.discount - a.discount;
            if (sortConfig.key === 'createdAt') return sortConfig.direction === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt);
            return 0;
        });

    const categories = ['all', ...new Set(favorites.map(item => item.category).filter(Boolean))];

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <FaSort className="text-gray-400" />;
        return sortConfig.direction === 'asc' ? <FaChevronUp className="text-black" /> : <FaChevronDown className="text-black" />;
    };

    const truncateText = (text, maxLength) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-20 flex items-center justify-center">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-black text-5xl mx-auto mb-6" />
                    <p className="text-gray-600 text-lg">Loading your favorites...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4 text-center py-20">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <FaHeart className="text-black text-4xl" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Please Login First</h2>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">You need to login to view your favorite items</p>
                    <button onClick={() => navigate('/login')} className="px-8 py-3 bg-black text-white font-bold rounded-xl transition duration-300 shadow-lg hover:bg-gray-800">
                        Login Now
                    </button>
                </div>
            </div>
        );
    }

    const EmptyState = () => (
        <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <FaHeart className="text-black text-5xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Your Wishlist is Empty</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">Start adding items you love to your favorites list</p>
            <button onClick={() => navigate('/products')} className="px-8 py-3 bg-black text-white font-bold rounded-xl transition duration-300 shadow-lg hover:bg-gray-800">
                Explore Products
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-xl mb-4 shadow-lg">
                        <FaHeart className="text-white text-2xl" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">My Favorites</h1>
                    <p className="text-gray-600">{favorites.length} items in your wishlist</p>
                </div>

                <div className="mb-6">
                    <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 text-black hover:text-gray-700">
                        <FaFilter />{showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>
                    
                    {showFilters && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-100 rounded-lg mt-2">
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Category</label>
                                <select value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})} className="w-full p-2 border border-gray-300 rounded">
                                    {categories.map(cat => <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Min Price</label>
                                <input type="number" value={filters.minPrice} onChange={(e) => setFilters({...filters, minPrice: e.target.value})} placeholder="0" className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Max Price</label>
                                <input type="number" value={filters.maxPrice} onChange={(e) => setFilters({...filters, maxPrice: e.target.value})} placeholder="1000" className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div className="flex items-end">
                                <button onClick={() => setFilters({ category: 'all', minPrice: '', maxPrice: '' })} className="w-full p-2 bg-black text-white rounded hover:bg-gray-800">
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {favorites.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                    <input type="checkbox" checked={selectedItems.length === filteredFavorites.length && filteredFavorites.length > 0} onChange={handleSelectAll} className="w-5 h-5 text-black rounded" />
                                    <span className="ml-2 text-gray-700">Select All ({selectedItems.length}/{filteredFavorites.length})</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {selectedItems.length > 0 && (
                                    <>
                                        <button onClick={handleAddSelectedToCart} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded flex items-center gap-1">
                                            <FaShoppingCart /> Add to Cart ({selectedItems.length})
                                        </button>
                                        <button onClick={removeSelected} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded flex items-center gap-1">
                                            <FaTrash /> Remove ({selectedItems.length})
                                        </button>
                                    </>
                                )}
                                <button onClick={() => navigate('/products')} className="px-4 py-2 border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 rounded">
                                    Add More Items
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {favorites.length === 0 ? <EmptyState /> : (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-3 text-left">
                                            <input type="checkbox" checked={selectedItems.length === filteredFavorites.length && filteredFavorites.length > 0} onChange={handleSelectAll} className="w-4 h-4 text-black rounded" />
                                        </th>
                                        <th className="p-3 text-left text-gray-700 font-semibold">Product</th>
                                        <th className="p-3 text-left text-gray-700 font-semibold cursor-pointer hover:bg-gray-200" onClick={() => handleSort('category')}>
                                            <div className="flex items-center gap-1">Category{getSortIcon('category')}</div>
                                        </th>
                                        <th className="p-3 text-left text-gray-700 font-semibold cursor-pointer hover:bg-gray-200" onClick={() => handleSort('price')}>
                                            <div className="flex items-center gap-1">Price{getSortIcon('price')}</div>
                                        </th>
                                        <th className="p-3 text-left text-gray-700 font-semibold cursor-pointer hover:bg-gray-200" onClick={() => handleSort('discount')}>
                                            <div className="flex items-center gap-1">Discount{getSortIcon('discount')}</div>
                                        </th>
                                        <th className="p-3 text-left text-gray-700 font-semibold cursor-pointer hover:bg-gray-200" onClick={() => handleSort('rating')}>
                                            <div className="flex items-center gap-1">Rating{getSortIcon('rating')}</div>
                                        </th>
                                        <th className="p-3 text-left text-gray-700 font-semibold cursor-pointer hover:bg-gray-200" onClick={() => handleSort('createdAt')}>
                                            <div className="flex items-center gap-1">Added Date{getSortIcon('createdAt')}</div>
                                        </th>
                                        <th className="p-3 text-left text-gray-700 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredFavorites.map((item) => (
                                        <tr key={item._id} className="hover:bg-gray-50">
                                            <td className="p-3">
                                                <input type="checkbox" checked={selectedItems.includes(item._id)} onChange={() => handleSelectItem(item._id)} className="w-4 h-4 text-black rounded" />
                                            </td>
                                            <td className="p-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-800">{truncateText(item.name, 20)}</div>
                                                        <div className="text-xs text-gray-500 mt-1">{truncateText(item.description || '', 30)}</div>
                                                        <div className="text-xs text-gray-400 mt-1">{item.brand}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{item.category}</span>
                                            </td>
                                            <td className="p-3">
                                                <div>
                                                    <div className="font-bold text-gray-800">${item.price?.toFixed(2)}</div>
                                                    {item.oldPrice && item.oldPrice > item.price && <div className="text-xs text-gray-500 line-through">${item.oldPrice.toFixed(2)}</div>}
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                {item.discount > 0 ? (
                                                    <div className="flex items-center gap-1 text-red-600 font-bold text-sm">
                                                        <FaPercentage className="text-xs" />{item.discount}%
                                                    </div>
                                                ) : <span className="text-gray-400 text-sm">-</span>}
                                            </td>
                                            <td className="p-3">
                                                <div className="flex items-center gap-1">
                                                    <FaStar className="text-yellow-400 text-sm" />
                                                    <span className="font-medium text-sm">{item.rating?.toFixed(1) || '0.0'}</span>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <div className="text-gray-700 text-sm">{new Date(item.createdAt).toLocaleDateString()}</div>
                                            </td>
                                            <td className="p-3">
                                                <div className="flex items-center gap-1">
                                                    <button onClick={() => navigate(`/productsdetels/${item._id}`)} className="w-7 h-7 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded" title="View Details"><FaEye className="text-sm" /></button>
                                                    <button onClick={() => handleAddToCart(item)} className="w-7 h-7 flex items-center justify-center text-green-600 hover:bg-green-50 rounded" title="Add to Cart"><FaShoppingCart className="text-sm" /></button>
                                                    <button onClick={() => handleRemoveItem(item._id)} className="w-7 h-7 flex items-center justify-center text-red-600 hover:bg-red-50 rounded" title="Remove"><FaTrash className="text-sm" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="border-t border-gray-200 p-3">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                <div className="text-gray-600 text-sm">
                                    Showing <span className="font-bold">{filteredFavorites.length}</span> of <span className="font-bold">{favorites.length}</span> items
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => navigate('/cart')} className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-gray-800">
                                        View Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {favorites.length > 0 && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-500 rounded-xl p-4 text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                    <FaTag className="text-white" />
                                </div>
                                <div>
                                    <h4 className="text-md font-bold">Total Savings</h4>
                                    <p className="text-white/90 text-sm">${calculateTotalSavings().toFixed(2)} saved</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-green-500 rounded-xl p-4 text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                    <FaHeart className="text-white" />
                                </div>
                                <div>
                                    <h4 className="text-md font-bold">Total Items</h4>
                                    <p className="text-white/90 text-sm">{favorites.length} favorites</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-green-500 rounded-xl p-4 text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                    <FaShoppingCart className="text-white" />
                                </div>
                                <div>
                                    <h4 className="text-md font-bold">Ready to Buy</h4>
                                    <p className="text-white/90 text-sm">{selectedItems.length} selected</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorite;