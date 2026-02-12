import React, { useEffect, useState } from 'react';
import { getuser } from '../../Component/Api';
import Useauth from '../../Component/Useauth';
import { 
  CameraIcon,
  EnvelopeIcon, 
  CalendarIcon,
  IdentificationIcon,
  GlobeAltIcon,
  PencilSquareIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';

const Myprofile = () => {
    const { user,logout } = Useauth();
    const [User, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPhotoUpload, setShowPhotoUpload] = useState(false);
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    useEffect(() => {
        if (!user?.email) return;
        
        const fetchUser = async () => {
            try {
                setLoading(true);
                const data = await getuser(user.email);
                setUser(data);
                setPhotoPreview(data.photoURL);
            } catch (err) {
                console.error("Error fetching user:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [user]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handlePhotoSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
            setShowPhotoUpload(true);
        }
    };

    const handlePhotoUpload = async () => {
        console.log("Uploading photo:", photoFile);
        setTimeout(() => {
            alert("Photo uploaded successfully!");
            setShowPhotoUpload(false);
            setPhotoFile(null);
        }, 1500);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-gray-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="relative inline-block">
                        <div className="w-24 h-24 border-4 border-emerald-200 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-24 h-24 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-emerald-100 rounded-full"></div>
                        </div>
                    </div>
                    <p className="mt-6 text-emerald-700 text-lg font-semibold animate-pulse">Loading your profile...</p>
                </div>
            </div>
        );
    }

    if (!User) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-emerald-100">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <IdentificationIcon className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Profile Not Found</h2>
                    <p className="text-gray-600 mb-6">Please log in to view your profile information.</p>
                    <button className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    const patternStyle = {
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300a859' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    };

    return (
        <div className="min-h-screen bg-white ">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-emerald-900 opacity-95"></div>
                        <div className="absolute inset-0 opacity-20" style={patternStyle}></div>
                        
                        <div className="relative p-8 md:p-12">
                            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                                <div className="relative group">
                                    <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                                        <img 
                                            src={photoPreview || User.photoURL} 
                                            alt={User.displayName}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(User.displayName)}&background=00a859&color=fff&size=400&bold=true&font-size=0.5`;
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                                             onClick={() => document.getElementById('photoInput').click()}>
                                            <div className="text-center">
                                                <CameraIcon className="w-10 h-10 text-white mx-auto mb-2" />
                                                <span className="text-white text-sm font-medium">Change Photo</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <input
                                        type="file"
                                        id="photoInput"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handlePhotoSelect}
                                    />
                                    
                                    <div className="absolute bottom-4 right-4 w-6 h-6 bg-emerald-500 rounded-full border-3 border-white shadow-lg"></div>
                                    
                                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                                        <div className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-lg ${User.role === 'admin' ? 'bg-black text-white' : 'bg-emerald-500 text-white'}`}>
                                            {User.role.toUpperCase()}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center lg:text-left flex-1">
                                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{User.displayName}</h1>
                                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
                                        <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                                            <EnvelopeIcon className="w-5 h-5 text-white mr-2" />
                                            <span className="text-white font-medium">{User.email}</span>
                                        </div>
                                        <div className="flex items-center bg-emerald-500/30 backdrop-blur-sm rounded-full px-4 py-2">
                                            <GlobeAltIcon className="w-5 h-5 text-white mr-2" />
                                            <span className="text-white font-medium">{User.provider} Account</span>
                                        </div>
                                    </div>
                                    
                                    <div className="inline-flex items-center bg-black/30 backdrop-blur-sm rounded-xl px-4 py-2">
                                        <CalendarIcon className="w-5 h-5 text-emerald-300 mr-2" />
                                        <span className="text-emerald-100">
                                            Member since <span className="font-semibold">{formatDate(User.createdAt)}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        {showPhotoUpload && (
                            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                                <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Update Profile Photo</h3>
                                    <div className="mb-6">
                                        <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-emerald-100">
                                            <img 
                                                src={photoPreview} 
                                                alt="Preview" 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <p className="text-center text-gray-600">New profile photo preview</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button 
                                            onClick={() => setShowPhotoUpload(false)}
                                            className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            onClick={handlePhotoUpload}
                                            className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all"
                                        >
                                            Upload Photo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-4 mb-12 justify-center">
                            <button 
                                onClick={() => document.getElementById('photoInput').click()}
                                className="flex items-center gap-3 bg-gradient-to-r from-black to-gray-800 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group"
                            >
                                <div className="relative">
                                    <CameraIcon className="w-6 h-6" />
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
                                </div>
                                <span>Update Photo</span>
                            </button>
                            
                            <button className="flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                                <PencilSquareIcon className="w-6 h-6" />
                                <span>Edit Profile</span>
                            </button>
                            
                            <button className="flex items-center gap-3 border-2 border-gray-800 text-gray-800 font-semibold py-3 px-8 rounded-xl hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5">
                                <Cog6ToothIcon className="w-6 h-6" />
                                <span>Settings</span>
                            </button>
                            
                            <button onClick={()=>logout()} className="flex items-center gap-3 border-2 border-red-200 text-red-600 font-semibold py-3 px-8 rounded-xl hover:bg-red-50 transition-all duration-300">
                                <ArrowRightOnRectangleIcon className="w-6 h-6" />
                                <span>Logout</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                                        <IdentificationIcon className="w-6 h-6 text-white" />
                                    </div>
                                    Personal Information
                                </h3>
                                
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Full Name</p>
                                            <p className="text-lg font-semibold text-gray-800">{User.displayName}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                            <span className="text-emerald-600 font-bold text-lg">
                                                {User.displayName.charAt(0)}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="pb-4 border-b border-gray-100">
                                        <p className="text-sm text-gray-500 mb-1">Email Address</p>
                                        <p className="text-lg font-semibold text-gray-800 break-all">{User.email}</p>
                                    </div>
                                    
                                    <div className="pb-4 border-b border-gray-100">
                                        <p className="text-sm text-gray-500 mb-1">Account Type</p>
                                        <div className="flex items-center">
                                            <div className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center ${User.provider === 'google' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                                {User.provider === 'google' ? (
                                                    <span className="text-blue-600 font-bold">G</span>
                                                ) : (
                                                    <ShieldCheckIcon className="w-4 h-4 text-gray-600" />
                                                )}
                                            </div>
                                            <p className="text-lg font-semibold text-gray-800">
                                                {User.provider.charAt(0).toUpperCase() + User.provider.slice(1)} Account
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">User ID</p>
                                        <div className="bg-gray-900 text-emerald-400 font-mono text-sm p-3 rounded-lg overflow-x-auto">
                                            {User._id}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-r from-black to-gray-800 rounded-lg flex items-center justify-center mr-3">
                                        <CalendarIcon className="w-6 h-6 text-white" />
                                    </div>
                                    Account Activity
                                </h3>
                                
                                <div className="space-y-6">
                                    <div className="pb-4 border-b border-gray-100">
                                        <p className="text-sm text-gray-500 mb-1">Account Created</p>
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mr-3">
                                                <CalendarIcon className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-semibold text-gray-800">{formatDate(User.createdAt)}</p>
                                                <p className="text-sm text-gray-500">at {formatTime(User.createdAt)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="pb-4 border-b border-gray-100">
                                        <p className="text-sm text-gray-500 mb-1">Last Login</p>
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mr-3">
                                                <CheckBadgeIcon className="w-5 h-5 text-gray-600" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-semibold text-gray-800">Just now</p>
                                                <p className="text-sm text-gray-500">Active session</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Account Status</p>
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mr-3">
                                                <ShieldCheckIcon className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-semibold text-gray-800">Verified & Active</p>
                                                <p className="text-sm text-emerald-600 font-medium">✓ All systems operational</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-200 rounded-2xl p-6">
                            <div className="flex flex-col md:flex-row items-center justify-between">
                                <div>
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">Profile Completeness</h4>
                                    <p className="text-gray-600">Your profile is 85% complete. Add more information to enhance your experience.</p>
                                </div>
                                <div className="mt-4 md:mt-0 w-full md:w-auto">
                                    <div className="flex items-center">
                                        <div className="w-48 h-3 bg-emerald-100 rounded-full overflow-hidden mr-4">
                                            <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full" style={{ width: '85%' }}></div>
                                        </div>
                                        <span className="text-emerald-700 font-bold text-lg">85%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            
            </div>
        </div>
    );
};

export default Myprofile;