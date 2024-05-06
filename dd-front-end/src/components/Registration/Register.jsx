import { useEffect, useState } from "react";
import axios from "axios";

const registerAxios = axios.create({
    headers: {
        role: "user",
    },
    baseURL: "http://localhost:8090/api/adduser",
});

const Register = () => {
    const [regSuccess, setRegSuccess] = useState(false);

    const [userCredentials, setUserCredentials] = useState({
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
    });

    // useEffect(()=>{
    //     console.log(userCredentials);
    // },[userCredentials]);

    function onChangeHandler(e) {
        e.preventDefault();
        const { name, value } = e.target;

        //user input validation
        //username
        const allowedCharacters = /^[0-9a-zA-Z]*$/;
        if (name === "userName") {
            if (allowedCharacters.test(value)) {
                setUserCredentials({
                    ...userCredentials,
                    [name]: value,
                });
            } else {
                setUserCredentials({
                    ...userCredentials,
                });
            }
        }

        //email
        //just needs to be checked before submit if it is a valid email address
        const emailPattern = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,4}$/;
        if (name === "email") {
            setUserCredentials({
                ...userCredentials,
                [name]: value,
            });
        }

        //phone number
        if (name === "phoneNumber") {
            if (isNumber(e.target.value) || value === "") {
                setUserCredentials({
                    ...userCredentials,
                    [name]: value,
                });
            } else {
                setUserCredentials({
                    ...userCredentials,
                });
            }
        }

        //password and re-password
        //no spaces allowed, minimum 8
        //needs to be encrypted at rest and transit
        if (name === "password" || name === "repassword") {
            if (value !== " ") {
                setUserCredentials({
                    ...userCredentials,
                    [name]: value, //encrypt this
                });
            } else {
                setUserCredentials({
                    ...userCredentials,
                });
            }
        }
        // else {
        //     setUserCredentials({
        //         ...userCredentials,
        //     });
        // }
    }

    const isNumber = function (val) {
        let pos = val.length - 1;
        if (val.charCodeAt(pos) >= 48 && val.charCodeAt(pos) <= 57) {
            return true;
        } else {
            return false;
        }
    };

    function clickHandler() {
        registerAxios
            .post("", {
                userName: userCredentials.userName,
                email: userCredentials.email,
                phoneNumber: userCredentials.phoneNumber,
                password: userCredentials.password,
            })
            .then((response) => {
                setUserCredentials({
                    userName: "",
                    email: "",
                    phoneNumber: "",
                    password: "",
                });
                setRegSuccess(true);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    if (regSuccess) {
        return <Navigate to="login" />;
    }

    return (
        <>
            <div>
                Register
                <div>
                    <form autoComplete="off">
                        <label htmlFor="username--input">Username</label>
                        <br />
                        <input
                            id="username--input"
                            type="text"
                            name="userName"
                            onChange={(e) => {
                                onChangeHandler(e);
                            }}
                            value={userCredentials.userName}
                            maxLength={15}
                            minLength={3}
                        />
                        <br />
                        <label htmlFor="email--input">Email</label>
                        <br />
                        <input
                            id="email--input"
                            type="email"
                            name="email"
                            onChange={(e) => {
                                onChangeHandler(e);
                            }}
                            value={userCredentials.email}
                        />
                        <br />
                        <label htmlFor="phonenumber--input">Phone Number</label>
                        <br />
                        <input
                            id="phonenumber--input"
                            type="text"
                            name="phoneNumber"
                            onChange={(e) => {
                                onChangeHandler(e);
                            }}
                            value={userCredentials.phoneNumber}
                            maxLength={10}
                        />
                        <br />
                        <label htmlFor="password--input">Password</label>
                        <br />
                        <input
                            id="password--input"
                            type="password"
                            name="password"
                            onChange={(e) => {
                                onChangeHandler(e);
                            }}
                            value={userCredentials.password}
                        />
                        {/* <br />
                        <label htmlFor='repassword--input'>Re-enter Password</label>
                        <br />
                        <input
                            id='repassword--input'
                            type='password'
                            name='repassword' /> */}
                        <br />
                        <button type="button" onClick={clickHandler}>
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
