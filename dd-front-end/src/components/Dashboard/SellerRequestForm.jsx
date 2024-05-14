import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
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
        // Assuming userDataResponse contains country, username, and phoneNumber
        setCountry(userDataResponse.country);
        setUsername(userDataResponse.userName);
        setPhoneNumber(userDataResponse.phoneNumber);
        setRequestStatus(userDataResponse.requestStatus);



      } catch (error) {
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
      toast.error(error);
    }
  };

  const moveBack = () => {
    nav('/Dashboard')
  }

  return (

    <>
      <div className="flex flex-col items-center justify-center text-xl font-semibold"> {/* Added styles */}
        <p>Hi {username},</p>
        <p>Please fill the below details in order to become a seller:</p>
      </div>
      <form onSubmit={handleFormSubmit} className="max-w-sm mx-auto mt-8 flex flex-col gap-2">

        <div className="flex flex-col">
          <label htmlFor="state" className="text-xs font-medium mb-1">State:</label>
          <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} className="appearance-none rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="city" className="text-xs font-medium mb-1">City:</label>
          <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} className="appearance-none rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="pincode" className="text-xs font-medium mb-1">Pincode:</label>
          <input type="number" id="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} className="appearance-none rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="streetAddress" className="text-xs font-medium mb-1">Street Address:</label>
          <input type="text" id="streetAddress" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} className="appearance-none rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />
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
