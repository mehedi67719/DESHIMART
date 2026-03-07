import React from 'react';
import { FaSearch, FaBook, FaFilter, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router';

const BlogHeader = ({ searchTerm, handleSearch, clearSearch, setShowMobileFilter }) => {
  return (
    <div className="bg-white border-b sticky top-0 z-30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FaBook className="text-green-600" /> Blog Hub
            </h1>
          </Link>
          <p className="hidden md:block text-gray-600 text-sm">Learn smarter shopping tips</p>
          
          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
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

          {/* Mobile Filter Button */}
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
              onChange={handleSearch}
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
  );
};

export default BlogHeader;