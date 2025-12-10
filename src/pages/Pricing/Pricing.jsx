import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const Pricing = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: userInfo = {} } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/?email=${user?.email}`)
            return res.data
        },
        enabled: !!user?.email
    })
    const handleUpgradeToPremium = async (userInfo) => {
      const isPremium = userInfo.isPremium;

      if (!isPremium) {
        const paymentInfo = {
          cost: 150000,
          userId: userInfo._id,
          email: userInfo.email,
          userName: userInfo.displayName,
        };
        const res = await axiosSecure.post(
          "/create-checkout-session",
          paymentInfo
        );
        window.location.assign(res.data.url);
      } else {
        Swal.fire("You are already a premium member!");
      }
    };

    return (
        <div>
            Please pay
            <button onClick={() => handleUpgradeToPremium(userInfo)} className="btn btn-primary">Upgrade to premium</button>
        </div>
    );
}

export default Pricing;