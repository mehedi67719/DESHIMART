import { useQuery, useMutation } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { 
  PendingProducts, 
  pendingUser, 
  updateproductsstatus, 
  deleteProduct,
  updateRole 
} from '../../../Component/Api';
import { 
  ShoppingBagIcon, 
  UserGroupIcon, 
  ClockIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { FaCheck, FaTimes, FaTrash, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';

const PendingApproval = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const { 
    data: products, 
    isLoading: productsLoading, 
    error: productsError,
    refetch: refetchProducts 
  } = useQuery({
    queryKey: ["pending-products"],
    queryFn: PendingProducts
  });

  const { 
    data: users, 
    isLoading: usersLoading, 
    error: usersError,
    refetch: refetchUsers 
  } = useQuery({
    queryKey: ["pending-users"],
    queryFn: pendingUser
  });

  const updateProductStatusMutation = useMutation({
    mutationFn: ({ id, status }) => updateproductsstatus(id, status),
    onSuccess: () => {
      refetchProducts();
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      refetchProducts();
    }
  });

  const updateUserRoleMutation = useMutation({
    mutationFn: ({ email, role }) => updateRole(email, role),
    onSuccess: () => {
      refetchUsers();
    }
  });

  const handleViewDetails = (item, type) => {
    if (type === 'product') {
      setSelectedProduct(item);
      setSelectedUser(null);
    } else {
      setSelectedUser(item);
      setSelectedProduct(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsModalOpen(false);
    setSelectedProduct(null);
    setSelectedUser(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal(e);
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

      try {
        await updateProductStatusMutation.mutateAsync({ 
          id: productId, 
          status: 'approved' 
        });
        
        Swal.fire({
          icon: 'success',
          title: 'Approved!',
          text: `${productName} has been approved`,
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: error.message || 'Failed to approve product',
          confirmButtonColor: '#ef4444'
        });
      }
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

      try {
        await updateProductStatusMutation.mutateAsync({ 
          id: productId, 
          status: 'rejected' 
        });
        
        Swal.fire({
          icon: 'success',
          title: 'Rejected!',
          text: `${productName} has been rejected`,
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: error.message || 'Failed to reject product',
          confirmButtonColor: '#ef4444'
        });
      }
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
        title: 'Processing...',
        text: 'Please wait while we delete the product',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        await deleteProductMutation.mutateAsync(productId);
        
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${productName} has been deleted successfully`,
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: error.message || 'Failed to delete product',
          confirmButtonColor: '#ef4444'
        });
      }
    }
  };

  const handleApproveSeller = async (user) => {
    const result = await Swal.fire({
      title: 'Approve Seller?',
      text: `Are you sure you want to approve ${user.displayName || user.name} as a seller?`,
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
        text: 'Please wait while we approve the seller',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        await updateUserRoleMutation.mutateAsync({ 
          email: user.email, 
          role: 'seller' 
        });
        
        Swal.fire({
          icon: 'success',
          title: 'Approved!',
          text: `${user.displayName || user.name} is now a seller`,
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: error.message || 'Failed to approve seller',
          confirmButtonColor: '#ef4444'
        });
      }
    }
  };

  const handleRejectSeller = async (user) => {
    const result = await Swal.fire({
      title: 'Reject Seller Request?',
      text: `Are you sure you want to reject ${user.displayName || user.name}'s seller request?`,
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
        text: 'Please wait while we reject the request',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        await updateUserRoleMutation.mutateAsync({ 
          email: user.email, 
          role: 'buyer' 
        });
        
        Swal.fire({
          icon: 'success',
          title: 'Rejected!',
          text: `${user.displayName || user.name} has been set as buyer`,
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: error.message || 'Failed to reject seller request',
          confirmButtonColor: '#ef4444'
        });
      }
    }
  };

  const isAnyLoading = updateProductStatusMutation.isLoading || 
                      deleteProductMutation.isLoading || 
                      updateUserRoleMutation.isLoading;

  if (productsLoading || usersLoading) {
    return (
      <div className="min-h-screen bg-white p-6">
        <h2 className="text-2xl font-bold mb-6 text-green-600">Pending Approvals</h2>
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

  if (productsError || usersError) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error! </strong>
          <span>Failed to load pending items</span>
          <button 
            onClick={() => {
              refetchProducts();
              refetchUsers();
            }}
            className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    {
      name: 'Pending Products',
      value: products?.length || 0,
      icon: ShoppingBagIcon,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      name: 'Pending Sellers',
      value: users?.length || 0,
      icon: UserGroupIcon,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600'
    },
    {
      name: 'Total Pending',
      value: (products?.length || 0) + (users?.length || 0),
      icon: ClockIcon,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-green-600 border-l-4 border-green-600 pl-4">
          Pending Approvals
        </h2>
        <p className="text-gray-600 mt-2">Review and manage pending products and seller requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-4 rounded-full`}>
                <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-4 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'products'
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <ShoppingBagIcon className="h-5 w-5" />
              <span>Pending Products ({products?.length || 0})</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-4 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'users'
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <UserGroupIcon className="h-5 w-5" />
              <span>Pending Sellers ({users?.length || 0})</span>
            </div>
          </button>
        </nav>
      </div>

      <div className="space-y-6">
        {activeTab === 'products' && products?.map((product) => (
          <div key={product._id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="lg:w-48 h-48 flex-shrink-0">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200';
                    }}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">Shop: {product.shopName}</p>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium border border-yellow-200">
                      Pending Review
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="text-sm font-semibold text-green-600">{formatCurrency(product.price)}</p>
                      {product.oldPrice && product.oldPrice > product.price && (
                        <p className="text-xs text-gray-400 line-through">{formatCurrency(product.oldPrice)}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Category</p>
                      <p className="text-sm font-medium text-gray-900">{product.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Stock</p>
                      <p className="text-sm font-medium text-gray-900">{product.stock} units</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Seller Email</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{product.sellerEmail}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Description</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleViewDetails(product, 'product')}
                      disabled={isAnyLoading}
                      className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <FaEye />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => handleRejectProduct(product._id, product.name)}
                      disabled={isAnyLoading}
                      className="px-3 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <FaTimes />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleApproveProduct(product._id, product.name)}
                      disabled={isAnyLoading}
                      className="px-3 py-2 text-sm font-medium text-green-600 bg-green-100 rounded-lg hover:bg-green-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <FaCheck />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id, product.name)}
                      disabled={isAnyLoading}
                      className="px-3 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {activeTab === 'users' && users?.map((user) => (
          <div key={user._id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex items-center gap-4 lg:w-80">
                  <div className="w-16 h-16 flex-shrink-0">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName}
                        className="w-full h-full rounded-full object-cover border-2 border-green-500"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/64';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-green-600 flex items-center justify-center">
                        <span className="text-white font-semibold text-xl">
                          {(user.displayName || user.name || 'U').charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{user.displayName || user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium border border-yellow-200">
                      {user.role === 'requested-seller' ? 'Seller Request' : user.role}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Provider</p>
                      <p className="text-sm font-medium text-gray-900 capitalize">{user.provider || 'email'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Joined</p>
                      <p className="text-sm font-medium text-gray-900">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 lg:flex-col lg:items-stretch">
                  <button
                    onClick={() => handleViewDetails(user, 'user')}
                    disabled={isAnyLoading}
                    className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <FaEye />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleRejectSeller(user)}
                    disabled={isAnyLoading}
                    className="px-3 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <FaTimes />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => handleApproveSeller(user)}
                    disabled={isAnyLoading}
                    className="px-3 py-2 text-sm font-medium text-green-600 bg-green-100 rounded-lg hover:bg-green-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <FaCheck />
                    <span>Approve</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {activeTab === 'products' && products?.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
            <ShoppingBagIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Products</h3>
            <p className="text-gray-600">All products have been reviewed</p>
          </div>
        )}

        {activeTab === 'users' && users?.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
            <UserGroupIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Sellers</h3>
            <p className="text-gray-600">All seller requests have been processed</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto"
          onClick={handleOverlayClick}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full relative z-50">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {selectedProduct ? 'Product Details' : 'User Details'}
                  </h3>
                  <button
                    onClick={(e) => closeModal(e)}
                    className="text-gray-400 hover:text-gray-500 transition-colors focus:outline-none"
                    type="button"
                  >
                    <XCircleIcon className="h-6 w-6" />
                  </button>
                </div>

                {selectedProduct && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <img 
                          src={selectedProduct.image} 
                          alt={selectedProduct.name}
                          className="w-full h-64 object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400';
                          }}
                        />
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Full Description</h4>
                          <p className="text-sm text-gray-700">{selectedProduct.description}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="text-xs font-medium text-gray-500">Product Name</h4>
                            <p className="text-base font-semibold text-gray-900">{selectedProduct.name}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="text-xs font-medium text-gray-500">Category</h4>
                            <p className="text-base text-gray-900">{selectedProduct.category}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="text-xs font-medium text-gray-500">Brand</h4>
                            <p className="text-base text-gray-900">{selectedProduct.brand}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="text-xs font-medium text-gray-500">Price</h4>
                            <p className="text-base text-green-600 font-semibold">{formatCurrency(selectedProduct.price)}</p>
                          </div>
                          {selectedProduct.oldPrice && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <h4 className="text-xs font-medium text-gray-500">Old Price</h4>
                              <p className="text-base text-gray-400 line-through">{formatCurrency(selectedProduct.oldPrice)}</p>
                            </div>
                          )}
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="text-xs font-medium text-gray-500">Discount</h4>
                            <p className="text-base text-gray-900">{selectedProduct.discount || 0}%</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="text-xs font-medium text-gray-500">Stock</h4>
                            <p className="text-base text-gray-900">{selectedProduct.stock} units</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="text-xs font-medium text-gray-500">Unit</h4>
                            <p className="text-base text-gray-900">{selectedProduct.unit}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="text-xs font-medium text-gray-500">Sold</h4>
                            <p className="text-base text-gray-900">{selectedProduct.sold || 0} units</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="text-xs font-medium text-gray-500">Rating</h4>
                            <p className="text-base text-gray-900">{selectedProduct.rating || 0} ({selectedProduct.reviews || 0} reviews)</p>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Seller Information</h4>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-700"><span className="font-medium">Shop:</span> {selectedProduct.shopName}</p>
                            <p className="text-sm text-gray-700"><span className="font-medium">Email:</span> {selectedProduct.sellerEmail}</p>
                            <p className="text-sm text-gray-700"><span className="font-medium">Status:</span> 
                              <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                                {selectedProduct.status || 'pending'}
                              </span>
                            </p>
                            <p className="text-sm text-gray-700"><span className="font-medium">Created:</span> {new Date(selectedProduct.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedUser && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                      {selectedUser.photoURL ? (
                        <img 
                          src={selectedUser.photoURL} 
                          alt={selectedUser.displayName}
                          className="w-20 h-20 rounded-full object-cover border-2 border-green-500"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/80';
                          }}
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center">
                          <span className="text-white font-semibold text-2xl">
                            {(selectedUser.displayName || selectedUser.name || 'U').charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900">{selectedUser.displayName || selectedUser.name}</h4>
                        <p className="text-gray-600">{selectedUser.email}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-500 mb-3">User Information</h4>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-700"><span className="font-medium">User ID:</span> {selectedUser._id}</p>
                          <p className="text-sm text-gray-700"><span className="font-medium">Role:</span> 
                            <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                              {selectedUser.role}
                            </span>
                          </p>
                          <p className="text-sm text-gray-700"><span className="font-medium">Provider:</span> {selectedUser.provider || 'email'}</p>
                          <p className="text-sm text-gray-700"><span className="font-medium">Joined:</span> {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}</p>
                          {selectedUser.lastLogin && (
                            <p className="text-sm text-gray-700"><span className="font-medium">Last Login:</span> {new Date(selectedUser.lastLogin).toLocaleDateString()}</p>
                          )}
                        </div>
                      </div>
                      
                      {selectedUser.shopDetails && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-500 mb-3">Shop Information</h4>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-700"><span className="font-medium">Shop Name:</span> {selectedUser.shopDetails.shopName}</p>
                            <p className="text-sm text-gray-700"><span className="font-medium">Description:</span> {selectedUser.shopDetails.description}</p>
                            <p className="text-sm text-gray-700"><span className="font-medium">Address:</span> {selectedUser.shopDetails.address}</p>
                            <p className="text-sm text-gray-700"><span className="font-medium">Phone:</span> {selectedUser.shopDetails.phone}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={(e) => closeModal(e)}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingApproval;