import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './forgotPassword.css'
import ForgotPassword from './ForgotPassword'
import VerifyOTP from './VerifyOTP'
import ResetPassword from './ResetPassword'

// const resetPasswordAxios = axios.create({
//     headers: {
//         passwordFromUser: "",
//         role: "user",
//         email: "",
//     },
//     baseURL: "http://localhost:8090/api/resetpassword"
// })

const ForgotPasswordSequence = () => {
    const [stage, setStage] = useState("forgotpassword");

    const [fpEmail, setfpEmail] = useState("");

    useEffect(() => { ForgotPasswordSequence }, [stage]);

    const stageHandler = (val) => {
        setStage(val);
    }

    return (
        <>
            {
                (stage === "forgotpassword") &&
                <ForgotPassword setStage={stageHandler} setEmail={setfpEmail} />
            }
            {
                (stage === "verifyotp") &&
                <VerifyOTP setStage={stageHandler} userEmail={fpEmail} />
            }
            {
                (stage === "resetpassword") &&
                <ResetPassword setStage={stageHandler} userEmail={fpEmail} />
            }
        </>
    )
}

export default ForgotPasswordSequence