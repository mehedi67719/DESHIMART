import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router';

const BlogSidebar = ({ categories, activeCategory, setActiveCategory, allBlogs }) => {
  return (
    <div className="hidden lg:block w-64 flex-shrink-0">
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
            <span className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm">Shopping Tips</span>
            <span className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm">Healthy Living</span>
            <span className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm">Save Money</span>
            <span className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm">Eco Friendly</span>
          </div>
        </div>

        {/* Profile section */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Profile</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaUser className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Your Name</h3>
                <p className="text-sm text-gray-600">View Profile →</p>
              </div>
            </div>
            
            {/* Your recent posts */}
            <div className="mt-4">
              <h3 className="font-semibold text-gray-700 mb-2">Your Recent Posts</h3>
              <div className="space-y-2">
                {allBlogs.slice(0, 2).map((post) => (
                  <Link to={`/blog/${post._id}`} key={post._id} className="block p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <h4 className="font-medium text-gray-800 text-sm line-clamp-1">
                      {post.title}
                    </h4>
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(post.createdAt).toLocaleDateString()} • {post.readTime || '5 min'} read
                    </p>
                  </Link>
                ))}
                <Link to="/user/posts" className="text-green-600 text-sm font-medium mt-2 block">
                  View all your posts →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;