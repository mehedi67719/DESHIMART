import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    PencilIcon, TrashIcon, EyeIcon, PlusIcon,
    MagnifyingGlassIcon, CurrencyDollarIcon, TagIcon
} from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';
import { deleteProduct, myproducts, updateProduct } from '../../../Component/Api';
import Useauth from '../../../Component/Useauth';


const Products = () => {
    const { user } = Useauth();
    const queryClient = useQueryClient();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    const { data: products, isLoading } = useQuery({
        queryKey: ["my-products", user?.email],
        queryFn: () => myproducts(user?.email),
        enabled: !!user?.email,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(["my-products", user?.email]);
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Product has been deleted successfully.',
                timer: 1500,
                showConfirmButton: false
            });
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.message || 'Failed to delete product',
            });
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updateProduct(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["my-products", user?.email]);
            setIsEditModalOpen(false);
            setSelectedProduct(null);
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Product has been updated successfully.',
                timer: 1500,
                showConfirmButton: false
            });
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.message || 'Failed to update product',
            });
        }
    });

    const getStockStatus = (stock) => {
        if (stock <= 0) return { label: 'Out', color: 'bg-red-50 text-red-700 border-red-100' };
        if (stock <= 10) return { label: 'Low', color: 'bg-amber-50 text-amber-700 border-amber-100' };
        return { label: 'In Stock', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' };
    };

    const getStatusBadge = (status) => {
        const styles = {
            approved: 'bg-green-50 text-green-700 border-green-200',
            rejected: 'bg-red-50 text-red-700 border-red-200',
            pending: 'bg-blue-50 text-blue-700 border-blue-200'
        };
        return {
            label: status?.toUpperCase() || 'PENDING',
            style: styles[status] || styles.pending
        };
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            deleteMutation.mutate(id);
        }
    };

    const handleUpdate = (id, data) => {
        updateMutation.mutate({ id, data });
    };

    const filteredProducts = products?.filter(product => {
        const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
        const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const categories = products ? ['all', ...new Set(products.map(p => p.category).filter(Boolean))] : ['all'];

    if (isLoading) return <LoadingSkeleton />;

    return (
        <div className="min-h-screen bg-white w-full pb-10">
            <div className="bg-white border-b sticky top-0 z-30 px-4 py-4 sm:px-6">
                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Inventory</h1>
                        <p className="text-slate-500 text-xs sm:text-sm">Total {products?.length || 0} Products</p>
                    </div>
                    <button className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 shadow-sm active:scale-95 transition-all text-sm">
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Add Product
                    </button>
                </div>
            </div>

            <div className="w-full px-4 sm:px-6 mt-6">
                <div className="flex overflow-x-auto pb-4 sm:grid sm:grid-cols-4 gap-4 no-scrollbar">
                    <StatCard title="Total" value={products?.length} color="indigo" />
                    <StatCard title="Pending" value={products?.filter(p => p.status === 'pending').length} color="amber" />
                    <StatCard title="Approved" value={products?.filter(p => p.status === 'approved').length} color="emerald" />
                    <StatCard title="Low Stock" value={products?.filter(p => p.stock <= 10).length} color="rose" />
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 my-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-1/2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat === 'all' ? 'All Category' : cat}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-1/2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden w-full">
                    <div className="overflow-x-auto overflow-y-hidden">
                        <table className="w-full text-left min-w-[700px]">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-4 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Product</th>
                                    <th className="px-4 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Price</th>
                                    <th className="px-4 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Inventory</th>
                                    <th className="px-4 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredProducts?.map((product) => (
                                    <ProductRow
                                        key={product._id}
                                        product={product}
                                        onView={() => { setSelectedProduct(product); setIsViewModalOpen(true); }}
                                        onEdit={() => { setSelectedProduct(product); setIsEditModalOpen(true); }}
                                        onDelete={() => handleDelete(product._id)}
                                        badges={{ 
                                            stock: getStockStatus(product.stock), 
                                            status: getStatusBadge(product.status) 
                                        }}
                                    />
                                ))}
                                {filteredProducts?.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center py-8 text-slate-500">
                                            No products found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isViewModalOpen && selectedProduct && (
                <ViewModal 
                    product={selectedProduct} 
                    onClose={() => {
                        setIsViewModalOpen(false);
                        setSelectedProduct(null);
                    }} 
                />
            )}

            {isEditModalOpen && selectedProduct && (
                <EditModal 
                    product={selectedProduct}
                    onUpdate={handleUpdate}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedProduct(null);
                    }}
                    isLoading={updateMutation.isPending}
                />
            )}
        </div>
    );
};

