import React from 'react';
import { FaTimes } from 'react-icons/fa';

const MobileFilterModal = ({ 
  showMobileFilter, 
  setShowMobileFilter, 
  categories, 
  activeCategory, 
  setActiveCategory 
}) => {
  if (!showMobileFilter) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
      <div className="fixed right-0 top-0 h-full w-72 bg-white p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={() => setShowMobileFilter(false)} className="text-gray-500">
            <FaTimes />
          </button>
        </div>
        <div className="space-y-6">
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
  );
};

export default MobileFilterModal;