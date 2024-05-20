import { Fragment, useEffect, useState } from 'react'
import AdminNavbar from '../AdminNavbar'
import axios from 'axios'
import Cookies from 'js-cookie';

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
    { name: `${adminData.userName}`, href: '../admindashboard', current: false },
    { name: 'Users', href: './users', current: false },
    { name: 'Products', href: 'admindashboard/allproducts', current: true },
    { name: 'Requests', href: './sellerrequests', current: false },
    { name: 'Deals', href: './deals', current: false },
  ]

  const sell = [];
  const [allSellers, setAllSeller] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8090/api/GetallUsers", {
      headers: {
        token: `${token}`,
      }
    })
      .then((response) => {
        fetchProducts();
        response.data.map((user) => {
          if (user.userRole === "ADMIN") {
            setAdminData({
              userName: user.userName,
              email: user.email,
            })
          }
          if (user.userRole === "SELLER") {
            // setSellers({
            //     sellerName: user.userName,
            //     sellerEmail: user.email,
            //     sellerNumber: user.phoneNumber,
            // })
            sell.push(user);
            setAllSeller(sell);
          }
        })
      })
      .catch((err) => { console.error(err) });
  }, [])

  // const nav = useNavigate();
  // const { productId } = useParams();
  const [products, setProducts] = useState([]);

  const token = Cookies.get('token');

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

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // const token = Cookies.get("token");

  return (
    <div className="min-h-full">
      <AdminNavbar navigation={navigation} adminData={adminData} />
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
                  {
                    allSellers.map((seller) => {
                      if (seller.id === product.userId) {
                        return (
                          <div key={seller.id} className='text-xl mb-5'>
                            <div className='text-xl'>Seller - {seller.userName}</div>
                            <div className='text-sm'>Email - {seller.email}</div>
                            <div className='text-sm'>Number - {seller.phoneNumber}</div>
                          </div>
                        )
                      }
                    })
                  }
                  <img src={product.imageURL} alt="" srcSet="" />
                  <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{product.description}</p>
                  <p className="mt-2 text-sm text-red-500">₹{product.price}</p>
                  <p className="mt-2 text-sm text-black-500">{product.productcity}</p>
                  <p className="mt-2  text-sm text-black-500">{product.productStatus}</p>
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