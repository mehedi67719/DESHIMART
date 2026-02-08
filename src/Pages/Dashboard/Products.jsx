import React, { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon, FunnelIcon, PencilSquareIcon, TrashIcon, EyeIcon, ShoppingBagIcon, TagIcon, CurrencyDollarIcon, StarIcon, ArrowTrendingUpIcon, CheckCircleIcon, XCircleIcon, ChevronRightIcon, PhotoIcon } from '@heroicons/react/24/outline';

const Products = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Premium Cotton T-Shirt',
            category: 'Clothing',
            price: 29.99,
            stock: 150,
            sold: 45,
            rating: 4.5,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
            status: 'active'
        },
        {
            id: 2,
            name: 'Wireless Bluetooth Headphones',
            category: 'Electronics',
            price: 89.99,
            stock: 75,
            sold: 120,
            rating: 4.2,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w-400',
            status: 'active'
        },
        {
            id: 3,
            name: 'Organic Coffee Beans',
            category: 'Food',
            price: 24.99,
            stock: 200,
            sold: 89,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
            status: 'active'
        },
        {
            id: 4,
            name: 'Leather Wallet',
            category: 'Accessories',
            price: 49.99,
            stock: 0,
            sold: 65,
            rating: 4.3,
            image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400',
            status: 'out-of-stock'
        },
        {
            id: 5,
            name: 'Fitness Tracker',
            category: 'Electronics',
            price: 129.99,
            stock: 30,
            sold: 210,
            rating: 4.6,
            image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=400',
            status: 'active'
        },
        {
            id: 6,
            name: 'Ceramic Coffee Mug',
            category: 'Home',
            price: 19.99,
            stock: 120,
            sold: 45,
            rating: 4.1,
            image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400',
            status: 'active'
        },
        {
            id: 7,
            name: 'Yoga Mat',
            category: 'Fitness',
            price: 34.99,
            stock: 50,
            sold: 78,
            rating: 4.4,
            image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400',
            status: 'low-stock'
        },
        {
            id: 8,
            name: 'LED Desk Lamp',
            category: 'Home',
            price: 59.99,
            stock: 25,
            sold: 145,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
            status: 'low-stock'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        description: ''
    });

    const categories = ['all', 'Clothing', 'Electronics', 'Food', 'Accessories', 'Home', 'Fitness'];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-emerald-100 text-emerald-800';
            case 'out-of-stock': return 'bg-red-100 text-red-800';
            case 'low-stock': return 'bg-amber-100 text-amber-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'active': return 'In Stock';
            case 'out-of-stock': return 'Out of Stock';
            case 'low-stock': return 'Low Stock';
            default: return status;
        }
    };

    const handleAddProduct = () => {
        const newProductObj = {
            id: products.length + 1,
            ...newProduct,
            price: parseFloat(newProduct.price),
            stock: parseInt(newProduct.stock),
            sold: 0,
            rating: 0,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
            status: parseInt(newProduct.stock) > 10 ? 'active' : 'low-stock'
        };
        setProducts([...products, newProductObj]);
        setShowAddModal(false);
        setNewProduct({ name: '', category: '', price: '', stock: '', description: '' });
    };

    const handleDeleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
        setShowDeleteModal(false);
        setSelectedProduct(null);
    };

    const stats = {
        totalProducts: products.length,
        totalValue: products.reduce((sum, product) => sum + (product.price * product.stock), 0),
        totalSold: products.reduce((sum, product) => sum + product.sold, 0),
        outOfStock: products.filter(product => product.status === 'out-of-stock').length
    };

    return (
        <div className="min-h-screen ">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Products</h1>
                        <p className="text-gray-600">Manage your inventory and product listings</p>
                    </div>
                    <button 
                        onClick={() => setShowAddModal(true)}
                        className="mt-4 md:mt-0 flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Add New Product
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-emerald-100 rounded-xl">
                                <ShoppingBagIcon className="w-6 h-6 text-emerald-600" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{stats.totalProducts}</span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
                        <p className="text-xs text-gray-400 mt-1">Active in inventory</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <CurrencyDollarIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">${stats.totalValue.toFixed(2)}</span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Inventory Value</h3>
                        <p className="text-xs text-gray-400 mt-1">Total stock worth</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-amber-100 rounded-xl">
                                <ArrowTrendingUpIcon className="w-6 h-6 text-amber-600" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{stats.totalSold}</span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Total Sold</h3>
                        <p className="text-xs text-gray-400 mt-1">Units sold this month</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-red-100 rounded-xl">
                                <XCircleIcon className="w-6 h-6 text-red-600" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{stats.outOfStock}</span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Out of Stock</h3>
                        <p className="text-xs text-gray-400 mt-1">Need restocking</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 mb-8">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="relative flex-1">
                                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search products by name or category..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                />
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <FunnelIcon className="w-5 h-5 text-gray-500" />
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>
                                                {category === 'all' ? 'All Categories' : category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="py-4 px-6 text-left">
                                        <div className="flex items-center gap-2">
                                            <span>Product</span>
                                        </div>
                                    </th>
                                    <th className="py-4 px-6 text-left">Category</th>
                                    <th className="py-4 px-6 text-left">Price</th>
                                    <th className="py-4 px-6 text-left">Stock</th>
                                    <th className="py-4 px-6 text-left">Status</th>
                                    <th className="py-4 px-6 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map(product => (
                                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden">
                                                    <img 
                                                        src={product.image} 
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{product.name}</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <StarIcon className="w-4 h-4 text-amber-500" />
                                                        <span className="text-sm text-gray-500">{product.rating}</span>
                                                        <span className="text-sm text-gray-400">•</span>
                                                        <span className="text-sm text-gray-500">{product.sold} sold</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <TagIcon className="w-4 h-4 text-gray-400" />
                                                <span className="text-gray-700">{product.category}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-semibold text-gray-900">${product.price.toFixed(2)}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div>
                                                <span className="font-medium text-gray-900">{product.stock}</span>
                                                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                                                    <div 
                                                        className={`h-full ${
                                                            product.stock === 0 ? 'bg-red-500' : 
                                                            product.stock < 50 ? 'bg-amber-500' : 'bg-emerald-500'
                                                        }`}
                                                        style={{ width: `${Math.min((product.stock / 200) * 100, 100)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(product.status)}`}>
                                                {getStatusText(product.status)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <EyeIcon className="w-5 h-5" />
                                                </button>
                                                <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                                                    <PencilSquareIcon className="w-5 h-5" />
                                                </button>
                                                <button 
                                                    onClick={() => {
                                                        setSelectedProduct(product);
                                                        setShowDeleteModal(true);
                                                    }}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-6 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="text-gray-500">
                                Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> of <span className="font-semibold text-gray-900">{products.length}</span> products
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                                    Previous
                                </button>
                                <button className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                                    1
                                </button>
                                <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                                    2
                                </button>
                                <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                                    3
                                </button>
                                <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showAddModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-900">Add New Product</h3>
                            <p className="text-gray-600 mt-1">Fill in the details to add a new product</p>
                        </div>

                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                                    <input
                                        type="text"
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        placeholder="Enter product name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <select
                                        value={newProduct.category}
                                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value="">Select category</option>
                                        {categories.slice(1).map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                                        <input
                                            type="number"
                                            value={newProduct.price}
                                            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            placeholder="0.00"
                                            step="0.01"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                                        <input
                                            type="number"
                                            value={newProduct.stock}
                                            onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={newProduct.description}
                                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        placeholder="Enter product description"
                                        rows="3"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                                        <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-600 mb-2">Drag & drop or click to upload</p>
                                        <button className="text-emerald-600 font-medium hover:text-emerald-700">
                                            Browse files
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 flex gap-3">
                            <button 
                                onClick={() => setShowAddModal(false)}
                                className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleAddProduct}
                                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all"
                            >
                                Add Product
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && selectedProduct && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="p-6 border-b border-gray-200 text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <TrashIcon className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete Product</h3>
                            <p className="text-gray-600">
                                Are you sure you want to delete <span className="font-semibold">{selectedProduct.name}</span>? This action cannot be undone.
                            </p>
                        </div>

                        <div className="p-6 flex gap-3">
                            <button 
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setSelectedProduct(null);
                                }}
                                className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => handleDeleteProduct(selectedProduct.id)}
                                className="flex-1 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all"
                            >
                                Delete Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;