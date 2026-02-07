import React from 'react';
import { useNavigate } from 'react-router';

const PaymentFail = () => {
  const navigate = useNavigate();

  const handleBackToShop = () => {
    navigate('/shop');
  };

  const handleTryAgain = () => {
    navigate('/cart');
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-orange-50 to-white p-4">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-orange-200 hover:shadow-3xl transition-all duration-500">
          <div className="relative bg-gradient-to-br from-orange-500 to-orange-700 p-6 text-center">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
            </div>
            <div className="pt-10">
              <h1 className="text-2xl font-bold text-white mb-2">Payment Failed</h1>
              <p className="text-orange-100 text-sm">Transaction could not be processed</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-orange-50 rounded-full">
                <svg className="w-12 h-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Payment Processing Error</h2>
              <p className="text-gray-600 text-sm mb-4">We encountered an issue while processing your payment. Please try again or use a different payment method.</p>
              
              <div className="bg-orange-50 rounded-lg p-4 mb-4 border border-orange-100">
                <p className="text-sm font-medium text-orange-700 mb-2">Possible reasons:</p>
                <ul className="text-xs text-gray-600 text-left space-y-1">
                  <li className="flex items-start">
                    <svg className="w-3 h-3 text-orange-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Insufficient funds in your account
                  </li>
                  <li className="flex items-start">
                    <svg className="w-3 h-3 text-orange-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Bank server is temporarily down
                  </li>
                  <li className="flex items-start">
                    <svg className="w-3 h-3 text-orange-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Incorrect card information
                  </li>
                  <li className="flex items-start">
                    <svg className="w-3 h-3 text-orange-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Daily transaction limit exceeded
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <button 
                onClick={handleTryAgain}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold py-3.5 px-4 rounded-xl transition duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 group"
              >
                <svg className="w-5 h-5 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Try Payment Again
              </button>
              
              <button 
                onClick={handleBackToShop}
                className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-3.5 px-4 rounded-xl transition duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 group border border-gray-800"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                Back to Shopping
              </button>
            </div>
            
        
          </div>
  
        </div>
        
    
      </div>
    </div>
  );
};

export default PaymentFail;