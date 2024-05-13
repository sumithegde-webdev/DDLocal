import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Registration/Register";
import Home from "./components/Home/HomePage";
import TFAuth from "./components/Login/TFAuth";
//import Details from "./components/AddingProducts/Details";

function App() {
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  // console.log(userLoginStatus);

  return (
    <>
      {/* <nav>Navbar</nav> */}
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path="/register" element={ <Register />} />
        {/* <Route path="/tfauth" element={<TFAuth />} /> */}
        <Route
          path="*"
          element={
            <>
              <div>404 ERROR</div>
            </>
          }
        />
        {/* <Route  path="/Details" element={ <Details />}> */}
        
        {/* </Route> */}
      </Routes>
   
    </>
  );
}

export default App;
