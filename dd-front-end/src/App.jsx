

import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
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

function App() {

  const [userLoginStatus, setUserLoginStatus] = useState(false);

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
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/sellerRequests" element={<AdminSellerRequests />} />

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
          {userLoginStatus && <Route path="tfauth" element={<TFAuth userEmail={userCredentials.email} setUserToken={credTokenHandler} />} />}
          <Route
            path="*"
            element={
              <>
                <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-center text-indigo-600">404</p>

                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                      <a
                        href="/"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Go back home
                      </a>
                    </div>
                  </div>
                </main>
              </>
            }
          />
        </Route>
        <Route path="/forgotPassword" element={<ForgotPasswordSequence />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/tfauth" element={<TFAuth />} /> */}
        <Route path="*" element={<div>401 Unauthorized</div>} />
      </Routes>

    </>
  );
}

export default App;