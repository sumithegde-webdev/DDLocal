import React, { useState } from 'react';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
const CreateSellerProductForm = () => {
  const nav = useNavigate();
  const [userRole, setUserRole] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [state, setState] = useState('');
  const [productcity, setProductCity] = useState('');
  const [userName, setuserName] = useState('');
  // const [pincode, setPincode] = useState('');
  // const [streetAddress, setStreetAddress] = useState('');

  const navigation = [
    { name: 'DirectDealz  ', href: '/Dashboard', current: true },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Create FormData object for multipart form data

    formData.append('file', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', parseInt(price));
    formData.append('state', state);
    formData.append('productcity', productcity);




    try {
      await axios.post('http://localhost:8090/api/products/create', formData, {
        headers: {

          token: Cookies.get('token'),
          title,
          description,
          price,
          productcity,

        }
      });

      // Reset form after successful submission
      setTitle('');
      setDescription('');
      setPrice('');
      setState('');
      setProductCity('');
      setImage(null);
      toast.success('Product Created successfully!');
      setTimeout(() => {
        nav('/Seller/AllProducts');
      }, 5000);

    } catch (error) {
      console.error('Error:', error);
    }
  };



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
      <div className="container mx-auto py-8">
        {userRole === "SELLER" ?
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Bounce}
            />
            <div className="mb-6">
              <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            {/* Product Information */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            {/* <div className="mb-6">
          <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">State</label>
          <input 
            type="text" 
            id="state" 
            name="state" 
            value={state} 
            onChange={(e) => setState(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div> */}

            <div className="mb-6">
              <label htmlFor="productCity" className="block text-gray-700 text-sm font-bold mb-2">City</label>
              <input
                type="text"
                id="productCity"
                name="productCity"
                value={productcity}
                onChange={(e) => setProductCity(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>



            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create
              </button>
            </div>
          </form>

          : <div>
            You are not Authorized to Create Products </div>}

      </div>







    </>


  );
};

export default CreateSellerProductForm;
