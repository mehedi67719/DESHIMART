import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
//   UploadIcon, 
  TagIcon, 
  CurrencyDollarIcon, 
  StarIcon, 
  CubeIcon, 
  TruckIcon, 
  PhotoIcon,
  PlusCircleIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const UploadProduct = () => {
    const { 
        register, 
        handleSubmit, 
        watch, 
        setValue,
        formState: { errors, isValid, isSubmitting } 
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: '',
            category: 'Dairy',
            brand: '',
            price: '',
            oldPrice: '',
            discount: '',
            rating: '',
            reviews: '',
            stock: '',
            sold: '',
            unit: '6 pieces',
            sellerEmail: '',
            shopName: '',
            description: '',
            image: '',
            isNew: false
        }
    });

    const [imagePreview, setImagePreview] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [formData, setFormData] = useState(null);

    const categories = [
        'Dairy', 'Fruits', 'Vegetables', 'Meat', 'Fish', 'Bakery',
        'Beverages', 'Snacks', 'Spices', 'Cereals', 'Frozen Foods', 'Organic'
    ];

    const units = ['6 pieces', 'Dozen', '500g', '1kg', 'Liter', 'Pack', 'Bundle'];

    const watchPrice = watch('price');
    const watchOldPrice = watch('oldPrice');
    const watchDiscount = watch('discount');

    const handleDiscountCalculation = (price, oldPrice) => {
        if (price && oldPrice) {
            const calculatedDiscount = Math.round(((oldPrice - price) / oldPrice) * 100);
            setValue('discount', calculatedDiscount.toString());
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setValue('image', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUrlInput = (e) => {
        const url = e.target.value;
        setValue('image', url);
        setImagePreview(url);
    };

    const onSubmit = (data) => {
        const processedData = {
            ...data,
            price: Number(data.price),
            oldPrice: data.oldPrice ? Number(data.oldPrice) : null,
            discount: data.discount ? Number(data.discount) : 0,
            rating: data.rating ? parseFloat(data.rating) : 0,
            reviews: data.reviews ? Number(data.reviews) : 0,
            stock: Number(data.stock),
            sold: data.sold ? Number(data.sold) : 0,
            isNew: Boolean(data.isNew)
        };

        console.log('Submitted Product Data:', processedData);
        
        setFormData(processedData);
        setSubmitSuccess(true);
        
        setTimeout(() => {
            setSubmitSuccess(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
                            <UploadIcon className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload New Product</h1>
                        <p className="text-gray-600">Fill in the details to add a new product to your store</p>
                    </div>

                    {submitSuccess && (
                        <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-4 rounded-r-lg animate-slideIn">
                            <div className="flex items-center">
                                <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3" />
                                <div>
                                    <p className="text-green-800 font-medium">Product uploaded successfully!</p>
                                    <p className="text-green-600 text-sm mt-1">Check console for submitted data</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <TagIcon className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">Basic Information</h3>
                                            <p className="text-gray-600">Product details</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Product Name *
                                            </label>
                                            <input
                                                type="text"
                                                {...register("name", {
                                                    required: "Product name is required",
                                                    minLength: {
                                                        value: 3,
                                                        message: "Name must be at least 3 characters"
                                                    }
                                                })}
                                                className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                                placeholder="e.g., Duck Eggs"
                                            />
                                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Category *
                                            </label>
                                            <select
                                                {...register("category", {
                                                    required: "Category is required"
                                                })}
                                                className={`w-full border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                            >
                                                {categories.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Brand Name
                                            </label>
                                            <input
                                                type="text"
                                                {...register("brand")}
                                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="e.g., HappyHen"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Unit *
                                            </label>
                                            <select
                                                {...register("unit", {
                                                    required: "Unit is required"
                                                })}
                                                className={`w-full border ${errors.unit ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                            >
                                                {units.map(unit => (
                                                    <option key={unit} value={unit}>{unit}</option>
                                                ))}
                                            </select>
                                            {errors.unit && <p className="mt-1 text-sm text-red-600">{errors.unit.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Description *
                                            </label>
                                            <textarea
                                                {...register("description", {
                                                    required: "Description is required",
                                                    minLength: {
                                                        value: 20,
                                                        message: "Description must be at least 20 characters"
                                                    },
                                                    maxLength: {
                                                        value: 1000,
                                                        message: "Description must be less than 1000 characters"
                                                    }
                                                })}
                                                rows="4"
                                                className={`w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none`}
                                                placeholder="Describe your product..."
                                            />
                                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                                            <p className="text-xs text-gray-500 mt-2">
                                                {watch('description')?.length || 0}/1000 characters
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">Pricing & Inventory</h3>
                                            <p className="text-gray-600">Set prices and stock details</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Current Price *
                                            </label>
                                            <div className="relative">
                                                <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="number"
                                                    {...register("price", {
                                                        required: "Price is required",
                                                        min: {
                                                            value: 1,
                                                            message: "Price must be at least 1"
                                                        }
                                                    })}
                                                    onChange={(e) => {
                                                        handleDiscountCalculation(e.target.value, watchOldPrice);
                                                    }}
                                                    className={`w-full border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                                    placeholder="250"
                                                />
                                            </div>
                                            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Old Price
                                            </label>
                                            <div className="relative">
                                                <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="number"
                                                    {...register("oldPrice")}
                                                    onChange={(e) => {
                                                        handleDiscountCalculation(watchPrice, e.target.value);
                                                    }}
                                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                    placeholder="280"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Discount %
                                            </label>
                                            <input
                                                type="number"
                                                {...register("discount")}
                                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="11"
                                                readOnly
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Auto-calculated</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Stock Quantity *
                                            </label>
                                            <div className="relative">
                                                <CubeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="number"
                                                    {...register("stock", {
                                                        required: "Stock quantity is required",
                                                        min: {
                                                            value: 0,
                                                            message: "Stock cannot be negative"
                                                        }
                                                    })}
                                                    className={`w-full border ${errors.stock ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                                    placeholder="60"
                                                />
                                            </div>
                                            {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Units Sold
                                            </label>
                                            <input
                                                type="number"
                                                {...register("sold")}
                                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="3200"
                                            />
                                        </div>

                                        <div className="flex items-end">
                                            <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-xl">
                                                <div className="text-sm">
                                                    <p className="font-medium text-gray-700">Price Summary</p>
                                                    <p className="text-gray-600">
                                                        Current: ৳{watchPrice || 0} 
                                                        {watchOldPrice && ` | Old: ৳${watchOldPrice}`}
                                                        {watchDiscount && watchDiscount > 0 && ` | Save: ${watchDiscount}%`}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                            <PhotoIcon className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">Product Image</h3>
                                            <p className="text-gray-600">Upload product photo</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Image URL
                                            </label>
                                            <input
                                                type="url"
                                                {...register("image")}
                                                onChange={handleImageUrlInput}
                                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>

                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                                            {imagePreview ? (
                                                <div className="space-y-4">
                                                    <div className="w-full h-48 rounded-lg overflow-hidden">
                                                        <img
                                                            src={imagePreview}
                                                            alt="Product preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setImagePreview('');
                                                            setValue('image', '');
                                                        }}
                                                        className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium"
                                                    >
                                                        <XCircleIcon className="w-4 h-4" />
                                                        Remove Image
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto">
                                                        <PhotoIcon className="w-8 h-8 text-blue-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-600 mb-3">Upload product image</p>
                                                        <label className="cursor-pointer inline-block">
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={handleImageChange}
                                                                className="hidden"
                                                            />
                                                            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-2 px-6 rounded-xl hover:shadow-lg transition-all">
                                                                <UploadIcon className="w-5 h-5" />
                                                                Choose File
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-yellow-100 rounded-lg">
                                            <StarIcon className="w-6 h-6 text-yellow-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">Ratings & Reviews</h3>
                                            <p className="text-gray-600">Product ratings</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Rating (0-5)
                                            </label>
                                            <div className="relative">
                                                <StarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-400" />
                                                <input
                                                    type="number"
                                                    {...register("rating", {
                                                        min: {
                                                            value: 0,
                                                            message: "Rating cannot be negative"
                                                        },
                                                        max: {
                                                            value: 5,
                                                            message: "Rating cannot exceed 5"
                                                        }
                                                    })}
                                                    step="0.1"
                                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                    placeholder="4.6"
                                                />
                                            </div>
                                            {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Number of Reviews
                                            </label>
                                            <input
                                                type="number"
                                                {...register("reviews")}
                                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="156"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-red-100 rounded-lg">
                                            <TruckIcon className="w-6 h-6 text-red-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">Seller Info</h3>
                                            <p className="text-gray-600">Seller details</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Seller Email *
                                            </label>
                                            <input
                                                type="email"
                                                {...register("sellerEmail", {
                                                    required: "Seller email is required",
                                                    pattern: {
                                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                        message: "Invalid email address"
                                                    }
                                                })}
                                                className={`w-full border ${errors.sellerEmail ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                                placeholder="poultry.direct@deshimart.com"
                                            />
                                            {errors.sellerEmail && <p className="mt-1 text-sm text-red-600">{errors.sellerEmail.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Shop Name *
                                            </label>
                                            <input
                                                type="text"
                                                {...register("shopName", {
                                                    required: "Shop name is required"
                                                })}
                                                className={`w-full border ${errors.shopName ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                                placeholder="Farm Fresh Eggs"
                                            />
                                            {errors.shopName && <p className="mt-1 text-sm text-red-600">{errors.shopName.message}</p>}
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                                            <div className="flex items-center h-6">
                                                <input
                                                    type="checkbox"
                                                    {...register("isNew")}
                                                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                                />
                                            </div>
                                            <label className="text-sm font-medium text-gray-700">
                                                Mark as New Product
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-gray-200">
                            <div className="text-sm text-gray-600">
                                <p className="flex items-center gap-2">
                                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                    All required fields (*) must be filled
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const formValues = watch();
                                        console.log('Current Form Values:', formValues);
                                    }}
                                    className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                                >
                                    Preview Data
                                </button>
                                
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !isValid}
                                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <PlusCircleIcon className="w-5 h-5" />
                                            Upload Product
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>

                    {formData && (
                        <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                Last Submitted Data
                            </h3>
                            <div className="bg-white rounded-lg p-4 overflow-auto">
                                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                                    {JSON.stringify(formData, null, 2)}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UploadProduct;