import React, { useState } from 'react';
import { FaHeart, FaShoppingCart, FaTag, FaEye, FaTrash, FaStar, FaFire, FaPercentage, FaTruck, FaEdit, FaFilter, FaSort, FaChevronDown, FaChevronUp, FaCheck, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router';


const Favorite = () => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([
        {
            id: 1,
            name: "Premium Leather Jacket",
            description: "Genuine leather jacket with premium finish",
            price: 299.99,
            originalPrice: 399.99,
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            rating: 4.8,
            reviewCount: 128,
            inStock: true,
            isNew: true,
            category: "Fashion",
            discount: 25,
            freeShipping: true,
            addedDate: "2024-01-15",
            brand: "LeatherWorks"
        },
        {
            id: 2,
            name: "Wireless Bluetooth Headphones",
            description: "Noise cancelling with 30hr battery life",
            price: 149.99,
            originalPrice: 199.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            rating: 4.6,
            reviewCount: 256,
            inStock: true,
            isNew: false,
            category: "Electronics",
            discount: 25,
            freeShipping: true,
            addedDate: "2024-01-14",
            brand: "SoundMax"
        },
        {
            id: 3,
            name: "Smart Watch Series 5",
            description: "Fitness tracker with heart rate monitor",
            price: 249.99,
            originalPrice: 299.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            rating: 4.9,
            reviewCount: 342,
            inStock: true,
            isNew: true,
            category: "Electronics",
            discount: 17,
            freeShipping: true,
            addedDate: "2024-01-13",
            brand: "TechWear"
        },
        {
            id: 4,
            name: "Designer Sunglasses",
            description: "UV protection polarized sunglasses",
            price: 89.99,
            originalPrice: 129.99,
            image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            rating: 4.7,
            reviewCount: 89,
            inStock: false,
            isNew: false,
            category: "Accessories",
            discount: 31,
            freeShipping: false,
            addedDate: "2024-01-12",
            brand: "SunStyle"
        },
        {
            id: 5,
            name: "Running Shoes Pro",
            description: "Lightweight running shoes with cushion",
            price: 129.99,
            originalPrice: 159.99,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            rating: 4.5,
            reviewCount: 217,
            inStock: true,
            isNew: true,
            category: "Sports",
            discount: 19,
            freeShipping: true,
            addedDate: "2024-01-11",
            brand: "RunFast"
        },
        {
            id: 6,
            name: "Luxury Perfume",
            description: "Premium fragrance with long lasting scent",
            price: 79.99,
            originalPrice: 99.99,
            image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            rating: 4.4,
            reviewCount: 156,
            inStock: true,
            isNew: false,
            category: "Beauty",
            discount: 20,
            freeShipping: false,
            addedDate: "2024-01-10",
            brand: "ScentLux"
        }
    ]);

    const [sortConfig, setSortConfig] = useState({ key: 'addedDate', direction: 'desc' });
    const [selectedItems, setSelectedItems] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        category: 'all',
        inStock: 'all',
        freeShipping: 'all',
        minPrice: '',
        maxPrice: ''
    });

    const categories = ['all', ...new Set(favorites.map(item => item.category))];
    const brands = ['all', ...new Set(favorites.map(item => item.brand))];

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedItems(filteredFavorites.map(item => item.id));
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

    const removeSelected = () => {
        setFavorites(favorites.filter(item => !selectedItems.includes(item.id)));
        setSelectedItems([]);
    };

    const moveSelectedToCart = () => {
        console.log("Moving to cart:", selectedItems);
        // Add to cart logic here
        removeSelected();
    };

    const filteredFavorites = favorites
        .filter(item => {
            if (filters.category !== 'all' && item.category !== filters.category) return false;
            if (filters.inStock === 'yes' && !item.inStock) return false;
            if (filters.inStock === 'no' && item.inStock) return false;
            if (filters.freeShipping === 'yes' && !item.freeShipping) return false;
            if (filters.freeShipping === 'no' && item.freeShipping) return false;
            if (filters.minPrice && item.price < parseFloat(filters.minPrice)) return false;
            if (filters.maxPrice && item.price > parseFloat(filters.maxPrice)) return false;
            return true;
        })
        .sort((a, b) => {
            if (sortConfig.key === 'price') {
                return sortConfig.direction === 'asc' ? a.price - b.price : b.price - a.price;
            }
            if (sortConfig.key === 'rating') {
                return sortConfig.direction === 'asc' ? a.rating - b.rating : b.rating - a.rating;
            }
            if (sortConfig.key === 'discount') {
                return sortConfig.direction === 'asc' ? a.discount - b.discount : b.discount - a.discount;
            }
            if (sortConfig.key === 'addedDate') {
                return sortConfig.direction === 'asc' 
                    ? new Date(a.addedDate) - new Date(b.addedDate)
                    : new Date(b.addedDate) - new Date(a.addedDate);
            }
            return 0;
        });

    const calculateTotalSavings = () => {
        return favorites.reduce((total, item) => 
            total + (item.originalPrice - item.price), 0
        );
    };

    const calculateSelectedTotal = () => {
        return filteredFavorites
            .filter(item => selectedItems.includes(item.id))
            .reduce((total, item) => total + item.price, 0);
    };

    const EmptyState = () => (
        <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-pink-100 to-red-100 rounded-full flex items-center justify-center">
                <FaHeart className="text-red-400 text-5xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Your Wishlist is Empty</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start adding items you love to your favorites list. They'll be saved here for you to revisit later.
            </p>
            <button
                onClick={() => navigate('/products')}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold rounded-xl transition duration-300 shadow-lg hover:shadow-xl"
            >
                Explore Products
            </button>
        </div>
    );

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <FaSort className="text-gray-400" />;
        return sortConfig.direction === 'asc' 
            ? <FaChevronUp className="text-pink-600" /> 
            : <FaChevronDown className="text-pink-600" />;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl mb-6 shadow-lg">
                        <FaHeart className="text-white text-3xl" />
                    </div>
                    <h1 className="text-5xl font-bold text-gray-800 mb-3">My Favorites</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Manage your wishlist in a structured table view
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center">
                                <FaHeart className="text-pink-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{favorites.length}</p>
                                <p className="text-gray-600 text-sm">Total Items</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                                <FaTag className="text-green-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">${calculateTotalSavings().toFixed(2)}</p>
                                <p className="text-gray-600 text-sm">Total Savings</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                                <FaShoppingCart className="text-blue-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{selectedItems.length}</p>
                                <p className="text-gray-600 text-sm">Selected Items</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                                <FaTruck className="text-purple-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">
                                    {favorites.filter(item => item.freeShipping).length}
                                </p>
                                <p className="text-gray-600 text-sm">Free Shipping</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-800">Filters</h3>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 text-pink-600 hover:text-pink-700"
                        >
                            <FaFilter />
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    </div>
                    
                    {showFilters && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl">
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Category</label>
                                <select
                                    value={filters.category}
                                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>
                                            {cat === 'all' ? 'All Categories' : cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Stock Status</label>
                                <select
                                    value={filters.inStock}
                                    onChange={(e) => setFilters({...filters, inStock: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="all">All</option>
                                    <option value="yes">In Stock</option>
                                    <option value="no">Out of Stock</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Min Price</label>
                                <input
                                    type="number"
                                    value={filters.minPrice}
                                    onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                                    placeholder="0"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Max Price</label>
                                <input
                                    type="number"
                                    value={filters.maxPrice}
                                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                                    placeholder="1000"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Bar */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.length === filteredFavorites.length && filteredFavorites.length > 0}
                                    onChange={handleSelectAll}
                                    className="w-5 h-5 text-pink-600 rounded"
                                />
                                <span className="ml-2 text-gray-700">
                                    Select All ({selectedItems.length}/{filteredFavorites.length})
                                </span>
                            </div>
                            {selectedItems.length > 0 && (
                                <div className="text-lg font-bold text-pink-600">
                                    Selected Total: ${calculateSelectedTotal().toFixed(2)}
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3">
                            {selectedItems.length > 0 && (
                                <>
                                    <button
                                        onClick={moveSelectedToCart}
                                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"
                                    >
                                        <FaShoppingCart />
                                        Add to Cart ({selectedItems.length})
                                    </button>
                                    <button
                                        onClick={removeSelected}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2"
                                    >
                                        <FaTrash />
                                        Remove ({selectedItems.length})
                                    </button>
                                </>
                            )}
                            <button
                                onClick={() => navigate('/products')}
                                className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
                            >
                                Add More Items
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                {favorites.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="p-4 text-left">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.length === filteredFavorites.length && filteredFavorites.length > 0}
                                                    onChange={handleSelectAll}
                                                    className="w-4 h-4 text-pink-600 rounded"
                                                />
                                            </div>
                                        </th>
                                        <th className="p-4 text-left text-gray-700 font-semibold">
                                            Product
                                        </th>
                                        <th 
                                            className="p-4 text-left text-gray-700 font-semibold cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleSort('category')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Category
                                                {getSortIcon('category')}
                                            </div>
                                        </th>
                                        <th 
                                            className="p-4 text-left text-gray-700 font-semibold cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleSort('price')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Price
                                                {getSortIcon('price')}
                                            </div>
                                        </th>
                                        <th 
                                            className="p-4 text-left text-gray-700 font-semibold cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleSort('discount')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Discount
                                                {getSortIcon('discount')}
                                            </div>
                                        </th>
                                        <th 
                                            className="p-4 text-left text-gray-700 font-semibold cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleSort('rating')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Rating
                                                {getSortIcon('rating')}
                                            </div>
                                        </th>
                                        <th className="p-4 text-left text-gray-700 font-semibold">
                                            Stock
                                        </th>
                                        <th 
                                            className="p-4 text-left text-gray-700 font-semibold cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleSort('addedDate')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Added Date
                                                {getSortIcon('addedDate')}
                                            </div>
                                        </th>
                                        <th className="p-4 text-left text-gray-700 font-semibold">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredFavorites.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.includes(item.id)}
                                                    onChange={() => handleSelectItem(item.id)}
                                                    className="w-4 h-4 text-pink-600 rounded"
                                                />
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-800">{item.name}</div>
                                                        <div className="text-sm text-gray-500">{item.brand}</div>
                                                        <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div>
                                                    <div className="font-bold text-gray-800">${item.price.toFixed(2)}</div>
                                                    {item.originalPrice > item.price && (
                                                        <div className="text-sm text-gray-500 line-through">
                                                            ${item.originalPrice.toFixed(2)}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {item.discount > 0 ? (
                                                    <div className="flex items-center gap-2 text-red-600 font-bold">
                                                        <FaPercentage className="text-xs" />
                                                        {item.discount}%
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">-</span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <FaStar className="text-yellow-400" />
                                                    <span className="font-medium">{item.rating}</span>
                                                    <span className="text-gray-400 text-sm">({item.reviewCount})</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${item.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {item.inStock ? (
                                                        <>
                                                            <FaCheck />
                                                            In Stock
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaTimes />
                                                            Out of Stock
                                                        </>
                                                    )}
                                                </div>
                                                {item.freeShipping && item.inStock && (
                                                    <div className="flex items-center gap-1 text-green-600 text-xs mt-1">
                                                        <FaTruck />
                                                        Free Shipping
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <div className="text-gray-700">{item.addedDate}</div>
                                                {item.isNew && (
                                                    <div className="text-xs text-green-600 font-medium mt-1">NEW</div>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => navigate(`/product/${item.id}`)}
                                                        className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg"
                                                        title="View Details"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    <button
                                                        onClick={() => moveSelectedToCart([item.id])}
                                                        disabled={!item.inStock}
                                                        className={`w-8 h-8 flex items-center justify-center rounded-lg ${item.inStock ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 cursor-not-allowed'}`}
                                                        title="Add to Cart"
                                                    >
                                                        <FaShoppingCart />
                                                    </button>
                                                    <button
                                                        onClick={() => handleSelectItem(item.id)}
                                                        className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg"
                                                        title="Remove"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Table Footer */}
                        <div className="border-t border-gray-200 p-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="text-gray-600">
                                    Showing <span className="font-bold">{filteredFavorites.length}</span> of{" "}
                                    <span className="font-bold">{favorites.length}</span> items
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-gray-700">
                                        Selected: <span className="font-bold text-pink-600">{selectedItems.length}</span> items
                                    </div>
                                    <div className="text-gray-700">
                                        Total Value: <span className="font-bold">${calculateSelectedTotal().toFixed(2)}</span>
                                    </div>
                                    <button
                                        onClick={() => navigate('/cart')}
                                        className="px-6 py-2 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-medium rounded-lg transition duration-300"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Summary Section */}
                {favorites.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl p-6 text-white">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <FaTag className="text-white" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">Biggest Savings</h4>
                                    <p className="text-white/90 text-sm">You saved ${calculateTotalSavings().toFixed(2)} in total</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <FaFire className="text-white" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">New Arrivals</h4>
                                    <p className="text-white/90 text-sm">
                                        {favorites.filter(item => item.isNew).length} new items in your list
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <FaTruck className="text-white" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">Free Shipping</h4>
                                    <p className="text-white/90 text-sm">
                                        {favorites.filter(item => item.freeShipping).length} items qualify for free shipping
                                    </p>
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