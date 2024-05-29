import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { FaLock } from 'react-icons/fa';
import { GoAlertFill } from "react-icons/go";
import avatar from '../../assets/avatar.png'
const listAllProducts = () => {

  const nav = useNavigate();
  const [products, setProducts] = useState([]);
  const [userName, setuserName] = useState('');
  const [userRole, setuserRole] = useState('');
  const navigation = [
    { name: 'DirectDealz  ', href: '/Dashboard', current: true },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8090/api/productslisted', {
          headers: {
            token: Cookies.get('token'),
          },
        });
        setProducts(response.data);
      } catch (error) {
        toast.error(error.response.data);
        console.error('Error fetching products:', error);
      }
    };

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
    setuserName(userDataResponse.userName);
    setuserRole(userDataResponse.userRole);

    console.log(userRole);


  }
  getUserDetails();

  const onclickbutton = () => {

    nav('/Seller/Edit')

  }

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    {/* Compnay logo to be inserted  */}
                    {/* <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  /> */}

                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >

                          {item.name}


                        </a>


                      ))}

                      <p className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>Hi, {userName}</p>
                      <div className="my-1 flex flex-wrap sm:flex-nowrap">
                        {userRole === "SELLER" ? (
                          <>
                            <Link to={`/Dashboard`} className="bg-red-700 text-white rounded-md px-3 py-2 text-sm font-medium text-center mb-2 sm:mb-0 sm:mr-4" aria-current="page">Dashboard</Link>
                            <Link to={`/Seller/create`} className="bg-green-800 text-white rounded-md px-3 py-2 text-sm font-medium text-center mb-2 sm:mb-0 sm:mr-4" aria-current="page">Create Products</Link>
                          </>
                        ) : (
                          <p></p>
                        )}  </div>
                    </div>

                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    {/* <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={avatar}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={`/login`}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}

                <p className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>Hi, {userName}</p>
                <div className="my-1 flex flex-wrap sm:flex-nowrap">
                  {userRole === "SELLER" ? (
                    <>
                      <Link to={`/Dashboard`} className="bg-red-700 text-white rounded-md px-3 py-2 text-sm font-medium text-center mb-2 sm:mb-0 sm:mr-4" aria-current="page">Dashboard</Link>
                      <Link to={`/Seller/create`} className="bg-green-800 text-white rounded-md px-3 py-2 text-sm font-medium text-center mb-2 sm:mb-0 sm:mr-4" aria-current="page">Create Products</Link>
                    </>
                  ) : (
                    <p></p>
                  )}

                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold my-4">Your Products</h1>
        {userRole === "BUYER" ? (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <div className="bg-red-500 rounded-t-lg p-4 justify-center transition duration-300 hover:bg-red-600 cursor-pointer">
                <GoAlertFill className="text-white h-8 w-8 mx-auto" />
              </div>
              <div className="bg-white rounded-b-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-4">Access Denied</h2>
                <p className="text-gray-700 text-center">You are not authorized to access this page.</p>
              </div>
            </div>
          </div>



        ) : products.length === 0 ? (
          <p>No products Found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Product Title</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">City</th>
                  <th className="px-4 py-2">Edit</th>
                  <th className="px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="border px-4 py-2">
                      <img
                        src={product.imageURL}
                        alt={product.title}
                        style={{ maxWidth: '100px', maxHeight: '100px' }}
                      />
                    </td>
                    <td className="border px-4 py-2">{product.title}</td>
                    <td className="border px-4 py-2">{product.description}</td>
                    <td className="border px-4 py-2">₹{product.price}</td>
                    <td className="border px-4 py-2">{product.productStatus}</td>
                    <td className="border px-4 py-2">{product.productcity}</td>
                    <td className="border px-4 py-2">
                      {product.productStatus !== "SOLD" ? (
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          <Link to={`/Seller/Edit/${product.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                          </Link>
                        </button>
                      ) : (
                        <button className="bg-gray-400 text-gray-600 font-bold py-2 px-4 rounded cursor-not-allowed" disabled>
                          <FaLock className="mr-1 inline-block" />
                          Edit
                        </button>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {product.productStatus !== "SOLD" ? (
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                          <Link to={`/Seller/Delete/${product.id}`} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                          </Link>
                        </button>
                      ) : (
                        <button className="bg-gray-400 text-gray-600 font-bold py-2 px-4 rounded cursor-not-allowed" disabled>
                          <FaLock className="mr-1 inline-block" />
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>


    </>

  );

}
export default listAllProducts;