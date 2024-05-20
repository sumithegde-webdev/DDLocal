
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react'
import AdminNavbar from '../AdminNavbar';
import Cookies from 'js-cookie';

const AdminUsers = () => {
    const token = Cookies.get('token');

    const [userInfo, setUserInfo] = useState([]);

    const [adminData, setAdminData] = useState({
        userName: "",
        email: "",
    });

    const navigation = [
        { name: `${adminData.userName}`, href: '../admindashboard', current: false },
        { name: 'Users', href: 'admindashboard/users', current: true },
        { name: 'Products', href: './allproducts', current: false },
        { name: 'Requests', href: './sellerrequests', current: false },
        { name: 'Deals', href: './deals', current: false },
    ]

    useEffect(() => {
        axios.get("http://localhost:8090/api/GetallUsers", {
            headers: {
                token: `${token}`,
            }
        })
            .then((response) => {
                setUserInfo(response.data);
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

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="min-h-full">
            <AdminNavbar navigation={navigation} adminData={adminData} />
            <main>
                <div className='w-full'>
                    <div className='text-center m-auto mt-10 mb-10'>
                        <h1 className="text-4xl">Users Information</h1>
                    </div>
                    <table className="m-auto w-4/5 text-center table-auto shadow-xl">
                        <thead>
                            <tr>
                                <th className="border border-black bg-blue-400 w-3/5 px-4 py-2">User name</th>
                                <th className="border border-black bg-blue-400 w-3/5 px-4 py-2">Email</th>
                                <th className="border border-black bg-blue-400 w-3/5 px-4 py-2">Phone Number</th>
                                <th className="border border-black bg-blue-400 w-3/5 px-4 py-2">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userInfo.map(user => (
                                user.userRole !== "ADMIN" && <tr key={user.id} className={user.userRole === "SELLER" ? "bg-gray-400" : user.requestStatus !== "REJECTED" ? "bg-green-200" : "bg-red-200"}>
                                    <td className="border border-black text-xl px-4 py-2">{user.userName}</td>
                                    <td className="border border-black text-xl px-4 py-2">{user.email}</td>
                                    <td className="border border-black text-xl px-4 py-2">{user.phoneNumber}</td>
                                    <td className="border border-black text-xl px-4 py-2">{user.userRole}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main >
        </div >
    )
};

export default AdminUsers;