import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import './register.css';

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
        rePassword: "",
    });

    const [errors, setErrors] = useState({});

    const [repassState, setRepassState] = useState("repass disabled")

    useEffect(() => {
        if (userCredentials.password.length > 7) {
            setRepassState("repass");
        }
        else {
            setRepassState("repass disabled")
        }
    }, [userCredentials.password]);

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
        if (name === "password" || name === "rePassword") {

            if (value[value.length - 1] !== " ") {
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

        const validationError = {}

        //validation of all individual fields to be satisfied
        //any field is empty condition

        //userName has to be greater than 3 characters
        if (!userCredentials.userName.trim()) {
            validationError.userNameError = "Username is required."
        }
        else if (userCredentials.userName.length < 3) {
            validationError.userNameError = "Username needs to have more than 3 characters.";
        }

        //email to follow the pattern
        const emailPattern = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,4}$/;
        if (!userCredentials.email.trim()) {
            validationError.emailError = "Email is required."
        }
        else if (!emailPattern.test(userCredentials.email)) {
            validationError.emailError = "Email format is _@_._";
        }

        //phoneNumber MUST contain 10 digits
        if (!userCredentials.phoneNumber.trim()) {
            validationError.phoneNumberError = "Phone Number is required."
        }
        else if (userCredentials.phoneNumber.length < 10) {
            validationError.phoneNumberError = "Phone numbers MUST contain 10 digits.";
        }

        //password and rePassword
        if (!userCredentials.password.trim()) {
            validationError.passwordError = "Password is required."
        }
        else if (!userCredentials.rePassword.trim()) {
            validationError.rePasswordError = "Re enter your Password."
        }
        else if (userCredentials.password !== userCredentials.rePassword) {
            validationError.passwordError = "Passwords do not match."
            validationError.rePasswordError = "Passwords do not match."
        }

        setErrors(validationError);
        //a timeout here to remove the validation error
        setTimeout(() => {
            setErrors({});
        }, 3000)

        if (Object.keys(validationError).length === 0) {
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

    }

    if (regSuccess) {
        return <Navigate to="/login" />;
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
                        {!errors.userNameError && <div className="guide--div">Username guides</div>}
                        {errors.userNameError && <div className="error--div">{errors.userNameError}</div>}
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
                        {!errors.userNameError && <div className="guide--div">Email guides</div>}
                        {errors.emailError && <div className="error--div">{errors.emailError}</div>}
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
                        {!errors.userNameError && <div className="guide--div">Phone Number guides</div>}
                        {errors.phoneNumberError && <div className="error--div">{errors.phoneNumberError}</div>}
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
                        {!errors.userNameError && <div className="guide--div">Password guides</div>}
                        {errors.passwordError && <div className="error--div">{errors.passwordError}</div>}
                        <br />
                        <label id="repass--label" className={repassState} htmlFor='repassword--input'>Re-enter Password</label>
                        <br />
                        <input
                            className={repassState}
                            id='repassword--input'
                            type='password'
                            name='rePassword'
                            onChange={(e) => {
                                onChangeHandler(e);
                            }}
                            value={userCredentials.rePassword} />
                        <br />
                        {!errors.rePasswordError && <div className={"guide--div " + `${repassState}`}>Re Password guides</div>}
                        {errors.rePasswordError && <div className={"error--div" + `${repassState}`}>{errors.rePasswordError}</div>}
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
