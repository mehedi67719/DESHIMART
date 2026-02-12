import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    TagIcon,
    CurrencyDollarIcon,
    CubeIcon,
    PhotoIcon,
    PlusCircleIcon,
    CheckCircleIcon,
    XCircleIcon,
    BuildingStorefrontIcon
} from '@heroicons/react/24/outline';
import { FaUpload } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { categorys, postproducts } from '../../Component/Api';
import Useauth from '../../Component/Useauth';

const UploadProduct = () => {
    const { user } = Useauth(); 
    console.log("Current User:", user);
    
    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState(['6 pieces', 'Dozen', '500g', '1kg', 'Liter', 'Pack', 'Bundle', '500ml']);
    const [loading, setLoading] = useState(true);
    
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    
    const [showAddUnit, setShowAddUnit] = useState(false);
    const [newUnit, setNewUnit] = useState('');

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
            category: '',
            brand: '',
            oldPrice: '',
            discount: '',
            price: '', // Changed from newPrice to price
            stock: '',
            unit: units[0],
            description: '',
            image: '',
            isNew: true,
            // Seller Information
            sellerEmail: user?.email || '',
            shopName: user?.shopName || user?.displayName || 'My Shop',
            // Default values
            rating: 0,
            reviews: 0,
            sold: 0,
            status: "pending"
        }
    });

    useEffect(() => {
        if (user) {
            setValue('sellerEmail', user.email || '');
            setValue('shopName', user.shopName || user.displayName || 'My Shop');
        }
    }, [user, setValue]);

    const [imagePreview, setImagePreview] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [formData, setFormData] = useState(null);

    const selectedCategory = watch('category');
    const selectedUnit = watch('unit');

    useEffect(() => {
        if (selectedCategory === 'other') {
            setShowAddCategory(true);
            setValue('category', ''); 
        }
    }, [selectedCategory, setValue]);

    useEffect(() => {
        if (selectedUnit === 'other') {
            setShowAddUnit(true);
            setValue('unit', units[0]); 
        }
    }, [selectedUnit, setValue, units]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await categorys();
                console.log("Categories data:", data);
                
                let categoryNames = [];
                if (data && data.length > 0) {
                    categoryNames = data.map(cat => {
                        if (typeof cat === 'string') return cat;
                        return cat.category || cat.name || cat;
                    });
                }
                setCategories(categoryNames);
                
                if (categoryNames.length > 0) {
                    setValue('category', categoryNames[0]);
                }
                setLoading(false);
            } catch (err) {
                console.log(err);
                const defaultCategories = ['Dairy', 'Fruits', 'Vegetables', 'Meat', 'Fish', 'Bakery', 'Sauces & Condiments'];
                setCategories(defaultCategories);
                setValue('category', 'Dairy');
                setLoading(false);
            }
        };

        fetchData();
    }, [setValue]);

    const handleAddCategory = async () => {
        if (!newCategory.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Category Name Required",
                text: "Please enter a category name",
                confirmButtonColor: "#f59e0b"
            });
            return;
        }

        if (categories.includes(newCategory)) {
            Swal.fire({
                icon: "warning",
                title: "Category Exists",
                text: "This category already exists!",
                confirmButtonColor: "#f59e0b"
            });
            return;
        }
        
        setCategories([...categories, newCategory]);
        setValue('category', newCategory);
        setShowAddCategory(false);
        setNewCategory('');
        
        Swal.fire({
            icon: "success",
            title: "Category Added!",
            text: "New category has been added successfully.",
            confirmButtonColor: "#16a34a",
            timer: 1500
        });
    };

    const handleAddUnit = async () => {
        if (!newUnit.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Unit Name Required",
                text: "Please enter a unit name",
                confirmButtonColor: "#f59e0b"
            });
            return;
        }

        if (units.includes(newUnit)) {
            Swal.fire({
                icon: "warning",
                title: "Unit Exists",
                text: "This unit already exists!",
                confirmButtonColor: "#f59e0b"
            });
            return;
        }

        setUnits([...units, newUnit]);
        setValue('unit', newUnit);
        setShowAddUnit(false);
        setNewUnit('');
        
        Swal.fire({
            icon: "success",
            title: "Unit Added!",
            text: "New unit has been added successfully.",
            confirmButtonColor: "#16a34a",
            timer: 1500
        });
    };

    const watchOldPrice = watch('oldPrice');
    const watchDiscount = watch('discount');

    // Calculate price based on old price and discount
    useEffect(() => {
        if (watchOldPrice && watchDiscount) {
            const oldPrice = Number(watchOldPrice);
            const discount = Number(watchDiscount);

            if (oldPrice > 0 && discount >= 0 && discount <= 100) {
                const calculatedPrice = oldPrice - (oldPrice * (discount / 100));
                setValue('price', calculatedPrice.toFixed(2));
            } else {
                setValue('price', '');
            }
        } else {
            setValue('price', '');
        }
    }, [watchOldPrice, watchDiscount, setValue]);

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

    const onSubmit = async (data) => {
        try {
            const oldPrice = Number(data.oldPrice);
            const discount = Number(data.discount);
            const price = Number(data.price);

           
            const processedData = {
                name: data.name,
                category: data.category,
                brand: data.brand || '',
                price: price || 0,
                oldPrice: oldPrice || 0,
                discount: discount || 0,
                rating: 0, 
                reviews: 0, 
                stock: Number(data.stock),
                sold: 0, 
                unit: data.unit,
                sellerEmail: user?.email || data.sellerEmail,
                shopName: user?.shopName || user?.displayName || data.shopName || 'My Shop',
                description: data.description,
                image: data.image || '',
                createdAt: new Date().toISOString()  ,
                isNew: true
            };

            console.log("Submitting Product Data:", processedData);
            
            const response = await postproducts(processedData);
            console.log("Product Upload Response:", response);

            Swal.fire({
                icon: "success",
                title: "Product Uploaded!",
                text: "Product has been added successfully.",
                confirmButtonColor: "#16a34a"
            });

            setFormData(processedData);
            setSubmitSuccess(true);

       
            setTimeout(() => {
                setValue('name', '');
                setValue('oldPrice', '');
                setValue('discount', '');
                setValue('price', '');
                setValue('stock', '');
                setValue('description', '');
                setValue('brand', '');
                setValue('image', '');
                setImagePreview('');
                setValue('isNew', true);
                if (categories.length > 0) {
                    setValue('category', categories[0]);
                }
                setValue('unit', units[0]);
                setSubmitSuccess(false);
            }, 3000);

        } catch (error) {
            console.error("Product Upload Error:", error);

            Swal.fire({
                icon: "error",
                title: "Upload Failed",
                text: error.response?.data?.message || "Something went wrong!",
                confirmButtonColor: "#dc2626"
            });
        }
    };

    const handlePreviewData = () => {
        const formValues = watch();

        const previewData = {
            name: formValues.name,
            category: formValues.category,
            brand: formValues.brand,
            price: formValues.price ? Number(formValues.price) : 0,
            oldPrice: formValues.oldPrice ? Number(formValues.oldPrice) : 0,
            discount: formValues.discount ? Number(formValues.discount) : 0,
            rating: 0,
            reviews: 0,
            stock: formValues.stock ? Number(formValues.stock) : 0,
            sold: 0,
            unit: formValues.unit,
            sellerEmail: user?.email || formValues.sellerEmail,
            shopName: user?.shopName || user?.displayName || formValues.shopName,
            description: formValues.description,
            image: formValues.image || '',
            isNew: Boolean(formValues.isNew)
        };
        console.log('Preview Data:', previewData);
        alert('Check console for preview data (F12)');
    };

    const showPrice = watch('price') && watch('price') !== '';

    return (
        <div className="min-h-screen w-full bg-gray-50">
            <div className="w-full">
                <div className="bg-white w-full rounded-2xl shadow-xl p-6 md:p-8">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
                            <FaUpload className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload New Product</h1>
                        <p className="text-gray-600">Fill in the details to add a new product to your store</p>
                    </div>

       
                    {user && (
                        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                            <div className="flex items-center gap-3">
                                <BuildingStorefrontIcon className="w-6 h-6 text-blue-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Selling as</p>
                                    <p className="font-semibold text-gray-900">
                                        {user?.shopName || user?.displayName || 'My Shop'}
                                    </p>
                                    <p className="text-xs text-gray-500">{user?.email}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {submitSuccess && (
                        <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-4 rounded-r-lg">
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
               
                        <input type="hidden" {...register("sellerEmail")} />
                        <input type="hidden" {...register("shopName")} />
                        <input type="hidden" {...register("rating")} value="0" />
                        <input type="hidden" {...register("reviews")} value="0" />
                        <input type="hidden" {...register("sold")} value="0" />
                        
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
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
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
                                                placeholder="e.g., Fish Sauce"
                                            />
                                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                                            <select
                                                {...register("category", { required: "Category is required" })}
                                                className={`w-full border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                            >
                                                <option value="">Select a category</option>
                                                {categories && categories.length > 0 ? (
                                                    categories.map((cat, index) => (
                                                        <option key={`cat-${index}-${cat}`} value={cat}>
                                                            {cat}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option value="" disabled>No categories found</option>
                                                )}
                                                <option value="other" className="text-green-600 font-semibold bg-green-50 border-t-2 border-gray-200">
                                                    + Add New Category
                                                </option>
                                            </select>
                                            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
                                            <input
                                                type="text"
                                                {...register("brand")}
                                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="e.g., AsianFlavors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Unit *</label>
                                            <select
                                                {...register("unit", { required: "Unit is required" })}
                                                className={`w-full border ${errors.unit ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                            >
                                                {units.map((unit, index) => (
                                                    <option key={`unit-${index}-${unit}`} value={unit}>{unit}</option>
                                                ))}
                                                <option value="other" className="text-green-600 font-semibold bg-green-50 border-t-2 border-gray-200">
                                                    + Add New Unit
                                                </option>
                                            </select>
                                            {errors.unit && <p className="mt-1 text-sm text-red-600">{errors.unit.message}</p>}
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
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

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Old Price *</label>
                                            <div className="relative">
                                                <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="number"
                                                    {...register("oldPrice", {
                                                        required: "Old price is required",
                                                        min: {
                                                            value: 1,
                                                            message: "Price must be at least 1"
                                                        }
                                                    })}
                                                    className={`w-full border ${errors.oldPrice ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                                    placeholder="300"
                                                />
                                            </div>
                                            {errors.oldPrice && <p className="mt-1 text-sm text-red-600">{errors.oldPrice.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Discount % *</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    {...register("discount", {
                                                        required: "Discount is required",
                                                        min: {
                                                            value: 0,
                                                            message: "Discount cannot be negative"
                                                        },
                                                        max: {
                                                            value: 100,
                                                            message: "Discount cannot exceed 100%"
                                                        }
                                                    })}
                                                    className={`w-full border ${errors.discount ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                                    placeholder="17"
                                                />
                                            </div>
                                            {errors.discount && <p className="mt-1 text-sm text-red-600">{errors.discount.message}</p>}
                                            <p className="text-xs text-gray-500 mt-1">Enter discount percentage (0-100)</p>
                                        </div>

                                        {showPrice && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Price (After Discount)</label>
                                                <div className="relative">
                                                    <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                    <input
                                                        type="number"
                                                        {...register("price")}
                                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-100"
                                                        placeholder="Auto-calculated"
                                                        readOnly
                                                    />
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">Auto-calculated from old price and discount</p>
                                            </div>
                                        )}

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
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
                                                    placeholder="95"
                                                />
                                            </div>
                                            {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>}
                                        </div>
                                    </div>

                                    {watchOldPrice && watchDiscount && watch('price') && (
                                        <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                                            <p className="text-sm font-medium text-gray-700">Price Summary</p>
                                            <p className="text-gray-600">
                                                Old Price: ৳{watchOldPrice || 0}
                                                {watchDiscount && ` | Discount: ${watchDiscount}%`}
                                                {showPrice && ` | New Price: ৳${watch('price')}`}
                                            </p>
                                            <p className="text-sm text-green-600 font-medium mt-1">
                                                You save: ৳{(Number(watchOldPrice) - Number(watch('price'))).toFixed(2)} ({watchDiscount}%)
                                            </p>
                                        </div>
                                    )}
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
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
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
                                                                <FaUpload className="w-5 h-5" />
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
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <CheckCircleIcon className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">Product Status</h3>
                                            <p className="text-gray-600">Set product availability</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                                            <div className="flex items-center h-6">
                                                <input
                                                    type="checkbox"
                                                    {...register("isNew")}
                                                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                                />
                                            </div>
                                            <label className="text-sm font-medium text-gray-700">Mark as New Product</label>
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
                                    onClick={handlePreviewData}
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

                  
                    {showAddCategory && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold text-gray-900">Add New Category</h3>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowAddCategory(false);
                                            setNewCategory('');
                                        }}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <XCircleIcon className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                                        <input
                                            type="text"
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="e.g., Sauces & Condiments"
                                            autoFocus
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            This category will be saved with your product
                                        </p>
                                    </div>
                                    <div className="flex gap-3 justify-end">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowAddCategory(false);
                                                setNewCategory('');
                                            }}
                                            className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleAddCategory}
                                            className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all"
                                        >
                                            Add Category
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Add Unit Modal */}
                    {showAddUnit && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold text-gray-900">Add New Unit</h3>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowAddUnit(false);
                                            setNewUnit('');
                                        }}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <XCircleIcon className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Unit Name</label>
                                        <input
                                            type="text"
                                            value={newUnit}
                                            onChange={(e) => setNewUnit(e.target.value)}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="e.g., 500ml"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="flex gap-3 justify-end">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowAddUnit(false);
                                                setNewUnit('');
                                            }}
                                            className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleAddUnit}
                                            className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all"
                                        >
                                            Add Unit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

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