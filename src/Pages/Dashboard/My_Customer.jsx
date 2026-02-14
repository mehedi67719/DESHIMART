import React from 'react';
import Useauth from '../../Component/Useauth';
import { useQuery } from '@tanstack/react-query';
import { buyerorder } from '../../Component/Api';

const My_Customer = () => {
    const { user } = Useauth();
    const email=user?.email;

    const { data: mycostomer = [], isLoading, error } = useQuery({
        queryKey: ["buyerOrders", email],
        enabled: !!email,
        queryFn: () => buyerorder(email)
    });

    console.log(mycostomer)

    return (
        <div>
            this is my customer page
        </div>
    );
};

export default My_Customer;