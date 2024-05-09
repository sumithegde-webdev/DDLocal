import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom';

const TFAuth = (props) => {

    const [success, setSuccess] = useState(false);

    const [otp, setOtp] = useState("");

    const [min, setMin] = useState(5);
    const [sec, setSec] = useState(0);

    const [error, setError] = useState({});

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

    function resendOTPRequest() { }

    function onChangeHandler(e) {
        // console.log(isNumber(e.target.value));
        if (isNumber(e.target.value)) {
            // console.log("numberinput");
            setOtp(e.target.value);
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

    function submitOTP() {

        const validationError = {}

        if (otp.length === 0) {
            validationError.otpError = "please enter the OTP to continue."
        }
        else if (otp.length < 6) {
            validationError.otpError = "OTP sent is a 6 digit number.";
        }

        setError(validationError);
        setTimeout(() => {
            setError({});
        }, 3000);

        if (Object.keys(validationError).length === 0) {
            axios.post("http://localhost:8090/api/2fa", {}, {
                headers: {
                    otpforTwoFAFromUser: otp,
                    role: "user",
                    email: props.userEmail,
                }
            })
                .then((response) => {
                    props.setUserToken(response.data.token, props.userEmail);
                    setSuccess(true);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    if (success) {
        return <Navigate to='/' />
    }

    return (
        <>
            <div id='tfauth--otp--div' className='current--div'>
                <div id='tf--top--half'>
                    <div id='tf--title'>Two Factor Authentication</div>
                    <div id='tf--sent--message'>OTP sent to registered Email.</div>
                    <input
                        id='tf--otp--input'
                        name='otp'
                        type='text'
                        className={error.otpError && "red"}
                        placeholder='Enter the OTP'
                        value={otp}
                        minLength={6}
                        maxLength={6}
                        onChange={(e) => onChangeHandler(e)} />
                    {error.otpError && <div id="otp--error--div">{error.otpError}</div>}
                </div>
                <div id='horizontal--line'></div>
                <div id='tf--bottom--half'>
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
                    <div id='tf--button--div'>
                        <button id='tf--button' type='button' onClick={submitOTP}>Submit OTP</button>
                    </div>
                </div>
                {/* <div>DO NOT RELOAD THIS PAGE!</div> */}
            </div >
        </>
    )
}

export default TFAuth