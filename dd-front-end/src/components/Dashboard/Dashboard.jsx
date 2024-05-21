import { all } from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import  widelogo  from '../../assets/widelogo.png'
import avatar from '../../assets/avatar.png'

const Dashboard = () => {
    const nav = useNavigate();
    const { productId } = useParams();
    const [products, setProducts] = useState([]);
    const [userName, setuserName] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cityFilter, setCityFilter] = useState('');
    const [token, setToken] = useState(''); // Assuming you have a way to get the token
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const token = Cookies.get('token');

        fetchProducts();

    }, []);

    const getUserDetails = async () => {
        const userData = await fetch('http://localhost:8090/api/getuserdetailsbytoken', {

            headers: {
                token: Cookies.get('token'),
                role: "user"
            },
        });
        const userDataResponse = await userData.json();
        setUserRole(userDataResponse.userRole);
        setuserName(userDataResponse.userName);

    }

    getUserDetails();

    const fetchProducts = async () => {
        try {
            const allProductsResponse = await fetch('http://localhost:8090/api/listedproducts', {

                headers: {
                    token: Cookies.get('token'), // Include token in the Authorization header
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
                    token: Cookies.get('token'),
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


    return (
        <div className="min-h-full">
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                {/* Compnay Logo  */}
                                <img className="h-10 w-15" src={widelogo}alt="Your Company" />
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {/* <a href="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">DirectDealz</a> */}
                                    <p className='text-white'>Welcome, {userName}</p>
                                    {userRole == "SELLER" ? (
                                        <div className="flex justify-center my-4">


                                            <Link to={`/Seller/create`} className="bg-orange-700 text-white rounded-md px-3 py-2 text-sm font-medium text-center mx-4 ml-80" aria-current="page">Create Products</Link>
                                            <Link to={`/Seller/AllProducts`} className="bg-green-800 text-white rounded-md px-3 py-2 text-sm font-medium text-center mx-4" aria-current="page">Manage Products</Link>

                                        </div>
                                    ) : (
                                        <p></p>
                                    )}
                                </div>


                            </div>

                        </div>

                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                {userRole == "BUYER" ? (
                                    <div>
                                        <Link to={`/seller/request`} className='bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Become Seller</Link>


                                    </div>
                                ) : (
                                    <p></p>
                                )}
                                <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">View notifications</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
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
                                            src={avatar}
                                            alt=""
                                        />
                                    </button>
                                    {menuOpen && (
                                        <div className="absolute right-0 mt-2 w-47 bg-white rounded-md shadow-lg">
                                            <button
                                                className="block px-16 py-2 text-sm text-gray-700 hover:bg-slate-400 whitespace-nowrap"
                                                onClick={() => {
                                                    nav('/myOrders');
                                                }}
                                            >
                                                View Your Deals
                                            </button>
                                            <button
                                                className="block px-16 w-full py-2 text-sm text-gray-700 hover:bg-slate-400 whitespace-nowrap "
                                                onClick={() => {
                                                    // Handle sign out action
                                                    Cookies.remove('token');
                                                    // nav('/login')
                                                    //changed this to route to DirectDealz HomePage
                                                    nav('/')
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
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="md:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                        <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">DirectDealz</a>

                    </div>
                    <div className="border-t border-gray-700 pb-3 pt-4">
                        <div className="flex items-center px-5">
                            <div className="flex-shrink-0">
                                {/* <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium leading-none text-white">Welcome {userName} </div>
                            </div>
                            <button type="button" className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="absolute -inset-1.5"></span>
                                <span className="sr-only">View notifications</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-3 space-y-1 px-2">
                            {userRole == "BUYER" ? (
                                <div>
                                    <Link to={`/seller/request`} className='bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Become Seller</Link>


                                </div>
                            ) : (
                                <p></p>
                            )}
                            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Your Orders</a>
                            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Sign out</a>
                        </div>
                    </div>
                </div>
            </nav>

            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="relative">
                            <input type="text" id="search" placeholder="Search products..." className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleCityFilterChange} />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m-1.38-2.58a8.5 8.5 0 111.38-1.38M8 17a7 7 0 100-14 7 7 0 000 14z" />
                                </svg>
                            </div>
                        </div>
                        <button className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleSearchButtonClick} style={{ backgroundColor: "#2461FF" }}>
                            Search
                        </button>
                    </div>
                </div>
            </header>

            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {products.length === 0 ? (
                            <RedBox>No products available.</RedBox>
                        ) : (
                            cityFilter === '' ? products.map((product) => (
                                <div key={product.id} className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="p-4">
                                        <img src={product.imageURL} alt="" srcSet="" />
                                        <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
                                        <p className="mt-2 text-sm text-gray-500">{product.description}</p>
                                        <p className="mt-2 text-sm text-gray-500">₹{product.price}</p>
                                        <p className="mt-2 text-sm text-gray-500">{product.productcity}</p>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6">
                                        <Link to={`/products/${product.id}`} className='w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' style={{ backgroundColor: "#2461FF" }}>
                                            View Product
                                        </Link>
                                    </div>
                                </div>
                            )) : filteredProducts.length > 0 ? filteredProducts.map((product) => (
                                <div key={product.id} className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="p-4">
                                        <img src={product.imageURL} alt="" srcSet="" />
                                        <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
                                        <p className="mt-2 text-sm text-gray-500">{product.description}</p>
                                        <p className="mt-2 text-sm text-gray-500">₹{product.price}</p>
                                        <p className="mt-2 text-sm text-gray-500">{product.productcity}</p>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6">
                                        <Link to={`/products/${product.id}`} className='w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' style={{ backgroundColor: "#2461FF" }}>
                                            View Product
                                        </Link>
                                    </div>
                                </div>
                            )) : (
                                <RedBox>No Products Found for your search.</RedBox>
                            )
                        )}
                    </div>
                </div>

            </main>
        </div>
    );
};
const RedBox = styled.div`
background-color: #f8d7da; 
border-color: #f5c6cb; 
border-width: 1px;
border-radius: 4px;
padding: 1rem;
margin: 1rem 0;
color: #721c24; 
text-align: center;
justify-conter : center;
align-items : center;
`;

export default Dashboard;
