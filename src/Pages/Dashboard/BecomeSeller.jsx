import React, { useState } from 'react';
import { 
  UserCircleIcon, 
  BuildingStorefrontIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  CameraIcon, 
  DocumentTextIcon, 
  ShieldCheckIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const BecomeSeller = () => {
    const [formData, setFormData] = useState({
        sellerName: '',
        sellerEmail: '',
        sellerPhone: '',
        shopName: '',
        shopCategory: '',
        shopDescription: '',
        shopAddress: '',
        shopCity: '',
        shopZipCode: '',
        taxId: '',
        bankAccount: '',
        termsAccepted: false
    });

    const [shopImage, setShopImage] = useState(null);
    const [shopImagePreview, setShopImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setShopImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setShopImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
   
        setTimeout(() => {
            console.log('Form submitted:', { ...formData, shopImage });
            setLoading(false);
            alert('Application submitted successfully! We will review your application within 24-48 hours.');
        
            setFormData({
                sellerName: '',
                sellerEmail: '',
                sellerPhone: '',
                shopName: '',
                shopCategory: '',
                shopDescription: '',
                shopAddress: '',
                shopCity: '',
                shopZipCode: '',
                taxId: '',
                bankAccount: '',
                termsAccepted: false
            });
            setShopImage(null);
            setShopImagePreview(null);
            setCurrentStep(1);
        }, 2000);
    };

    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, 4));
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const shopCategories = [
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

    return (
        <div className="min-h-screen ">
            <div className="max-w-full mx-auto">
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mb-6">
                        <BuildingStorefrontIcon className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Become a Seller</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Join our marketplace and start selling your products to millions of customers. Fill out the application form below to get started.
                    </p>
                </div>

              
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        {[1, 2, 3, 4].map((step) => (
                            <div key={step} className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= step ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                    {currentStep > step ? <CheckCircleIcon className="w-6 h-6" /> : step}
                                </div>
                                <span className="text-sm font-medium">
                                    {step === 1 && 'Personal Info'}
                                    {step === 2 && 'Shop Details'}
                                    {step === 3 && 'Business Info'}
                                    {step === 4 && 'Review & Submit'}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                            className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(currentStep - 1) * 33.33}%` }}
                        ></div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8">
                    <form onSubmit={handleSubmit}>
                     
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <UserCircleIcon className="w-8 h-8 text-emerald-600" />
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
                                        <input
                                            type="text"
                                            name="sellerName"
                                            value={formData.sellerName}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                name="sellerEmail"
                                                value={formData.sellerEmail}
                                                onChange={handleChange}
                                                required
                                                className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <div className="relative">
                                            <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                name="sellerPhone"
                                                value={formData.sellerPhone}
                                                onChange={handleChange}
                                                required
                                                className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="+880 1XXX-XXXXXX"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!formData.sellerName || !formData.sellerEmail || !formData.sellerPhone}
                                        className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next: Shop Details
                                    </button>
                                </div>
                            </div>
                        )}

                     
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <BuildingStorefrontIcon className="w-8 h-8 text-emerald-600" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Shop Details</h3>
                                        <p className="text-gray-600">Tell us about your shop</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Shop Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="shopName"
                                            value={formData.shopName}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            placeholder="Enter your shop name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Shop Category *
                                        </label>
                                        <select
                                            name="shopCategory"
                                            value={formData.shopCategory}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        >
                                            <option value="">Select category</option>
                                            {shopCategories.map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Shop Description *
                                    </label>
                                    <textarea
                                        name="shopDescription"
                                        value={formData.shopDescription}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        placeholder="Describe your shop, products, and unique selling points..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Shop Logo/Image
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                                        {shopImagePreview ? (
                                            <div className="space-y-4">
                                                <div className="w-32 h-32 rounded-lg overflow-hidden mx-auto">
                                                    <img 
                                                        src={shopImagePreview} 
                                                        alt="Shop preview" 
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setShopImage(null);
                                                        setShopImagePreview(null);
                                                    }}
                                                    className="text-red-600 hover:text-red-700 font-medium"
                                                >
                                                    Remove Image
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                                                    <CameraIcon className="w-10 h-10 text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="text-gray-600 mb-2">Upload your shop logo or image</p>
                                                    <label className="inline-block">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                            className="hidden"
                                                        />
                                                        <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold py-2 px-6 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer">
                                                            Choose File
                                                        </span>
                                                    </label>
                                                </div>
                                                <p className="text-xs text-gray-500">Recommended: 500x500px, JPG, PNG, or GIF</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="border-2 border-gray-800 text-gray-800 font-semibold py-3 px-8 rounded-xl hover:bg-gray-800 hover:text-white transition-all duration-300"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!formData.shopName || !formData.shopCategory || !formData.shopDescription}
                                        className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next: Business Info
                                    </button>
                                </div>
                            </div>
                        )}

                     
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <ShieldCheckIcon className="w-8 h-8 text-emerald-600" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Business Information</h3>
                                        <p className="text-gray-600">Provide your business details</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Shop Address *
                                        </label>
                                        <div className="relative">
                                            <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="shopAddress"
                                                value={formData.shopAddress}
                                                onChange={handleChange}
                                                required
                                                className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="Street address"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                name="shopCity"
                                                value={formData.shopCity}
                                                onChange={handleChange}
                                                required
                                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="City"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                ZIP Code *
                                            </label>
                                            <input
                                                type="text"
                                                name="shopZipCode"
                                                value={formData.shopZipCode}
                                                onChange={handleChange}
                                                required
                                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="ZIP Code"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tax ID / Business Registration Number
                                        </label>
                                        <input
                                            type="text"
                                            name="taxId"
                                            value={formData.taxId}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            placeholder="Enter tax ID if available"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Bank Account Number
                                        </label>
                                        <div className="relative">
                                            <CreditCardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="bankAccount"
                                                value={formData.bankAccount}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="For payment settlements"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="border-2 border-gray-800 text-gray-800 font-semibold py-3 px-8 rounded-xl hover:bg-gray-800 hover:text-white transition-all duration-300"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!formData.shopAddress || !formData.shopCity || !formData.shopZipCode}
                                        className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next: Review & Submit
                                    </button>
                                </div>
                            </div>
                        )}

                     
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <DocumentTextIcon className="w-8 h-8 text-emerald-600" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Review & Submit</h3>
                                        <p className="text-gray-600">Review your information before submitting</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gray-50 rounded-xl p-6">
                                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                <UserCircleIcon className="w-5 h-5" />
                                                Personal Information
                                            </h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <p className="text-sm text-gray-500">Full Name</p>
                                                    <p className="font-medium">{formData.sellerName}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Email</p>
                                                    <p className="font-medium">{formData.sellerEmail}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Phone</p>
                                                    <p className="font-medium">{formData.sellerPhone}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-xl p-6">
                                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                <BuildingStorefrontIcon className="w-5 h-5" />
                                                Shop Details
                                            </h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <p className="text-sm text-gray-500">Shop Name</p>
                                                    <p className="font-medium">{formData.shopName}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Category</p>
                                                    <p className="font-medium">{formData.shopCategory}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Description</p>
                                                    <p className="font-medium line-clamp-2">{formData.shopDescription}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-xl p-6">
                                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                <MapPinIcon className="w-5 h-5" />
                                                Business Address
                                            </h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <p className="text-sm text-gray-500">Address</p>
                                                    <p className="font-medium">{formData.shopAddress}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">City</p>
                                                    <p className="font-medium">{formData.shopCity}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">ZIP Code</p>
                                                    <p className="font-medium">{formData.shopZipCode}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-xl p-6">
                                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                <CurrencyDollarIcon className="w-5 h-5" />
                                                Financial Details
                                            </h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <p className="text-sm text-gray-500">Tax ID</p>
                                                    <p className="font-medium">{formData.taxId || 'Not provided'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Bank Account</p>
                                                    <p className="font-medium">{formData.bankAccount || 'Not provided'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {shopImagePreview && (
                                        <div className="bg-gray-50 rounded-xl p-6">
                                            <h4 className="font-bold text-gray-900 mb-4">Shop Logo</h4>
                                            <div className="w-32 h-32 rounded-lg overflow-hidden">
                                                <img 
                                                    src={shopImagePreview} 
                                                    alt="Shop logo" 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            name="termsAccepted"
                                            id="termsAccepted"
                                            checked={formData.termsAccepted}
                                            onChange={handleChange}
                                            required
                                            className="mt-1"
                                        />
                                        <label htmlFor="termsAccepted" className="text-sm text-gray-700">
                                            I agree to the Seller Terms & Conditions, Privacy Policy, and agree to maintain accurate product information, provide excellent customer service, and comply with all marketplace policies. I understand that my application will be reviewed and approval is subject to verification.
                                        </label>
                                    </div>

                                    <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-6">
                                        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                            <ShieldCheckIcon className="w-5 h-5" />
                                            What happens next?
                                        </h4>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            <li>✓ Your application will be reviewed within 24-48 hours</li>
                                            <li>✓ You'll receive an email notification about the status</li>
                                            <li>✓ Once approved, you can start listing your products</li>
                                            <li>✓ Our team will guide you through the onboarding process</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="border-2 border-gray-800 text-gray-800 font-semibold py-3 px-8 rounded-xl hover:bg-gray-800 hover:text-white transition-all duration-300"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!formData.termsAccepted || loading}
                                        className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Submitting...
                                            </>
                                        ) : (
                                            'Submit Application'
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>

          
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                            <CurrencyDollarIcon className="w-6 h-6 text-emerald-600" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">Earn More</h4>
                        <p className="text-sm text-gray-600">Reach millions of customers and grow your business with our marketplace.</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                            <ShieldCheckIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">Secure Payments</h4>
                        <p className="text-sm text-gray-600">Get paid securely and on time with our trusted payment system.</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                            <BuildingStorefrontIcon className="w-6 h-6 text-purple-600" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">Seller Support</h4>
                        <p className="text-sm text-gray-600">Get 24/7 support and tools to manage your business effectively.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BecomeSeller;