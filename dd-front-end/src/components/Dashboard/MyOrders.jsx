import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import ImageURL from '../../assets/purchased.jpg';

const OrderPage = () => {
    const [deals, setDeals] = useState([]);
    const [product, setProduct] = useState(null);

    const getUserDetails = async () => {
        try {
            const userData = await fetch('http://localhost:8090/api/getuserdetailsbytoken', {
                headers: {
                    token: Cookies.get('token'),
                    role: 'user',
                },
            });
            const userDataResponse = await userData.json();
            return userDataResponse.id;
        } catch (error) {
            console.error('Error fetching user details:', error);
            return null;
        }
    };

    const fetchProductById = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:8090/api/GetProductById`, {
                headers: {
                    token: Cookies.get('token'),
                    productId: productId,
                },
            });
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
            toast.error('Error fetching product');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await getUserDetails();
                if (!userId) {
                    // Handle case where user ID is not available
                    return;
                }

                const response = await axios.get(`http://localhost:8090/api/deals/buyer/deals`, {
                    headers: {
                        token: Cookies.get('token'),
                        buyerId: userId,
                    },
                });
                setDeals(response.data);
            } catch (error) {
                console.error('Error fetching deals:', error);
                toast.error('Error fetching deals');
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (deals.length > 0) {
            const productId = deals[0].productId; // Fetch the product for the first deal
            if (productId) {
                fetchProductById(productId);
            }
        }
    }, [deals]);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4">My Deals</h1>
            {product && (
                <div className="bg-white shadow-md rounded-md p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="text-lg font-medium mb-2">{product.title}</h3>
                            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                        </div>
                        <div className="relative flex items-center">
                            <img src={ImageURL} alt="Product" className="w-20 h-20 rounded-full" style={{ marginRight: '10px' }} />

                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">₹{product.price}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderPage;
