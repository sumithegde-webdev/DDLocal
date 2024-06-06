import axios from "axios";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../constants";

const VerifyOTP = (props) => {

    const [fpotp, setFpOtp] = useState("");

    const [min, setMin] = useState(5);
    const [sec, setSec] = useState(0);

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
            axios.post(`${API_BASE_URL}/api/verifyOtpforforgotpassword`, {}, {
                headers: {
                    otp: fpotp,
                    email: props.userEmail,
                }
            })
                .then(() => {
                    props.setStage("resetpassword");
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    return (
        <>
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
        </>
    )
}

export default VerifyOTP