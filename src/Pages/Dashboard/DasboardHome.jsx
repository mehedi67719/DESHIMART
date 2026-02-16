import React from 'react';
import SellerDashboardchart from '../../Component/SellerDashboardHome/SellerDashboardchart';
import TopsellingsellerDashboard from '../../Component/SellerDashboardHome/TopsellingsellerDashboard';
import DashboardHomeMyproducts from '../../Component/SellerDashboardHome/DashboardHomeMyproducts';


const DasboardHome = () => {
    return (
        <div>
            <SellerDashboardchart/>
            <TopsellingsellerDashboard/>
            
        </div>
    );
};

export default DasboardHome;