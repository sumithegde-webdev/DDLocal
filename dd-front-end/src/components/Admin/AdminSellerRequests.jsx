// // AdminSellerRequests.js
// import axios from "axios";
// import React, { useEffect } from "react";
// import { useState } from "react";

// const responseAxios = axios.create({
//     headers: {
//         role: "user",
//     },
//     baseURL: "http://localhost:8090/api/admin/approve-request/",
// });

// const AdminSellerRequests = () => {
//     // Fetch and display list of seller requests
//     const [requests, setRequests] = useState({});

//     useEffect(() => { }, []);

//     const fetchRequests = async () => {
//         try {
//             const allRequestsResponse = await fetch(
//                 "http://localhost:8090/api/admin/pending-requests",
//                 {
//                     headers: {
//                         token: props.requiredToken, // Include token in the Authorization header
//                     },
//                 }
//             )
//                 .then((res) => {
//                     return res.json();
//                 })
//                 .catch((err) => {
//                     console.error(err);
//                 });
//             // const allProductsData = await allProductsResponse.json();
//             const allRequests = await allRequestsResponse;
//             setRequests(allRequests);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         }
//     };

//     const handleAccept = (requestId) => {
//         // Logic to accept the seller request
//         responseAxios
//             .post(
//                 `${requestId}`,
//                 {},
//                 {
//                     token: "",
//                 }
//             )
//             .then()
//             .catch();
//     };

//     const handleReject = (requestId) => {
//         // Logic to reject the seller request
//     };

//     return (
//         <div>
//             <h1 className="text-3xl mb-4">View Seller Requests</h1>
//             {/* Display list of seller requests here */}
//             {/* Example: */}
//             {/* <div>
//         <span>Seller Name</span>
//         <button onClick={() => handleAccept(requestId)}>Accept</button>
//         <button onClick={() => handleReject(requestId)}>Reject</button>
//       </div> */}
//         </div>
//     );
// };

// export default AdminSellerRequests;


// AdminSellerRequests.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminSellerRequests = () => {
    const [sellerRequests, setSellerRequests] = useState([]);

    useEffect(() => {
        // Fetch seller requests from the API endpoint
        axios.get('http://localhost:8090/api/admin/pending-requests', {
            headers: {
                token: `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20ifQ.pqhNI6wSknFspiBiKa1rGMVZmQQY7MLax5Lrq5qSPGE`,
            }
        })
            .then(response => {
                setSellerRequests(response.data);
            })
            .catch(error => {
                console.error('Error fetching seller requests:', error);
            });
    }, []);

    const handleApprove = (requestId) => {
        // Logic to approve the seller request
        axios.post(`http://localhost:8090/api/admin/approve-request/${requestId}`, {}, {
            headers: {
                token: `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20ifQ.pqhNI6wSknFspiBiKa1rGMVZmQQY7MLax5Lrq5qSPGE`,
            }
        })
            .then(response => {
                // If successful, update the UI or refetch seller requests
                // For simplicity, we can just remove the request from the state
                setSellerRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));
            })
            .catch(error => {
                console.error('Error approving seller request:', error);
            });
    };

    const handleReject = (requestId) => {
        // Logic to approve the seller request
        axios.post(`http://localhost:8090/api/admin/reject-request/${requestId}`, {}, {
            headers: {
                token: `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20ifQ.pqhNI6wSknFspiBiKa1rGMVZmQQY7MLax5Lrq5qSPGE`,
            }
        })
            .then(response => {
                // If successful, update the UI or refetch seller requests
                // For simplicity, we can just remove the request from the state
                setSellerRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));
            })
            .catch(error => {
                console.error('Error rejecting seller request:', error);
            });
    };

    return (
        <div>
            <h1 className="text-3xl mb-4">View Seller Requests</h1>
            <table className="m-auto w-3/5 text-center table-auto shadow-xl">
                <thead>
                    <tr>
                        <th className="border w-3/5 px-4 py-2">User name</th>
                        <th className="border w-2/5 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sellerRequests.map(request => (
                        <tr key={request.id}>
                            <td className="border px-4 py-2">{request.userName}</td>
                            <td className="border px-4 py-2">
                                <button onClick={() => handleApprove(request.id)} className="bg-green-500 hover:bg-green-700 text-black hover:text-white font-bold py-2 px-4 rounded mr-10">
                                    Approve
                                </button>
                                <button onClick={() => handleReject(request.id)} className="bg-red-500 hover:bg-red-700 text-black hover:text-white font-bold py-2 px-4 rounded">
                                    Reject
                                </button>
                            </td>
                            {/* <td className="border px-4 py-2">
                                <button onClick={() => handleReject(request.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Reject
                                </button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminSellerRequests;