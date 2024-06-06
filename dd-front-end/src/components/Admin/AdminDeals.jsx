import axios from 'axios';
import Cookies from 'js-cookie';
import AdminNavbar from '../AdminNavbar';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../constants'
const AdminDeals = () => {
    const token = Cookies.get('token');

    const [deals, setDeals] = useState([]);
    const [allBuyers, setAllBuyers] = useState({});
    const [allSellers, setAllSellers] = useState({});
    const buyers = [];
    const sellers = [];

    // const deals = [];

    const [adminData, setAdminData] = useState({
        userName: "",
        email: "",
    });

    const navigation = [
        { name: `${adminData.userName}`, href: '../admindashboard', current: false },
        { name: 'Users', href: './users', current: false },
        { name: 'Products', href: './allproducts', current: false },
        { name: 'Requests', href: './sellerrequests', current: false },
        { name: 'Deals', href: 'admindashboard/deals', current: true },
    ]

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/GetallUsers`, {
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
                    if (user.userRole === "BUYER") {
                        buyers.push(user);
                    }
                    if (user.userRole === "SELLER") {
                        sellers.push(user);
                    }
                })
                // console.log(buyers);
                setAllBuyers(buyers);
                setAllSellers(sellers);
                // console.log(buyers);
                // console.log(sellers);
            })
            .catch((error) => {
                console.error(error);
            })
            .catch((err) => { console.error(err) });
        axios.get(`${API_BASE_URL}/api/admin/alldeals`, {
            headers: {
                token: `${token}`
            }
        })
            .then((response) => {
                setDeals(response.data);
                // console.log(buyers);
                // console.log(deals);
            })
            .catch((error) => {
                console.error(error);
            })
    }, [])

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="min-h-full">
            <AdminNavbar navigation={navigation} adminData={adminData} />
            <main>
                <div className='w-full'>
                    {deals.length !== 0 ?
                        <div>
                            <div className='text-center m-auto mt-10 mb-10'>
                                <h1 className="text-4xl">All Dealz</h1>
                            </div>
                            <table className="m-auto w-4/5 text-center table-auto shadow-xl">
                                <thead>
                                    <tr>
                                        <th className="border border-black bg-blue-400 px-4 py-2">Deal ID</th>
                                        <th className="border border-black bg-blue-400 px-4 py-2">Buyer</th>
                                        <th className="border border-black bg-blue-400 px-4 py-2">Seller</th>
                                        <th className="border border-black bg-blue-400 px-4 py-2">Product</th>
                                        <th className="border border-black bg-blue-400 px-4 py-2">Date of Deal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {deals.map(deal => (
                                        <tr key={deal.id}>
                                            <td className="border border-black text-sm px-4 py-2">{deal.id}</td>
                                            {
                                                allBuyers.map((buyer) => {
                                                    if (buyer.id === deal.buyerId) {
                                                        return (
                                                            <td key={buyer.id} className="border border-black text-md px-4 py-2">{buyer.userName}</td>
                                                        )
                                                    }
                                                })
                                            }
                                            {
                                                allSellers.map((seller) => {
                                                    if (seller.id === deal.sellerId) {
                                                        return (
                                                            <td key={seller.id} className="border border-black text-md px-4 py-2">{seller.userName}</td>
                                                        )
                                                    }
                                                })
                                            }
                                            <td className="border border-black text-sm px-4 py-2">{deal.productId}</td>
                                            <td className="border border-black text-sm px-4 py-2">{deal.timestamp.slice(0, 10)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        :
                        <div className='text-center m-auto mt-10 mb-10'>
                            <h1 className="text-4xl">No Dealz to show!</h1>
                        </div>
                    }
                </div>
            </main >
        </div >
    )
};

export default AdminDeals;