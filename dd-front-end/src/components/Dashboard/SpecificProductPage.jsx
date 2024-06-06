import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { FaLock } from 'react-icons/fa';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar.png'
import { API_BASE_URL } from '../../constants';
const SpecificProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [dealLocked, setDealLocked] = useState(false);
  const [userName, setuserName] = useState('');
  const nav = useNavigate();
  const navigation = [
    { name: 'DirectDealz  ', href: '/Dashboard', current: true },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/GetProductById`, {
          headers: {
            token: Cookies.get('token'),
            productId: productId,
          },
        });
        setProduct(response.data);
        if (response.data.productStatus === 'SOLD') {
          setDealLocked(true);
        }
      } catch (error) {
        toast.error(error.response.data);
        console.error('Error fetching product:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDealLock = async () => {
    const confirmLock = window.confirm('Are you sure you want to lock the deal?');

    if (!confirmLock) {
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/deals/lock`, {}, {
        headers: {
          token: Cookies.get('token'),
          productId: productId,
        },
      });
      toast.success('Deal locked successfully!');
      setDealLocked(true);
      
    } catch (error) {
        toast.error("Error while deal lock")
    }
  };

  const onClickButton = () => {
    nav('/Dashboard');
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  const getUserDetails = async () => {
    const userData = await fetch(`${API_BASE_URL}/api/getuserdetailsbytoken`, {

      headers: {
        token: Cookies.get('token'),
        role: "user"
      },
    });
    const userDataResponse = await userData.json();
    setuserName(userDataResponse.userName);


  }
  getUserDetails();

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
                        <Link to={`/Dashboard`} className="bg-red-700 text-white rounded-md px-3 py-2 text-sm font-medium text-center mb-2 sm:mb-0 sm:mr-4 ml-80" aria-current="page">Dashboard</Link>
                        </div>
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
                <div className="my-1 flex flex-wrap sm:flex-nowrap">
                  <Link to={`/Dashboard`} className="bg-red-700 text-white rounded-md px-3 py-2 text-sm font-medium text-center mb-2 sm:mb-0 sm:mr-4" aria-current="page">Dashboard</Link>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg">
        <div className="relative">
          <img src={product.imageURL} alt="" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-2">{product.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">₹{product.price}</span>
            <div className="flex gap-1">
              {dealLocked ? (
                <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed">
                  <div className="flex items-center">
                    <FaLock className="mr-1" /> Sold
                  </div>
                </button>
              ) : (
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleDealLock}>
                  Deal Lock
                </button>
              )}
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={onClickButton}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SpecificProductPage;
