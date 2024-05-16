// // AdminDashboard.js
// import React from "react";
// import { Link, Route, Routes } from "react-router-dom";
// // import AdminProducts from "./AdminProducts";
// import AdminSellerRequests from "./AdminSellerRequests";
// // import AdminTransactions from "./AdminTransactions";

// const AdminDashboard = () => {
//     // let { path, url } = useRouteMatch();
//     const url = "/admin/dashboard";
//     return (
//         <div>
//             <h1 className="text-3xl mb-4">Admin Dashboard</h1>
//             <div className="flex justify-between">
//                 <Link
//                     to={`/products`}
//                     className="bg-blue-500 text-white py-2 px-4 rounded-md"
//                 >
//                     View Products
//                 </Link>
//                 <Link
//                     to={`./seller-requests`}
//                     className="bg-blue-500 text-white py-2 px-4 rounded-md"
//                 >
//                     View Seller Requests
//                 </Link>
//                 <Link
//                     to={`/transactions`}
//                     className="bg-blue-500 text-white py-2 px-4 rounded-md"
//                 >
//                     View Transactions
//                 </Link>
//             </div>
//             {/* <Routes> */}
//             {/* <Route exact path={path}> */}
//             {/* Render some default component or message */}
//             {/* </Route> */}
//             {/* <Route path={`/products`}>
//           <AdminProducts />
//         </Route>
//         <Route path={`/seller-requests`}>
//           <AdminSellerRequests />
//         </Route>
//         <Route path={`/transactions`}>
//           <AdminTransactions />
//         </Route>
//       </Routes> */}
//         </div>
//     );
// };

// export default AdminDashboard;


// const stats = [
//     { id: 1, name: 'Transactions every 24 hours', value: '44 million' },
//     { id: 2, name: 'Assets under holding', value: '$119 trillion' },
//     { id: 3, name: 'New users annually', value: '46,000' },
// ]

// export default function AdminDashboard() {
//     return (
//         <div className="bg-white py-24 sm:py-32">
//             <div className="mx-auto max-w-7xl px-6 lg:px-8">
//                 <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
//                     {stats.map((stat) => (
//                         <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
//                             <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
//                             <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
//                                 {stat.value}
//                             </dd>
//                         </div>
//                     ))}
//                 </dl>
//             </div>
//         </div>
//     )
// }

import Cookies from 'js-cookie';

import pic1 from '../../assets/adminDashboard1.png'
import pic2 from '../../assets/adminDashboard2.png'
import pic3 from '../../assets/adminDashboard3.png'

const posts = [
    {
        id: 1,
        title: 'View All the Products',
        href: '/allProducts',
        imageUrl: `${pic1}`,
    },
    {
        id: 2,
        title: 'View All Seller Requests',
        href: '#',
        imageUrl: `${pic2}`,
    },
    {
        id: 3,
        title: 'View All Deals and Transaction Status',
        href: '#',
        imageUrl: `${pic3}`,
    },
    // More posts...
]

export default function AdminDashboard({ history }) {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto text-center lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Admin Control Center</h2>
                    {/* <p className="mt-2 text-lg leading-8 text-gray-600">
                        An access gateway to the application!
                    </p> */}
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post) => (
                        <a href={post.href} key={post.id}>
                            <article className="flex min-w-md max-w-xl hover:bg-blue-300 rounded-lg flex-col items-center p-4 border border-blue-300 justify-center">
                                {/* <div className="flex items-center gap-x-4 text-xs">
                                <a
                                    href={post.category.href}
                                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                >
                                    {post.category.title}
                                </a>
                            </div> */}
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
            </div>
        </div>
    )
}
