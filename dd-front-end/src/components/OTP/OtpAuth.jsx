import { useEffect, useState } from 'react'
import './otpAuth.css'

const OtpAuth = () => {

    const [otpDigits, setOtpDigits] = useState({});

    function onNumberInput(e) {
        const { name, value } = e.target
        if (value === "9" || value === "8" || value === "7" || value === "6" || value === "5" || value === "4" || value === "3" || value === "2" || value === "1" || value === "0") {
            setOtpDigits({
                ...otpDigits,
                [name]: value
            })
        } else {
            setOtpDigits({
                ...otpDigits
            })
        }
    }

    return (
        <div id="otp--container">
            <div id='tfa--title'>Two Factor Authentication</div>
            <div id='otp'>
                {/* <div>
                    <input
                        name='digitOne'
                        type="text"
                        maxLength={1}
                        value={otpDigits.one}
                        onChange={e => onNumberInput(e)} />
                </div>
                <div>
                    <input
                        name='digitTwo'
                        type="text"
                        maxLength={1}
                        value={otpDigits.two}
                        onChange={e => onNumberInput(e)} />
                </div>
                <div>
                    <input
                        name='digitThree'
                        type="text"
                        maxLength={1}
                        value={otpDigits.three}
                        onChange={e => onNumberInput(e)} />
                </div>
                <div>
                    <input
                        name='digitFour'
                        type="text"
                        maxLength={1}
                        value={otpDigits.four}
                        onChange={e => onNumberInput(e)} />
                </div>
                <div>
                    <input
                        name='digitFive'
                        type="text"
                        maxLength={1}
                        value={otpDigits.five}
                        onChange={e => onNumberInput(e)} />
                </div>
                <div>
                    <input
                        name='digitSix'
                        type="text"
                        maxLength={1}
                        value={otpDigits.six}
                        onChange={e => onNumberInput(e)} />
                </div> */}
            </div>
            <div>Timer + Resend</div>
            <div>Buttons</div>
        </div>
    )
}

export default OtpAuth