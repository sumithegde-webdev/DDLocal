import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Registration/Register";
import Home from "./components/Home/HomePage";
import TFAuth from "./components/Login/TFAuth";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateSellerProductForm from "./components/Seller/CreateProduct";
import EditProduct from "./components/Seller/EditProduct";

function App() {
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  // console.log(userLoginStatus);

  return (
    <>
      {/* <nav>Navbar</nav> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        
        <Route path="/Seller" element={<CreateSellerProductForm />} />
        <Route path="/Edit" element={<EditProduct />} />
        <Route path="/login/*" element={null}>
          <Route
            path=""
            element={<Login setLoginStatus={setUserLoginStatus} />}
          />
          {userLoginStatus && <Route path="tfauth" element={<TFAuth />} />}
          <Route
            path="*"
            element={
              <>
                <div>404 ERROR</div>
              </>
            }
          />
        </Route>
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
