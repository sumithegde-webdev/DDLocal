import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constants";

const ForgotPassword = (props) => {

    const [email, setFpEmail] = useState("");
    const [error, setError] = useState({});

    function emailChangeHandler(e) {
        e.preventDefault();
        setFpEmail(e.target.value);
        // console.log(fpEmail);
    }

    function requestOTP() {

        const emailValidationError = {}

        const emailPattern = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,4}$/;
        if (!email.trim()) {
            emailValidationError.emailError = "Email is required.";
        }
        else if (!emailPattern.test(email)) {
            emailValidationError.emailError = "Please enter a valid Email. The format is _@_._";
        }

        setError(emailValidationError)
        setTimeout(() => {
            setError({});
        }, 3000);

        if (Object.keys(emailValidationError).length === 0) {
            axios.post(`${API_BASE_URL}/api/forgotpassword`, {}, {
                headers: {
                    email: email,
                    role: "user"
                }
            })
                .then(() => {
                    //change state here
                    props.setEmail(email)
                    props.setStage("verifyotp");
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }
    return (
        <>
            <div id='fp--email--div' className='current--div'>
                <div id='fp--title'>Forgot Password</div>
                {/* <label htmlFor='fp--email--input'>Enter your Email address</label> */}
                <input
                    id='fp--email--input'
                    className={error.emailError && "notvalid"}
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => { emailChangeHandler(e) }}
                    placeholder='Please enter the Registered Email'
                />
                {error.emailError && <div id='email--error--div'>{error.emailError}</div>}
                <div id='fp--info--div'>An OTP will be sent to this Email address.<br></br>On successful OTP verification,<br></br> you can Reset your Password.</div>
                <div id='otp--request--div'>
                    <button id='otp--request--button' type='button' onClick={requestOTP}>Request OTP</button>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword