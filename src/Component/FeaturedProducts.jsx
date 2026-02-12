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
            <div className='w-full py-16 px-4'>
                <div className='text-center max-w-3xl mx-auto mb-16'>
                    <div className='inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full mb-6'>
                        <FiPackage className='w-4 h-4 text-green-600 animate-pulse' />
                        <span className='text-green-700 font-medium'>Loading Products</span>
                    </div>
                    <h2 className='text-4xl font-bold text-gray-900'>Featured Products</h2>
                </div>
                
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                    {[...Array(10)].map((_, n) => (
                        <div key={n} className='border border-gray-200 rounded-2xl p-4 animate-pulse bg-white h-[400px] flex flex-col'>
                            <div className='bg-gray-200 h-48 w-full rounded-xl mb-4'></div>
                            <div className='h-5 bg-gray-200 w-3/4 mb-3 rounded'></div>
                            <div className='h-4 bg-gray-200 w-1/2 mb-auto rounded'></div>
                            <div className='h-10 bg-gray-200 w-full rounded-xl mt-4'></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className='w-full py-16 px-4'>
                <div className='max-w-2xl mx-auto text-center bg-red-50 rounded-3xl p-12'>
                    <h2 className='text-3xl font-bold text-gray-900 mb-3'>Failed to Load Products</h2>
                    <button onClick={() => window.location.reload()} className='px-8 py-3 bg-green-600 text-white font-semibold rounded-full'>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full py-16 my-10 rounded-2xl bg-white'>
            <div className='w-full px-4'>
                <div className='relative text-center max-w-4xl mx-auto mb-16'>
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-64 h-64 bg-green-100/50 rounded-full blur-3xl'></div>
                    </div>
                    
                    <div className='relative'>
                        <div className='inline-flex items-center gap-2 bg-green-100 px-5 py-2 rounded-full mb-6'>
                            <FiTrendingUp className='w-4 h-4 text-green-600' />
                            <span className='text-green-700 font-semibold text-sm uppercase'>Top Selling</span>
                        </div>
                        <h2 className='text-5xl md:text-6xl font-bold text-gray-900 mb-6'>
                            <span className='bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent'>
                                Featured Products
                            </span>
                        </h2>
                    </div>
                </div>

                <div className='space-y-20'>
                    {data?.map((category, index) => (
                        <div key={index} className='relative'>
                            <div className='bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden'>
                                <div className='p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gray-50/50'>
                                    <div className='flex items-center gap-5'>
                                        <div className='w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg'>
                                            <FiShoppingBag className='w-6 h-6' />
                                        </div>
                                        <div>
                                            <h3 className='text-3xl font-bold text-gray-900'>{category.category}</h3>
                                            <p className='text-green-600 font-medium'>{category.products?.length || 0} Products Available</p>
                                        </div>
                                    </div>

                                    <Link to="/collection" className='flex items-center gap-2 text-green-700 font-bold hover:gap-3 transition-all'>
                                        View Collection <FiArrowRight />
                                    </Link>
                                </div>

                                <div className='p-6'>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-stretch'>
                                        {category.products?.slice(0, 5).map((product) => (
                                            <ShopCard key={product._id} item={product} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='mt-20 text-center'>
                    <Link to="/shop" className='inline-flex items-center gap-3 px-10 py-5 bg-green-600 text-white font-bold rounded-full hover:shadow-xl transition-all hover:scale-105'>
                        <FiShoppingBag /> Browse All Categories <FiArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;