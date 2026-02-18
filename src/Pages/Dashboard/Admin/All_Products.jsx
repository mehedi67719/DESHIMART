import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { AllProducts } from '../../../Component/Api';
import { FaCheck, FaTimes, FaTrash, FaEye, FaBox, FaStore, FaUser } from 'react-icons/fa';
import { MdCategory, MdDiscount } from 'react-icons/md';
import Swal from 'sweetalert2';

const All_Products = () => {
    const { data: products, isLoading, error, refetch } = useQuery({
        queryKey: ["All-Products"],
        queryFn: AllProducts
    });


    const totalProducts = products?.length || 0;
    const approvedProducts = products?.filter(product => product.status === 'approved').length || 0;
    const rejectedProducts = products?.filter(product => product.status === 'rejected').length || 0;
    const pendingProducts = products?.filter(product => product.status === 'pending').length || 0;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white p-6">
                <h2 className="text-2xl font-bold mb-6 text-green-600">All Products</h2>
                <div className="grid gap-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="bg-white rounded-lg shadow-md p-4 animate-pulse border border-gray-200">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-gray-300 rounded"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                                    <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white p-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <strong className="font-bold">Error! </strong>
                    <span>{error.message || 'Failed to load products'}</span>
                    <button 
                        onClick={() => refetch()}
                        className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const getStatusBadge = (status) => {
        switch(status?.toLowerCase()) {
            case 'approved':
                return 'bg-green-100 text-green-800 border border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border border-gray-200';
        }
    };

    const handleApproveProduct = async (productId, productName) => {
        const result = await Swal.fire({
            title: 'Approve Product?',
            text: `Are you sure you want to approve "${productName}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#22c55e',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, approve!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            Swal.fire({
                title: 'Processing...',
                text: 'Please wait while we approve the product',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // Add your approve API call here
            // const response = await approveProduct(productId);
            
            // Simulate success
            setTimeout(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Approved!',
                    text: `${productName} has been approved`,
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            }, 1000);
        }
    };

    const handleRejectProduct = async (productId, productName) => {
        const result = await Swal.fire({
            title: 'Reject Product?',
            text: `Are you sure you want to reject "${productName}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, reject!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            Swal.fire({
                title: 'Processing...',
                text: 'Please wait while we reject the product',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // Add your reject API call here
            // const response = await rejectProduct(productId);
            
            // Simulate success
            setTimeout(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Rejected!',
                    text: `${productName} has been rejected`,
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            }, 1000);
        }
    };

    const handleDeleteProduct = async (productId, productName) => {
        const result = await Swal.fire({
            title: 'Delete Product?',
            text: `Are you sure you want to delete "${productName}"? This action cannot be undone!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            Swal.fire({
                title: 'Deleting...',
                text: 'Please wait while we delete the product',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // Add your delete API call here
            // const response = await deleteProduct(productId);
            
            // Simulate success
            setTimeout(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${productName} has been deleted successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            }, 1000);
        }
    };

    const handleViewDetails = (product) => {
        Swal.fire({
            title: product.name,
            html: `
                <div class="text-left">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-lg mb-4"/>
                    <p class="mb-2"><strong>Description:</strong> ${product.description}</p>
                    <p class="mb-2"><strong>Brand:</strong> ${product.brand}</p>
                    <p class="mb-2"><strong>Category:</strong> ${product.category}</p>
                    <p class="mb-2"><strong>Price:</strong> ${formatCurrency(product.price)}</p>
                    <p class="mb-2"><strong>Old Price:</strong> ${formatCurrency(product.oldPrice)}</p>
                    <p class="mb-2"><strong>Discount:</strong> ${product.discount}%</p>
                    <p class="mb-2"><strong>Stock:</strong> ${product.stock} units</p>
                    <p class="mb-2"><strong>Sold:</strong> ${product.sold} units</p>
                    <p class="mb-2"><strong>Unit:</strong> ${product.unit}</p>
                    <p class="mb-2"><strong>Rating:</strong> ${product.rating} (${product.reviews} reviews)</p>
                    <p class="mb-2"><strong>Seller:</strong> ${product.shopName}</p>
                    <p class="mb-2"><strong>Seller Email:</strong> ${product.sellerEmail}</p>
                    <p class="mb-2"><strong>Status:</strong> ${product.status}</p>
                    <p class="mb-2"><strong>Created:</strong> ${new Date(product.createdAt).toLocaleDateString()}</p>
                </div>
            `,
            width: '600px',
            confirmButtonColor: '#22c55e',
            confirmButtonText: 'Close'
        });
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="w-full px-4 py-8">
              
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-green-600 border-l-4 border-green-600 pl-4">
                        Product Management
                    </h2>
                </div>

              
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                 
                    <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 border-l-4 border-green-600">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs lg:text-sm font-medium text-gray-600 uppercase">Total Products</p>
                                <p className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">{totalProducts}</p>
                            </div>
                            <div className="bg-green-100 p-3 lg:p-4 rounded-full">
                                <FaBox className="text-green-600 text-xl lg:text-2xl" />
                            </div>
                        </div>
                    </div>

            
                    <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 border-l-4 border-green-600">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs lg:text-sm font-medium text-gray-600 uppercase">Approved</p>
                                <p className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">{approvedProducts}</p>
                            </div>
                            <div className="bg-green-100 p-3 lg:p-4 rounded-full">
                                <FaCheck className="text-green-600 text-xl lg:text-2xl" />
                            </div>
                        </div>
                    </div>

             
                    <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 border-l-4 border-red-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs lg:text-sm font-medium text-gray-600 uppercase">Rejected</p>
                                <p className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">{rejectedProducts}</p>
                            </div>
                            <div className="bg-red-100 p-3 lg:p-4 rounded-full">
                                <FaTimes className="text-red-500 text-xl lg:text-2xl" />
                            </div>
                        </div>
                    </div>

                 
                    <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 border-l-4 border-yellow-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs lg:text-sm font-medium text-gray-600 uppercase">Pending</p>
                                <p className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">{pendingProducts}</p>
                            </div>
                            <div className="bg-yellow-100 p-3 lg:p-4 rounded-full">
                                <FaEye className="text-yellow-500 text-xl lg:text-2xl" />
                            </div>
                        </div>
                    </div>
                </div>

       
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="w-full">
                        <table className="w-full table-auto">
                            <thead className="bg-black">
                                <tr>
                                    <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-white uppercase">
                                        Product
                                    </th>
                                    <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-white uppercase">
                                        Category
                                    </th>
                                    <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-white uppercase">
                                        Price
                                    </th>
                                    <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-white uppercase">
                                        Seller
                                    </th>
                                    <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-white uppercase">
                                        Status
                                    </th>
                                    <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-white uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products?.map((product, index) => {
                                    const currentStatus = product.status?.toLowerCase() || 'pending';
                                    
                                    return (
                                        <tr key={product._id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                            <td className="px-3 lg:px-6 py-3 lg:py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-8 w-8 lg:h-10 lg:w-10">
                                                        <img 
                                                            className="h-8 w-8 lg:h-10 lg:w-10 rounded-lg object-cover border border-gray-200" 
                                                            src={product.image} 
                                                            alt={product.name}
                                                        />
                                                    </div>
                                                    <div className="ml-2 lg:ml-3">
                                                        <div className="text-xs lg:text-sm font-medium text-gray-900 max-w-[80px] lg:max-w-[150px] truncate">
                                                            {product.name}
                                                        </div>
                                                        {product.isNew && (
                                                            <div className="text-[10px] lg:text-xs text-blue-500 font-medium">
                                                                New
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 lg:px-6 py-3 lg:py-4">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center text-xs lg:text-sm text-gray-600">
                                                        <MdCategory className="mr-1 text-green-600 flex-shrink-0 text-xs lg:text-sm" />
                                                        <span className="max-w-[60px] lg:max-w-[100px] truncate">{product.category}</span>
                                                    </div>
                                                    <div className="text-[10px] lg:text-xs text-gray-500 mt-0.5 lg:mt-1 truncate max-w-[70px] lg:max-w-[120px]">
                                                        {product.brand}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 lg:px-6 py-3 lg:py-4">
                                                <div className="flex flex-col">
                                                    <div className="text-xs lg:text-sm font-semibold text-green-600 whitespace-nowrap">
                                                        {formatCurrency(product.price)}
                                                    </div>
                                                    {product.oldPrice > product.price && (
                                                        <div className="text-[10px] lg:text-xs text-gray-400 line-through whitespace-nowrap">
                                                            {formatCurrency(product.oldPrice)}
                                                        </div>
                                                    )}
                                                    {product.discount > 0 && (
                                                        <div className="text-[10px] lg:text-xs text-red-500 flex items-center whitespace-nowrap">
                                                            <MdDiscount className="mr-0.5 lg:mr-1 flex-shrink-0" />
                                                            <span>{product.discount}%</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-3 lg:px-6 py-3 lg:py-4">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center text-xs lg:text-sm text-gray-600">
                                                        <FaStore className="mr-1 text-black flex-shrink-0 text-xs lg:text-sm" />
                                                        <span className="max-w-[70px] lg:max-w-[120px] truncate">{product.shopName}</span>
                                                    </div>
                                                    <div className="flex items-center text-[10px] lg:text-xs text-gray-500 mt-0.5 lg:mt-1">
                                                        <FaUser className="mr-1 flex-shrink-0" />
                                                        <span className="max-w-[80px] lg:max-w-[140px] truncate">{product.sellerEmail}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 lg:px-6 py-3 lg:py-4">
                                                <span className={`px-2 lg:px-3 py-0.5 lg:py-1 text-[10px] lg:text-xs font-medium rounded-full inline-block ${getStatusBadge(product.status)}`}>
                                                    {product.status || 'pending'}
                                                </span>
                                            </td>
                                            <td className="px-3 lg:px-6 py-3 lg:py-4">
                                                <div className="flex items-center gap-1 lg:gap-2">
                                              
                                                    <button
                                                        onClick={() => handleViewDetails(product)}
                                                        className="text-blue-600 hover:text-white bg-blue-100 hover:bg-blue-600 p-1.5 lg:p-2 rounded-lg transition-all duration-200"
                                                        title="View Details"
                                                    >
                                                        <FaEye size={12} className="lg:hidden" />
                                                        <FaEye size={14} className="hidden lg:block" />
                                                    </button>
                                                    
                                                 
                                                    <button
                                                        onClick={() => handleApproveProduct(product._id, product.name)}
                                                        disabled={currentStatus === 'approved'}
                                                        className={`
                                                            p-1.5 lg:p-2 rounded-lg transition-all duration-200
                                                            ${currentStatus === 'approved' 
                                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                                                : 'text-green-600 hover:text-white bg-green-100 hover:bg-green-600'
                                                            }
                                                        `}
                                                        title={currentStatus === 'approved' ? 'Already Approved' : 'Approve Product'}
                                                    >
                                                        <FaCheck size={12} className="lg:hidden" />
                                                        <FaCheck size={14} className="hidden lg:block" />
                                                    </button>
                                                    
                                        
                                                    <button
                                                        onClick={() => handleRejectProduct(product._id, product.name)}
                                                        disabled={currentStatus === 'rejected'}
                                                        className={`
                                                            p-1.5 lg:p-2 rounded-lg transition-all duration-200
                                                            ${currentStatus === 'rejected' 
                                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                                                : 'text-red-600 hover:text-white bg-red-100 hover:bg-red-600'
                                                            }
                                                        `}
                                                        title={currentStatus === 'rejected' ? 'Already Rejected' : 'Reject Product'}
                                                    >
                                                        <FaTimes size={12} className="lg:hidden" />
                                                        <FaTimes size={14} className="hidden lg:block" />
                                                    </button>
                                                    
                                           
                                                    <button
                                                        onClick={() => handleDeleteProduct(product._id, product.name)}
                                                        className="text-red-600 hover:text-white bg-red-100 hover:bg-red-600 p-1.5 lg:p-2 rounded-lg transition-all duration-200"
                                                        title="Delete Product"
                                                    >
                                                        <FaTrash size={12} className="lg:hidden" />
                                                        <FaTrash size={14} className="hidden lg:block" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    
                    {(!products || products.length === 0) && (
                        <div className="text-center py-12 lg:py-16">
                            <div className="text-gray-300 text-5xl lg:text-7xl mb-4">📦</div>
                            <h3 className="text-lg lg:text-xl font-semibold text-gray-700 mb-2">No Products Found</h3>
                            <p className="text-sm lg:text-base text-gray-500">There are no products to display at the moment.</p>
                        </div>
                    )}
                </div>

        
                {products && products.length > 0 && (
                    <div className="mt-4 lg:mt-6 bg-white rounded-lg shadow-md p-3 lg:p-4 border border-gray-200">
                        <div className="flex flex-wrap items-center justify-between gap-2 lg:gap-4">
                            <div className="flex items-center space-x-1 lg:space-x-2">
                                <FaBox className="text-green-600 text-sm lg:text-base" />
                                <span className="text-xs lg:text-sm font-medium text-gray-700">
                                    Total: <span className="text-green-600 font-bold">{totalProducts}</span>
                                </span>
                            </div>
                            <div className="flex items-center space-x-1 lg:space-x-2">
                                <FaCheck className="text-green-600 text-sm lg:text-base" />
                                <span className="text-xs lg:text-sm font-medium text-gray-700">
                                    Approved: <span className="text-green-600 font-bold">{approvedProducts}</span>
                                </span>
                            </div>
                            <div className="flex items-center space-x-1 lg:space-x-2">
                                <FaTimes className="text-red-500 text-sm lg:text-base" />
                                <span className="text-xs lg:text-sm font-medium text-gray-700">
                                    Rejected: <span className="text-red-500 font-bold">{rejectedProducts}</span>
                                </span>
                            </div>
                            <div className="flex items-center space-x-1 lg:space-x-2">
                                <FaEye className="text-yellow-500 text-sm lg:text-base" />
                                <span className="text-xs lg:text-sm font-medium text-gray-700">
                                    Pending: <span className="text-yellow-500 font-bold">{pendingProducts}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default All_Products;