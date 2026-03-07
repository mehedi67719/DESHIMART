import React, { forwardRef } from 'react';
import { 
  FaStar, 
  FaUser, 
  FaClock, 
  FaArrowRight, 
  FaHeart, 
  FaRegHeart, 
  FaBookmark, 
  FaRegBookmark,
  FaFire,
  FaEye,
  FaCalendarAlt,
  FaThumbsUp
} from 'react-icons/fa';
import { Link } from 'react-router';
import LoadingSpinner from './LoadingSpinner';


const BlogContent = forwardRef(({ 
  blogsLoading,
  displayFeatured,
  displayTrending,
  allBlogs,
  activeCategory,
  likedPosts,
  savedPosts,
  toggleLike,
  toggleSave,
  isFetchingNextPage,
  hasNextPage
}, ref) => {
  if (blogsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex-1 min-w-0">
    
      {displayFeatured.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaStar className="text-yellow-500" /> Featured Stories
            </h2>
            {/* <Link to="/featured" className="text-green-600 hover:text-green-700 text-sm font-medium">
              View All →
            </Link> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayFeatured.map((post) => (
              <div key={post._id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image || 'https://via.placeholder.com/400x200'} 
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3 text-gray-600 text-sm mb-2">
                    <span className="flex items-center gap-1">
                      <FaUser size={12} /> {post.author || 'Admin'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FaClock size={12} /> {post.readTime || '5 min'}
                    </span>
                  </div>
                  <Link to={`/blog/${post._id}`}>
                    <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2 hover:text-green-600">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.description || post.summary}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link 
                      to={`/blog/${post._id}`}
                      className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1"
                    >
                      Read Full <FaArrowRight size={12} />
                    </Link>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => toggleLike(post._id)}
                        className={`flex items-center gap-1 text-sm ${likedPosts.includes(post._id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                      >
                        {likedPosts.includes(post._id) ? <FaHeart /> : <FaRegHeart />} {post.likes || 0}
                      </button>
                      <button 
                        onClick={() => toggleSave(post._id)}
                        className={`text-sm ${savedPosts.includes(post._id) ? 'text-green-600' : 'text-gray-400 hover:text-green-600'}`}
                      >
                        {savedPosts.includes(post._id) ? <FaBookmark /> : <FaRegBookmark />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    
      {displayTrending.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaFire className="text-orange-500" /> Trending Now
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayTrending.map((post) => (
              <div key={post._id} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow duration-300">
                <div className="flex gap-4">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img 
                      src={post.image || 'https://via.placeholder.com/80'} 
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
                        <FaEye size={10} /> {post.views || 0}
                      </span>
                    </div>
                    <Link to={`/blog/${post._id}`}>
                      <h4 className="font-bold text-gray-800 text-sm line-clamp-2 mb-1 hover:text-green-600">
                        {post.title}
                      </h4>
                    </Link>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{post.readTime || '5 min'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">All Articles</h2>
          <div className="text-gray-600 text-sm">
            {allBlogs.length} articles • {activeCategory}
          </div>
        </div>
        <div className="space-y-3">
          {allBlogs.map((post) => (
            <div key={post._id} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all duration-300">
              <div className="flex gap-4">
                <div className="w-20 h-20 flex-shrink-0">
                  <img 
                    src={post.image || 'https://via.placeholder.com/80'} 
                    alt={post.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => toggleLike(post._id)}
                        className={`text-sm ${likedPosts.includes(post._id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                      >
                        <FaThumbsUp />
                      </button>
                      <button 
                        onClick={() => toggleSave(post._id)}
                        className={`text-sm ${savedPosts.includes(post._id) ? 'text-green-600' : 'text-gray-400 hover:text-green-600'}`}
                      >
                        <FaBookmark />
                      </button>
                    </div>
                  </div>
                  <Link to={`/blog/${post._id}`}>
                    <h4 className="font-bold text-gray-800 mb-1 line-clamp-2 hover:text-green-600">
                      {post.title}
                    </h4>
                  </Link>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {post.description || post.summary}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 text-gray-500 text-xs">
                      <span className="flex items-center gap-1">
                        <FaUser size={10} /> {post.author || 'Admin'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt size={10} /> {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>{post.readTime || '5 min'}</span>
                    </div>
                    <Link to={`/blog/${post._id}`} className="text-green-600 hover:text-green-700 text-sm font-medium">
                      Read →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

   
      <div ref={ref} className="py-8 flex justify-center">
        {isFetchingNextPage && <LoadingSpinner />}
        {!hasNextPage && allBlogs.length > 0 && (
          <p className="text-gray-500">No more articles to load</p>
        )}
        {allBlogs.length === 0 && !blogsLoading && (
          <p className="text-gray-500">No articles found</p>
        )}
      </div>
    </div>
  );
});

export default BlogContent;