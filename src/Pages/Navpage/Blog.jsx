import React, { useState } from 'react';
import { 
  FaSearch, 
  FaBookmark, 
  FaHeart, 
  FaComment, 
  FaEye, 
  FaCalendarAlt,
  FaUser,
  FaClock,
  FaShareAlt,
  FaArrowRight,
  FaFire,
  FaStar,
  FaTag,
  FaFilter,
  FaTimes,
  FaBook,
  FaThumbsUp,
  FaRegBookmark,
  FaRegHeart
} from 'react-icons/fa';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedPosts, setSavedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const blogPosts = [
    {
      id: 1,
      title: "E-commerce in Bangladesh: Future Trends",
      summary: "Learn how online shopping is changing in our country",
      author: "Ahmad Rahman",
      date: "Mar 15",
      readTime: "8 min",
      category: "E-commerce",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&auto=format&fit=crop",
      likes: 245,
      comments: 42,
      views: "2.4k",
      trending: true,
      featured: true
    },
    {
      id: 2,
      title: "Eco-Friendly Shopping Tips",
      summary: "Simple ways to shop while protecting our planet",
      author: "Fatima Begum",
      date: "Mar 10",
      readTime: "6 min",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop",
      likes: 189,
      comments: 31,
      views: "1.9k",
      trending: true,
      featured: true
    },
    {
      id: 3,
      title: "Buy Direct from Farmers",
      summary: "Get fresher food and support local farmers",
      author: "Kamal Hossain",
      date: "Mar 5",
      readTime: "5 min",
      category: "Food",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop",
      likes: 312,
      comments: 56,
      views: "3.1k",
      trending: true
    },
    {
      id: 4,
      title: "Local Brands vs International",
      summary: "Why our own brands are getting popular",
      author: "Nusrat Jahan",
      date: "Feb 28",
      readTime: "4 min",
      category: "Business",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&auto=format&fit=crop",
      likes: 178,
      comments: 29,
      views: "1.8k"
    },
    {
      id: 5,
      title: "Smart Kitchen Tools",
      summary: "Must-have gadgets for easier cooking",
      author: "Rashed Khan",
      date: "Feb 22",
      readTime: "7 min",
      category: "Tech",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&auto=format&fit=crop",
      likes: 231,
      comments: 38,
      views: "2.3k"
    },
    {
      id: 6,
      title: "Healthy Eating for Busy People",
      summary: "Eat well even with a busy schedule",
      author: "Dr. Sabrina Ahmed",
      date: "Feb 18",
      readTime: "6 min",
      category: "Health",
      image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&auto=format&fit=crop",
      likes: 295,
      comments: 47,
      views: "2.9k"
    },
    {
      id: 7,
      title: "Safe Online Payments",
      summary: "How to pay safely on shopping apps",
      author: "Tahmina Akter",
      date: "Feb 8",
      readTime: "3 min",
      category: "Tech",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&auto=format&fit=crop",
      likes: 154,
      comments: 21,
      views: "1.6k"
    },
    {
      id: 8,
      title: "Seasonal Fruits Benefits",
      summary: "Why seasonal fruits are better for you",
      author: "Abdul Karim",
      date: "Feb 12",
      readTime: "5 min",
      category: "Food",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&auto=format&fit=crop",
      likes: 167,
      comments: 24,
      views: "1.7k"
    }
  ];

  const categories = [
    { name: "All", count: 24, color: "bg-gray-100", icon: "📝" },
    { name: "E-commerce", count: 6, color: "bg-blue-50", icon: "🛒" },
    { name: "Food", count: 5, color: "bg-green-50", icon: "🍎" },
    { name: "Health", count: 4, color: "bg-red-50", icon: "❤️" },
    { name: "Tech", count: 4, color: "bg-purple-50", icon: "📱" },
    { name: "Business", count: 3, color: "bg-yellow-50", icon: "💼" },
    { name: "Lifestyle", count: 2, color: "bg-teal-50", icon: "🌟" }
  ];

  const popularTags = [
    { name: "Shopping Tips", color: "bg-blue-100" },
    { name: "Healthy Living", color: "bg-green-100" },
    { name: "Save Money", color: "bg-yellow-100" },
    { name: "Eco Friendly", color: "bg-teal-100" },
    { name: "Bangladesh", color: "bg-red-100" },
    { name: "Easy Cooking", color: "bg-purple-100" }
  ];

  const trendingPosts = blogPosts.filter(post => post.trending);
  const featuredPosts = blogPosts.filter(post => post.featured);
  
  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const searchResults = searchTerm 
    ? filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredPosts;

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

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FaBook className="text-green-600" /> Blog Hub
              </h1>
              <p className="text-gray-600 text-sm">Learn smarter shopping tips</p>
            </div>
            
            <div className="hidden md:block flex-1 max-w-xl mx-8">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-10 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {searchTerm && (
                  <button 
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>

            <button 
              onClick={() => setShowMobileFilter(true)}
              className="md:hidden bg-green-600 text-white p-2 rounded-lg"
            >
              <FaFilter />
            </button>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-10 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {searchTerm && (
                <button 
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
          <div className="fixed right-0 top-0 h-full w-72 bg-white p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => setShowMobileFilter(false)} className="text-gray-500">
                <FaTimes />
              </button>
            </div>
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-bold mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => {
                        setActiveCategory(cat.name);
                        setShowMobileFilter(false);
                      }}
                      className={`w-full text-left p-3 rounded-lg ${activeCategory === cat.name ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}
                    >
                      {cat.name} ({cat.count})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex">
          {/* Left Sidebar - Fixed */}
          <div className="hidden lg:block w-64 flex-shrink-0 mr-6">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Categories</h2>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setActiveCategory(cat.name)}
                      className={`w-full flex justify-between items-center p-3 rounded-lg transition-all duration-200 ${
                        activeCategory === cat.name
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{cat.icon}</span>
                        <span>{cat.name}</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        activeCategory === cat.name ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Popular Topics</h2>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag.name}
                      className={`px-3 py-2 ${tag.color} text-gray-700 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Stats</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Articles</span>
                    <span className="font-bold">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Weekly Readers</span>
                    <span className="font-bold">5.2k</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Saved Posts</span>
                    <span className="font-bold text-green-600">{savedPosts.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Content - Scrollable */}
          <div className="flex-1 min-w-0">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FaStar className="text-yellow-500" /> Featured Stories
                  </h2>
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    View All →
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featuredPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-3 text-gray-600 text-sm mb-2">
                          <span className="flex items-center gap-1">
                            <FaUser size={12} /> {post.author}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <FaClock size={12} /> {post.readTime}
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {post.summary}
                        </p>
                        <div className="flex justify-between items-center">
                          <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1">
                            Read Full <FaArrowRight size={12} />
                          </button>
                          <div className="flex items-center gap-4">
                            <button 
                              onClick={() => toggleLike(post.id)}
                              className={`flex items-center gap-1 text-sm ${likedPosts.includes(post.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                            >
                              {likedPosts.includes(post.id) ? <FaHeart /> : <FaRegHeart />} {post.likes}
                            </button>
                            <button 
                              onClick={() => toggleSave(post.id)}
                              className={`text-sm ${savedPosts.includes(post.id) ? 'text-green-600' : 'text-gray-400 hover:text-green-600'}`}
                            >
                              {savedPosts.includes(post.id) ? <FaBookmark /> : <FaRegBookmark />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Section */}
            {trendingPosts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaFire className="text-orange-500" /> Trending Now
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trendingPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow duration-300">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 flex-shrink-0">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded">
                              Hot
                            </span>
                            <span className="text-gray-500 text-xs flex items-center gap-1">
                              <FaEye size={10} /> {post.views}
                            </span>
                          </div>
                          <h4 className="font-bold text-gray-800 text-sm line-clamp-2 mb-1">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Articles */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">All Articles</h2>
                <div className="text-gray-600 text-sm">
                  {searchResults.length} articles • {activeCategory}
                </div>
              </div>
              <div className="space-y-3">
                {searchResults.map((post) => (
                  <div key={post.id} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all duration-300">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 flex-shrink-0">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <span className={`px-2 py-1 rounded text-xs ${
                            post.category === 'E-commerce' ? 'bg-blue-100 text-blue-700' :
                            post.category === 'Food' ? 'bg-green-100 text-green-700' :
                            post.category === 'Health' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {post.category}
                          </span>
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => toggleLike(post.id)}
                              className={`text-sm ${likedPosts.includes(post.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                            >
                              <FaThumbsUp />
                            </button>
                            <button 
                              onClick={() => toggleSave(post.id)}
                              className={`text-sm ${savedPosts.includes(post.id) ? 'text-green-600' : 'text-gray-400 hover:text-green-600'}`}
                            >
                              <FaBookmark />
                            </button>
                          </div>
                        </div>
                        <h4 className="font-bold text-gray-800 mb-1 line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {post.summary}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3 text-gray-500 text-xs">
                            <span className="flex items-center gap-1">
                              <FaUser size={10} /> {post.author}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <FaCalendarAlt size={10} /> {post.date}
                            </span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                            Read →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Load More */}
            <div className="text-center py-8">
              <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-300">
                Load More Articles
              </button>
            </div>
          </div>

          {/* Right Sidebar - Fixed */}
          <div className="hidden lg:block w-64 flex-shrink-0 ml-6">
            <div className="sticky top-24 space-y-6">
              {/* Newsletter */}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-5 text-white">
                <h3 className="text-lg font-bold mb-3">📬 Stay Updated</h3>
                <p className="text-sm opacity-90 mb-4">
                  Get weekly shopping tips & deals
                </p>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full mb-3 px-4 py-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none"
                />
                <button className="w-full bg-white text-green-600 hover:bg-gray-100 font-bold py-3 rounded-lg transition duration-300">
                  Subscribe Free
                </button>
              </div>

              {/* Your Activity */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Your Activity</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">Saved Posts</span>
                    <span className="font-bold text-green-600">{savedPosts.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="text-gray-700">Liked Posts</span>
                    <span className="font-bold text-red-600">{likedPosts.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">Minutes Read</span>
                    <span className="font-bold text-blue-600">42</span>
                  </div>
                </div>
              </div>

              {/* Most Viewed */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h2 className="text-lg font-bold text-gray-800 mb-4">🔥 Most Viewed</h2>
                <div className="space-y-3">
                  {blogPosts.slice(0, 3).map((post, index) => (
                    <div key={post.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="text-xl font-bold text-gray-300 w-6">{index + 1}</div>
                      <div>
                        <h4 className="font-medium text-gray-800 text-sm line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="text-gray-500 text-xs mt-1">
                          {post.views} views
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h2 className="text-lg font-bold text-gray-800 mb-4">⚡ Quick Links</h2>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors">
                    <div className="font-medium text-gray-800">Write Article</div>
                    <div className="text-gray-600 text-sm">Share your knowledge</div>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors">
                    <div className="font-medium text-gray-800">Suggest Topic</div>
                    <div className="text-gray-600 text-sm">What to write next?</div>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-50 hover:bg-purple-50 rounded-lg transition-colors">
                    <div className="font-medium text-gray-800">Contact Editors</div>
                    <div className="text-gray-600 text-sm">Questions & feedback</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40">
        <div className="flex justify-around items-center py-3">
          <button 
            onClick={() => setActiveCategory('All')}
            className={`flex flex-col items-center ${activeCategory === 'All' ? 'text-green-600' : 'text-gray-600'}`}
          >
            <FaBook />
            <span className="text-xs mt-1">All</span>
          </button>
          <button className="flex flex-col items-center text-gray-600">
            <FaFire />
            <span className="text-xs mt-1">Trending</span>
          </button>
          <button className="flex flex-col items-center text-gray-600">
            <FaBookmark />
            <span className="text-xs mt-1">Saved</span>
          </button>
          <button className="flex flex-col items-center text-gray-600">
            <FaSearch />
            <span className="text-xs mt-1">Search</span>
          </button>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 py-10 mt-10 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Start Reading Today</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Join thousands learning smarter shopping habits
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg transition duration-300 whitespace-nowrap">
                Get Free Tips
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;