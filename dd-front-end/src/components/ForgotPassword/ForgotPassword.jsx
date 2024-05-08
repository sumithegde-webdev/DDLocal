import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './forgotPassword.css'

const forgotPasswordAxios = axios.create({
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
            // setStage("verifyotp");
            console.log(fpEmail);
            const set = {
                email: fpEmail,
                role: "user",
            }
            axios.post('http://localhost:8090/api/forgotpassword', {
                headers: set,
            })
                .then(() => {
                    setStage("verifyotp");
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    const [fpotp, setFpOtp] = useState("");

    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(10);

    var timer;
    const [counter, setCounter] = useState(0)
    useEffect(() => {
        timer = setInterval(() => {
            if (min == 0 && sec == 1) {
                setMin(0)
                setSec(0)
            } else if (min >= 0 && sec > 0) {
                setSec(sec - 1);
                setCounter(counter + 1);
            } else if (sec == 0) {
                setSec(59);
                setMin(min - 1)
                setCounter(counter + 1);
            } else {
                setMin(0)
                setSec(0)
            }
        }, 1000)

        return () => clearInterval(timer);
    }, [counter])

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

    function resendOTPRequest() { }

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
                    <div id='top--half'>
                        <div id='verify--title'>Verify OTP to Reset Password</div>
                        <div id='sent--message'>OTP sent to entered Email.</div>
                        <input
                            id='verify--otp--input'
                            name='fpotp'
                            type='text'
                            placeholder='Enter the OTP'
                            value={fpotp}
                            minLength={6}
                            maxLength={6}
                            onChange={(e) => onOTPChangeHandler(e)} />
                    </div>
                    <div id='horizontal--line'></div>
                    <div id='bottom--half'>
                        <div id='div--housing'>
                            <div id='timer--div'>
                                <div id='textual' className='sub--timer--divs'>OTP Valid for</div>
                                <div id='time--left' className='sub--timer--divs'>
                                    {(min > 0) ? `${min} min` : ""} {sec} sec
                                </div>
                            </div>
                            <div id='resend--otp'>
                                <p className={(min == 0 && sec == 0) ? "highlight" : "inactivate"} onClick={resendOTPRequest}>Resend OTP</p>
                            </div>
                        </div>
                        <div id='verify--button--div'>
                            <button id='verify--button' type='button' onClick={requestReset}>Verify OTP</button>
                        </div>
                    </div>
                    {/* <div>DO NOT RELOAD THIS PAGE!</div> */}
                </div >
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