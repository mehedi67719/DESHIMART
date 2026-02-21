import React from 'react';
import SellerDashboardHome from '../../Component/SellerDashboardHome/SellerDashboardHome';
import Useauth from '../../Component/Useauth';
import { useQuery } from '@tanstack/react-query';
import { getuser } from '../../Component/Api';
import AdmindashboardHome from '../../Component/AdminDashboardHome/AdmindashboardHome';
import BuyerDashboardHome from '../../Component/BuyerDashboardHome/BuyerDashboardHome';

const DashboardHome = () => {
    const { user } = Useauth();

    const { data, isLoading, error } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: () => getuser(user?.email),
        enabled: !!user?.email,
    });

    if (!user) {
        return <div>Please login first</div>;
    }

    if (isLoading) {
        return <div className="flex justify-center items-center h-[60vh]">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
        </div>;
    }

    if (error) {
        return <div className='text-center text-red-500'>Error loading user data</div>;
    }


    // console.log(data)


    if(data.role=="seller"){
        return  <SellerDashboardHome />
    }

    if(data.role=="admin"){
        return <AdmindashboardHome/>
    }

   

    return (
        <BuyerDashboardHome/>
    );
};

export default DashboardHome;
