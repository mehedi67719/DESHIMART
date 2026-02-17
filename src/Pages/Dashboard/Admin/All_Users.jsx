import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { alluser } from '../../../Component/Api';
import { FaUserShield, FaUserTie, FaUser, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const All_Users = () => {
    const { data: users, isLoading, error, refetch } = useQuery({
        queryKey: ["AllUsers"],
        queryFn: alluser
    });

    // Loading Skeleton
    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">All Users</h2>
                <div className="grid gap-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                                    <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded"></div>
                                    <div className="w-8 h-8 bg-gray-300 rounded"></div>
                                    <div className="w-8 h-8 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <div className="flex items-center">
                        <FaTimes className="mr-2" />
                        <strong className="font-bold">Error! </strong>
                        <span className="block sm:inline ml-1">{error.message || 'Failed to load users'}</span>
                    </div>
                    <button 
                        onClick={() => refetch()}
                        className="mt-3 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Get role badge and icon
    const getRoleInfo = (role) => {
        switch(role?.toLowerCase()) {
            case 'admin':
                return {
                    icon: <FaUserShield className="text-red-500" />,
                    badge: 'bg-red-100 text-red-800',
                    label: 'Admin'
                };
            case 'seller':
                return {
                    icon: <FaUserTie className="text-blue-500" />,
                    badge: 'bg-blue-100 text-blue-800',
                    label: 'Seller'
                };
            default:
                return {
                    icon: <FaUser className="text-green-500" />,
                    badge: 'bg-green-100 text-green-800',
                    label: 'Buyer'
                };
        }
    };

    // Handle make admin
    const handleMakeAdmin = async (userId) => {
        if(window.confirm('Are you sure you want to make this user an admin?')) {
            try {
                // Add your API call here
                // await fetch(`/api/users/${userId}/make-admin`, { method: 'PATCH' });
                refetch(); // Refetch users after update
            } catch (error) {
                console.error('Failed to make admin:', error);
            }
        }
    };

    // Handle make seller
    const handleMakeSeller = async (userId) => {
        if(window.confirm('Are you sure you want to make this user a seller?')) {
            try {
                // Add your API call here
                // await fetch(`/api/users/${userId}/make-seller`, { method: 'PATCH' });
                refetch(); // Refetch users after update
            } catch (error) {
                console.error('Failed to make seller:', error);
            }
        }
    };

    // Handle delete user
    const handleDeleteUser = async (userId, displayName) => {
        if(window.confirm(`Are you sure you want to delete ${displayName}?`)) {
            try {
                // Add your API call here
                // await fetch(`/api/users/${userId}`, { method: 'DELETE' });
                refetch(); // Refetch users after delete
            } catch (error) {
                console.error('Failed to delete user:', error);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">All Users</h2>
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <span className="font-semibold">Total Users: </span>
                    <span className="text-blue-600 font-bold">{users?.length || 0}</span>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Provider
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Joined
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users?.map((user) => {
                                const roleInfo = getRoleInfo(user.role);
                                const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A';
                                
                                return (
                                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    {user.photoURL ? (
                                                        <img 
                                                            className="h-10 w-10 rounded-full object-cover" 
                                                            src={user.photoURL} 
                                                            alt={user.displayName || user.name}
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                            <span className="text-gray-600 font-semibold">
                                                                {(user.displayName || user.name || 'U').charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {user.displayName || user.name || 'N/A'}
                                                    </div>
                                                    {user.name && user.displayName !== user.name && (
                                                        <div className="text-xs text-gray-500">
                                                            aka {user.name}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="mr-2">{roleInfo.icon}</span>
                                                <span className={`px-2 py-1 text-xs rounded-full ${roleInfo.badge}`}>
                                                    {roleInfo.label}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                user.provider === 'google' 
                                                    ? 'bg-orange-100 text-orange-800' 
                                                    : 'bg-purple-100 text-purple-800'
                                            }`}>
                                                {user.provider || 'email'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {joinDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                {/* Make Admin Button */}
                                                {user.role !== 'admin' && (
                                                    <button
                                                        onClick={() => handleMakeAdmin(user._id)}
                                                        className="text-blue-600 hover:text-blue-900 bg-blue-100 p-2 rounded-full transition-colors"
                                                        title="Make Admin"
                                                    >
                                                        <FaUserShield />
                                                    </button>
                                                )}
                                                
                                                {/* Make Seller Button */}
                                                {user.role !== 'seller' && user.role !== 'admin' && (
                                                    <button
                                                        onClick={() => handleMakeSeller(user._id)}
                                                        className="text-green-600 hover:text-green-900 bg-green-100 p-2 rounded-full transition-colors"
                                                        title="Make Seller"
                                                    >
                                                        <FaUserTie />
                                                    </button>
                                                )}
                                                
                                                {/* Delete User Button */}
                                                {user.role !== 'admin' && (
                                                    <button
                                                        onClick={() => handleDeleteUser(user._id, user.displayName || user.name)}
                                                        className="text-red-600 hover:text-red-900 bg-red-100 p-2 rounded-full transition-colors"
                                                        title="Delete User"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                
                {/* Empty State */}
                {(!users || users.length === 0) && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">👥</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Users Found</h3>
                        <p className="text-gray-500">There are no users to display at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default All_Users;