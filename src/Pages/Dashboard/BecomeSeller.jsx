import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { becomeseller } from '../../Component/Api';
import Useauth from '../../Component/Useauth';
import {
    UserCircleIcon,
    BuildingStorefrontIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    CameraIcon,
    DocumentTextIcon,
    ShieldCheckIcon,
    CreditCardIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    XMarkIcon,
    PlusIcon
} from '@heroicons/react/24/outline';

const BecomeSeller = () => {
    const { user } = Useauth();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
    const [shopImage, setShopImage] = useState(null);
    const [shopImagePreview, setShopImagePreview] = useState(null);
    const [shopImageUrl, setShopImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            sellerName: '',
            sellerEmail: user?.email || '',
            sellerPhone: '',
            shopName: '',
            shopDescription: '',
            shopAddress: '',
            shopCity: '',
            shopZipCode: '',
            taxId: '',
            bankAccount: '',
            termsAccepted: false
        }
    });

    const termsAccepted = watch('termsAccepted');
    const shopDescription = watch('shopDescription');

    const allCategories = [
        'Electronics',
        'Fashion & Clothing',
        'Home & Kitchen',
        'Beauty & Health',
        'Sports & Fitness',
        'Books & Stationery',
        'Toys & Games',
        'Food & Grocery',
        'Automotive',
        'Other'
    ];

    useEffect(() => {
        if (user?.email) {
            setValue('sellerEmail', user.email);
        }
    }, [user, setValue]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCategorySelect = (category) => {
        if (category === 'Other') {
            setShowNewCategoryInput(true);
            setIsDropdownOpen(false);
        } else if (!selectedCategories.includes(category)) {
            setSelectedCategories(prev => [...prev, category]);
            setIsDropdownOpen(false);
            setFormError('');
        }
    };

    const addNewCategory = () => {
        if (newCategoryName.trim() && !selectedCategories.includes(newCategoryName.trim())) {
            setSelectedCategories(prev => [...prev, newCategoryName.trim()]);
            setNewCategoryName('');
            setShowNewCategoryInput(false);
            setFormError('');
        }
    };

    const removeCategory = (categoryToRemove) => {
        setSelectedCategories(prev => prev.filter(cat => cat !== categoryToRemove));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            const maxSize = 5 * 1024 * 1024;

            if (!validTypes.includes(file.type)) {
                setFormError('Only JPG, PNG, GIF, or WebP images are allowed');
                return;
            }

            if (file.size > maxSize) {
                setFormError('Image size should be less than 5MB');
                return;
            }

            setShopImage(file);
            const previewUrl = URL.createObjectURL(file);
            setShopImagePreview(previewUrl);
            setShopImageUrl('');
            setFormError('');
        }
    };

    const handleImageUrlInput = (e) => {
        const url = e.target.value;
        setShopImageUrl(url);
        if (url) {
            setShopImagePreview(url);
            setShopImage(null);
        } else {
            setShopImagePreview(null);
        }
        setFormError('');
    };

    const removeImage = () => {
        if (shopImagePreview && shopImage) {
            URL.revokeObjectURL(shopImagePreview);
        }
        setShopImage(null);
        setShopImagePreview(null);
        setShopImageUrl('');
    };

    const onSubmit = async (data) => {
        setLoading(true);
        setFormError('');

        if (selectedCategories.length === 0) {
            setFormError('Please select at least one category');
            setLoading(false);
            return;
        }

        if (user?.email && data.sellerEmail !== user.email) {
            setFormError('Email must match your registered email');
            setLoading(false);
            return;
        }

        const submissionData = {
            ...data,
            email: data.sellerEmail,
            shopCategories: selectedCategories,
            shopImage: shopImageUrl || (shopImage ? "uploaded-file" : ""),
            submittedAt: new Date().toISOString(),
            status: 'pending'
        };

        try {
            const res = await becomeseller(submissionData);

            if (res.success) {
                setSubmitSuccess(true);
                setTimeout(() => {
                    setSubmitSuccess(false);
                }, 3000);

                Object.keys(data).forEach(key => {
                    if (key === 'termsAccepted') {
                        setValue(key, false);
                    } else if (key === 'sellerEmail') {
                        setValue(key, user?.email || '');
                    } else {
                        setValue(key, '');
                    }
                });
                setSelectedCategories([]);
                setNewCategoryName("");
                setShowNewCategoryInput(false);
                removeImage();
            } else {
                setFormError(res.message || 'Submission failed');
            }
        } catch {
            setFormError('Submission failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            {submitSuccess && (
                <div className="fixed top-4 right-4 z-50 animate-slideIn">
                    <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
                        <CheckCircleIcon className="h-6 w-6" />
                        <span className="font-medium">Application submitted successfully!</span>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6 shadow-lg">
                        <BuildingStorefrontIcon className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Become a Seller
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Join our marketplace and start selling your products to millions of customers worldwide.
                    </p>
                </div>

                {formError && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
                        <div className="flex items-center">
                            <XMarkIcon className="h-5 w-5 text-red-500 mr-2" />
                            <p className="text-red-700">{formError}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <UserCircleIcon className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                                    <p className="text-gray-600">Tell us about yourself</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            {...register("sellerName", {
                                                required: "Full name is required",
                                                minLength: {
                                                    value: 2,
                                                    message: "Name must be at least 2 characters"
                                                },
                                                maxLength: {
                                                    value: 50,
                                                    message: "Name must be less than 50 characters"
                                                }
                                            })}
                                            className={`w-full border ${errors.sellerName ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                            placeholder="John Doe"
                                        />
                                        <UserCircleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                    {errors.sellerName && <p className="mt-1 text-sm text-red-600">{errors.sellerName.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            {...register("sellerEmail", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: "Please enter a valid email address"
                                                }
                                            })}
                                            className={`w-full border ${errors.sellerEmail ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    {errors.sellerEmail && <p className="mt-1 text-sm text-red-600">{errors.sellerEmail.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <div className="relative">
                                        <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            {...register("sellerPhone", {
                                                required: "Phone number is required",
                                                pattern: {
                                                    value: /^\+?[0-9\s\-()]{10,15}$/,
                                                    message: "Please enter a valid phone number"
                                                }
                                            })}
                                            className={`w-full border ${errors.sellerPhone ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                            placeholder="+880 1XXX-XXXXXX"
                                        />
                                    </div>
                                    {errors.sellerPhone && <p className="mt-1 text-sm text-red-600">{errors.sellerPhone.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <BuildingStorefrontIcon className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Shop Details</h3>
                                    <p className="text-gray-600">Tell us about your shop</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Shop Name *
                                </label>
                                <input
                                    type="text"
                                    {...register("shopName", {
                                        required: "Shop name is required",
                                        minLength: {
                                            value: 3,
                                            message: "Shop name must be at least 3 characters"
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "Shop name must be less than 100 characters"
                                        }
                                    })}
                                    className={`w-full border ${errors.shopName ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                    placeholder="My Awesome Shop"
                                />
                                {errors.shopName && <p className="mt-1 text-sm text-red-600">{errors.shopName.message}</p>}
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Shop Categories *
                                </label>

                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {selectedCategories.length > 0 ? (
                                            selectedCategories.map(category => (
                                                <div key={category} className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full shadow-sm">
                                                    <span className="text-sm font-medium">{category}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeCategory(category)}
                                                        className="ml-2 hover:text-blue-200 transition-colors"
                                                    >
                                                        <XMarkIcon className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-gray-500 text-sm bg-gray-100 px-4 py-2 rounded-lg">
                                                No categories selected yet
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {showNewCategoryInput && (
                                    <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                                        <label className="block text-sm font-medium text-blue-700 mb-2">
                                            Add New Category
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newCategoryName}
                                                onChange={(e) => setNewCategoryName(e.target.value)}
                                                className="flex-1 border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter category name"
                                            />
                                            <button
                                                type="button"
                                                onClick={addNewCategory}
                                                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                                            >
                                                <PlusIcon className="w-4 h-4" />
                                                Add
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setShowNewCategoryInput(false)}
                                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={toggleDropdown}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center transition-all"
                                    >
                                        <span className="text-gray-700">
                                            {selectedCategories.length > 0
                                                ? `${selectedCategories.length} categories selected`
                                                : 'Select categories'}
                                        </span>
                                        <span className="text-gray-500">
                                            {isDropdownOpen ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                                        </span>
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-xl shadow-2xl max-h-60 overflow-y-auto animate-fadeIn">
                                            {allCategories.map(category => (
                                                <button
                                                    type="button"
                                                    key={category}
                                                    onClick={() => handleCategorySelect(category)}
                                                    disabled={selectedCategories.includes(category)}
                                                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors ${selectedCategories.includes(category)
                                                            ? 'bg-blue-50 text-blue-600 cursor-not-allowed'
                                                            : 'text-gray-700 hover:text-blue-600'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-medium">{category}</span>
                                                        {selectedCategories.includes(category) ? (
                                                            <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                                        ) : (
                                                            <span className="text-xs text-gray-400">Click to add</span>
                                                        )}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Shop Logo/Image
                                </label>

                                <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-gray-600">Or enter image URL:</span>
                                    </div>
                                    <input
                                        type="url"
                                        value={shopImageUrl}
                                        onChange={handleImageUrlInput}
                                        placeholder="https://example.com/shop-logo.jpg"
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                                    {shopImagePreview ? (
                                        <div className="space-y-6">
                                            <div className="w-40 h-40 rounded-2xl overflow-hidden mx-auto shadow-lg">
                                                <img
                                                    src={shopImagePreview}
                                                    alt="Shop preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                {shopImage && (
                                                    <p className="text-sm text-gray-600">
                                                        File: {shopImage.name}
                                                    </p>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                                                >
                                                    <XMarkIcon className="w-4 h-4" />
                                                    Remove Image
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto">
                                                <CameraIcon className="w-12 h-12 text-blue-500" />
                                            </div>
                                            <div>
                                                <p className="text-gray-600 mb-4">Upload shop logo or banner image</p>
                                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                                    <label className="cursor-pointer">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                            className="hidden"
                                                        />
                                                        <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                                                            <CameraIcon className="w-5 h-5" />
                                                            Upload File
                                                        </span>
                                                    </label>
                                                    <div className="flex items-center">
                                                        <span className="text-gray-500">or</span>
                                                    </div>
                                                    <p className="text-gray-600">Enter URL above</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                Recommended: 500x500px, JPG, PNG, or GIF (Max 5MB)
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Shop Description *
                                </label>
                                <textarea
                                    {...register("shopDescription", {
                                        required: "Shop description is required",
                                        minLength: {
                                            value: 10,
                                            message: "Description must be at least 10 characters"
                                        },
                                        maxLength: {
                                            value: 500,
                                            message: "Description must be less than 500 characters"
                                        }
                                    })}
                                    rows="4"
                                    className={`w-full border ${errors.shopDescription ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none`}
                                    placeholder="Describe your shop, products, unique selling points, and why customers should buy from you..."
                                />
                                {errors.shopDescription && <p className="mt-1 text-sm text-red-600">{errors.shopDescription.message}</p>}
                                <p className="text-xs text-gray-500 mt-2">
                                    {shopDescription?.length || 0}/500 characters
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <MapPinIcon className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Business Information</h3>
                                    <p className="text-gray-600">Provide your business details</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Shop Address *
                                    </label>
                                    <div className="relative">
                                        <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            {...register("shopAddress", {
                                                required: "Shop address is required",
                                                minLength: {
                                                    value: 5,
                                                    message: "Address must be at least 5 characters"
                                                }
                                            })}
                                            className={`w-full border ${errors.shopAddress ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                            placeholder="123 Main Street, Apt 4B"
                                        />
                                    </div>
                                    {errors.shopAddress && <p className="mt-1 text-sm text-red-600">{errors.shopAddress.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        {...register("shopCity", {
                                            required: "City is required"
                                        })}
                                        className={`w-full border ${errors.shopCity ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                        placeholder="New York"
                                    />
                                    {errors.shopCity && <p className="mt-1 text-sm text-red-600">{errors.shopCity.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        ZIP Code *
                                    </label>
                                    <input
                                        type="text"
                                        {...register("shopZipCode", {
                                            required: "ZIP code is required",
                                            pattern: {
                                                value: /^[0-9]{5}(?:-[0-9]{4})?$/,
                                                message: "Please enter a valid ZIP code"
                                            }
                                        })}
                                        className={`w-full border ${errors.shopZipCode ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                        placeholder="10001"
                                    />
                                    {errors.shopZipCode && <p className="mt-1 text-sm text-red-600">{errors.shopZipCode.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <span className="flex items-center gap-2">
                                            <DocumentTextIcon className="w-4 h-4" />
                                            Tax ID / Business Registration
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("taxId")}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Optional"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <span className="flex items-center gap-2">
                                            <CreditCardIcon className="w-4 h-4" />
                                            Bank Account Number
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <CreditCardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            {...register("bankAccount")}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="For payment settlements (optional)"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <ShieldCheckIcon className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Terms & Conditions</h3>
                                    <p className="text-gray-600">Review and accept terms</p>
                                </div>
                            </div>

                            <div className={`p-4 rounded-xl ${errors.termsAccepted ? 'bg-red-50 border border-red-200' : 'bg-white border border-gray-200'}`}>
                                <div className="flex items-start gap-4">
                                    <div className="flex items-center h-6">
                                        <input
                                            type="checkbox"
                                            {...register("termsAccepted", {
                                                required: "You must accept the terms and conditions"
                                            })}
                                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                        />
                                    </div>
                                    <label className="text-sm text-gray-700 leading-relaxed">
                                        I agree to the Seller Terms & Conditions, Privacy Policy, and agree to maintain accurate product information, provide excellent customer service, and comply with all marketplace policies. I understand that my application will be reviewed and approval is subject to verification.
                                    </label>
                                </div>
                                {errors.termsAccepted && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                        <XMarkIcon className="w-4 h-4" />
                                        {errors.termsAccepted.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="text-center pt-6">
                            <button
                                type="submit"
                                disabled={loading || !termsAccepted || selectedCategories.length === 0}
                                className="relative group bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold py-4 px-12 rounded-2xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-blue-500/25"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                                    {loading ? (
                                        <>
                                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircleIcon className="w-6 h-6" />
                                            Submit Application
                                        </>
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                            <p className="text-sm text-gray-500 mt-4">
                                By submitting, you agree to our terms and conditions
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BecomeSeller;