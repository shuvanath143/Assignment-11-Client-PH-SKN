import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
      <div>
        <h2>Payment is Cancelled. Please try again later.</h2>
        <Link to="/pricing">
          <button className="btn btn-primary">Try again</button>
        </Link>
      </div>
    );
};

export default PaymentCancelled;