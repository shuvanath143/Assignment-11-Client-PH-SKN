import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyLessons = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: myLessons = [] } = useQuery({
        queryKey: ['my-lessons', user?.email],
        queryFn: async () => {
            const res = await axiosSecure(``)
        }
    })
    return (
        <div>
            
        </div>
    );
};

export default MyLessons;