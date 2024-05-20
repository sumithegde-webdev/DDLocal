import axios from 'axios';
import Cookies from 'js-cookie';
import AdminNavbar from '../AdminNavbar';
import { useState, useEffect } from 'react';

const AdminSellerRequests = () => {
    const token = Cookies.get('token');

    const [sellerRequests, setSellerRequests] = useState([]);

    const [adminData, setAdminData] = useState({
        userName: "",
        email: "",
    });

    const navigation = [
        { name: `${adminData.userName}`, href: '../admindashboard', current: false },
        { name: 'Users', href: './users', current: false },
        { name: 'Products', href: './allproducts', current: false },
        { name: 'Requests', href: 'admindashboard/sellerrequests', current: true },
        { name: 'Deals', href: './deals', current: false },
    ]

    useEffect(() => {
        axios.get("http://localhost:8090/api/GetallUsers", {
            headers: {
                token: `${token}`,
            }
        })
            .then((response) => {
                response.data.map((user) => {
                    if (user.userRole === "ADMIN") {
                        setAdminData({
                            userName: user.userName,
                            email: user.email,
                        })
                    }
                })
            })
            .catch((err) => { console.error(err) });
    }, [])

    useEffect(() => {
        // Fetch seller requests from the API endpoint
        axios.get('http://localhost:8090/api/admin/pending-requests', {
            headers: {
                token: `${token}`,
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
                token: `${token}`,
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
                token: `${token}`,
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

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="min-h-full">
            <AdminNavbar navigation={navigation} adminData={adminData} />
            <main>
                <div className='w-full'>
                    {sellerRequests.length != 0 ?
                        <>
                            <div className='text-center m-auto mt-10 mb-10'>
                                <h1 className="text-4xl">Seller Requests</h1>
                            </div>
                            <table className="m-auto w-4/5 text-center table-auto shadow-xl">
                                <thead>
                                    <tr>
                                        <th className="border border-black bg-blue-400 w-3/5 px-4 py-2">User name</th>
                                        <th className="border border-black bg-blue-400 w-2/5 px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sellerRequests.map(request => (
                                        <tr key={request.id}>
                                            <td className="border border-black text-xl px-4 py-2">{request.userName}</td>
                                            <td className="border border-black px-4 py-2">
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
                        </>
                        :
                        <>
                            <div className='text-center m-auto mt-36'>
                                <h1 className="text-4xl">No 'Seller' requests at the moment.</h1>
                            </div>
                        </>
                    }
                </div>
            </main >
        </div >
    )
};

export default AdminSellerRequests;