import React from 'react';

const Logo = () => {
    return (
        <div className='flex items-center space-x-2'>
       
            <div className="relative group">
     
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-200/50 transition-all duration-300">
                    <span className="text-white font-bold text-2xl tracking-tight">D</span>
                </div>
                
           
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full border-2 border-white"></div>
                
            
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                    DESHIMART
                </h2>
                <p className="text-xs text-gray-500 font-medium tracking-wide">
                    Premium Shopping
                </p>
            </div>
        </div>
    );
};

export default Logo;