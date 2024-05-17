
import Cookies from 'js-cookie'
import pic1 from '../../assets/adminDashboard1.png'
import pic2 from '../../assets/adminDashboard2.png'
import pic3 from '../../assets/adminDashboard3.png'
import pic4 from '../../assets/adminDashboard4.png'
import logo from '../../assets/widelogo.png'
import icon from '../../assets/icon.png'

const posts = [
    {
        id: 1,
        title: 'View All Users',
        href: './admindashboard/users',
        imageUrl: `${pic2}`,
    },
    {
        id: 2,
        title: 'View All the Products',
        href: './admindashboard/allProducts',
        imageUrl: `${pic1}`,
    },
    {
        id: 3,
        title: 'View All Seller Requests',
        href: './admindashboard/sellerrequests',
        imageUrl: `${pic4}`,
    },
    {
        id: 4,
        title: 'View All Deals',
        href: './admindashboard/deals',
        imageUrl: `${pic3}`,
    },
    // More posts...
]

import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import AdminNavbar from '../AdminNavbar'
import { Navigate, useNavigate } from 'react-router-dom'

const userNavigation = [
    { name: 'Sign out' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function AdminDashboard() {

    const nav = useNavigate();

    const token = Cookies.get("token");

    function signOut() {
        console.log("?");
        Cookies.remove("token");
    }

    //retreive admin data
    const [adminData, setAdminData] = useState({
        userName: "",
        email: "",
    });

    const navigation = [
        { name: `${adminData.userName}`, href: '', current: true },
        { name: 'Users', href: 'admindashboard/users', current: false },
        { name: 'Products', href: 'admindashboard/allproducts', current: false },
        { name: 'Requests', href: 'admindashboard/sellerrequests', current: false },
        { name: 'Deals', href: 'admindashboard/deals', current: false },
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

    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
            <div className="min-h-full">
                <AdminNavbar navigation={navigation} adminData={adminData} />
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Control Center</h1>
                    </div>
                </header>
                <main>
                    {/* <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"> */}
                    <div className="bg-white ">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            {/* <div className="mx-auto text-center lg:mx-0">
                                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Admin Control Center</h2>

                                </div> */}
                            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                                {posts.map((post) => (
                                    <a href={post.href} key={post.id}>
                                        <article className="flex min-w-md max-w-xl hover:bg-blue-300 rounded-lg flex-col items-center p-4 border border-blue-300 justify-center">
                                            <div className="group relative">
                                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">

                                                    <span className="absolute inset-0" />
                                                    {post.title}

                                                </h3>
                                                {/* <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p> */}
                                            </div>
                                            <div className="relative mt-8 flex items-center gap-x-4">
                                                <img src={post.imageUrl} alt="" className="h-60 w-60 rounded-full bg-gray-50" />
                                                {/* <div className="text-sm leading-6">
                                    <p className="font-semibold text-gray-900">
                                        <a href={post.author.href}>
                                            <span className="absolute inset-0" />
                                            {post.author.name}
                                        </a>
                                    </p>
                                    <p className="text-gray-600">{post.author.role}</p>
                                </div> */}
                                            </div>
                                        </article>
                                    </a>
                                ))}
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

