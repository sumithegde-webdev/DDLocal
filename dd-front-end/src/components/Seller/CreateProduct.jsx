import React, { useState } from 'react';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const CreateSellerProductForm = () => {
<<<<<<< HEAD
  const [userRole, setUserRole] = useState('');
=======
  const nav = useNavigate();
const [userRole, setUserRole] = useState('');
>>>>>>> 153564137dd03e7256f96b28fc1e220d46c0ef8b
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [state, setState] = useState('');
  const [productcity, setProductCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');

  const getUserDetails = async () => {
    const userData = await fetch('http://localhost:8090/api/getuserdetailsbytoken', {

      headers: {
        token: import.meta.env.VITE_TOKEN,
        role: "user"
      },
    });
    const userDataResponse = await userData.json();
    setUserRole(userDataResponse.userRole);



  }
  getUserDetails();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      title,
      description,
      price: parseInt(price),
      state,
      productcity,
      pincode: parseInt(pincode),
      streetAddress
    };

    try {
<<<<<<< HEAD
      await axios.post('http://localhost:8090/api/products/create', productData, {
        headers: {
          token: import.meta.env.VITE_TOKEN
        }
      });

      // Reset form after successful submission
      setTitle('');
      setDescription('');
      setPrice('');
      setState('');
      setProductCity('');
      setPincode('');
      setStreetAddress('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

=======
        await axios.post('http://localhost:8090/api/products/create', productData, {
          headers: {
            token: import.meta.env.VITE_TOKEN
          }
        });
  
        // Reset form after successful submission
        setTitle('');
        setDescription('');
        setPrice('');
        setState('');
        setProductCity('');
        setPincode('');
        setStreetAddress('');
        toast.success('Product Created successfully!');
        setTimeout(() => {
          nav('/Seller/AllProducts');
        }, 5000);
  
      } catch (error) {
        console.error('Error:', error);
      }
    };
>>>>>>> 153564137dd03e7256f96b28fc1e220d46c0ef8b


  return (

    <div className="container mx-auto py-8">
      {userRole === "SELLER" ?
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
<<<<<<< HEAD
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
=======
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
>>>>>>> 153564137dd03e7256f96b28fc1e220d46c0ef8b

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

          <div className="mb-6">
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
          </div>

<<<<<<< HEAD
          <div className="mb-6">
            <label htmlFor="productCity" className="block text-gray-700 text-sm font-bold mb-2">City</label>
            <input
              type="text"
              id="productCity"
              name="productCity"
              value={productCity}
              onChange={(e) => setProductCity(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
=======
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
>>>>>>> 153564137dd03e7256f96b28fc1e220d46c0ef8b

          <div className="mb-6">
            <label htmlFor="pincode" className="block text-gray-700 text-sm font-bold mb-2">Pincode</label>
            <input
              type="number"
              id="pincode"
              name="pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
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
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
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
          sdafsafase5gadf </div>}

<<<<<<< HEAD
=======
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
      
>>>>>>> 153564137dd03e7256f96b28fc1e220d46c0ef8b
    </div>










  );
};

export default CreateSellerProductForm;
