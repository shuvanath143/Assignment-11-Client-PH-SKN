import React from 'react';
import { Link } from 'react-router';
import { motion } from "framer-motion";

const PaymentCancelled = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-red-500">Payment Canceled</h2>
          <p>Your payment was not completed. You can try again anytime.</p>
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
      </div>
      // <div>
      //   <h2>Payment is Cancelled. Please try again later.</h2>
      //   <Link to="/pricing">
      //     <button className="btn btn-primary">Try again</button>
      //   </Link>
      // </div>
    );
};

export default PaymentCancelled;