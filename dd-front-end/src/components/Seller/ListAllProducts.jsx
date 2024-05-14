import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
const listAllProducts = () => {

  const nav = useNavigate();
  const [products, setProducts] = useState([]);

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
        
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const onclickbutton = () => {

    nav('/Seller/Edit')

  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Seller Products</h1>
      {products.length === 0  ? (
        <p>No products found or You are not authorized to perform this Action </p>

      ) : (
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Image </th>
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
                <td className="border px-2 py-2">
                  <img
                    src={product.imageURL}
                    alt=""
                    srcSet=""
                    style={{ maxWidth: '200px', maxHeight: '200px' }} // Adjust the max width and max height as needed
                  />
                </td>

                <td className="border px-4 py-2">{product.title}</td>
                <td className="border px-4 py-2">{product.description}</td>
                <td className="border px-4 py-2">₹{product.price}</td>
                <td className="border px-4 py-2">{product.productStatus}</td>
                <td className="border px-4 py-2">{product.productcity}</td>
                <td className="border px-4 py-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <Link to={`/Seller/Edit/${product.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Edit
                    </Link>
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    <Link to={`/Seller/Delete/${product.id}`} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

  );

}
export default listAllProducts;