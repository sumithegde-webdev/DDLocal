import axios from "axios"
import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"

const ResetPassword = (props) => {

    const [rpSuccess, setrpSuccess] = useState(false);

    const [passwords, setPasswords] = useState({
        password: "",
        rePassword: "",
    })

    const [errors, setErrors] = useState({});

    const [repassState, setRepassState] = useState("repass disabled")

    useEffect(() => {
        if (passwords.password.length > 7) {
            setRepassState("repass");
        }
        else {
            setRepassState("repass disabled")
        }
    }, [passwords.password]);

    function onChangeHandler(e) {
        e.preventDefault();
        const { name, value } = e.target;

        if (name === "password" || name === "rePassword") {

            if (value[value.length - 1] !== " ") {
                setPasswords({
                    ...passwords,
                    [name]: value, //encrypt this
                });
            } else {
                setPasswords({
                    ...passwords,
                });
            }
        }

    }

    function resetHandler() {

        const validationError = {}
        //password and rePassword
        if (!passwords.password.trim()) {
            validationError.passwordError = "password is required."
        }
        else if (!passwords.rePassword.trim()) {
            validationError.rePasswordError = "re-enter your Password."
        }
        else if (passwords.password !== passwords.rePassword) {
            validationError.passwordError = "passwords do not match."
            validationError.rePasswordError = "passwords do not match."
        }

        setErrors(validationError);
        //a timeout here to remove the validation error
        setTimeout(() => {
            setErrors({});
        }, 3000)

        if (Object.keys(validationError).length === 0) {
            axios.post('http://localhost:8090/api/resetpassword', {}, {
                headers: {
                    passwordFromUser: passwords.password,
                    role: "user",
                    email: props.userEmail,
                }
            })
                .then(() => {
                    setPasswords({
                        password: "",
                        rePassword: ""
                    })
                    setrpSuccess(true);
                    // props.setStage("forgotpassword");

                }
                )
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    if (rpSuccess) {
        return <Navigate to='/login' />
    }

    return (
        <>
            <div id='reset--password--div' className='current--div'>
                <div id="rp--title">Reset Password</div>
                <div id="password--holders">
                    <div>
                        <input
                            className={!errors.passwordError ? "reg--inputs" : "reg--inputs erred"}
                            id="password--input--reg"
                            type="password"
                            name="password"
                            onChange={(e) => {
                                onChangeHandler(e);
                            }}
                            value={passwords.password}
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
                            value={passwords.rePassword}
                            placeholder="Re-Enter Password"
                        />
                        {!errors.rePasswordError && <div className={"sub--divs guide--div " + `${repassState}`}>re-enter your password</div>}
                        {errors.rePasswordError && <div className={"sub--divs error--div " + `${repassState}`}>{errors.rePasswordError}</div>}
                    </div>
                </div>
                <div id="reset--button--div">
                    <button id="rp--button" type="button" onClick={resetHandler}>Reset Password</button>
                </div>
            </div>
        </>
    )
}

export default ResetPassword