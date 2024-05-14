import React, { useState } from 'react';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const CreateSellerProductForm = () => {
  const nav = useNavigate();
  const [userRole, setUserRole] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [state, setState] = useState('');
  const [productcity, setProductCity] = useState('');
  // const [pincode, setPincode] = useState('');
  // const [streetAddress, setStreetAddress] = useState('');



  const getUserDetails = async () => {
    const userData = await fetch('http://localhost:8090/api/getuserdetailsbytoken', {

      headers: {
        token: Cookies.get('token'),
        role: "user"
      },
    });
    const userDataResponse = await userData.json();
    setUserRole(userDataResponse.userRole);



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










  );
};

export default CreateSellerProductForm;
