import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
const SellerRequestForm = () => {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userId, setUserId] = useState('');
  const [requestStatus, setRequestStatus] = useState('');
  const navigation = [
    { name: 'DirectDealz  ', href: '/Dashboard', current: true },
  ]
 
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const nav = useNavigate();
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userData = await fetch('http://localhost:8090/api/getuserdetailsbytoken', {
          headers: {
            token: Cookies.get('token'),
            role: 'user',
          },
        });
        const userDataResponse = await userData.json();
        setUserId(userDataResponse.userId);
        setCountry(userDataResponse.country);
        setUsername(userDataResponse.userName);
        setPhoneNumber(userDataResponse.phoneNumber);
        setRequestStatus(userDataResponse.requestStatus);
 
 
 
      } catch (error) {
        toast.error(error.toString());
        console.error('Error fetching user details:', error);
      }
    };
 
    getUserDetails();
  }, []);
 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
 
    if (requestStatus === 'PENDING') {
      toast.warning('You already have a pending request to become a seller. ');
      return;
    }
    if (requestStatus == "APPROVED") {
      toast.error("Your Seller Request is Already Approved");
      return;
    }
 
    try {
      await axios.post('http://localhost:8090/api/request', {
 
        state,
        city,
        pincode,
        streetAddress,
        country,
        username,
        phoneNumber,
      }, {
        headers: {
          token: Cookies.get('token'),
          userId,
        },
      });
      toast.success("Request For becoming Seller Sent Successfully");
      setTimeout(() => {
        nav('/Dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error updating user details:', error);
      toast.error(error.response.data);
    }
  };
 
  const moveBack = () => {
    nav('/Dashboard')
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

                    <p className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>Hi,{username}</p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
 
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
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
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
      <div className="flex flex-col items-center justify-center text-xl font-semibold"> {/* Added styles */}
        <p>Please fill the below details in order to become a seller:</p>
      </div>
      <form onSubmit={handleFormSubmit} className="max-w-sm mx-auto mt-8 flex flex-col gap-2">
 
        <div className="flex flex-col">
          <label htmlFor="state" className="text-xs font-medium mb-1">State:</label>
          <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} className="appearance-none rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" required/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="city" className="text-xs font-medium mb-1">City:</label>
          <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} className="appearance-none rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" required/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="pincode" className="text-xs font-medium mb-1">Pincode:</label>
          <input type="number" id="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} className="appearance-none rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" required/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="streetAddress" className="text-xs font-medium mb-1">Street Address:</label>
          <input type="text" id="streetAddress" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} className="appearance-none rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" required/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="country" className="text-xs font-medium mb-1">Country:</label>
          <input type="text" id="country" value={country} readOnly className="appearance-none rounded-md bg-gray-200 px-2 py-1 text-gray-700 cursor-not-allowed w-full" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="username" className="text-xs font-medium mb-1">Username:</label>
          <input type="text" id="username" value={username} readOnly className="appearance-none rounded-md bg-gray-200 px-2 py-1 text-gray-700 cursor-not-allowed w-full" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phoneNumber" className="text-xs font-medium mb-1">Phone Number:</label>
          <input type="text" id="phoneNumber" value={phoneNumber} readOnly className="appearance-none rounded-md bg-gray-200 px-2 py-1 text-gray-700 cursor-not-allowed w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white font-semibold px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 w-full">
          Submit
        </button>
 
      </form>
      <div className='max-w-sm mx-auto mt-8 flex flex-col gap-2'>
        <button className="bg-red-500 text-white font-semibold px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 w-full" onClick={moveBack}>
          Back
        </button>
      </div>
    </>
 
  );
};
 
export default SellerRequestForm;