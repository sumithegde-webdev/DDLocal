import axios from "axios"
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import TFAuth from "./TFAuth";

// const baseURL = 'http://localhost:8090/api/login';
const loginAxios = axios.create({
    headers: {
        role: 'user',
    },
    baseURL: 'http://localhost:8090/api/login',
});


// eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdW1pdGhlZ2RlNjQ2M0BnbWFpbC5jb20ifQ.DmDicY6ssI8FMSOJBz5yWLUKWa1oNVLjbFbXAIfetOk
// eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdW1pdGhlZ2RlNjQ2M0BnbWFpbC5jb20ifQ.DmDicY6ssI8FMSOJBz5yWLUKWa1oNVLjbFbXAIfetOk

const Login = (props) => {
    // console.log(props);
    const [login, setLogin] = useState(false);

    const [loginCreds, setLoginCreds] = useState({
        email: '',
        password: '',
    });

    function onChangeHandler(e) {
        e.preventDefault();
        const { name, value } = e.target;
        setLoginCreds({
            ...loginCreds,
            [name]: value,
        });
    }

    //holding the token in memory

    function onSubmitHandler() {
        //redirect to OTP verification at http://localhost:8090/api/2fa
        // setLogin(true);
        loginAxios.post('', {
            email: loginCreds.email,
            password: loginCreds.password,
        })
            .then((response) => {
                console.log(response);
                setLoginCreds({
                    email: '',
                    password: '',
                })
                if (response.data.success) {
                    props.setLoginStatus(true);
                    setLogin(true);
                    // console.log("TFA");
                }
                else {
                    setLogin(false);
                    // console.log("FAILED");
                }
            })
            .catch((error) => {
                setLoginCreds({
                    email: '',
                    password: '',
                })
                console.log("FAILED");
                console.log(error);
            })
        // console.log(loginCreds);
    }

    if (login) {
        return <Navigate to='tfauth' />
    }

    return (
        <>
            <div>
                <div>Carousel Part</div>
                <div>Login Part
                    <form>
                        <label htmlFor="email-input">Email</label>
                        <br />
                        <input
                            id="email-input"
                            type="email"
                            name="email"
                            value={loginCreds.email}
                            onChange={(e) => { onChangeHandler(e) }}
                        />
                        <br />
                        <label htmlFor="password-input">Password</label>
                        <br />
                        <input
                            id="password-input"
                            type="password"
                            name="password"
                            value={loginCreds.password}
                            onChange={(e) => { onChangeHandler(e) }}
                        />
                        <br />
                    </form>
                    <button type="button" onClick={onSubmitHandler}>Login</button>
                </div>
            </div>
        </>
    )
}

export default Login