import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import lightLogo from '../../assets/lightLogo.png';
import darkLogo from '../../assets/darkLogo.png';
import './register.css';

const registerAxios = axios.create({
    headers: {
        role: "user",
    },
    baseURL: "http://localhost:8090/api/adduser",
});

const Register = () => {

    const navigate = useNavigate();

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
            validationError.userNameError = "username is required."
        }
        else if (userCredentials.userName.length < 3) {
            validationError.userNameError = "needs to have more than 3 characters.";
        }

        //email to follow the pattern
        const emailPattern = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,4}$/;
        if (!userCredentials.email.trim()) {
            validationError.emailError = "email is required."
        }
        else if (!emailPattern.test(userCredentials.email)) {
            validationError.emailError = "email format is _@_._";
        }

        //phoneNumber MUST contain 10 digits
        if (!userCredentials.phoneNumber.trim()) {
            validationError.phoneNumberError = "phone Number is required."
        }
        else if (userCredentials.phoneNumber.length < 10) {
            validationError.phoneNumberError = "phone numbers must contain 10 digits.";
        }

        //password and rePassword
        if (!userCredentials.password.trim()) {
            validationError.passwordError = "password is required."
        }
        else if (!userCredentials.rePassword.trim()) {
            validationError.rePasswordError = "re-enter your Password."
        }
        else if (userCredentials.password !== userCredentials.rePassword) {
            validationError.passwordError = "passwords do not match."
            validationError.rePasswordError = "passwords do not match."
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
                        rePassword: "",
                    });
                    setRegSuccess(true);
                })
                .catch((error) => {
                    window.alert("An error occured during Registration. Please try again!");
                    setUserCredentials({
                        userName: "",
                        email: "",
                        phoneNumber: "",
                        password: "",
                        rePassword: "",
                    });
                    console.error(error);
                });
        }

    }

    function loginRouting() {
        // console.log("Clicked");
        navigate("/login");
    }

    if (regSuccess) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <div id="logo">
                <img src={lightLogo} width={"100%"} />
            </div>
            <div id="register--container">
                <div id="reg--title">REGISTER</div>
                <div id="register--inputs--container">
                    <div>
                        <input
                            className={!errors.userNameError ? "reg--inputs" : "reg--inputs erred"}
                            id="username--input--reg"
                            type="text"
                            name="userName"
                            onChange={(e) => {
                                onChangeHandler(e);
                            }}
                            autoComplete="off"
                            value={userCredentials.userName}
                            maxLength={15}
                            minLength={3}
                            placeholder="Username"
                        />
                        {!errors.userNameError && <div className="sub--divs guide--div">minimum 3 and maximum 15 characters</div>}
                        {errors.userNameError && <div className="sub--divs error--div">{errors.userNameError}</div>}
                    </div>
                    <div>
                        <input
                            className={!errors.emailError ? "reg--inputs" : "reg--inputs erred"}
                            id="email--input--reg"
                            type="email"
                            name="email"
                            onChange={(e) => {
                                onChangeHandler(e);
                            }}
                            autoComplete={"off"}
                            value={userCredentials.email}
                            placeholder="Email"
                        />
                        {!errors.emailError && <div className="sub--divs guide--div">email format '_@_._'</div>}
                        {errors.emailError && <div className="sub--divs error--div">{errors.emailError}</div>}
                    </div>
                    <div>
                        <input
                            className={!errors.phoneNumberError ? "reg--inputs" : "reg--inputs erred"}
                            id="phonenumber--input--reg"
                            type="text"
                            name="phoneNumber"
                            onChange={(e) => {
                                onChangeHandler(e);
                            }}
                            value={userCredentials.phoneNumber}
                            maxLength={10}
                            placeholder="Phone Number"
                        />
                        {!errors.phoneNumberError && <div className="sub--divs guide--div">enter 10 digits</div>}
                        {errors.phoneNumberError && <div className="sub--divs error--div">{errors.phoneNumberError}</div>}
                    </div>
                    <div>
                        <input
                            className={!errors.passwordError ? "reg--inputs" : "reg--inputs erred"}
                            id="password--input--reg"
                            type="password"
                            name="password"
                            onChange={(e) => {
                                onChangeHandler(e);
                            }}
                            value={userCredentials.password}
                            placeholder="Enter Password"
                        />
                        {!errors.passwordError && <div className="sub--divs guide--div">minimum 8 characters</div>}
                        {errors.passwordError && <div className="sub--divs error--div">{errors.passwordError}</div>}
                    </div>
                    <div>
                        <input
                            className={`${!errors.rePasswordError ? "reg--inputs" : "reg--inputs erred"} ${repassState}`}
                            id='repassword--input--reg'
                            type='password'
                            name='rePassword'
                            onChange={(e) => {
                                onChangeHandler(e);
                            }}
                            value={userCredentials.rePassword}
                            placeholder="Re-Enter Password"
                        />
                        {!errors.rePasswordError && <div className={"sub--divs guide--div " + `${repassState}`}>re-enter your password</div>}
                        {errors.rePasswordError && <div className={"sub--divs error--div " + `${repassState}`}>{errors.rePasswordError}</div>}
                    </div>
                </div>
                <div id="login--ref" onClick={loginRouting}>Already have an Account?</div>
                <div id="register--button--holder">
                    <button id="register--button" type="button" onClick={clickHandler}>REGISTER</button>
                </div>
            </div>
        </>
    );
};

export default Register;
