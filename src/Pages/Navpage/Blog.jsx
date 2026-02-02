import React, { useState } from 'react';
import { FaCalendar, FaUser, FaClock, FaEye, FaShareAlt, FaSearch, FaBookmark, FaHeart, FaComment, FaArrowRight, FaFilter } from 'react-icons/fa';

const Blog = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const blogPosts = [
        {
            id: 1,
            title: "The Future of E-commerce in Bangladesh",
            excerpt: "How digital transformation is reshaping retail in Bangladesh and what it means for local businesses.",
            author: "Ahmad Rahman",
            date: "Mar 15, 2024",
            readTime: "8 min",
            category: "E-commerce",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            likes: 245,
            comments: 42,
            views: "2.4k",
            isFeatured: true
        },
        {
            id: 2,
            title: "Sustainable Shopping Guide",
            excerpt: "Practical tips for reducing your environmental footprint while shopping for daily essentials.",
            author: "Fatima Begum",
            date: "Mar 10, 2024",
            readTime: "6 min",
            category: "Lifestyle",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            likes: 189,
            comments: 31,
            views: "1.9k",
            isFeatured: true
        },
        {
            id: 3,
            title: "Farm to Table Revolution",
            excerpt: "How technology is connecting farmers directly with consumers for fresher produce.",
            author: "Kamal Hossain",
            date: "Mar 5, 2024",
            readTime: "10 min",
            category: "Agriculture",
            image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            likes: 312,
            comments: 56,
            views: "3.1k"
        },
        {
            id: 4,
            title: "Rise of Local Brands",
            excerpt: "How homegrown brands are competing with international giants through quality.",
            author: "Nusrat Jahan",
            date: "Feb 28, 2024",
            readTime: "7 min",
            category: "Business",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            likes: 178,
            comments: 29,
            views: "1.8k"
        },
        {
            id: 5,
            title: "Smart Kitchen Gadgets",
            excerpt: "Essential tech tools for modern kitchens that make cooking easier.",
            author: "Rashed Khan",
            date: "Feb 22, 2024",
            readTime: "9 min",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            likes: 231,
            comments: 38,
            views: "2.3k"
        },
        {
            id: 6,
            title: "Nutrition for Busy Professionals",
            excerpt: "Practical strategies for maintaining a balanced diet despite hectic schedules.",
            author: "Dr. Sabrina Ahmed",
            date: "Feb 18, 2024",
            readTime: "8 min",
            category: "Health",
            image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            likes: 295,
            comments: 47,
            views: "2.9k"
        },
        {
            id: 7,
            title: "Organic Farming in Bangladesh",
            excerpt: "The growth and challenges of organic agriculture in our country.",
            author: "Abdul Karim",
            date: "Feb 12, 2024",
            readTime: "11 min",
            category: "Agriculture",
            image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            likes: 167,
            comments: 24,
            views: "1.7k"
        },
        {
            id: 8,
            title: "Digital Payment Security",
            excerpt: "How to stay safe while using mobile financial services.",
            author: "Tahmina Akter",
            date: "Feb 8, 2024",
            readTime: "5 min",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            likes: 154,
            comments: 21,
            views: "1.6k"
        }
    ];

    const categories = [
        { name: "All", count: 24, color: "bg-gray-100" },
        { name: "E-commerce", count: 6, color: "bg-blue-100" },
        { name: "Lifestyle", count: 5, color: "bg-green-100" },
        { name: "Health", count: 4, color: "bg-red-100" },
        { name: "Technology", count: 4, color: "bg-purple-100" },
        { name: "Business", count: 3, color: "bg-yellow-100" },
        { name: "Agriculture", count: 2, color: "bg-teal-100" }
    ];

    const popularTags = [
        "Sustainability", "Digital", "Healthy", "Local", "Tech",
        "Cooking", "Eco-Friendly", "Retail", "Startup", "Farm",
        "Nutrition", "Smart", "Green"
    ];

    const featuredPosts = blogPosts.filter(post => post.isFeatured);
    const filteredPosts = activeCategory === 'All' 
        ? blogPosts 
        : blogPosts.filter(post => post.category === activeCategory);

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="bg-gradient-to-r from-green-50 to-blue-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Discover Insights & Stories
                        </h1>
                        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                            Read about e-commerce trends, sustainable living, and tips for smarter shopping
                        </p>
                    </div>

         
                    <div className="max-w-2xl mx-auto mb-8">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search articles, topics, or authors..."
                                className="w-full p-4 pl-12 pr-12 bg-white rounded-2xl shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-700">
                                <FaFilter />
                            </button>
                        </div>
                    </div>

                
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${activeCategory === cat.name 
                                    ? 'bg-green-600 text-white shadow-md' 
                                    : `${cat.color} text-gray-700 hover:bg-gray-200`}`}
                            >
                                {cat.name}
                                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${activeCategory === cat.name ? 'bg-green-700' : 'bg-gray-200'}`}>
                                    {cat.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

     
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
                    <div className="lg:col-span-2">
                 
                        {featuredPosts.length > 0 && (
                            <div className="mb-10">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">Featured Stories</h2>
                                    <button className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2">
                                        View All <FaArrowRight />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {featuredPosts.map((post) => (
                                        <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                                            <div className="relative h-48">
                                                <img 
                                                    src={post.image} 
                                                    alt={post.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-3 left-3">
                                                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                        Featured
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-5">
                                                <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
                                                    <span className="flex items-center gap-1">
                                                        <FaUser size={12} /> {post.author}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FaCalendar size={12} /> {post.date}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <p className="text-gray-600 mb-4 line-clamp-2">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex justify-between items-center">
                                                    <button className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2">
                                                        Read More <FaArrowRight size={14} />
                                                    </button>
                                                    <div className="flex items-center gap-4">
                                                        <button className="text-gray-400 hover:text-red-500">
                                                            <FaHeart />
                                                        </button>
                                                        <button className="text-gray-400 hover:text-blue-500">
                                                            <FaShareAlt />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Latest Articles</h2>
                                <div className="text-gray-600 text-sm">
                                    Showing {filteredPosts.length} articles
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredPosts.map((post) => (
                                    <div key={post.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:border-green-200 hover:shadow-sm transition-all duration-300">
                                        <div className="flex gap-4">
                                            <div className="w-24 h-24 flex-shrink-0">
                                                <img 
                                                    src={post.image} 
                                                    alt={post.title}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 text-gray-500 text-xs mb-2">
                                                    <span className="bg-gray-100 px-2 py-1 rounded">
                                                        {post.category}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FaClock size={10} /> {post.readTime}
                                                    </span>
                                                </div>
                                                <h4 className="font-bold text-gray-800 mb-2 line-clamp-2">
                                                    {post.title}
                                                </h4>
                                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500 text-xs">
                                                        By {post.author}
                                                    </span>
                                                    <div className="flex items-center gap-3">
                                                        <span className="flex items-center gap-1 text-gray-500 text-xs">
                                                            <FaEye /> {post.views}
                                                        </span>
                                                        <button className="text-green-600 hover:text-green-700 text-xs font-medium">
                                                            Read →
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

            
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 space-y-6">
                     
                            <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl p-6 text-white">
                                <div className="text-center">
                                    <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                                    <p className="text-sm opacity-90 mb-4">
                                        Get weekly insights and tips delivered to your inbox
                                    </p>
                                    <div className="space-y-3">
                                        <input
                                            type="email"
                                            placeholder="Your email"
                                            className="w-full px-4 py-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                                        />
                                        <button className="w-full bg-white text-green-600 hover:bg-gray-100 font-bold py-3 rounded-lg transition duration-300">
                                            Subscribe Now
                                        </button>
                                    </div>
                                </div>
                            </div>

                      
                            <div className="bg-white rounded-2xl border border-gray-100 p-5">
                                <h3 className="font-bold text-gray-800 mb-4">Popular Topics</h3>
                                <div className="flex flex-wrap gap-2">
                                    {popularTags.map((tag) => (
                                        <button
                                            key={tag}
                                            className="px-3 py-1.5 bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 rounded-lg text-sm transition-colors duration-200"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                           
                            <div className="bg-white rounded-2xl border border-gray-100 p-5">
                                <h3 className="font-bold text-gray-800 mb-4">Trending Now</h3>
                                <div className="space-y-4">
                                    {blogPosts.slice(0, 3).map((post) => (
                                        <div key={post.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                            <div className="w-12 h-12 flex-shrink-0">
                                                <img 
                                                    src={post.image} 
                                                    alt={post.title}
                                                    className="w-full h-full object-cover rounded"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-800 text-sm line-clamp-2">
                                                    {post.title}
                                                </h4>
                                                <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
                                                    <span>{post.date}</span>
                                                    <span>•</span>
                                                    <span>{post.views} views</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                          
                            <div className="bg-white rounded-2xl border border-gray-100 p-5">
                                <h3 className="font-bold text-gray-800 mb-4">Blog Stats</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-green-50 p-4 rounded-xl text-center">
                                        <div className="text-2xl font-bold text-green-600">24</div>
                                        <div className="text-gray-600 text-sm">Total Articles</div>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-xl text-center">
                                        <div className="text-2xl font-bold text-blue-600">15k+</div>
                                        <div className="text-gray-600 text-sm">Monthly Views</div>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-xl text-center">
                                        <div className="text-2xl font-bold text-purple-600">42</div>
                                        <div className="text-gray-600 text-sm">Authors</div>
                                    </div>
                                    <div className="bg-yellow-50 p-4 rounded-xl text-center">
                                        <div className="text-2xl font-bold text-yellow-600">7</div>
                                        <div className="text-gray-600 text-sm">Categories</div>
                                    </div>
                                </div>
                            </div>

                         
                            <div className="bg-gray-50 rounded-2xl p-5 text-center">
                                <h3 className="font-bold text-gray-800 mb-2">Want to Write for Us?</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Share your insights with our community
                                </p>
                                <button className="w-full bg-gray-800 hover:bg-black text-white font-medium py-3 rounded-lg transition duration-300">
                                    Submit Article
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

             
                <div className="text-center mt-12">
                    <button className="px-8 py-3 bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-medium rounded-lg transition duration-300">
                        Load More Articles
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Blog;