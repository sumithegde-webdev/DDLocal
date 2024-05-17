// AdminLogin.js
import React, { useState } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import "../Login/login.css";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const adminAxios = axios.create({
    headers: {
        role: "user",
    },
    baseURL: "http://localhost:8090/api/login",
});

const AdminLogin = (props) => {

    if (Cookies.get("token") != null) {
        //add logic here to check if admin
        return <Navigate to='../admindashboard' />
    }

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

        adminAxios
            .post("", {
                email: adminCredentials.email,
                password: adminCredentials.password,
            })
            .then((response) => {
                if (response.data.success) {
                    setLogin(true);
                    props.adminEmail(adminCredentials.email);
                    setAdminCredentials({
                        email: "",
                        password: "",
                    });
                    props.adminLoginStatus(true);
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
        return <Navigate to="tfauth" />;
    }

    return (
        <>
            <div id="admin--login--div">
                <div className="login--divs" id="admin--title">
                    ADMIN LOGIN
                </div>
                <form className="login--divs" id="login--form">
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