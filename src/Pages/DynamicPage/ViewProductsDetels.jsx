import React, { use, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { addtocart, singleproducts } from "../../Component/Api";
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
  FaLeaf as FaLeafIcon,
  FaRecycle,
} from "react-icons/fa";
import { MdLocalShipping, MdPayment, MdSecurity } from "react-icons/md";
import { LuMessageCircleMore } from "react-icons/lu";
import Useauth from "../../Component/Useauth";

const ViewProductsDetels = () => {
  const { user } = Useauth()
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: () => singleproducts(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  const product = data?.[0];
  if (!product) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-700">Product Not Found</h2>
          <p className="text-gray-500 mt-2">The product you're looking for doesn't exist.</p>
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

  const handleContactSeller = () => {
    window.location.href = `mailto:${product.sellerEmail}?subject=Inquiry about ${product.name}`;
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
      alert("Link copied to clipboard!");
    }
  };

  const handleAddToCart = async (product) => {
    if (!user) {
      return alert("please login first")
    }

    const cartdata = {
      userEmail: user.email,
      productId: product._id,
      ProductName: product.name,
      quantity: quantity,
      Productimg: product.image,
      price: product.price * quantity,
      sellerEmail: product.sellerEmail
    }

    try {
      const result = await addtocart(cartdata)
      console.log(result)
      alert("cart added successfull")
    }
    catch (err) {
      console.log(err)
      alert(err)
    }

  };


  // console.log(user)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">

        <nav className="flex mb-8 text-sm text-gray-500">
          <a href="/" className="hover:text-green-600">Shop</a>
          <span className="mx-2">/</span>
          <a href="/products" className="hover:text-green-600">Products</a>
          <span className="mx-2">/</span>
          <a href={`/category/${product.category}`} className="hover:text-green-600">{product.category}</a>
          <span className="mx-2">/</span>
          <span className="text-gray-700 font-medium truncate">{product.name}</span>
        </nav>


        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            <div className="relative p-6 md:p-10 bg-gradient-to-br from-gray-50 to-gray-100">

              <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                {product.isNew && (
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                    <FaBolt /> NEW
                  </div>
                )}
                {product.discount >= 15 && (
                  <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                    <FaFire /> HOT DEAL
                  </div>
                )}
              </div>


              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-6 right-6 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-10"
              >
                <FaHeart className={`text-xl ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
              </button>


              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>


              <div className="flex justify-center mt-6 gap-4">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full font-medium transition-all"
                >
                  <FaShareAlt /> Share
                </button>
                <button
                  onClick={handleContactSeller}
                  className="flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 hover:bg-green-200 rounded-full font-medium transition-all"
                >
                  <FaEnvelope /> Contact Seller
                </button>
              </div>
            </div>


            <div className="p-6 md:p-10">

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {product.brand}
                </span>
                {product.stock < 20 && (
                  <span className="px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                    Only {product.stock} left!
                  </span>
                )}
              </div>


              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {product.name}
              </h1>


              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-lg font-bold text-gray-900">{product.rating}</span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">{product.reviews} reviews</span>
                <span className="text-gray-500">•</span>
                <span className="text-green-600 font-medium">{product.sold} sold</span>
              </div>


              <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-100">
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <div className="text-4xl md:text-5xl font-bold text-green-700">
                      ৳{product.price.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-2xl line-through text-gray-400">
                        ৳{product.oldPrice.toLocaleString()}
                      </span>
                      <span className="px-4 py-1 bg-red-500 text-white rounded-full font-bold text-lg">
                        {calculateDiscount()}% OFF
                      </span>
                    </div>
                  </div>
                  <div className="h-12 w-px bg-gray-300 hidden md:block"></div>
                  <div className="text-gray-600">
                    <div className="flex items-center gap-2 mb-1">
                      <FaWeight className="text-green-600" />
                      <span className="font-medium">Unit:</span> {product.unit}
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBoxOpen className="text-green-600" />
                      <span className="font-medium">Stock:</span>{" "}
                      <span className={product.stock < 10 ? "text-red-600 font-bold" : "text-green-600 font-bold"}>
                        {product.stock} units
                      </span>
                    </div>
                  </div>
                </div>
              </div>


              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-xl font-bold"
                    >
                      -
                    </button>
                    <span className="px-8 py-3 text-xl font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-gray-600">
                    Total: <span className="text-2xl font-bold text-green-700">৳{(product.price * quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>


              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <FaShoppingCart className="text-xl" />
                  Add to Cart
                </button>
                <button className="px-8 py-4 border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-xl font-bold transition-all">
                  Buy Now
                </button>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <MdLocalShipping className="text-2xl text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Free Shipping</p>
                    <p className="text-sm text-gray-500">On orders over ৳1000</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <MdSecurity className="text-2xl text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Secure Payment</p>
                    <p className="text-sm text-gray-500">100% secure & encrypted</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <FaUndo className="text-2xl text-purple-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Easy Returns</p>
                    <p className="text-sm text-gray-500">30-day return policy</p>
                  </div>
                </div>
              </div>


              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Sold by</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {product.sellerEmail.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{product.brand}</p>
                        <p className="text-gray-600">{product.sellerEmail}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleContactSeller}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold flex items-center gap-3 transition-all shadow-lg hover:shadow-xl"
                  >
                    <LuMessageCircleMore className="text-2xl" />
                    Contact Seller
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-8">

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FaLeafIcon className="text-green-600" />
                </div>
                Product Description
              </h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                <p className="text-lg mb-6">{product.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                      <FaCheckCircle className="text-green-600" />
                      Key Features
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="p-1.5 bg-green-100 rounded mt-1">
                          <FaCheckCircle className="text-green-600 text-sm" />
                        </div>
                        <span>Premium quality with authentic taste</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-1.5 bg-green-100 rounded mt-1">
                          <FaCheckCircle className="text-green-600 text-sm" />
                        </div>
                        <span>Carefully sourced from trusted suppliers</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-1.5 bg-green-100 rounded mt-1">
                          <FaCheckCircle className="text-green-600 text-sm" />
                        </div>
                        <span>Hygienically processed and packaged</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                      <FaShieldAlt className="text-blue-600" />
                      Quality Assurance
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="p-1.5 bg-blue-100 rounded mt-1">
                          <FaShieldAlt className="text-blue-600 text-sm" />
                        </div>
                        <span>Rigorous quality checks at every stage</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-1.5 bg-blue-100 rounded mt-1">
                          <FaShieldAlt className="text-blue-600 text-sm" />
                        </div>
                        <span>Complies with food safety standards</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-1.5 bg-blue-100 rounded mt-1">
                          <FaShieldAlt className="text-blue-600 text-sm" />
                        </div>
                        <span>Freshness guarantee with proper storage</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>


            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage & Storage</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <FaThermometerHalf className="text-2xl text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Storage Instructions</h3>
                      <p className="text-gray-600 text-sm">Store in a cool, dry place away from direct sunlight</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-xl">
                      <FaClock className="text-2xl text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Shelf Life</h3>
                      <p className="text-gray-600 text-sm">Best consumed within recommended period</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-xl">
                      <FaRecycle className="text-2xl text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Sustainability</h3>
                      <p className="text-gray-600 text-sm">Eco-friendly packaging and sustainable sourcing</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <FaBoxOpen className="text-2xl text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Packaging</h3>
                      <p className="text-gray-600 text-sm">Secure packaging to ensure product integrity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="space-y-8">

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Specifications</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Brand</span>
                  <span className="font-medium">{product.brand}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Unit Size</span>
                  <span className="font-medium">{product.unit}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Availability</span>
                  <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Item Code</span>
                  <span className="font-medium text-gray-900">PROD-{id?.slice(-8).toUpperCase()}</span>
                </div>
              </div>
            </div>


            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-6 border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaTruck className="text-green-600" />
                Delivery Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FaTruck className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Standard Delivery</p>
                    <p className="text-sm text-gray-600">3-5 business days • ৳60</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FaBolt className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Express Delivery</p>
                    <p className="text-sm text-gray-600">1-2 business days • ৳120</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FaMoneyBillWave className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Cash on Delivery</p>
                    <p className="text-sm text-gray-600">Available nationwide</p>
                  </div>
                </div>
              </div>
            </div>


            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
              <p className="text-gray-600 mb-6">Our customer support team is here to help you!</p>
              <button
                onClick={handleContactSeller}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-3 transition-all"
              >
                <FaEnvelope />
                Contact Support
              </button>
            </div>
          </div>
        </div>


        <div className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">You May Also Like</h2>
            <button className="text-green-600 font-bold hover:text-green-700 flex items-center gap-2">
              View All <span>→</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
                <h3 className="font-bold text-gray-900 mb-2">Related Product {item}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-bold">৳999</span>
                  <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductsDetels;