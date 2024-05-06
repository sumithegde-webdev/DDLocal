import React, { useState } from 'react'
import axios from 'axios'

const otpAxios = axios.create({
    headers: {
        otpforTwoFAFromUser: '',
        role: 'user',
        email: '',
    },
    baseURL: 'http://localhost:8090/api/2fa',
})

const TFAuth = (userEmail) => {

    const [otp, setOtp] = useState("");

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

    return (
        <>
            <div>TFAuth
                <br />
                <input
                    id='otp--input'
                    name='otp'
                    type='text'
                    placeholder='Enter the OTP'
                    value={otp}
                    minLength={6}
                    maxLength={6}
                    onChange={(e) => onChangeHandler(e)} />
                <br />
                <button type='button'>Verify OTP</button>
                <div>DO NOT RELOAD THIS PAGE!</div>
            </div>
        </>
    )
}

export default TFAuth