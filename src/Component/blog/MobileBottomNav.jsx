import React from 'react';
import { FaBook, FaFire, FaBookmark, FaUser } from 'react-icons/fa';
import { Link } from 'react-router';

const MobileBottomNav = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40">
      <div className="flex justify-around items-center py-3">
        <button 
          onClick={() => setActiveCategory('All')}
          className={`flex flex-col items-center ${activeCategory === 'All' ? 'text-green-600' : 'text-gray-600'}`}
        >
          <FaBook />
          <span className="text-xs mt-1">Home</span>
        </button>
        <Link to="/trending" className="flex flex-col items-center text-gray-600">
          <FaFire />
          <span className="text-xs mt-1">Trending</span>
        </Link>
        <Link to="/saved" className="flex flex-col items-center text-gray-600">
          <FaBookmark />
          <span className="text-xs mt-1">Saved</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center text-gray-600">
          <FaUser />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileBottomNav;