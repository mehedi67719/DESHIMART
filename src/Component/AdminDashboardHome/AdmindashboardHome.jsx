import React, { useState } from 'react';
import { 
    Home, ShoppingCart, PieChart as PieChartIcon, BarChart3 
} from 'lucide-react';

import Useauth from '../Useauth';
import BuyerDashboardHome from '../BuyerDashboardHome/BuyerDashboardHome';
import PlatformGrowthAndCategories from './PlatformGrowthAndCategories';
import PaymentProductsAndOrderStatus from './PaymentProductsAndOrderStatus';
import TopFiveProducts from './TopFiveProducts';
import Topsellerandbuyer from './Topsellerandbuyer';
import SellingAndOrder from './SellingAndOrder';
import DashboardHeader from './DashboardHeader';

const AdminDashboardHome = () => {
    const { user } = Useauth();
    const [activeView, setActiveView] = useState('admin');

    

  
    const AdminView = () => (
        <div className="space-y-6">
      
           
<DashboardHeader/>
   
        
<SellingAndOrder/>
    
          
<PlatformGrowthAndCategories/>
       
<PaymentProductsAndOrderStatus/>

            
  <TopFiveProducts/>

          
    <Topsellerandbuyer/>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="bg-white border-b px-6 py-4 sticky top-0 z-10">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                        <p className="text-sm text-gray-500">Welcome back, {user?.displayName || 'Admin'}</p>
                    </div>
                    <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                        <button 
                            onClick={() => setActiveView('admin')}
                            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
                                activeView === 'admin' 
                                    ? 'bg-white shadow text-blue-600' 
                                    : 'text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            <Home className="w-4 h-4" /> As Admin
                        </button>
                        <button 
                            onClick={() => setActiveView('buyer')}
                            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
                                activeView === 'buyer' 
                                    ? 'bg-white shadow text-green-600' 
                                    : 'text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            <ShoppingCart className="w-4 h-4" /> As Buyer
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {activeView === 'admin' ? <AdminView /> : <BuyerDashboardHome />}
            </div>
        </div>
    );
};

export default AdminDashboardHome;