import React from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import usePremium from "../../hooks/usePremium";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const Pricing = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { isPremium } = usePremium()

  const { data: userInfo = {} } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleUpgradeToPremium = async (userInfo) => {
    // const isPremium = userInfo.isPremium;

    if (!isPremium) {
      const paymentInfo = {
        cost: 1500 * 100, // ৳1500
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

  // Already premium state
  if (isPremium) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-yellow-500">
            Premium Member ⭐
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You already have lifetime premium access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:to-black">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Upgrade to <span className="text-purple-600">Premium ⭐</span>
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          One-time payment • Lifetime access • No subscription
        </p>
      </motion.div>

      {/* Plans */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="rounded-2xl border bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold mb-2">Free</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Basic access</p>

          <p className="text-4xl font-extrabold mb-6">৳0</p>

          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li>✔ Access public lessons</li>
            <li>✔ Limited lesson creation</li>
            <li>✖ Premium lessons</li>
            <li>✖ Ad-free experience</li>
            <li>✖ Priority listing</li>
            <li>✖ Premium badge</li>
            <li>✖ Advanced analytics</li>
            <li>✖ Early access features</li>
          </ul>
        </div>

        {/* Premium Plan */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative rounded-2xl border-2 border-purple-500
            bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl
            p-8 shadow-2xl"
        >
          <span className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm px-3 py-1 rounded-full">
            Best Value
          </span>

          <h3 className="text-2xl font-bold mb-2">Premium ⭐</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            For serious creators
          </p>

          <p className="text-4xl font-extrabold mb-1">৳1500</p>
          <p className="text-sm text-gray-500 mb-6">
            One-time payment (Lifetime)
          </p>

          <ul className="space-y-3 text-gray-800 dark:text-gray-200">
            <li>✔ Unlimited lesson creation</li>
            <li>✔ Create premium lessons</li>
            <li>✔ Ad-free experience</li>
            <li>✔ Priority lesson listing</li>
            <li>✔ Premium ⭐ badge</li>
            <li>✔ Advanced analytics</li>
            <li>✔ Early feature access</li>
            <li>✔ Priority support</li>
          </ul>

          <button
            onClick={() => handleUpgradeToPremium(userInfo)}
            className="mt-8 w-full py-3 rounded-xl text-white font-semibold
              bg-gradient-to-r from-purple-600 to-pink-500
              hover:opacity-90 transition"
          >
            Upgrade to Premium
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
