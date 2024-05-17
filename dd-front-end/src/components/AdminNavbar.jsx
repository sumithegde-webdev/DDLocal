import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import Cookies from 'js-cookie'
import logo from '../assets/widelogo.png';
import icon from '../assets/icon.png';
import { Navigate, useNavigate } from 'react-router-dom'

const userNavigation = [
    { name: 'Sign out' },   //sign out functionality here
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

//needs open, navigation, adminData

export default function AdminNavbar(props) {

    const nav = useNavigate();

    const signOut = () => {
        console.log("?");
        Cookies.remove("token");
        nav("/");
    }

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-8"
                                        src={logo}
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {props.navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-white text-black'
                                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    {/* <button
                                                type="button"
                                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">View notifications</span>
                                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                                            </button> */}
                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative flex max-w-96 ml-3">
                                        {/* <div>{adminData.userName}</div> */}
                                        <div className='mx-5 my-auto text-white'>{props.adminData.email}</div>
                                        <div>
                                            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <img className="h-8 w-8 rounded-full" src={icon} alt="" />
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
                                                {userNavigation.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <div
                                                                onClick={signOut}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                {item.name}
                                                            </div>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                            {props.navigation.map((item) => (
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
                        <div className="border-t border-gray-700 pb-3 pt-4">
                            <div className="flex items-center px-5">
                                {/* <div className="flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                        </div> */}
                                <div className="ml-3">
                                    <div className="text-base font-medium leading-none text-white">{props.adminData.name}</div>
                                    <div className="text-sm font-medium leading-none text-gray-400">{props.adminData.email}</div>
                                </div>
                                {/* <button
                                            type="button"
                                            className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button> */}
                            </div>
                            <div className="mt-3 space-y-1 px-2">
                                {userNavigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="div"
                                        onClick={signOut}
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}