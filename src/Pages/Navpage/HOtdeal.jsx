import React from 'react';

const HOtdeal = () => {
    return (
        <div className='container mx-auto px-4'>
            <div className="lg:w-3/4 md:w-3/4 w-full rounded pb-4 shadow bg-white">
                <div className="py-4 px-4 bg-green-100 pb-6 flex justify-between items-center">
                    <h2 className="text-black text-2xl font-bold">{productsList.length} Products Found</h2>
                </div>

                {isError ? <p className='text-center text-red-500'>{productserror.message || "Something went wrong"}</p> :
                    <div className="pt-10 grid px-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
                        {productsList.length > 0 ? productsList.map((item) => (
                            <div key={item._id} className="group flex flex-col border border-gray-200 rounded-2xl bg-white overflow-hidden transition-shadow duration-500 hover:shadow-xl">

                                <Link to={`/productsdetels/${item._id}`} className="flex flex-col flex-1">

                                    <div className="relative overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                                            {item.discount >= 15 ? (
                                                <span className="px-3 py-1 text-xs font-semibold text-white rounded-full bg-red-500">Hot</span>
                                            ) : (
                                                <span className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${item.isNew ? "bg-green-500" : "bg-amber-500"}`}>
                                                    {item.isNew ? "New" : "Old"}
                                                </span>
                                            )}
                                            {item.discount > 0 && (
                                                <span className="px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-full">{item.discount}%</span>
                                            )}
                                        </div>

                                        <div className="absolute top-3 right-3 z-10 text-[#1E40AF] hover:text-red-500 transition-colors duration-300 cursor-pointer">
                                            <FaHeart className="w-6 h-6" />
                                        </div>
                                    </div>

                                    <div className="p-4 flex flex-col flex-1 justify-between">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                            <p className="text-sm text-gray-500">Sold: {item.sold}</p>
                                        </div>

                                        <div className="flex justify-between items-center mb-4">
                                            <div className="flex items-center gap-1">
                                                <span className="text-green-600 font-bold text-lg">{item.price}৳</span>
                                                {item.oldPrice && <span className="text-gray-400 line-through text-sm">{item.oldPrice}৳</span>}
                                            </div>
                                            <div className="flex items-center gap-1 text-yellow-400 text-sm">
                                                <Stars rating={item.rating} />
                                                <span className="text-gray-400 text-sm">{item.rating.toFixed(1)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <div className="px-4 pb-4">
                                    <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-green-500 text-green-500 rounded-xl font-medium transition-all duration-300 hover:bg-green-600 hover:text-white hover:shadow-lg active:scale-95">
                                        <FaShoppingCart /> Add to Cart
                                    </button>
                                </div>
                            </div>



                        )) : Array(6).fill(0).map((_, i) => (
                            <div key={i} className="h-72 bg-gray-200 rounded-2xl animate-pulse" />
                        ))}
                        <div ref={loadMoreRef} className="h-10"></div>
                        {isFetchingNextPage && Array(3).fill(0).map((_, i) => <div key={`skeleton-${i}`} className="h-72 bg-gray-200 rounded-2xl animate-pulse" />)}
                    </div>
                }
            </div>
        </div>
    );
};

export default HOtdeal;