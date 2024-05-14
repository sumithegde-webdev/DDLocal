import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const SpecificProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8090/api/GetProductById', {
          headers: {
            token: Cookies.get('token'),
            productId: productId

          },
        });
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProducts();
  }, []);


  const getUserDetails = async () => {
    const userData = await fetch('http://localhost:8090/api/getuserdetailsbytoken', {

      headers: {
        token: Cookies.get('token'),
        role: "user"
      },
    });
    const userDataResponse = await userData.json();
    //  setUserRole(userDataResponse.userRole);



  }
  getUserDetails();


  //   const handleDealLock = async () => {
  //     try {
  //       await axios.post(`http://localhost:8090/api/products/${id}/lock`, {
  //         // Include any data needed for the lock process
  //       });
  //       alert('Product locked successfully!');
  //       // Optionally, you can navigate the user to a confirmation page or update the UI
  //     } catch (error) {
  //       console.error('Error locking product:', error);
  //     }
  //   };


  

  const onclickbutton = () => {
    const loadingToastId = toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      }),
      {
        pending: 'Redirecting...',
        success: 'Welcome to Dashboard ',
        error: 'Error while loading',
      }
    );
  
    loadingToastId.then(() => {
      nav('/Dashboard');
    });
  };
  if (!product) { 
   
    return <div>Loading...</div>;
  }
  

  return (
    <div class="flex items-center justify-center min-h-screen">
    <div class="max-w-md mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg">
      <div class="relative">
        <img src={product.imageURL} alt="" srcset="" />
      </div>
      <div class="p-4">
        <h3 class="text-lg font-medium mb-2">{product.title}</h3>
        <p class="text-gray-600 text-sm mb-4">{product.description}</p>
        <div class="flex items-center justify-between">
  <span class="font-bold text-lg">₹{product.price}</span>
  <div class="flex gap-1">
    <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={onclickbutton}>
      Back
    </button>
    <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
      Deal Lock 
    </button>
  </div>
</div>

        
      </div>
    </div>
  </div>
  


  );
};

export default SpecificProductPage;
