import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProduct = () => {
  const [userRole, setUserRole] = useState('');
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    state: '',
    productCity: '',
    pincode: '',
    streetAddress: ''
  });

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const userData = await fetch('http://localhost:8090/api/getuserdetailsbytoken', {
        headers: {
          token: import.meta.env.VITE_TOKEN,
          role: "user"
        },
      });
      const userDataResponse = await userData.json();
      setUserRole(userDataResponse.userRole);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put('http://localhost:8090/api/products/' + productId, product, {
        headers: {
          token: import.meta.env.VITE_TOKEN
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto py-8">
      { userRole === "SELLER" ? 
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          {/* Product Information */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              value={product.title} 
              onChange={handleChange} 
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
              value={product.description} 
              onChange={handleChange} 
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
              value={product.price} 
              onChange={handleChange} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">State</label>
            <input 
              type="text" 
              id="state" 
              name="state" 
              value={product.state} 
              onChange={handleChange} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="productCity" className="block text-gray-700 text-sm font-bold mb-2">City</label>
            <input 
              type="text" 
              id="productCity" 
              name="productCity" 
              value={product.productCity} 
              onChange={handleChange} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="pincode" className="block text-gray-700 text-sm font-bold mb-2">Pincode</label>
            <input 
              type="number" 
              id="pincode" 
              name="pincode" 
              value={product.pincode} 
              onChange={handleChange} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="streetAddress" className="block text-gray-700 text-sm font-bold mb-2">Street Address</label>
            <input 
              type="text" 
              id="streetAddress" 
              name="streetAddress" 
              value={product.streetAddress} 
              onChange={handleChange} 
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
              Update
            </button>
          </div>
        </form>
        : <div> You are not authorized to edit this product. </div>
      }
    </div>
  );
};

export default EditProduct;
