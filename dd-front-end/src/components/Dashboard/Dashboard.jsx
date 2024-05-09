import { all } from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";


const Dashboard = () => {
    const nav = useNavigate();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cityFilter, setCityFilter] = useState('');
    const [token, setToken] = useState(''); // Assuming you have a way to get the token
    const [userRole, setUserRole] = useState('');



    useEffect(() => {
        const token = import.meta.env.VITE_TOKEN; // Assuming token is stored in localStorage


        fetchProducts();
       
    }, []);

    const getUserDetails = async () => {
        const userData = await fetch('http://localhost:8090/api/getuserdetailsbytoken', {

            headers: {
                token: import.meta.env.VITE_TOKEN,
                role: "user"
            },
        });
        const userDataResponse = await userData.json();
         setUserRole(userDataResponse.userRole);
       

        
    }

    getUserDetails();

    const fetchProducts = async () => {
        try {
            const allProductsResponse = await fetch('http://localhost:8090/api/listedproducts', {

                headers: {
                    token: import.meta.env.VITE_TOKEN, // Include token in the Authorization header
                },
            });
            const allProductsData = await allProductsResponse.json();
            setProducts(allProductsData);
            setFilteredProducts(allProductsData);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchFilteredProducts = async () => {
        try {
            const filteredProductsResponse = await fetch(`http://localhost:8090/api/listbycity/${cityFilter}`, {
                headers: {
                    token: import.meta.env.VITE_TOKEN, // Include token in the Authorization header
                },
            });
            const filteredProductsData = await filteredProductsResponse.json();
            setFilteredProducts(filteredProductsData);
        } catch (error) {
            console.error('Error fetching filtered products:', error);
        }
    };

    const handleCityFilterChange = (e) => {

        setCityFilter(e.target.value);
    };

    const handleSearchButtonClick = () => {
        fetchFilteredProducts();
    };
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    
    const handleBecomeSellerClick = () => {
        nav("/");

    }

    return (
        <div class="min-h-full">
            <nav class="bg-gray-800">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="flex h-16 items-center justify-between">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                {/* Compnay Logo  */}
                                {/* <img class="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" /> */}
                            </div>
                            <div class="hidden md:block">
                                <div class="ml-10 flex items-baseline space-x-4">
                                    <a href="#" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</a>

                                </div>
                            </div>

                        </div>

                        <div class="hidden md:block">
                            <div class="ml-4 flex items-center md:ml-6">
                            {userRole == "BUYER" ? (
                <div>
                  <button class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleBecomeSellerClick}> 
                                Become Buyer </button>

                </div>
            ) : (
                <p></p>
            )}
                                <button type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span class="absolute -inset-1.5"></span>
                                    <span class="sr-only">View notifications</span>
                                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                    </svg>
                                </button>
                                <div className="relative">
                                    <button
                                        type="button"
                                        className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        id="user-menu-button"
                                        aria-expanded={menuOpen}
                                        aria-haspopup="true"
                                        onClick={toggleMenu}
                                    >
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                    </button>
                                    {menuOpen && (
                                        <div className="absolute right-0 mt-2 w-47 bg-white rounded-md shadow-lg">
                                            <button
                                                className="block px-16 py-2 text-sm text-gray-700 hover:bg-slate-400 whitespace-nowrap"
                                                onClick={() => {
                                                    // Handle sign out action
                                                }}
                                            >
                                                View Orders
                                            </button>
                                            <button
                                                className="block px-16 w-full py-2 text-sm text-gray-700 hover:bg-slate-400 whitespace-nowrap "
                                                onClick={() => {
                                                    // Handle sign out action
                                                }}
                                            >
                                                Sign Out
                                            </button>

                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div class="-mr-2 flex md:hidden">
                            <button type="button" class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded="false">
                                <span class="absolute -inset-0.5"></span>
                                <span class="sr-only">Open main menu</span>
                                <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="md:hidden" id="mobile-menu">
                    <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                        <a href="#" class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>

                    </div>
                    <div class="border-t border-gray-700 pb-3 pt-4">
                        <div class="flex items-center px-5">
                            <div class="flex-shrink-0">
                                {/* <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
                            </div>
                            <div class="ml-3">
                                <div class="text-base font-medium leading-none text-white">Tom Cook</div>
                                <div class="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
                            </div>
                            <button type="button" class="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span class="absolute -inset-1.5"></span>
                                <span class="sr-only">View notifications</span>
                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                </svg>
                            </button>
                        </div>
                        <div class="mt-3 space-y-1 px-2">
                            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Your Orders</a>
                            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Sign out</a>
                        </div>
                    </div>
                </div>
            </nav>

            <header class="bg-white shadow">
                <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between mb-6">
                        <div class="relative">
                            <input type="text" id="search" placeholder="Search products..." class="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleCityFilterChange} />
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m-1.38-2.58a8.5 8.5 0 111.38-1.38M8 17a7 7 0 100-14 7 7 0 000 14z" />
                                </svg>
                            </div>
                        </div>
                        <button class="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleSearchButtonClick}   style={{backgroundColor: "#2461FF"}}>
                            Search
                        </button>
                    </div>
                </div>
            </header>

            <main>
                <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {cityFilter === '' ? products.map((product) => (
                            <div key={product.id} class="bg-white overflow-hidden shadow rounded-lg">
                                <div class="p-4">
                                    <h3 class="text-lg font-medium text-gray-900">{product.title}</h3>
                                    <p class="mt-2 text-sm text-gray-500">{product.description}</p>
                                    <p class="mt-2 text-sm text-gray-500">₹{product.price}</p>
                                    <p class="mt-2 text-sm text-gray-500">{product.productcity}</p>

                                    {/* Display Seller name  */}
                                    {/* <p class="mt-2 text-sm text-gray-500">{product.userId}</p> */}
                                </div>
                                <div class="bg-gray-50 px-4 py-3 sm:px-6">
                                    <button class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"   style={{backgroundColor: "#2461FF"}}>
                                        View Product
                                    </button>
                                </div>
                            </div>
                        ))
                            : filteredProducts.map((product) => (
                                <div key={product.id} class="bg-white overflow-hidden shadow rounded-lg">
                                    <div class="p-4">
                                        <h3 class="text-lg font-medium text-gray-900">{product.title}</h3>
                                        <p class="mt-2 text-sm text-gray-500">{product.description}</p>
                                        <p class="mt-2 text-sm text-gray-500">₹{product.price}</p>
                                        <p class="mt-2 text-sm text-gray-500">{product.productcity}</p>

                                        {/* Display Seller name  */}
                                        {/* <p class="mt-2 text-sm text-gray-500">{product.userId}</p> */}
                                    </div>
                                    <div class="bg-gray-50 px-4 py-3 sm:px-6">
                                        <button class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            View Product
                                        </button>
                                    </div>
                                </div>
                            ))}

                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
