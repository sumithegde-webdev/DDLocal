import axios from 'axios'
import React, { useState } from 'react'
import './forgotPassword.css'

const forgotPasswordAxios = axios.create({
    headers: {
        role: "user",
        email: "",
    },
    baseURL: "http://localhost:8090/api/forgotpassword",
})

const verifyOTPAxios = axios.create({
    headers: {
        otp: "",
        email: "",
    },
    baseURL: "http://localhost:8090/api/verifyOtpforforgotpassword",
})

const resetPasswordAxios = axios.create({
    headers: {
        passwordFromUser: "",
        role: "user",
        email: "",
    },
    baseURL: "http://localhost:8090/api/resetpassword"
})

const ForgotPassword = () => {

    const [stage, setStage] = useState("forgotpassword");

    const [fpEmail, setFpEmail] = useState("");
    const [error, setError] = useState({});

    function emailChangeHandler(e) {
        e.preventDefault();
        setFpEmail(e.target.value);
        // console.log(fpEmail);
    }

    function requestOTP() {

        const emailValidationError = {}

        const emailPattern = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,4}$/;
        if (!fpEmail.trim()) {
            emailValidationError.emailError = "Email is required.";
        }
        else if (!emailPattern.test(fpEmail)) {
            emailValidationError.emailError = "Please enter a valid Email. The format is _@_._";
        }

        setError(emailValidationError)
        setTimeout(() => {
            setError({});
        }, 3000);

        if (Object.keys(emailValidationError).length === 0) {
            setStage("verifyotp");
            // forgotPasswordAxios.post('', {
            //     headers: {
            //         email: { fpEmail },
            //     }
            // })
            //     .then(() => {
            //         setStage("verifyotp");
            //     })
            //     .catch((err) => {
            //         console.error(err);
            //     });
        }
    }

    const [fpotp, setFpOtp] = useState("");

    function onOTPChangeHandler(e) {
        // console.log(isNumber(e.target.value));
        if (isNumber(e.target.value)) {
            // console.log("numberinput");
            setFpOtp(e.target.value);
        }
        // console.log(otp);
    }

    const isNumber = function (val) {
        // console.log(val);
        let pos = val.length - 1;
        // console.log(val.charCodeAt(pos));
        if (val.charCodeAt(pos) < 48 || val.charCodeAt(pos) > 57) {
            return false;
        }
        else {
            return true;
        }
    }

    function requestReset() {
        if (fpotp.length < 6) {
            //show error
            setFpOtp("");
            console.log("Invalid OTP");
        }
        else {
            setStage("resetpassword");
            // verifyOTPAxios('', {
            //     headers: {
            //         otp: fpotp,
            //         email: fpEmail,
            //     }
            // })
            //     .then(() => {
            //         setStage("resetpassword");
            //     })
            //     .catch();
        }
    }

    return (
        <>
            {
                (stage === "forgotpassword") &&
                <div id='fp--email--div' className='current--div'>
                    <div id='fp--title'>Forgot Password</div>
                    {/* <label htmlFor='fp--email--input'>Enter your Email address</label> */}
                    <input
                        id='fp--email--input'
                        className={error.emailError && "notvalid"}
                        type='email'
                        name='email'
                        value={fpEmail}
                        onChange={(e) => { emailChangeHandler(e) }}
                        placeholder='Please enter the Registered Email'
                    />
                    {error.emailError && <div id='email--error--div'>{error.emailError}</div>}
                    <div id='fp--info--div'>An OTP will be sent to this Email address.<br></br>On successful OTP verification,<br></br> you can Reset your Password.</div>
                    <div id='otp--request--div'>
                        <button id='otp--request--button' type='button' onClick={requestOTP}>Request OTP</button>
                    </div>
                </div>
            }
            {
                (stage === "verifyotp") &&
                <div id='verify--otp--div' className='current--div'>
                    <input
                        id='verify--otp--input'
                        name='fpotp'
                        type='text'
                        placeholder='Enter the OTP'
                        value={fpotp}
                        minLength={6}
                        maxLength={6}
                        onChange={(e) => onOTPChangeHandler(e)} />
                    <div>OTP Valid for : 04 min 34 sec</div>
                    <div>Resend OTP</div>
                    <button type='button' onClick={requestReset}>Verify OTP</button>
                    <div>DO NOT RELOAD THIS PAGE!</div>
                </div>
            }
            {
                (stage === "resetpassword") &&
                <div id='reset--password--div' className='current--div'>
                    <input
                        id='reset--password--input'
                        type='password'
                        name='resetPassword'
                    />
                    {/* <label htmlFor="password--input--reg">Password</label>
                        <br />
                        <input
                            id="password--input--reg"
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
                        <label id="repass--label" className={repassState} htmlFor='repassword--input--reg'>Re-enter Password</label>
                        <br />
                        <input
                            className={repassState}
                            id='repassword--input--reg'
                            type='password'
                            name='rePassword'
                            onChange={(e) => {
                                onChangeHandler(e);
                            }}
                            value={userCredentials.rePassword} />
                        <br />
                        {!errors.rePasswordError && <div className={"guide--div " + `${repassState}`}>Re Password guides</div>}
                        {errors.rePasswordError && <div className={"error--div" + `${repassState}`}>{errors.rePasswordError}</div>} */}

                    <input
                        id='reset-repassword--input'
                        type='password'
                        name='resetRePassword'
                    />
                </div>
            }
        </>
    )
}

export default ForgotPassword