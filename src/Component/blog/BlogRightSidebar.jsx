import React from 'react';
import { Link } from 'react-router';

const BlogRightSidebar = ({ allBlogs, savedPosts }) => {
  return (
    <div className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-24 space-y-6">
    
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-bold text-gray-800 mb-4">🔥 Most Viewed</h2>
          <div className="space-y-3">
            {allBlogs.slice(0, 3).map((post, index) => (
              <Link to={`/blog/${post._id}`} key={post._id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="text-xl font-bold text-gray-300 w-6">{index + 1}</div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="text-gray-500 text-xs mt-1">
                    {post.views || 0} views
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
  
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Your Profile</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700">Your Posts</span>
              <span className="font-bold text-green-600">8</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-700">Saved Posts</span>
              <span className="font-bold text-blue-600">{savedPosts.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-gray-700">Profile Views</span>
              <span className="font-bold text-purple-600">142</span>
            </div>
            <button className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg transition-colors">
              Go to Profile
            </button>
          </div>
        </div>

        
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
      </div>
    </div>
  );
};

export default BlogRightSidebar;