import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaLock, FaArrowRight } from 'react-icons/fa';
import Useauth from '../../Component/Useauth';
import { cartdata, paymemtinit, removecart } from '../../Component/Api';
import AddtocartCard from '../../Component/AddtocartCard';
import { Link, useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const Cart = () => {
    const navigate = useNavigate();
    const { user } = Useauth();
    const queryClient = useQueryClient();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadCartData = async () => {
        if (!user?.email) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const data = await cartdata(user.email);

            if (data && Array.isArray(data)) {
                setCartItems(data);
            } else {
                setCartItems([]);
            }
        } catch (error) {
            console.log("Failed to load cart", error);
            setCartItems([]);
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (id, productName) => {
        try {
            const result = await Swal.fire({
                title: 'Remove Item?',
                text: `Are you sure you want to remove "${productName}" from your cart?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, remove it!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                await removecart(id);
                setCartItems(prevItems => prevItems.filter(item => item._id !== id));
                queryClient.invalidateQueries(["cart-count", user?.email]);
                
                Swal.fire({
                    icon: 'success',
                    title: 'Removed!',
                    text: 'Item has been removed from your cart',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.log("Failed to remove item", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to remove item from cart',
                confirmButtonColor: '#d33',
                timer: 1500,
                showConfirmButton: false
            });
        }
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateTotal = () => {
        return calculateSubtotal();
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Empty Cart',
                text: 'Your cart is empty. Add some items before checkout.',
                confirmButtonColor: '#3085d6',
                timer: 1500,
                showConfirmButton: false
            });
            return;
        }

        const payload = {
            userEmail: user.email,
            items: cartItems.map((i) => ({
                id: i._id,
                name: i.ProductName,
                Productimg: i.Productimg,
                price: i.price,
                quantity: i.quantity,
                sellerEmail: i.sellerEmail
            })),
            totalAmount: calculateTotal(),
            Name: user.displayName
        };

        try {
            const data = await paymemtinit(payload);
            window.location.href = data.url;
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Checkout Failed',
                text: 'Something went wrong. Please try again.',
                confirmButtonColor: '#d33',
                timer: 1500,
                showConfirmButton: false
            });
        }
    };

    const continueShopping = () => {
        navigate('/products');
    };

    const clearCart = async () => {
        if (cartItems.length === 0) return;

        try {
            const result = await Swal.fire({
                title: 'Clear Cart?',
                text: `Are you sure you want to remove all ${cartItems.length} items from your cart?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, clear all!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                for (const item of cartItems) {
                    await removecart(item._id);
                }
                setCartItems([]);
                queryClient.invalidateQueries(["cart-count", user?.email]);
                
                Swal.fire({
                    icon: 'success',
                    title: 'Cart Cleared!',
                    text: 'All items have been removed from your cart',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.log("Failed to clear cart", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to clear cart',
                confirmButtonColor: '#d33',
                timer: 1500,
                showConfirmButton: false
            });
        }
    };

    useEffect(() => {
        loadCartData();
    }, [user]);

    // Cart Items Skeleton
    const CartItemsSkeleton = () => (
        <div className="divide-y divide-gray-100">
            {[1, 2, 3].map((item) => (
                <div key={item} className="p-6">
                    <div className="flex gap-6">
                        <div className="w-24 h-24 bg-gray-200 rounded-xl animate-pulse"></div>
                        <div className="flex-1">
                            <div className="flex justify-between mb-2">
                                <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
                                <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
                            </div>
                            <div className="h-4 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
                                    <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
                                </div>
                                <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );


    const OrderSummarySkeleton = () => (
        <div className="sticky top-6">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <div className="h-7 bg-gray-200 rounded w-40 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
                <div className="p-6">
                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between">
                            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                        </div>
                        <div className="border-t border-gray-200 pt-4">
                            <div className="flex justify-between">
                                <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
                                <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                        </div>
                        <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
                    </div>
                    <div className="h-14 bg-gray-200 rounded-xl w-full animate-pulse mb-6"></div>
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-4 animate-pulse"></div>
                        <div className="flex justify-center gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-12 h-8 bg-gray-200 rounded animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    {loading ? (
                        <>
                            <div className="h-10 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
                            <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
                        </>
                    ) : (
                        <>
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Shopping Cart</h1>
                            <p className="text-gray-600">
                                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                            </p>
                        </>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="p-6 border-b border-gray-200">
                                {loading ? (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                                            <div>
                                                <div className="h-5 bg-gray-200 rounded w-32 mb-1 animate-pulse"></div>
                                                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                            </div>
                                        </div>
                                        <div className="w-40 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                                <FaShoppingCart className="text-green-600 text-xl" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold text-gray-800">Cart Items</h2>
                                                <p className="text-gray-600 text-sm">Review your items</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            {cartItems.length > 0 && (
                                                <button
                                                    onClick={clearCart}
                                                    className="px-6 py-2 border-2 border-red-600 text-red-600 hover:bg-red-50 rounded-xl font-medium transition duration-300"
                                                >
                                                    Clear Cart
                                                </button>
                                            )}
                                            <Link
                                                to='/shop'
                                                className="px-6 py-2 border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-xl font-medium transition duration-300"
                                            >
                                                Continue Shopping
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {loading ? (
                                <CartItemsSkeleton />
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {cartItems.length > 0 ? (
                                        cartItems.map((item) => (
                                            <AddtocartCard
                                                key={item._id}
                                                item={item}
                                                removeItem={() => removeItem(item._id, item.ProductName)}
                                            />
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
                            )}
                        </div>
                    </div>

                    <div className="lg:w-1/3">
                        {loading ? <OrderSummarySkeleton /> : (
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

                                            <div className="border-t border-gray-200 pt-4">
                                                <div className="flex justify-between text-lg font-bold">
                                                    <span>Total Amount</span>
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

                                        <button
                                            onClick={handleCheckout}
                                            disabled={cartItems.length === 0}
                                            className={`w-full py-4 rounded-xl font-bold text-lg transition duration-300 flex items-center justify-center gap-3 ${cartItems.length === 0
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;