const ViewModal = ({ product, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold">Product Details</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-700 text-xl">×</button>
                </div>
                <div className="space-y-4">
                    {product.image && (
                        <div className="flex justify-center">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="max-h-48 rounded-lg object-cover"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/150';
                                }}
                            />
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-slate-500">Name</p>
                            <p className="font-medium">{product.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Brand</p>
                            <p className="font-medium">{product.brand}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Category</p>
                            <p className="font-medium">{product.category}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Price</p>
                            <p className="font-medium">৳{product.price}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Old Price</p>
                            <p className="font-medium">৳{product.oldPrice || product.price}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Discount</p>
                            <p className="font-medium">{product.discount || 0}%</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Stock</p>
                            <p className="font-medium">{product.stock} units</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Unit</p>
                            <p className="font-medium">{product.unit || 'piece'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Status</p>
                            <p className="font-medium capitalize">{product.status}</p>
                        </div>
                    </div>
                    {product.description && (
                        <div>
                            <p className="text-sm text-slate-500">Description</p>
                            <p className="font-medium">{product.description}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);

const EditModal = ({ product, onUpdate, onClose, isLoading }) => {
    const [formData, setFormData] = useState({
        name: product.name || '',
        brand: product.brand || '',
        category: product.category || '',
        oldPrice: product.oldPrice || '',
        discount: product.discount || '',
        price: product.price || '',
        stock: product.stock || '',
        unit: product.unit || 'piece',
        description: product.description || '',
        image: product.image || ''
    });

    const [imagePreview, setImagePreview] = useState(product.image || '');

    useEffect(() => {
        if (formData.oldPrice && formData.discount) {
            const oldPrice = Number(formData.oldPrice);
            const discount = Number(formData.discount);
            if (oldPrice > 0 && discount >= 0 && discount <= 100) {
                const calculatedPrice = oldPrice - (oldPrice * (discount / 100));
                setFormData(prev => ({
                    ...prev,
                    price: calculatedPrice.toFixed(2)
                }));
            }
        }
    }, [formData.oldPrice, formData.discount]);

    const handleImageChange = (e) => {
        const url = e.target.value;
        setFormData({...formData, image: url});
        setImagePreview(url);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updateData = {
            ...formData,
            oldPrice: Number(formData.oldPrice),
            discount: Number(formData.discount),
            price: Number(formData.price),
            stock: Number(formData.stock)
        };
        onUpdate(product._id, updateData);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({...formData, image: reader.result});
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold">Edit Product</h2>
                        <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-700 text-xl">×</button>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Brand</label>
                            <input
                                type="text"
                                value={formData.brand}
                                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                            <input
                                type="text"
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Old Price</label>
                                <div className="relative">
                                    <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.oldPrice}
                                        onChange={(e) => setFormData({...formData, oldPrice: e.target.value})}
                                        className="w-full pl-10 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Discount %</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={formData.discount}
                                    onChange={(e) => setFormData({...formData, discount: e.target.value})}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="0"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Final Price (Auto-calculated)</label>
                            <div className="relative">
                                <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={formData.price}
                                    readOnly
                                    className="w-full pl-10 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600"
                                    placeholder="Auto-calculated"
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Price automatically calculated from old price and discount</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Stock</label>
                            <input
                                type="number"
                                min="0"
                                value={formData.stock}
                                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Unit</label>
                            <select
                                value={formData.unit}
                                onChange={(e) => setFormData({...formData, unit: e.target.value})}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            >
                                <option value="piece">Piece</option>
                                <option value="kg">Kilogram (kg)</option>
                                <option value="g">Gram (g)</option>
                                <option value="liter">Liter</option>
                                <option value="ml">Milliliter (ml)</option>
                                <option value="dozen">Dozen</option>
                                <option value="pack">Pack</option>
                                <option value="bundle">Bundle</option>
                                <option value="6 pieces">6 pieces</option>
                                <option value="500g">500g</option>
                                <option value="1kg">1kg</option>
                                <option value="500ml">500ml</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                            <input
                                type="url"
                                value={formData.image}
                                onChange={handleImageChange}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Or Upload Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>

                        {imagePreview && (
                            <div className="mt-2">
                                <p className="text-sm text-slate-500 mb-2">Image Preview:</p>
                                <img 
                                    src={imagePreview} 
                                    alt="Preview" 
                                    className="h-32 w-32 object-cover rounded-lg border border-slate-200"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/150';
                                    }}
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                rows="3"
                                required
                            />
                        </div>

                        {formData.oldPrice && formData.discount && formData.price && (
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm font-medium text-gray-700">Price Summary</p>
                                <p className="text-gray-600 text-sm">
                                    Old Price: ৳{formData.oldPrice} | Discount: {formData.discount}% | New Price: ৳{formData.price}
                                </p>
                                <p className="text-sm text-green-600 font-medium mt-1">
                                    You save: ৳{(Number(formData.oldPrice) - Number(formData.price)).toFixed(2)}
                                </p>
                            </div>
                        )}

                        <div className="flex justify-end gap-2 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? 'Updating...' : 'Update Product'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, color }) => {
    const colors = {
        indigo: 'border-indigo-500 text-indigo-600',
        amber: 'border-amber-500 text-amber-600',
        emerald: 'border-emerald-500 text-emerald-600',
        rose: 'border-rose-500 text-rose-600'
    };
    return (
        <div className={`min-w-[140px] flex-shrink-0 bg-white p-4 rounded-xl border-l-4 shadow-sm sm:w-full ${colors[color]}`}>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-tight">{title}</p>
            <p className="text-xl font-black">{value || 0}</p>
        </div>
    );
};

const ProductRow = ({ product, onView, onEdit, onDelete, badges }) => {
    const hasDiscount = product.oldPrice && product.discount && Number(product.oldPrice) > Number(product.price);
    
    return (
        <tr className="hover:bg-slate-50 transition-colors">
            <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                        <img 
                            className="h-full w-full object-cover" 
                            src={product.image || 'https://via.placeholder.com/48'} 
                            alt={product.name}
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/48';
                            }}
                        />
                    </div>
                    <div className="max-w-[150px] sm:max-w-[200px]">
                        <p className="text-sm font-bold text-slate-900 truncate">{product.name}</p>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 font-medium uppercase">{product.category}</span>
                    </div>
                </div>
            </td>
            <td className="px-4 py-4">
                <div className="text-sm font-bold text-slate-900 font-mono">৳{product.price}</div>
                {hasDiscount && (
                    <div className="flex items-center gap-1">
                        <span className="text-[9px] text-slate-400 line-through">৳{product.oldPrice}</span>
                        <span className="text-[9px] text-green-600 font-bold">-{product.discount}%</span>
                    </div>
                )}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${badges.status.style}`}>
                    {badges.status.label}
                </span>
            </td>
            <td className="px-4 py-4">
                <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full border w-fit mb-1 ${badges.stock.color}`}>
                    {badges.stock.label}
                </div>
                <p className="text-xs text-slate-500">{product.stock} {product.unit || 'Units'}</p>
            </td>
            <td className="px-4 py-4">
                <div className="flex justify-center items-center gap-1.5 sm:gap-2">
                    <button onClick={onView} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-blue-100" title="View">
                        <EyeIcon className="w-4 h-4" />
                    </button>
                    <button onClick={onEdit} className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-600 hover:text-white transition-all shadow-sm border border-amber-100" title="Edit">
                        <PencilIcon className="w-4 h-4" />
                    </button>
                    <button onClick={onDelete} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm border border-red-100" title="Delete">
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

const LoadingSkeleton = () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium text-sm">Loading Inventory...</p>
    </div>
);

export default Products;