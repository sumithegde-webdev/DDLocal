import { useEffect, useState } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Registration/Register";
import Home from "./components/Home/HomePage";
import TFAuth from "./components/Login/TFAuth";
import Dashboard from "./components/Dashboard/Dashboard";
import ForgotPasswordSequence from "./components/ForgotPassword/ForgotPasswordSequence.jsx";
import CreateSellerProductForm from "./components/Seller/CreateProduct";
import EditProduct from "./components/Seller/EditProduct";
import ListAllProducts from "./components/Seller/ListAllProducts.jsx";
import DeleteProduct from "./components/Seller/DeleteProduct.jsx";
import SpecificProductPage from "./components/Dashboard/SpecificProductPage.jsx";
import { ToastContainer } from "react-toastify";
import SellerRequestForm from "./components/Dashboard/SellerRequestForm.jsx";
import MyOrders from "./components/Dashboard/MyOrders.jsx";
import AdminSellerRequests from "./components/Admin/AdminSellerRequests.jsx";
import AdminLogin from "./components/Admin/AdminLogin.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import Cookies from 'js-cookie';
import Error404 from './Error404.jsx';
import AdminProducts from "./components/Admin/AdminProducts.jsx";
import AdminDeals from "./components/Admin/AdminDeals.jsx";
import AdminUsers from "./components/Admin/AdminUsers.jsx";

function App() {

  const [userLoginStatus, setUserLoginStatus] = useState(false);

  const [adminLoginStatus, setAdminLoginStatus] = useState(false);

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    token: "",
    role: "user",
  })
  // console.log(userLoginStatus);
  // useEffect(() => {
  //   console.log(userCredentials);
  // }, [userCredentials]);

  function credEmailHandler(email) {
    setUserCredentials({
      ...userCredentials,
      email: email,
    })
  }

  function credTokenHandler(token, email) {
    if (email === userCredentials.email) {
      setUserCredentials({
        ...userCredentials,
        token: token,
      })
    }
    else {
      console.log("INTRUDER ALERT!");
    }

  }

  return (
    <>
      {/* <nav>Navbar</nav> */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        {/* <Route path="/AdminDashboard" element={<AdminDashboard />} /> */}
        <Route path="/admin/*" element={null}>
          <Route path="login/*" element={null} >
            <Route path="" element={<AdminLogin adminLoginStatus={setAdminLoginStatus} adminEmail={(val) => credEmailHandler(val)} />} />
            {adminLoginStatus ?
              <Route path="tfauth" element={<TFAuth status={"admin"} userEmail={userCredentials.email} setUserToken={credTokenHandler} />} />
              :
              <Route path="*" element={<Error404 />} />
            }
          </Route>
          {Cookies.get('token') ?
            <Route path="admindashboard/*" element={null} >
              <Route path="" element={<AdminDashboard />} />
              <Route path="sellerrequests" element={<AdminSellerRequests />} />
              <Route path="allproducts" element={<AdminProducts />} />
              <Route path="deals" element={<AdminDeals />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
            :
            <Route path="*" element={<Error404 />} />
          }
          {

          }
          <Route path="*" element={<Error404 />} />
        </Route>

        <Route path="/Seller/Create" element={<CreateSellerProductForm />} />
        <Route path="/Seller/AllProducts" element={<ListAllProducts />} />

        <Route path="/Seller/Edit/:productId" element={<EditProduct />} />
        <Route path="/Seller/Delete/:productId" element={<DeleteProduct />} />
        <Route path="/products/:productId" element={<SpecificProductPage />} />
        <Route path="/seller/request" element={<SellerRequestForm />} />
        <Route path="/myOrders" element={< MyOrders />} />
        <Route path="/login/*" element={null}>
          <Route
            path=""
            element={<Login setLoginStatus={setUserLoginStatus} loginEmail={(val) => credEmailHandler(val)} />}
          />
          {userLoginStatus && <Route path="tfauth" element={<TFAuth status={"nonadmin"} userEmail={userCredentials.email} setUserToken={credTokenHandler} />} />}
          <Route
            path="*"
            element={<Error404 />}
          />
        </Route>
        <Route path="/forgotPassword" element={<ForgotPasswordSequence />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/tfauth" element={<TFAuth />} /> */}
        <Route path="*" element={<Error404 />} />
      </Routes>

    </>
  );
}

export default App;