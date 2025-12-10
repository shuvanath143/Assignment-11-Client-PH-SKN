import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const usePremium = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    
    const { isLoading: isPremiumAccessLoading, data: isPremium = false } = useQuery({
        queryKey: ['user-premium', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}?isPremium=true`)
            return res.data?.isPremium || false
        }
    })

    return { isPremium, isPremiumAccessLoading };
};

export default usePremium;