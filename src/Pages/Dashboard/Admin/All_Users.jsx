import { useQuery, useMutation } from '@tanstack/react-query';
import React from 'react';
import { alluser, updateRole } from '../../../Component/Api';
import { FaUserShield, FaUserTie, FaUser, FaTrash, FaUsers } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { FaStore, FaShoppingBag } from 'react-icons/fa';
import Swal from 'sweetalert2';

const All_Users = () => {
    const { data: users, isLoading, error, refetch } = useQuery({
        queryKey: ["AllUsers"],
        queryFn: alluser
    });

   
    const updateRoleMutation = useMutation({
        mutationFn: ({ email, role }) => updateRole(email, role),
        onSuccess: () => {
            refetch();
        }
    });

    const totalUsers = users?.length || 0;
    const adminCount = users?.filter(user => user.role?.toLowerCase() === 'admin').length || 0;
    const sellerCount = users?.filter(user => user.role?.toLowerCase() === 'seller').length || 0;
    const buyerCount = users?.filter(user => !user.role || user.role?.toLowerCase() === 'buyer' || user.role?.toLowerCase() === 'user').length || 0;

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6 text-green-600">All Users</h2>
                <div className="grid gap-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="bg-white rounded-lg shadow-md p-4 animate-pulse border border-gray-200">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
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
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <strong className="font-bold">Error! </strong>
                    <span>{error.message || 'Failed to load users'}</span>
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

    const getRoleInfo = (role) => {
        switch(role?.toLowerCase()) {
            case 'admin':
                return {
                    icon: <MdAdminPanelSettings className="text-green-600 text-lg" />,
                    badge: 'bg-green-600 text-white',
                    label: 'Admin'
                };
            case 'seller':
                return {
                    icon: <FaStore className="text-black text-lg" />,
                    badge: 'bg-black text-white',
                    label: 'Seller'
                };
            default:
                return {
                    icon: <FaShoppingBag className="text-gray-600 text-lg" />,
                    badge: 'bg-gray-200 text-gray-800',
                    label: 'Buyer'
                };
        }
    };

    const handleMakeAdmin = async (user) => {
        const result = await Swal.fire({
            title: 'Make Admin?',
            text: `Are you sure you want to make ${user.displayName || user.name} an admin?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#22c55e',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, make admin!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            Swal.fire({
                title: 'Processing...',
                text: 'Please wait while we update the role',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            try {
                await updateRoleMutation.mutateAsync({ 
                    email: user.email, 
                    role: 'admin' 
                });
                
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: `${user.displayName || user.name} is now an admin`,
                    showConfirmButton: false,
                    timer: 1500
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed!',
                    text: error.message || 'Failed to make user admin',
                    confirmButtonColor: '#ef4444'
                });
            }
        }
    };

    const handleMakeSeller = async (user) => {
        const result = await Swal.fire({
            title: 'Make Seller?',
            text: `Are you sure you want to make ${user.displayName || user.name} a seller?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#000000',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, make seller!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            Swal.fire({
                title: 'Processing...',
                text: 'Please wait while we update the role',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            try {
                await updateRoleMutation.mutateAsync({ 
                    email: user.email, 
                    role: 'seller' 
                });
                
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: `${user.displayName || user.name} is now a seller`,
                    showConfirmButton: false,
                    timer: 1500
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed!',
                    text: error.message || 'Failed to make user seller',
                    confirmButtonColor: '#ef4444'
                });
            }
        }
    };

    const handleMakeBuyer = async (user) => {
        const result = await Swal.fire({
            title: 'Make Buyer?',
            text: `Are you sure you want to make ${user.displayName || user.name} a buyer?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#6b7280',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, make buyer!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            Swal.fire({
                title: 'Processing...',
                text: 'Please wait while we update the role',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            try {
                await updateRoleMutation.mutateAsync({ 
                    email: user.email, 
                    role: 'buyer' 
                });
                
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: `${user.displayName || user.name} is now a buyer`,
                    showConfirmButton: false,
                    timer: 1500
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed!',
                    text: error.message || 'Failed to make user buyer',
                    confirmButtonColor: '#ef4444'
                });
            }
        }
    };

    return (
        <div className="min-h-screen bg-white rounded-2xl">
            <div className="mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-green-600 border-l-4 border-green-600 pl-4">
                        User Management
                    </h2>
                </div>

           
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 uppercase">Total Users</p>
                                <p className="text-3xl font-bold text-gray-800 mt-2">{totalUsers}</p>
                            </div>
                            <div className="bg-green-100 p-4 rounded-full">
                                <FaUsers className="text-green-600 text-2xl" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 uppercase">Admins</p>
                                <p className="text-3xl font-bold text-gray-800 mt-2">{adminCount}</p>
                            </div>
                            <div className="bg-green-100 p-4 rounded-full">
                                <FaUserShield className="text-green-600 text-2xl" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-black">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 uppercase">Sellers</p>
                                <p className="text-3xl font-bold text-gray-800 mt-2">{sellerCount}</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-full">
                                <FaUserTie className="text-black text-2xl" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-gray-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 uppercase">Buyers</p>
                                <p className="text-3xl font-bold text-gray-800 mt-2">{buyerCount}</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-full">
                                <FaUser className="text-gray-600 text-2xl" />
                            </div>
                        </div>
                    </div>
                </div>

        
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-black">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        User
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Provider
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Joined
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users?.map((user, index) => {
                                    const roleInfo = getRoleInfo(user.role);
                                    const currentRole = user.role?.toLowerCase() || 'buyer';
                                    const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    }) : 'N/A';
                                    
                                    return (
                                        <tr key={user._id || user.email} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        {user.photoURL ? (
                                                            <img 
                                                                className="h-10 w-10 rounded-full object-cover border-2 border-green-500" 
                                                                src={user.photoURL} 
                                                                alt={user.displayName || user.name}
                                                            />
                                                        ) : (
                                                            <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
                                                                <span className="text-white font-semibold text-lg">
                                                                    {(user.displayName || user.name || 'U').charAt(0).toUpperCase()}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {user.displayName || user.name || 'N/A'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600">{user.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <span className="mr-2">{roleInfo.icon}</span>
                                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${roleInfo.badge}`}>
                                                        {roleInfo.label}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                                    user.provider === 'google' 
                                                        ? 'bg-green-100 text-green-800 border border-green-200' 
                                                        : 'bg-gray-100 text-gray-800 border border-gray-200'
                                                }`}>
                                                    {user.provider || 'email'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {joinDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleMakeAdmin(user)}
                                                        disabled={currentRole === 'admin' || updateRoleMutation.isLoading}
                                                        className={`
                                                            p-2 rounded-lg transition-all duration-200 transform hover:scale-110
                                                            ${currentRole === 'admin' || updateRoleMutation.isLoading
                                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed hover:scale-100' 
                                                                : 'text-green-600 hover:text-white bg-green-100 hover:bg-green-600'
                                                            }
                                                        `}
                                                        title={currentRole === 'admin' ? 'Already Admin' : 'Make Admin'}
                                                    >
                                                        <FaUserShield />
                                                    </button>
                                                    
                                                    <button
                                                        onClick={() => handleMakeSeller(user)}
                                                        disabled={currentRole === 'seller' || updateRoleMutation.isLoading}
                                                        className={`
                                                            p-2 rounded-lg transition-all duration-200 transform hover:scale-110
                                                            ${currentRole === 'seller' || updateRoleMutation.isLoading
                                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed hover:scale-100' 
                                                                : 'text-black hover:text-white bg-gray-200 hover:bg-black'
                                                            }
                                                        `}
                                                        title={currentRole === 'seller' ? 'Already Seller' : 'Make Seller'}
                                                    >
                                                        <FaUserTie />
                                                    </button>
                                                    
                                                    <button
                                                        onClick={() => handleMakeBuyer(user)}
                                                        disabled={currentRole === 'buyer' || updateRoleMutation.isLoading}
                                                        className={`
                                                            p-2 rounded-lg transition-all duration-200 transform hover:scale-110
                                                            ${currentRole === 'buyer' || updateRoleMutation.isLoading
                                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed hover:scale-100' 
                                                                : 'text-gray-600 hover:text-white bg-gray-200 hover:bg-gray-600'
                                                            }
                                                        `}
                                                        title={currentRole === 'buyer' ? 'Already Buyer' : 'Make Buyer'}
                                                    >
                                                        <FaUser />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    
                    {(!users || users.length === 0) && (
                        <div className="text-center py-16">
                            <div className="text-gray-300 text-7xl mb-4">👥</div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Users Found</h3>
                            <p className="text-gray-500">There are no users to display at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default All_Users;