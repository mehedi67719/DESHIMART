import React, { useState } from 'react';
import { FaShoppingCart, FaTrash, FaPlus, FaMinus, FaTag, FaTruck, FaLock, FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';


const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Premium Leather Jacket",
            description: "Genuine leather jacket with premium finish",
            price: 299.99,
            originalPrice: 399.99,
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            quantity: 1,
            size: "M",
            color: "Black",
            inStock: true
        },
        {
            id: 2,
            name: "Wireless Bluetooth Headphones",
            description: "Noise cancelling with 30hr battery",
            price: 149.99,
            originalPrice: 199.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            quantity: 2,
            size: "One Size",
            color: "White",
            inStock: true
        },
        {
            id: 3,
            name: "Smart Watch Series 5",
            description: "Fitness tracker with heart rate monitor",
            price: 249.99,
            originalPrice: 299.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            quantity: 1,
            size: "42mm",
            color: "Space Gray",
            inStock: true
        }
    ]);

    const shippingFee = 9.99;
    const taxRate = 0.08;

    const updateQuantity = (id, change) => {
        setCartItems(items => items.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * taxRate;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + shippingFee + calculateTax();
    };

    const calculateSavings = () => {
        return cartItems.reduce((total, item) => total + ((item.originalPrice - item.price) * item.quantity), 0);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const continueShopping = () => {
        navigate('/products');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
          
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Shopping Cart</h1>
                    <p className="text-gray-600">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
         
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                      
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                            <FaShoppingCart className="text-green-600 text-xl" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">Cart Items</h2>
                                            <p className="text-gray-600 text-sm">Review and edit your items</p>
                                        </div>
                                    </div>
                                    <Link
                                        to='/shop'
                                        className="px-6 py-2 border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-xl font-medium transition duration-300"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>

                        
                            <div className="divide-y divide-gray-100">
                                {cartItems.length > 0 ? (
                                    cartItems.map((item) => (
                                        <div key={item.id} className="p-6 hover:bg-gray-50 transition duration-300">
                                            <div className="flex flex-col md:flex-row gap-6">
                                               
                                                <div className="md:w-1/4">
                                                    <div className="relative rounded-xl overflow-hidden">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                                                        />
                                                        {item.originalPrice > item.price && (
                                                            <div className="absolute top-3 left-3">
                                                                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                                                    SAVE {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                           
                                                <div className="md:w-3/4">
                                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                                        <div className="flex-1">
                                                            <h3 className="text-lg font-bold text-gray-800 mb-2">{item.name}</h3>
                                                            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                                                            
                                                            <div className="flex flex-wrap gap-4 mb-4">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-gray-500 text-sm">Size:</span>
                                                                    <span className="font-medium">{item.size}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-gray-500 text-sm">Color:</span>
                                                                    <span className="font-medium">{item.color}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-gray-500 text-sm">Status:</span>
                                                                    <span className={`font-medium ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                                                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                           
                                                            <div className="flex items-center gap-4">
                                                                <div className="flex items-center border border-gray-300 rounded-xl">
                                                                    <button
                                                                        onClick={() => updateQuantity(item.id, -1)}
                                                                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-l-xl"
                                                                    >
                                                                        <FaMinus className="text-gray-600" />
                                                                    </button>
                                                                    <span className="w-12 text-center font-bold">{item.quantity}</span>
                                                                    <button
                                                                        onClick={() => updateQuantity(item.id, 1)}
                                                                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-r-xl"
                                                                    >
                                                                        <FaPlus className="text-gray-600" />
                                                                    </button>
                                                                </div>

                                                                <button
                                                                    onClick={() => removeItem(item.id)}
                                                                    className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
                                                                >
                                                                    <FaTrash />
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>

                                                     
                                                        <div className="text-right">
                                                            <div className="mb-2">
                                                                <span className="text-2xl font-bold text-gray-800">
                                                                    ${(item.price * item.quantity).toFixed(2)}
                                                                </span>
                                                                {item.originalPrice > item.price && (
                                                                    <div className="text-sm text-gray-500 line-through">
                                                                        ${(item.originalPrice * item.quantity).toFixed(2)}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="text-gray-600 text-sm">
                                                                ${item.price.toFixed(2)} each
                                                            </div>
                                                            {item.originalPrice > item.price && (
                                                                <div className="text-green-600 text-sm font-medium mt-1">
                                                                    Save ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-12 text-center">
                                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                            <FaShoppingCart className="text-gray-400 text-3xl" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h3>
                                        <p className="text-gray-600 mb-6">Add some products to your cart to see them here</p>
                                        <button
                                            onClick={continueShopping}
                                            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition duration-300"
                                        >
                                            Start Shopping
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                     
                        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FaTag className="text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">Have a promo code?</h3>
                            </div>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Enter promo code"
                                    className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
                                />
                                <button className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-xl transition duration-300">
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>

                    
                    <div className="lg:w-1/3">
                        <div className="sticky top-6">
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="p-6 border-b border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Order Summary</h3>
                                    <p className="text-gray-600 text-sm">Review your order details</p>
                                </div>

                                <div className="p-6">
                              
                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                                            <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Shipping</span>
                                            <span className="font-medium">${shippingFee.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tax</span>
                                            <span className="font-medium">${calculateTax().toFixed(2)}</span>
                                        </div>
                                        
                                        {calculateSavings() > 0 && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Total Savings</span>
                                                <span className="font-bold">-${calculateSavings().toFixed(2)}</span>
                                            </div>
                                        )}
                                        
                                        <div className="border-t border-gray-200 pt-4">
                                            <div className="flex justify-between text-lg font-bold">
                                                <span>Total</span>
                                                <span className="text-2xl text-green-600">${calculateTotal().toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>

                               
                                    <div className="bg-green-50 rounded-xl p-4 mb-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <FaLock className="text-green-600" />
                                            <span className="font-medium text-green-800">Secure Checkout</span>
                                        </div>
                                        <p className="text-green-700 text-sm">
                                            Your payment information is encrypted and secure.
                                        </p>
                                    </div>

                                    <div className="bg-blue-50 rounded-xl p-4 mb-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <FaTruck className="text-blue-600" />
                                            <span className="font-medium text-blue-800">Free Shipping Over $100</span>
                                        </div>
                                        <p className="text-blue-700 text-sm">
                                            Add ${(100 - calculateSubtotal()).toFixed(2)} more to get free shipping!
                                        </p>
                                    </div>

                                 
                                    <button
                                        onClick={handleCheckout}
                                        disabled={cartItems.length === 0}
                                        className={`w-full py-4 rounded-xl font-bold text-lg transition duration-300 flex items-center justify-center gap-3 ${
                                            cartItems.length === 0
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl'
                                        }`}
                                    >
                                        Proceed to Checkout
                                        <FaArrowRight />
                                    </button>

                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <p className="text-gray-600 text-sm text-center mb-4">We Accept</p>
                                        <div className="flex justify-center gap-4">
                                            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                                                <span className="text-xs font-bold text-gray-700">VISA</span>
                                            </div>
                                            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                                                <span className="text-xs font-bold text-gray-700">MC</span>
                                            </div>
                                            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                                                <span className="text-xs font-bold text-gray-700">PP</span>
                                            </div>
                                            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                                                <span className="text-xs font-bold text-gray-700">AE</span>
                                            </div>
                                        </div>
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

export default Cart;