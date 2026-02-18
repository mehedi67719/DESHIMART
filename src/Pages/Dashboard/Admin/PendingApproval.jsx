import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { PendingProducts } from '../../../Component/Api';

const PendingApproval = () => {



    const {data,isLoading,error}=useQuery({
        queryKey:"pending-peoducts",
        queryFn:PendingProducts
    })



    

    return (
        <div>
            this is pending approval page
        </div>
    );
};

export default PendingApproval;