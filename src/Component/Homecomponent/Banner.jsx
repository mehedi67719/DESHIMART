import React from 'react';
import { FiShoppingBag, FiArrowRight, FiStar, FiTruck, FiShield, FiAward } from 'react-icons/fi';
import { Link } from 'react-router';

const Banner = () => {
    return (
        <div className="w-full bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950 overflow-hidden">
      
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3')] bg-cover bg-center opacity-5"></div>
                <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-5 right-5 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
            </div>

           
            <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
                backgroundSize: '32px 32px'
            }}></div>

          
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-8 items-center py-8 md:py-12">
                 
                    <div className="text-left space-y-4 md:space-y-5">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                            <span className="text-white/90 font-semibold text-xs uppercase tracking-widest">
                                DeshiMart
                            </span>
                            <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full text-[10px] font-bold text-black">
                                2026
                            </span>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                                <span className="text-white">
                                    Fresh From
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 bg-clip-text text-transparent">
                                    Deshi Farms
                                </span>
                            </h1>
                            
                            <p className="text-sm md:text-base text-white/80 max-w-lg leading-relaxed">
                                500+ local farmers. 100% organic, delivered in 24hrs.
                            </p>
                        </div>

                     
                        <div className="grid grid-cols-3 gap-2 pt-1">
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-xl p-2 border border-white/10">
                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FiTruck className="w-4 h-4 text-white" />
                                </div>
                                <div className="hidden sm:block min-w-0">
                                    <p className="font-bold text-white text-xs truncate">Free Ship</p>
                                    <p className="text-[10px] text-white/60 truncate">500৳+</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-xl p-2 border border-white/10">
                                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FiShield className="w-4 h-4 text-white" />
                                </div>
                                <div className="hidden sm:block min-w-0">
                                    <p className="font-bold text-white text-xs truncate">Fresh</p>
                                    <p className="text-[10px] text-white/60 truncate">100%</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-xl p-2 border border-white/10">
                                <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FiAward className="w-4 h-4 text-white" />
                                </div>
                                <div className="hidden sm:block min-w-0">
                                    <p className="font-bold text-white text-xs truncate">Premium</p>
                                    <p className="text-[10px] text-white/60 truncate">Quality</p>
                                </div>
                            </div>
                        </div>

                     
                        <div className="flex flex-wrap gap-3 pt-2">
                            <Link to='/shop' className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-500 text-gray-900 font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 overflow-hidden">
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                                <FiShoppingBag className="w-4 h-4" />
                                <span className="text-sm">Shop Now</span>
                                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                            <button className="px-5 py-2.5 bg-white/5 backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 hover:bg-white/10 flex items-center gap-2">
                                <FiStar className="w-4 h-4 text-amber-400 fill-amber-400" />
                                <span className="text-sm">Deals</span>
                            </button>
                        </div>

                        
                        <div className="flex items-center gap-4 pt-3 border-t border-white/10">
                            <div>
                                <span className="text-xl md:text-2xl font-bold text-white">50k+</span>
                                <p className="text-[10px] text-white/60">Customers</p>
                            </div>
                            <div className="w-px h-6 bg-white/20"></div>
                            <div>
                                <span className="text-xl md:text-2xl font-bold text-white">500+</span>
                                <p className="text-[10px] text-white/60">Farmers</p>
                            </div>
                            <div className="w-px h-6 bg-white/20"></div>
                            <div>
                                <span className="text-xl md:text-2xl font-bold text-white">24/7</span>
                                <p className="text-[10px] text-white/60">Support</p>
                            </div>
                        </div>
                    </div>

                  
                    <div className="relative hidden lg:block">
                        <div className="relative w-full h-[320px]">
                        
                            <div className="absolute top-5 right-0 w-64 bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
                                <div className="flex items-center gap-3">
                                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-2xl">🥬</span>
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold text-white text-sm truncate">Fresh Veggies</p>
                                            <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[8px] rounded-full flex-shrink-0">-25%</span>
                                        </div>
                                        <div className="flex items-center gap-1 mt-1">
                                            <p className="text-lg font-bold text-white">30৳</p>
                                            <p className="text-xs text-white/40 line-through">45৳</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                          
                            <div className="absolute top-24 left-0 w-64 bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-2xl transform -rotate-6 hover:rotate-0 transition-all duration-500">
                                <div className="flex items-center gap-3">
                                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-2xl">🍎</span>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-white text-sm truncate">Premium Fruits</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <FiStar className="w-3 h-3 text-amber-400 fill-amber-400 flex-shrink-0" />
                                            <span className="text-white text-xs">4.9</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="absolute bottom-5 right-4 w-64 bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-2xl transform rotate-12 hover:rotate-0 transition-all duration-500">
                                <div className="flex items-center gap-3">
                                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-2xl">🌾</span>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-white text-sm truncate">Organic Grains</p>
                                        <p className="text-lg font-bold text-white mt-1">85৳</p>
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

export default Banner;