import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie';


const userNavigation = [
    { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const AdminProducts = () => {

    //retreive admin data
    const [adminData, setAdminData] = useState({
        userName: "",
        email: "",
    });

    const navigation = [
        { name: `${adminData.userName}`, href: '', current: false },
        { name: 'Products', href: 'admindashboard/allproducts', current: true },
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
                response.data.map((user) => {
                    if (user.userRole === "ADMIN") {
                        setAdminData({
                            userName: user.userName,
                            email: user.email,
                        })
                    }
                    if (user.userRole === "SELLER") {
                        setSellers({
                            sellerName: user.userName,
                            sellerEmail: user.email,
                            sellerNumber: user.phoneNumber,
                        })
                    }
                })
            })
            .catch((err) => { console.error(err) });
    }, [])

    // const nav = useNavigate();
    // const { productId } = useParams();
    const [products, setProducts] = useState([]);

    const token = Cookies.get('token');
    useEffect(() => {

        fetchProducts();

    }, []);

    const fetchProducts = async () => {
        try {
            const allProductsResponse = await fetch('http://localhost:8090/api/listedproducts', {

                headers: {
                    token: `${token}`, // Include token in the Authorization header
                },
            });
            const allProductsData = await allProductsResponse.json();
            setProducts(allProductsData);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const [sellers, setSellers] = useState({
        sellerName: "",
        sellerEmail: "",
        sellerNumber: "",
    })

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // const token = Cookies.get("token");

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-8 w-8"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                            alt="Your Company"
                                        />
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-900 text-white'
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
                                            <div className='mx-5 my-auto text-white'>{adminData.email}</div>
                                            <div>
                                                <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                    {/* <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" /> */}
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
                                                                <a
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    {item.name}
                                                                </a>
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
                            <div className="border-t border-gray-700 pb-3 pt-4">
                                <div className="flex items-center px-5">
                                    {/* <div className="flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                        </div> */}
                                    <div className="ml-3">
                                        <div className="text-base font-medium leading-none text-white">{adminData.name}</div>
                                        <div className="text-sm font-medium leading-none text-gray-400">{adminData.email}</div>
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
                                            as="a"
                                            href={item.href}
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
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {products.map((product) => (
                            // let sellerName = axios.get("http://localhost:8090/api/GetallUsers", {
                            //     headers: {
                            //         token: `${token}`,
                            //     }
                            // })
                            //     .then((response) => {
                            //         response.data.map((user) => {
                            //             if (user.id === products.userId) {
                            //                 return user.userName;
                            //             }
                            //         })
                            //     });
                            < div key={product.id} className="bg-white overflow-hidden border shadow rounded-lg" >
                                <div className="p-4">
                                    <div>
                                        <div>Username</div>
                                        <div>Email</div>
                                        <div>Phone Number</div>
                                    </div>
                                    <img src={product.imageURL} alt="" srcSet="" />
                                    <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
                                    <p className="mt-2 text-sm text-gray-500">{product.description}</p>
                                    <p className="mt-2 text-sm text-red-500">₹{product.price}</p>
                                    <p className="mt-2 text-sm text-black-500">{product.productcity}</p>

                                    {/* Display Seller name  */}
                                    {/* <p className="mt-2 text-sm text-gray-500">{product.userId}</p> */}
                                </div>
                                {/* <div className="bg-gray-50 px-4 py-3 sm:px-6">
                                    <Link to={`/products/${product.id}`} className='w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' style={{ backgroundColor: "#2461FF" }}>
                                        View Product
                                    </Link>

                                </div> */}
                            </div>
                        ))
                        }
                    </div>
                </div>
            </main >
        </div >
    )
}

export default AdminProducts



{/* <div className="container mx-auto">
        <h1 className="text-2xl font-bold my-4">Your Products</h1>
        {products.length === 0 ? (
          <p>No products found</p>
        ) : userRole === "BUYER" ? (
          <p>You are not authorized to access this URL</p>
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
      </div> */}