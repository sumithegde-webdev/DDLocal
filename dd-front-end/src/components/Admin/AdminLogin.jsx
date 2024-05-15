// AdminLogin.js
import React, { useState } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import "../Login/login.css";
import { Navigate } from "react-router-dom";

const adminAxios = axios.create({
  headers: {
    role: "user",
  },
  baseURL: "http://localhost:8090/api/login",
});

const AdminLogin = () => {
  const [login, setLogin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    email: "",
    password: "",
  });
  // const history = useHistory();

  function onChangeHandler(e) {
    e.preventDefault();
    const { name, value } = e.target;
    //email
    //just needs to be checked before submit if it is a valid email address
    if (name === "email") {
      setAdminCredentials({
        ...adminCredentials,
        [name]: value,
      });
    }

    if (name === "password") {
      if (value[value.length - 1] !== " ") {
        setAdminCredentials({
          ...adminCredentials,
          [name]: value, //encrypt this
        });
      } else {
        setAdminCredentials({
          ...adminCredentials,
        });
      }
    }
  }

  const handleLogin = () => {
    // Perform authentication logic here
    // If authentication is successful, redirect to the Admin dashboard
    // history.push("/admin/dashboard");

    // const validationError = {};

    // //email to follow the pattern
    // const emailPattern = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,4}$/;
    // if (!userCredentials.email.trim()) {
    //   validationError.emailError = "email is required.";
    // } else if (!emailPattern.test(userCredentials.email)) {
    //   validationError.emailError = "email format is _@_._";
    // }

    // //password and rePassword
    // if (!userCredentials.password.trim()) {
    //   validationError.passwordError = "password is required.";
    // }

    adminAxios
      .post("", {
        email: adminCredentials.email,
        password: adminCredentials.password,
      })
      .then((response) => {
        if (response.data.success) {
          setLogin(true);
          setAdminCredentials({
            email: "",
            password: "",
          });
        } else {
          window.alert("Invalid Credentials!");
          setAdminCredentials({
            email: "",
            password: "",
          });
        }
      })
      .catch((error) => console.error(error));
  };

  if (login) {
    return <Navigate to="/tfauth" />;
  }

  return (
    <>
      <div id="admin--login--div">
        <div className="login--divs" id="admin--title">
          ADMIN LOGIN
        </div>
        <form className="login--divs" id="login--form">
          {/* <label id="email--label" className="label" htmlFor="email-input">Email</label> */}
          {/* <br /> */}
          <input
            id="email--input"
            autoComplete="off"
            type="email"
            name="email"
            placeholder="Email"
            value={adminCredentials.email}
            onChange={(e) => {
              onChangeHandler(e);
            }}
          />
          {/* <br /> */}
          {/* <label id="password--label" className="label" htmlFor="password-input">Password</label> */}
          {/* <br /> */}
          <input
            id="password--input"
            type="password"
            name="password"
            placeholder="Password"
            value={adminCredentials.password}
            onChange={(e) => {
              onChangeHandler(e);
            }}
          />
          <div id="forgot--password">FORGOT PASSWORD!</div>
          {/* <br /> */}
        </form>
        <div className="login--divs button--holder" id="button--div">
          <button id="login--button" type="button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;

{
  /* <div id="login--container">
  <div id="carousel--div">
    <div id="image--holder">
      <img src={cOne} width={"100%"} />
    </div>
    <div id="reg--button--div" className="button--holder">
      <button
        id="register--routing--button"
        type="button"
        onClick={registerRouting}
      >
        Register
      </button>
    </div>
  </div>
  <div id="dividing--line"></div>
  <div id="login--div">
    <div className="login--divs" id="login--title">
      LOGIN
    </div>
    <form className="login--divs" id="login--form">
      {/* <label id="email--label" className="label" htmlFor="email-input">Email</label> */
}
{
  /* <br /> */
}
{
  /* <input */
}
//   id="email--input"
//   autoComplete="off"
//   type="email"
//   name="email"
//   placeholder="Email"
//   value={loginCreds.email}
//   onChange={(e) => {
//     onChangeHandler(e);
//   }}
// />;
{
  /* <br /> */
}
{
  /* <label id="password--label" className="label" htmlFor="password-input">Password</label> */
}
{
  /* <br /> */
}
//       <input
//         id="password--input"
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={loginCreds.password}
//         onChange={(e) => {
//           onChangeHandler(e);
//         }}
//       />
//       <div id="forgot--password" onClick={forgotPasswordRouter}>
//         FORGOT PASSWORD!
//       </div>
//       {/* <br /> */}
//     </form>
//     <div className="login--divs button--holder" id="button--div">
//       <button id="login--button" type="button" onClick={onSubmitHandler}>
//         Login
//       </button>
//     </div>
//   </div>
// </div>; */}
