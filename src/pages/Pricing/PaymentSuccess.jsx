// import React, { useEffect, useRef, useState } from 'react';
// import { useSearchParams } from 'react-router';
// import useAxiosSecure from '../../hooks/useAxiosSecure';


// const PaymentSuccess = () => {

//     const [searchParams] = useSearchParams()
//     const sessionId = searchParams.get('session_id');
//     console.log(sessionId)
//     const axiosSecure = useAxiosSecure()

//     const [paymentInfo, setPaymentInfo] = useState({});

//     // to prevent double call i have used useRef()
//     const called = useRef(false)

//     useEffect(() => {
//       if (!sessionId || called.current) return;

//       called.current = true;

//       axiosSecure
//         .get(`/payment-success?session_id=${sessionId}`)
//         .then((res) => {
//           setPaymentInfo(res.data);
//         });
//     }, [sessionId, axiosSecure]);


//     return (
//         <div>
//             <h2 className='text-4xl'>Payment Successful</h2>
//             <p>Your Transaction Id: {paymentInfo.transactionId}</p>
//         </div>
//     );
// };

// export default PaymentSuccess;
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});
  const called = useRef(false);

  useEffect(() => {
    if (!sessionId || called.current) return;
    called.current = true;
    console.log(sessionId)
    axiosSecure.get(`/payment-success?session_id=${sessionId}`).then((res) => {
      console.log(res.data)
      setPaymentInfo(res.data.paymentInfo);
    });
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full border-l-8 border-green-500"
      >
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-green-600 mb-2">
            Payment Successful 🎉
          </h2>
          <p className="text-gray-600">Thank you for upgrading your plan!</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Transaction ID:</span>
            <span className="text-gray-900 break-words">
              {paymentInfo.transactionId || "-"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">User Name:</span>
            <span className="text-gray-900">{paymentInfo.userName || "-"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="text-gray-900">{paymentInfo.userEmail || "-"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Amount Paid:</span>
            <span className="text-gray-900">৳ {paymentInfo.amount || "-"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Plan:</span>
            <span className="text-gray-900">
              {paymentInfo.plan || "Premium ⭐"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Date:</span>
            <span className="text-gray-900">
              {paymentInfo.date || new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-600 transition"
            onClick={() => window.location.assign("/dashboard")}
          >
            Go to Dashboard
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
