import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { addtocart, chatlistpost, getSimilarProducts, singleproducts } from "../../Component/Api";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaTruck,
  FaUndo,
  FaMoneyBillWave,
  FaShoppingCart,
  FaCheckCircle,
  FaShieldAlt,
  FaEnvelope,
  FaHeart,
  FaShareAlt,
  FaFire,
  FaBolt,
  FaBoxOpen,
  FaClock,
  FaWeight,
  FaThermometerHalf,
  FaLeaf,
  FaRecycle,
} from "react-icons/fa";
import { MdLocalShipping, MdSecurity } from "react-icons/md";
import { LuMessageCircleMore } from "react-icons/lu";
import Useauth from "../../Component/Useauth";
import ShopCard from "../../Component/ShopCard";
import Swal from "sweetalert2";

const ViewProductsDetels = () => {
  const { user } = Useauth();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  const { data, isLoading } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: () => singleproducts(id),
    enabled: !!id,
  });

  const product = data?.[0];
 

  const { data: similarproducts, isLoading: similarproductsloading } = useQuery({
    queryKey: ["similar-Product", product?.category],
    queryFn: () => getSimilarProducts(product?.category),
    enabled: !!product?.category,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-green-500 rounded-full animate-pulse opacity-20"></div>
            </div>
          </div>
          <p className="mt-6 text-lg font-medium text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-8xl mb-6 animate-bounce">😞</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Product Not Found</h2>
          <p className="text-gray-500 mb-8">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-xl transition-all"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} className="text-yellow-400" />);
      else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      else stars.push(<FaRegStar key={i} className="text-gray-300" />);
    }
    return stars;
  };

  const calculateDiscount = () => {
    return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  };

  const handleContactSeller = async () => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login first to contact the seller',
        confirmButtonColor: '#3085d6',
        timer: 1500,
        showConfirmButton: false
      });
      return;
    }

    setIsCreatingChat(true);

    try {
      const chatListData = {
        productId: product._id,
        productName: product.name,
        productImage: product.image,
        sellerEmail: product.sellerEmail || product.email,
        buyerEmail: user.email,
        sellerName: product.shopName || product.brand || "Seller",
        buyerName: user.displayName || user.email?.split('@')[0] || "Buyer",
        participants: [user.email, product.sellerEmail || product.email],
        chat: [],
        lastMessage: "",
        lastMessageTime: new Date().toISOString(),
        status: "active",
        unreadCount: 0
      };

      const result = await chatlistpost(chatListData);

      navigate('/messenger', {
        state: {
          contactSeller: {
            id: product.sellerId || product._id,
            name: product.shopName || product.brand,
            email: product.sellerEmail || product.email,
            avatar: product.sellerAvatar || null,
            productName: product.name,
            productId: product._id,
            productImage: product.image,
            chat: [],
            chatData: result.data || chatListData
          }
        }
      });

    } catch (error) {
      console.error("Error creating chat:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create chat. Please try again.',
        confirmButtonColor: '#d33',
        timer: 1500,
        showConfirmButton: false
      });
    } finally {
      setIsCreatingChat(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on DeshiMart`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      Swal.fire({
        icon: 'success',
        title: 'Copied!',
        text: 'Link copied to clipboard',
        showConfirmButton: false,
        timer: 1000
      });
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login first to add items to cart',
        confirmButtonColor: '#3085d6',
        timer: 1500,
        showConfirmButton: false
      });
      return;
    }

    const cartdata = {
      userEmail: user.email,
      productId: product._id,
      ProductName: product.name,
      quantity: quantity,
      Productimg: product.image,
      price: product.price * quantity,
      sellerEmail: product.sellerEmail,
      unit: product.unit
    }

    try {
      const result = await addtocart(cartdata);
      
      queryClient.invalidateQueries(["cart-count", user?.email]);
      queryClient.invalidateQueries(["cart", user?.email]);
      queryClient.invalidateQueries(["cart-items", user?.email]);
      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Product added to cart',
        showConfirmButton: false,
        timer: 800
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || "Failed to add to cart",
        confirmButtonColor: '#d33',
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  const productImages = [product.image, ...(product.additionalImages || [])];

  const filteredSimilarProducts = similarproducts?.filter(p => p._id !== product._id) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 py-8">

        <nav className="flex flex-wrap items-center text-sm text-gray-500 mb-8 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <a href="/" className="hover:text-green-600 transition-colors">Shop</a>
          <span className="mx-2">/</span>
          <a href="/products" className="hover:text-green-600 transition-colors">Products</a>
          <span className="mx-2">/</span>
          <a href={`/category/${product.category}`} className="hover:text-green-600 transition-colors">{product.category}</a>
          <span className="mx-2">/</span>
          <span className="text-gray-700 font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            <div className="relative p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white border-r border-gray-100">
              <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
                {product.isNew && (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                    <FaBolt /> NEW
                  </div>
                )}
                {calculateDiscount() >= 15 && (
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                    <FaFire /> {calculateDiscount()}% OFF
                  </div>
                )}
                {product.stock < 10 && (
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                    <FaClock /> ONLY {product.stock} LEFT
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-20 group"
              >
                <FaHeart className={`text-xl transition-all ${isFavorite ? 'text-red-500 scale-110' : 'text-gray-400 group-hover:text-red-400'}`} />
              </button>

              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden border-4 border-white shadow-2xl mb-4 bg-white flex items-center justify-center">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
              </div>

              {productImages.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all bg-white p-1 ${selectedImage === index ? 'border-green-500 shadow-lg scale-105' : 'border-gray-200 hover:border-green-300'}`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} ${index + 1}`} 
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 md:p-8 lg:p-10 bg-white">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-4 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                <span className="px-4 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-medium">
                  {product.brand}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">{renderStars(product.rating)}</div>
                  <span className="text-lg font-bold text-gray-900">{product.rating}</span>
                </div>
                <span className="text-gray-300">•</span>
                <span className="text-gray-600">{product.reviews || 0} reviews</span>
                <span className="text-gray-300">•</span>
                <span className="text-green-600 font-medium flex items-center gap-1">
                  <FaFire className="text-orange-500" /> {product.sold || 0} sold
                </span>
              </div>

              <div className="mb-8 p-6 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 rounded-2xl border border-green-100">
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <div className="text-4xl md:text-5xl font-bold text-green-700 flex items-start">
                      ৳{product.price.toLocaleString()}
                      <span className="text-lg text-gray-500 ml-2 font-normal">/{product.unit}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xl line-through text-gray-400">
                        ৳{product.oldPrice.toLocaleString()}
                      </span>
                      <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-bold text-sm">
                        {calculateDiscount()}% OFF
                      </span>
                    </div>
                  </div>
                  <div className="hidden lg:block h-12 w-px bg-gray-300"></div>
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FaWeight className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Unit</p>
                        <p className="font-medium text-gray-900">{product.unit}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FaBoxOpen className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Stock</p>
                        <p className={`font-medium ${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                          {product.stock} units
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-3">Quantity</label>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-5 py-3 bg-gray-50 hover:bg-gray-100 text-xl font-bold transition-colors"
                    >
                      -
                    </button>
                    <span className="px-8 py-3 text-xl font-bold text-gray-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-5 py-3 bg-gray-50 hover:bg-gray-100 text-xl font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-gray-600">
                    Total: <span className="text-2xl font-bold text-green-700">৳{(product.price * quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <FaShoppingCart className="text-xl" />
                  Add to Cart
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <MdLocalShipping className="text-2xl text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Free Shipping</p>
                    <p className="text-xs text-gray-500">On orders ৳1000+</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <MdSecurity className="text-2xl text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Secure Payment</p>
                    <p className="text-xs text-gray-500">100% secure</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <FaUndo className="text-2xl text-purple-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Easy Returns</p>
                    <p className="text-xs text-gray-500">30-day policy</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 rounded-2xl border border-blue-200">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {(product.shopName || product.brand || 'S').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Sold by</p>
                      <p className="font-bold text-gray-900 text-lg">{product.shopName || product.brand}</p>
                      <p className="text-gray-600 text-sm flex items-center gap-1">
                        <FaEnvelope className="text-xs" /> {product.sellerEmail}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleContactSeller}
                    disabled={isCreatingChat}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold flex items-center gap-3 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    {isCreatingChat ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <LuMessageCircleMore className="text-xl" />
                        Message Seller
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                {["description", "specifications"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-4 font-medium text-lg capitalize whitespace-nowrap transition-all ${activeTab === tab
                      ? 'text-green-600 border-b-2 border-green-600 bg-green-50/50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8">
              {activeTab === "description" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-xl">
                      <FaLeaf className="text-green-600" />
                    </div>
                    Product Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-900 text-xl flex items-center gap-2">
                        <FaCheckCircle className="text-green-600" />
                        Key Features
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="p-1.5 bg-green-100 rounded-lg mt-1">
                            <FaCheckCircle className="text-green-600 text-sm" />
                          </div>
                          <span className="text-gray-700">Premium quality ingredients</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="p-1.5 bg-green-100 rounded-lg mt-1">
                            <FaCheckCircle className="text-green-600 text-sm" />
                          </div>
                          <span className="text-gray-700">Authentic traditional taste</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="p-1.5 bg-green-100 rounded-lg mt-1">
                            <FaCheckCircle className="text-green-600 text-sm" />
                          </div>
                          <span className="text-gray-700">No artificial preservatives</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-900 text-xl flex items-center gap-2">
                        <FaShieldAlt className="text-blue-600" />
                        Quality Assurance
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="p-1.5 bg-blue-100 rounded-lg mt-1">
                            <FaShieldAlt className="text-blue-600 text-sm" />
                          </div>
                          <span className="text-gray-700">Rigorous quality checks</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="p-1.5 bg-blue-100 rounded-lg mt-1">
                            <FaShieldAlt className="text-blue-600 text-sm" />
                          </div>
                          <span className="text-gray-700">Food safety certified</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="p-1.5 bg-blue-100 rounded-lg mt-1">
                            <FaShieldAlt className="text-blue-600 text-sm" />
                          </div>
                          <span className="text-gray-700">Freshness guarantee</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Specifications</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-600">Product Name</span>
                        <span className="font-medium text-gray-900">{product.name}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-600">Category</span>
                        <span className="font-medium text-gray-900">{product.category}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-600">Brand</span>
                        <span className="font-medium text-gray-900">{product.brand}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-600">Unit Size</span>
                        <span className="font-medium text-gray-900">{product.unit}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-600">Price</span>
                        <span className="font-medium text-green-600">৳{product.price}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-600">Availability</span>
                        <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-600">Stock Quantity</span>
                        <span className="font-medium text-gray-900">{product.stock} units</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-600">Product Code</span>
                        <span className="font-medium text-gray-900">PROD-{id?.slice(-8).toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          
          {similarproductsloading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading similar products...</p>
              </div>
            </div>
          ) : filteredSimilarProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredSimilarProducts.slice(0, 4).map((product) => (
                <ShopCard key={product._id} item={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <p className="text-gray-500">No similar products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProductsDetels;