// AdminSellerRequests.js
import React from "react";

const AdminSellerRequests = () => {
  // Fetch and display list of seller requests
  const handleAccept = (requestId) => {
    // Logic to accept the seller request
  };

  const handleReject = (requestId) => {
    // Logic to reject the seller request
  };

  return (
    <div>
      <h1 className="text-3xl mb-4">View Seller Requests</h1>
      {/* Display list of seller requests here */}
      {/* Example: */}
      {/* <div>
        <span>Seller Name</span>
        <button onClick={() => handleAccept(requestId)}>Accept</button>
        <button onClick={() => handleReject(requestId)}>Reject</button>
      </div> */}
    </div>
  );
};

export default AdminSellerRequests;
