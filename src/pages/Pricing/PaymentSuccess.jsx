import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const PaymentSuccess = () => {

    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id');
    console.log(sessionId)
    const axiosSecure = useAxiosSecure()

    const [paymentInfo, setPaymentInfo] = useState({});

    // to prevent double call i have used useRef()
    const called = useRef(false)

    useEffect(() => {
      if (!sessionId || called.current) return;

      called.current = true;

      axiosSecure
        .get(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo(res.data);
        });
    }, [sessionId, axiosSecure]);


    return (
        <div>
            <h2 className='text-4xl'>Payment Successful</h2>
            <p>Your Transaction Id: {paymentInfo.transactionId}</p>
            <p>Your Parcel Tracking Id: {paymentInfo.trackingId}</p>
        </div>
    );
};

export default PaymentSuccess;