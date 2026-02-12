import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router';
import { topsellproducts } from './Api';
import ShopCard from './ShopCard';
import { FiPackage, FiArrowRight, FiStar, FiTrendingUp, FiShoppingBag } from 'react-icons/fi';

const FeaturedProducts = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["topCategoriesandproducts"],
        queryFn: topsellproducts
    });

    if (isLoading) {
        return (
            <div className='w-full py-16'>
                <div className='w-full px-4'>
                    <div className='text-center max-w-3xl mx-auto mb-16'>
                        <div className='inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full mb-6'>
                            <FiPackage className='w-4 h-4 text-green-600 animate-pulse' />
                            <span className='text-green-700 font-medium'>Loading Products</span>
                        </div>
                        <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>Featured Products</h2>
                        <p className='text-xl text-gray-600'>Loading amazing products for you...</p>
                    </div>
                    
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                        {[1,2,3,4,5,6,7,8,9,10].map(n => (
                            <div key={n} className='border border-gray-200 rounded-2xl p-4 animate-pulse bg-white'>
                                <div className='bg-gray-200 h-60 w-full rounded-xl mb-4'></div>
                                <div className='h-6 bg-gray-200 w-3/4 mb-3 rounded'></div>
                                <div className='h-4 bg-gray-200 w-1/2 mb-4 rounded'></div>
                                <div className='flex justify-between items-center mb-4'>
                                    <div className='h-8 bg-gray-200 w-24 rounded'></div>
                                    <div className='h-5 bg-gray-200 w-16 rounded'></div>
                                </div>
                                <div className='h-12 bg-gray-200 w-full rounded-xl'></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className='w-full py-16'>
                <div className='w-full px-4'>
                    <div className='max-w-2xl mx-auto text-center bg-gradient-to-br from-red-50 to-red-100/50 rounded-3xl p-12'>
                        <div className='inline-flex items-center justify-center w-20 h-20 bg-red-200 rounded-full mb-6'>
                            <svg className='w-10 h-10 text-red-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                        </div>
                        <h2 className='text-3xl font-bold text-gray-900 mb-3'>Failed to Load Products</h2>
                        <p className='text-gray-600 mb-8'>We couldn't load the featured products. Please try again.</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className='px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300'
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full py-16 bg-white mt-10 rounded-2xl'>
            <div className='w-full px-4'>
                <div className='relative text-center max-w-4xl mx-auto mb-20'>
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-64 h-64 bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-full blur-3xl'></div>
                    </div>
                    
                    <div className='relative'>
                        <div className='inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 px-5 py-2.5 rounded-full mb-6 shadow-sm'>
                            <FiTrendingUp className='w-4 h-4 text-green-600' />
                            <span className='text-green-700 font-semibold text-sm uppercase tracking-wider'>Top Selling Categories</span>
                        </div>
                        
                        <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6'>
                            <span className='bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 bg-clip-text text-transparent'>
                                Featured Products
                            </span>
                        </h2>
                        
                        <p className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                            Discover our carefully curated selection of premium products, 
                            handpicked from the best sellers across all categories
                        </p>

                        <div className='flex items-center justify-center gap-8 mt-10'>
                            <div className='flex items-center gap-2'>
                                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                                <span className='text-sm text-gray-600'>
                                    {data?.reduce((acc, cat) => acc + (cat.products?.length || 0), 0)}+ Products
                                </span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <FiStar className='w-4 h-4 text-yellow-500 fill-yellow-500' />
                                <span className='text-sm text-gray-600'>Premium Quality</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='w-2 h-2 bg-emerald-500 rounded-full'></div>
                                <span className='text-sm text-gray-600'>{data?.length} Categories</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='space-y-16'>
                    {data?.map((category, index) => (
                        <div key={index} className='relative group'>
                            <div className='relative bg-white rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden'>
                                <div className='absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                                
                                <div className='relative p-8 pb-6'>
                                    <div className='flex flex-col lg:flex-row lg:items-center md:flex-row md:items-center justify-between gap-6'>
                                        <div className='flex items-center gap-5'>
                                            <div className={`
                                                flex items-center justify-center w-16 h-16 rounded-2xl
                                                ${index % 3 === 0 ? 'bg-gradient-to-br from-green-500 to-emerald-600' : ''}
                                                ${index % 3 === 1 ? 'bg-gradient-to-br from-orange-500 to-red-500' : ''}
                                                ${index % 3 === 2 ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : ''}
                                                text-white shadow-lg transform group-hover:scale-110 transition-transform duration-500
                                            `}>
                                                <FiShoppingBag className='w-7 h-7' />
                                            </div>
                                            
                                            <div>
                                                <h3 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-2'>
                                                    {category.category}
                                                </h3>
                                                <div className='flex items-center gap-3'>
                                                    <span className='px-4 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full'>
                                                        <span className='text-green-700 font-semibold'>
                                                            {category.products?.length || 0} Products
                                                        </span>
                                                    </span>
                                                    <span className='text-sm text-gray-500'>•</span>
                                                    <span className='text-sm text-gray-500'>Premium Collection</span>
                                                </div>
                                            </div>
                                        </div>

                                        <Link 
                                            to={`/shop?category=${encodeURIComponent(category.category)}`} 
                                            className='group/btn inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-600 hover:to-emerald-600 rounded-full border border-green-200 hover:border-transparent transition-all duration-300 shadow-md hover:shadow-xl'
                                        >
                                            <span className='font-semibold text-green-700 group-hover/btn:text-white transition-colors'>
                                                View Collection
                                            </span>
                                            <FiArrowRight className='w-5 h-5 text-green-600 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all duration-300' />
                                        </Link>
                                    </div>
                                </div>

                                <div className='relative px-8'>
                                    <div className='h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent'></div>
                                </div>

                                <div className='p-4 pt-8'>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 '>
                                        {category.products?.slice(0, 5).map((product) => (
                                            <ShopCard 
                                                key={product._id} 
                                                item={product}  
                                            />
                                        ))}
                                    </div>

                                    {category.products?.length > 5 && (
                                        <div className='mt-8 text-center lg:hidden'>
                                            <Link 
                                                to={`/shop?category=${encodeURIComponent(category.category)}`}
                                                className='inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium group/link'
                                            >
                                                <span>Browse {category.products?.length - 5} more products</span>
                                                <FiArrowRight className='group-hover/link:translate-x-1 transition-transform' />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='mt-20 text-center'>
                    <div className='inline-flex flex-col items-center p-10 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 shadow-lg'>
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                            <span className='text-gray-700 font-medium'>Ready to explore more?</span>
                        </div>
                        <h4 className='text-2xl md:text-3xl font-bold text-gray-900 mb-6'>
                            Find exactly what you're looking for
                        </h4>
                        <Link 
                            to="/shop"
                            className='px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3'
                        >
                            <FiShoppingBag className='w-5 h-5' />
                            Browse All Categories
                            <FiArrowRight className='w-5 h-5' />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;