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

import Cookie from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import AdminLogin from "./components/Admin/AdminLogin.jsx";

function App() {
  //cookie logic here
  const cookie = new Cookie();
  // console.log(cookie.cookies.jwt_token);
  // console.log(jwtDecode(cookie.cookies.jwt_token));

  const [userLoginStatus, setUserLoginStatus] = useState(false);

  const [userCredentials, setUserCredentials] = useState({
    email:
      cookie.cookies.jwt_token == null
        ? ""
        : jwtDecode(cookie.cookies.jwt_token).sub,
    token: cookie.cookies.jwt_token == null ? "" : cookie.cookies.jwt_token,
    role: "user",
  });

  function credEmailHandler(email) {
    setUserCredentials({
      ...userCredentials,
      email: email,
    });
  }

  function credTokenHandler(token, email) {
    if (email === userCredentials.email) {
      setUserCredentials({
        ...userCredentials,
        token: token,
      });
      // console.log("WELCOME");
    } else {
      // console.log("INTRUDER ALERT!");
    }
  }

  return (
    <>
      {/* <nav>Navbar</nav> */}
      <Routes>
        <Route path="/admin/*">
          <Route path="" element={<AdminLogin />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />

        <Route path="/Seller/Create" element={<CreateSellerProductForm />} />
        <Route path="/Seller/AllProducts" element={<ListAllProducts />} />

        <Route path="/Seller/Edit/:productId" element={<EditProduct />} />
        <Route path="/Seller/Delete/:productId" element={<DeleteProduct />} />

        <Route path="/login/*" element={null}>
          <Route
            path=""
            element={
              <Login
                setLoginStatus={setUserLoginStatus}
                loginEmail={(val) => credEmailHandler(val)}
              />
            }
          />
          {userLoginStatus && (
            <Route
              path="tfauth"
              element={
                <TFAuth
                  userEmail={userCredentials.email}
                  setUserToken={credTokenHandler}
                />
              }
            />
          )}
          <Route
            path="*"
            element={
              <>
                <div>404 ERROR</div>
              </>
            }
          />
        </Route>
        <Route path="/forgotPassword" element={<ForgotPasswordSequence />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/tfauth" element={<TFAuth />} /> */}
        <Route
          path="*"
          element={
            <>
              <div>404 ERROR</div>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
