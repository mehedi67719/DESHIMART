import React, { useState } from 'react';
import { 
  FaSearch, 
  FaBookmark, 
  FaHeart, 
  FaEye, 
  FaUser,
  FaClock,
  FaFire,
  FaStar,
  FaRegBookmark,
  FaRegHeart,
  FaArrowRight
} from 'react-icons/fa';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedPosts, setSavedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  const blogPosts = [
    {
      id: 1,
      title: "Smart Shopping Tips for 2024",
      summary: "Learn how to save money while shopping online",
      author: "Rahul Ahmed",
      date: "Mar 15",
      readTime: "5 min",
      category: "Tips",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&auto=format&fit=crop",
      likes: 120,
      views: "1.2k",
      trending: true
    },
    {
      id: 2,
      title: "Best Local Products",
      summary: "Discover amazing products made in Bangladesh",
      author: "Fatima Begum",
      date: "Mar 10",
      readTime: "4 min",
      category: "Local",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop",
      likes: 85,
      views: "890",
      trending: true
    },
    {
      id: 3,
      title: "Healthy Food Guide",
      summary: "Simple tips for healthy eating every day",
      author: "Dr. Sabrina",
      date: "Mar 5",
      readTime: "6 min",
      category: "Health",
      image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&auto=format&fit=crop",
      likes: 150,
      views: "1.5k",
      trending: true
    },
    {
      id: 4,
      title: "Payment Safety Guide",
      summary: "How to pay safely on shopping apps",
      author: "Kamal Hossain",
      date: "Feb 28",
      readTime: "3 min",
      category: "Safety",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&auto=format&fit=crop",
      likes: 95,
      views: "980"
    },
    {
      id: 5,
      title: "Seasonal Fruits Guide",
      summary: "Best fruits to buy this season",
      author: "Abdul Karim",
      date: "Feb 22",
      readTime: "4 min",
      category: "Food",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&auto=format&fit=crop",
      likes: 110,
      views: "1.1k"
    },
    {
      id: 6,
      title: "Kitchen Gadgets Review",
      summary: "Must-have tools for your kitchen",
      author: "Rashed Khan",
      date: "Feb 18",
      readTime: "5 min",
      category: "Reviews",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&auto=format&fit=crop",
      likes: 75,
      views: "760"
    }
  ];

  const categories = ['All', 'Tips', 'Local', 'Health', 'Safety', 'Food', 'Reviews'];
  
  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const searchResults = searchTerm 
    ? filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredPosts;

  const trendingPosts = blogPosts.filter(post => post.trending).slice(0, 3);

  const toggleSave = (postId) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter(id => id !== postId));
    } else {
      setSavedPosts([...savedPosts, postId]);
    }
  };

  const toggleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">📚 Blog</h1>
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-8 pr-3 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {searchResults.length} articles
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Categories */}
          <div className="lg:w-48 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-3 sticky top-16">
              <h2 className="font-bold text-gray-800 mb-2 text-sm">Categories</h2>
              <div className="flex lg:flex-col gap-1 overflow-x-auto pb-1 lg:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                      activeCategory === cat
                        ? 'bg-green-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Trending Section */}
            {trendingPosts.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-1">
                  <FaFire className="text-orange-500 text-sm" /> Trending Now
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {trendingPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="h-24 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2">
                        <h3 className="font-medium text-gray-800 text-xs line-clamp-2 mb-1">
                          {post.title}
                        </h3>
                        <div className="flex items-center justify-between text-gray-500 text-[10px]">
                          <span>{post.author}</span>
                          <span className="flex items-center gap-1">
                            <FaEye size={8} /> {post.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Articles */}
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-3">Latest Articles</h2>
              <div className="space-y-3">
                {searchResults.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-sm p-3">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 flex-shrink-0">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600">
                            {post.category}
                          </span>
                          <div className="flex items-center gap-2">
                            <button onClick={() => toggleLike(post.id)}>
                              {likedPosts.includes(post.id) ? 
                                <FaHeart className="text-red-500 text-xs" /> : 
                                <FaRegHeart className="text-gray-400 text-xs" />
                              }
                            </button>
                            <button onClick={() => toggleSave(post.id)}>
                              {savedPosts.includes(post.id) ? 
                                <FaBookmark className="text-green-600 text-xs" /> : 
                                <FaRegBookmark className="text-gray-400 text-xs" />
                              }
                            </button>
                          </div>
                        </div>
                        <h3 className="font-medium text-gray-800 text-sm line-clamp-1">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-xs line-clamp-1 mb-1">
                          {post.summary}
                        </p>
                        <div className="flex items-center gap-2 text-gray-500 text-[10px]">
                          <span className="flex items-center gap-1">
                            <FaUser size={8} /> {post.author}
                          </span>
                          <span>•</span>
                          <span>{post.date}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <FaClock size={8} /> {post.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Load More */}
            <div className="text-center mt-6">
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition">
                Load More
              </button>
            </div>
          </div>

          {/* Right Sidebar - Stats & Newsletter */}
          <div className="lg:w-56 flex-shrink-0">
            <div className="sticky top-16 space-y-3">
              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-sm p-3">
                <h2 className="font-bold text-gray-800 mb-2 text-sm">Your Activity</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Saved</span>
                    <span className="font-medium text-green-600">{savedPosts.length}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Liked</span>
                    <span className="font-medium text-red-600">{likedPosts.length}</span>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-green-600 rounded-lg p-3 text-white">
                <h3 className="font-bold text-sm mb-1">📧 Newsletter</h3>
                <p className="text-xs opacity-90 mb-2">Get weekly tips</p>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full mb-2 px-2 py-1.5 rounded text-xs text-gray-800"
                />
                <button className="w-full bg-white text-green-600 hover:bg-gray-100 text-xs font-medium py-1.5 rounded">
                  Subscribe
                </button>
              </div>

              {/* Top Picks */}
              <div className="bg-white rounded-lg shadow-sm p-3">
                <h2 className="font-bold text-gray-800 mb-2 text-sm">⭐ Top Picks</h2>
                <div className="space-y-2">
                  {blogPosts.slice(0, 3).map((post, i) => (
                    <div key={post.id} className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-400 w-4">{i+1}</span>
                      <span className="text-xs text-gray-700 line-clamp-1">{post.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex justify-around py-2">
          <button className="text-green-600 text-xs flex flex-col items-center">
            <FaStar size={14} />
            <span>Home</span>
          </button>
          <button className="text-gray-600 text-xs flex flex-col items-center">
            <FaFire size={14} />
            <span>Trending</span>
          </button>
          <button className="text-gray-600 text-xs flex flex-col items-center">
            <FaBookmark size={14} />
            <span>Saved</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;