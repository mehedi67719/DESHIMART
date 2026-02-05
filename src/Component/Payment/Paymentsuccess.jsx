import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';

const Paymentsuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [transactionId, setTransactionId] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('tran_id');
    if (id) {
      setTransactionId(id);
      setOrderNumber(id.substring(0, 8).toUpperCase());
    }
  }, [location.search]);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleBackToShop = () => {
    navigate('/shop');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-green-50 to-white p-4">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-green-200 hover:shadow-3xl transition-all duration-500">
          <div className="relative bg-gradient-to-br from-green-500 to-green-700 p-6 text-center">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl animate-bounce">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <div className="pt-10">
              <h1 className="text-2xl font-bold text-white mb-2">Payment Successful!</h1>
              <p className="text-green-100 text-sm">Transaction completed successfully</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Thank You!</h2>
              <p className="text-gray-600 text-sm mb-6">Your order is confirmed and being processed</p>
              
              <div className="bg-gradient-to-r from-green-50 to-white rounded-lg p-5 mb-6 border border-green-100 shadow-inner">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-green-100 pb-3">
                    <span className="text-sm font-medium text-gray-500">Order No.</span>
                    <span className="text-base font-bold text-gray-800">{orderNumber}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2 text-left">Transaction ID</p>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <p className="text-xs font-mono text-gray-700 break-all">{transactionId}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <button 
                onClick={handleBackToShop}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3.5 px-4 rounded-xl transition duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 group"
              >
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                Continue Shopping
              </button>
              
              <button 
                onClick={handleBackToHome}
                className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-3.5 px-4 rounded-xl transition duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 group border border-gray-800"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Back to Home
              </button>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <p className="text-center text-gray-500 text-xs mb-4">Need assistance with your order?</p>
              <div className="flex justify-center space-x-8">
                <button className="text-green-600 hover:text-green-800 font-medium text-sm transition duration-300 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  Support
                </button>
                <button className="text-green-600 hover:text-green-800 font-medium text-sm transition duration-300 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Invoice
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 text-white text-center py-4">
            <p className="text-xs">© 2023 Your Brand. All rights reserved.</p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-100"></div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paymentsuccess;