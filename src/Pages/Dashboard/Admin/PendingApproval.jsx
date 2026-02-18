import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { PendingProducts, pendingUser } from '../../../Component/Api';
import { 
  ShoppingBagIcon, 
  UserGroupIcon, 
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const PendingApproval = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { 
    data: products, 
    isLoading: productsLoading, 
    error: productsError 
  } = useQuery({
    queryKey: ["pending-products"],
    queryFn: PendingProducts
  });

  const { 
    data: users, 
    isLoading: usersLoading, 
    error: usersError 
  } = useQuery({
    queryKey: ["pending-users"],
    queryFn: pendingUser
  });

  const handleViewDetails = (item, type) => {
    if (type === 'product') {
      setSelectedProduct(item);
    } else {
      setSelectedUser(item);
    }
    setIsModalOpen(true);
  };

  const handleApprove = (id, type) => {
    console.log(`Approving ${type}:`, id);
  };

  const handleReject = (id, type) => {
    console.log(`Rejecting ${type}:`, id);
  };

  if (productsLoading || usersLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (productsError || usersError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <XCircleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">Error Loading Data</h3>
          <p className="text-gray-600">Please try again later</p>
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Pending Approvals</h1>
        <p className="text-gray-600 mt-2">Review and manage pending products and seller requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-4 rounded-lg`}>
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
                ? 'border-blue-600 text-blue-600'
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
                ? 'border-blue-600 text-blue-600'
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
          <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">Shop: {product.shopName}</p>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      Pending Review
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="text-sm font-semibold text-gray-900">৳{product.price}</p>
                      {product.oldPrice && (
                        <p className="text-xs text-gray-500 line-through">৳{product.oldPrice}</p>
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

                  <div className="mt-4">
                    <p className="text-xs text-gray-500 mb-1">Description</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                  </div>

                  <div className="flex items-center justify-end space-x-3 mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleViewDetails(product, 'product')}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                    >
                      <EyeIcon className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={() => handleReject(product._id, 'product')}
                      className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center space-x-2"
                    >
                      <XCircleIcon className="h-4 w-4" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleApprove(product._id, 'product')}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <CheckCircleIcon className="h-4 w-4" />
                      <span>Approve</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {activeTab === 'users' && users?.map((user) => (
          <div key={user._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 flex-shrink-0">
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName}
                    className="w-full h-full rounded-full object-cover border-2 border-gray-200"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{user.displayName}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      {user.role === 'requested-seller' ? 'Seller Request' : user.role}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-500">Provider</p>
                      <p className="text-sm font-medium text-gray-900 capitalize">{user.provider}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Joined</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">User ID</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{user._id}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3 mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleViewDetails(user, 'user')}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                    >
                      <EyeIcon className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={() => handleReject(user._id, 'user')}
                      className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center space-x-2"
                    >
                      <XCircleIcon className="h-4 w-4" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleApprove(user._id, 'user')}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <CheckCircleIcon className="h-4 w-4" />
                      <span>Approve as Seller</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {activeTab === 'products' && products?.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <ShoppingBagIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Products</h3>
            <p className="text-gray-600">All products have been reviewed</p>
          </div>
        )}

        {activeTab === 'users' && users?.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <UserGroupIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Sellers</h3>
            <p className="text-gray-600">All seller requests have been processed</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedProduct ? 'Product Details' : 'User Details'}
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XCircleIcon className="h-6 w-6" />
                  </button>
                </div>

                {selectedProduct && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <img 
                          src={selectedProduct.image} 
                          alt={selectedProduct.name}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Product Name</h4>
                          <p className="text-base font-semibold text-gray-900">{selectedProduct.name}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Category</h4>
                          <p className="text-base text-gray-900">{selectedProduct.category}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Brand</h4>
                          <p className="text-base text-gray-900">{selectedProduct.brand}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Price</h4>
                          <p className="text-base text-gray-900">৳{selectedProduct.price}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Stock</h4>
                          <p className="text-base text-gray-900">{selectedProduct.stock}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Unit</h4>
                          <p className="text-base text-gray-900">{selectedProduct.unit}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Full Description</h4>
                      <p className="text-sm text-gray-700">{selectedProduct.description}</p>
                    </div>
                  </div>
                )}

                {selectedUser && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={selectedUser.photoURL} 
                        alt={selectedUser.displayName}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900">{selectedUser.displayName}</h4>
                        <p className="text-gray-600">{selectedUser.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">User ID</h4>
                        <p className="text-base text-gray-900">{selectedUser._id}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Role</h4>
                        <p className="text-base text-gray-900 capitalize">{selectedUser.role}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Provider</h4>
                        <p className="text-base text-gray-900 capitalize">{selectedUser.provider}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Joined Date</h4>
                        <p className="text-base text-gray-900">
                          {new Date(selectedUser.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
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