import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaLock, FaArrowRight } from 'react-icons/fa';
import Useauth from '../../Component/Useauth';
import { cartdata, paymemtinit, removecart } from '../../Component/Api';
import AddtocartCard from '../../Component/AddtocartCard';
import { Link, useNavigate } from 'react-router';

const Cart = () => {
    const navigate = useNavigate();
    const { user } = Useauth();
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



    const removeItem = async (id) => {
        try {

            await removecart(id)

            setCartItems(prevItems => prevItems.filter(item => item._id !== id));
        } catch (error) {
            alert("Failed to remove item", error);
        }
    };

    console.log(cartItems)



    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateTotal = () => {
        return calculateSubtotal();
    };

    const handleCheckout =async () => {
        const payload = {
            userEmail: user.email,
            items: cartItems.map((i) => ({
                id: i._id,
                name: i.ProductName,
                Productimg:i.Productimg,
                price: i.price,
                quantity: i.quantity,
            })),
            totalAmount: calculateTotal(),
            Name:user.displayName
        };

        try{
           const data=await paymemtinit(payload)
           window.location.href = data.url;
        }
        catch(err){
            console.log(err)
        }


    };

    const continueShopping = () => {
        navigate('/products');
    };

    useEffect(() => {
        loadCartData();
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your cart...</p>
                </div>
            </div>
        );
    }

   
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
                                            <p className="text-gray-600 text-sm">Review your items</p>
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
                                        <AddtocartCard
                                            key={item._id}
                                            item={item}
                                            removeItem={removeItem}
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;