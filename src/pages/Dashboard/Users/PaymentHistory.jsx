import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import "./PaymentHistory.css";
import { 
  FaCreditCard, 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock,
  FaDownload,
  FaFilter,
  FaSearch,
  FaReceipt,
  FaChevronDown
} from "react-icons/fa";
import { MdPayment, MdHistory } from "react-icons/md";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Fetch payment history
  const { data: payments = [], isLoading, error } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Mock data for demonstration (remove when real API is connected)
  const mockPayments = [
    {
      _id: "1",
      transactionId: "TXN_2024_001",
      amount: 29.99,
      currency: "USD",
      status: "completed",
      paymentMethod: "Credit Card",
      cardLast4: "4242",
      cardBrand: "Visa",
      description: "Premium Subscription - Monthly",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:15Z",
      invoice: "INV_2024_001"
    },
    {
      _id: "2",
      transactionId: "TXN_2024_002",
      amount: 299.99,
      currency: "USD",
      status: "completed",
      paymentMethod: "PayPal",
      description: "Premium Subscription - Annual",
      createdAt: "2024-01-01T14:20:00Z",
      updatedAt: "2024-01-01T14:20:30Z",
      invoice: "INV_2024_002"
    },
    {
      _id: "3",
      transactionId: "TXN_2023_045",
      amount: 29.99,
      currency: "USD",
      status: "failed",
      paymentMethod: "Credit Card",
      cardLast4: "1234",
      cardBrand: "Mastercard",
      description: "Premium Subscription - Monthly",
      createdAt: "2023-12-15T09:15:00Z",
      updatedAt: "2023-12-15T09:15:45Z",
      failureReason: "Insufficient funds"
    },
    {
      _id: "4",
      transactionId: "TXN_2023_044",
      amount: 29.99,
      currency: "USD",
      status: "pending",
      paymentMethod: "Bank Transfer",
      description: "Premium Subscription - Monthly",
      createdAt: "2023-12-10T16:45:00Z",
      updatedAt: "2023-12-10T16:45:00Z"
    }
  ];

  // Use mock data if no real payments (for demo purposes)
  const displayPayments = payments.length > 0 ? payments : mockPayments;

  // Filter and sort payments
  const filteredPayments = displayPayments
    .filter(payment => {
      const matchesSearch = payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
      
      const paymentDate = new Date(payment.createdAt);
      const now = new Date();
      let matchesDate = true;
      
      if (dateFilter === "week") {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        matchesDate = paymentDate >= weekAgo;
      } else if (dateFilter === "month") {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        matchesDate = paymentDate >= monthAgo;
      } else if (dateFilter === "year") {
        const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        matchesDate = paymentDate >= yearAgo;
      }
      
      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      
      if (sortBy === "newest") return dateB - dateA;
      if (sortBy === "oldest") return dateA - dateB;
      if (sortBy === "amount-high") return b.amount - a.amount;
      if (sortBy === "amount-low") return a.amount - b.amount;
      return 0;
    });

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle className="text-success" />;
      case "failed":
        return <FaTimesCircle className="text-error" />;
      case "pending":
        return <FaClock className="text-warning" />;
      default:
        return <FaClock className="text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case "completed":
        return `${baseClasses} bg-success/20 text-success`;
      case "failed":
        return `${baseClasses} bg-error/20 text-error`;
      case "pending":
        return `${baseClasses} bg-warning/20 text-warning`;
      default:
        return `${baseClasses} bg-gray-200 text-gray-600`;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatAmount = (amount, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency
    }).format(amount);
  };

  const downloadInvoice = (payment) => {
    // Mock download functionality
    console.log(`Downloading invoice for ${payment.transactionId}`);
    // In real implementation, this would trigger a download from your backend
  };

  const totalSpent = filteredPayments
    .filter(p => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  if (isLoading) {
    return (
      <div className="px-4 py-6 md:px-6 md:py-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-history-container px-4 py-6 md:px-6 md:py-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <MdPayment className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-base-content">
              Payment History
            </h1>
            <p className="text-base-content/70">
              Track your subscription payments and transactions
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="stats-card bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatAmount(totalSpent)}
                </p>
              </div>
              <div className="stats-icon p-3 bg-success/10 rounded-lg">
                <FaCreditCard className="w-5 h-5 text-success" />
              </div>
            </div>
          </div>

          <div className="stats-card bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {filteredPayments.length}
                </p>
              </div>
              <div className="stats-icon p-3 bg-primary/10 rounded-lg">
                <MdHistory className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>

          <div className="stats-card bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Successful Payments</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {filteredPayments.filter(p => p.status === "completed").length}
                </p>
              </div>
              <div className="stats-icon p-3 bg-success/10 rounded-lg">
                <FaCheckCircle className="w-5 h-5 text-success" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-base-100 p-4 md:p-6 rounded-xl shadow-sm border border-base-300 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60 w-4 h-4" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 md:py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-base-100 text-base-content"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 md:py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-base-100 text-base-content"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 md:py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-base-100 text-base-content"
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 md:py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-base-100 text-base-content"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="amount-high">Amount: High to Low</option>
              <option value="amount-low">Amount: Low to High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment History Table/Cards */}
      {filteredPayments.length === 0 ? (
        <div className="empty-state bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 md:p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <FaReceipt className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No payments found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm || statusFilter !== "all" || dateFilter !== "all"
              ? "Try adjusting your filters to see more results."
              : "You haven't made any payments yet."}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Transaction
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {filteredPayments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {payment.description}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {payment.transactionId}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {formatAmount(payment.amount, payment.currency)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FaCreditCard className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-900 dark:text-white">
                              {payment.paymentMethod}
                            </div>
                            {payment.cardLast4 && (
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {payment.cardBrand} •••• {payment.cardLast4}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(payment.status)}
                          <span className={getStatusBadge(payment.status)}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </span>
                        </div>
                        {payment.failureReason && (
                          <div className="text-xs text-error mt-1">
                            {payment.failureReason}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {formatDate(payment.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {payment.invoice && payment.status === "completed" && (
                          <button
                            onClick={() => downloadInvoice(payment)}
                            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-primary hover:text-primary-focus transition-colors"
                          >
                            <FaDownload className="w-3 h-3" />
                            Invoice
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {filteredPayments.map((payment) => (
              <div
                key={payment._id}
                className="payment-card bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      {payment.description}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {payment.transactionId}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(payment.status)}
                    <span className={getStatusBadge(payment.status)}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Amount</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatAmount(payment.amount, payment.currency)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Date</p>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {formatDate(payment.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaCreditCard className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900 dark:text-white">
                      {payment.paymentMethod}
                      {payment.cardLast4 && ` •••• ${payment.cardLast4}`}
                    </span>
                  </div>
                  {payment.invoice && payment.status === "completed" && (
                    <button
                      onClick={() => downloadInvoice(payment)}
                      className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-primary hover:text-primary-focus transition-colors"
                    >
                      <FaDownload className="w-3 h-3" />
                      Invoice
                    </button>
                  )}
                </div>

                {payment.failureReason && (
                  <div className="mt-2 p-2 bg-error/10 rounded-lg">
                    <p className="text-xs text-error">
                      Failure reason: {payment.failureReason}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentHistory;