import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { FaLock } from 'react-icons/fa';

const SpecificProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [dealLocked, setDealLocked] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8090/api/GetProductById', {
          headers: {
            token: Cookies.get('token'),
            productId: productId,
          },
        });
        setProduct(response.data);
        if (response.data.productStatus === 'SOLD') {
          setDealLocked(true);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDealLock = async () => {
    const confirmLock = window.confirm('Are you sure you want to lock the deal?');

    if (!confirmLock) {
      return;
    }

    try {
      await axios.post(`http://localhost:8090/api/deals/lock`, {}, {
        headers: {
          token: Cookies.get('token'),
          productId: productId,
        },
      });
      toast.success('Deal locked successfully!');
      setDealLocked(true);
    } catch (error) {
      console.error('Error locking product:', error);
      toast.error(error);
    }
  };

  const onClickButton = () => {
    nav('/Dashboard');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg">
        <div className="relative">
          <img src={product.imageURL} alt="" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-2">{product.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">₹{product.price}</span>
            <div className="flex gap-1">
              {dealLocked ? (
                <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed">
                  <div className="flex items-center">
                    <FaLock className="mr-1" /> Sold
                  </div>
                </button>
              ) : (
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleDealLock}>
                  Deal Lock
                </button>
              )}
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={onClickButton}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificProductPage;
