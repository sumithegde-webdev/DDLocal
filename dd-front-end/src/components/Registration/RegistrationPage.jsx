import { useEffect, useState } from 'react';
import axios from 'axios';
import '../Registration/RegistrationPage.css'
import uF from '../../assets/image (5).png';
import { Route } from 'react-router-dom';
import LoginPage from '../Login/LoginPage';

const baseURL = "http://localhost:8090/api/adduser";

const axiosInstance = axios.create({
    headers: {
        role: "user",
    },
    baseURL: baseURL,
})

const RegistrationPage = () => {

    const [credentials, setCredentials] = useState({
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
        repassword: ""
    })

    const [validationErrors, setValidationErrors] = useState({});

    const [inputState, setInputState] = useState({});

    const [previewState, setPreviewState] = useState(false);

    const [noAccess, setNoAccess] = useState({
        leftColumn: "",
        rightColumn: "noaccess"
    })

    const [subState, setSubState] = useState("noaccess");

    function onChangeHandler(e) {
        const { name, value } = e.target;
        // if (name === "phoneNumber") {
        //     if (value == `+` || value == `-` || value == `.`) {
        //         setCredentials({
        //             ...credentials,
        //         })
        //     } else {
        //         setCredentials({
        //             ...credentials,
        //             [name]: value
        //         })
        //     }
        // } else {
        //     setCredentials({
        //         ...credentials,
        //         [name]: value
        //     })
        // }

        if (name === "password" || name === "repassword") {
            if (value === " ") {
                setCredentials({
                    ...credentials,
                })
            }
            else {
                setCredentials({
                    ...credentials,
                    [name]: value
                })
            }
        } else {
            setCredentials({
                ...credentials,
                [name]: value
            })
        }
        // console.log(credentials);
    }

    function sAndcHandler(e) {
        e.preventDefault();
        const errors = {};
        const validities = {};
        if (!credentials.userName.trim()) {
            validities.userName = "invalid";
            errors.userName = "Username cannot be empty!";
        } else if (credentials.userName.length < 3) {
            validities.userName = "invalid";
            errors.userName = "Username must be atleast 3 characters long!"
        }

        if (!credentials.email.trim()) {
            validities.email = "invalid";
            errors.email = "Email cannot be empty!";
        } else if (!/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,4}$/.test(credentials.email)) {
            validities.email = "invalid";
            errors.email = "Email to be in the format '__@__.__'";
        }

        // /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,4}$/
        // /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/

        if (!credentials.phoneNumber.trim()) {
            validities.phoneNumber = "invalid";
            errors.phoneNumber = "Phone Number cannot be empty!";
        } else if (credentials.phoneNumber.length < 10) {
            validities.phoneNumber = "invalid";
            errors.phoneNumber = "Phone Number must have exactly 10 digits!"
        } else if (credentials.phoneNumber.length > 10) {
            validities.phoneNumber = "invalid";
            errors.phoneNumber = "Phone Number cannot have more than 10 digits!"
        }

        if (!credentials.password.trim() && previewState) {
            validities.password = "invalid";
            errors.password = "Password is required";
        } else if (credentials.password.length < 6 && previewState) {
            validities.password = "invalid";
            errors.password = "Password needs to be atleast 6 characters long for better security"
        }

        if ((credentials.repassword !== credentials.password) && previewState) {
            validities.repassword = "invalid";
            errors.repassword = "The passwords do not match!";
        }

        setValidationErrors(errors);
        setInputState(validities);

        setTimeout(() => {
            setValidationErrors({});
            setInputState({});
        }, 3000)

        if (Object.keys(errors).length === 0) {
            setNoAccess({
                leftColumn: "noaccess",
                rightColumn: ""
            })
            if (credentials.email === "already@exists.com") {
                //momentarily red
                setPreviewState(true);
                setTimeout(() => {
                    setPreviewState(false);
                    setNoAccess({
                        leftColumn: "",
                        rightColumn: "noaccess"
                    })
                }, 3000);

            }
            else {
                //momentarily green
                setPreviewState(true);
                setSubState("");
                // setTimeout(() => { }, 2000);
            }
        }
        // console.log(credentials);
    }

    function submitHandler() {
        console.log(credentials);
        axiosInstance.post("", {
            userName: credentials.userName,
            email: credentials.email,
            phoneNumber: credentials.phoneNumber,
            password: credentials.password
        })
            .then((res) => {
                setCredentials({
                    userName: "",
                    email: "",
                    phoneNumber: "",
                    password: "",
                    repassword: ""
                });
                setNoAccess({
                    leftColumn: "",
                    rightColumn: "noaccess"
                });
                //route to login page
                refreshPage()
                // console.log(res);
            })
            .catch((error) => { console.error(error); });
    }

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <div className="registration--container">
            <div className='title'>Create your Account on DirectDealz</div>
            <div className={`left--column ` + noAccess.leftColumn}>
                <div className='user--details--section'>
                    <div className='fields' id='username--div'>
                        <input
                            id='username--field'
                            className={inputState.userName}
                            name='userName'
                            autoComplete='off'
                            minLength={3}
                            maxLength={15}
                            type='text'
                            placeholder='Enter your Username'
                            value={credentials.userName}
                            onChange={e => onChangeHandler(e)}></input>
                        {validationErrors.userName ?
                            <div id='username--error' className='error--messages'>{validationErrors.userName}</div> :
                            <div id='username--error' className='info--messages'>
                                <ul>
                                    <li>alphanumerics only, no special characters</li>
                                    <li>minimum 3 and maximum 15 characters</li>
                                </ul>
                            </div>}
                    </div>
                    <div className='fields' id='email--div'>
                        <input
                            id='email--field'
                            className={inputState.email}
                            name='email'
                            autoComplete='off'
                            type='email'
                            placeholder='Enter your Email'
                            value={credentials.email}
                            onChange={e => onChangeHandler(e)}></input>
                        {validationErrors.email ?
                            <div id='email--error' className='error--messages'>{validationErrors.email}</div> :
                            <div id='email--error' className='info--messages'>
                                <ul>
                                    <li>format for email is '_@_._'</li>
                                </ul>
                            </div>}
                    </div>
                    <div className='fields' id='phonenumber--div'>
                        <input
                            id='phonenumber--field'
                            className={inputState.phoneNumber}
                            name='phoneNumber'
                            autoComplete='off'
                            type='number'
                            placeholder='Enter your Phone Number'
                            value={credentials.phoneNumber}
                            onChange={e => onChangeHandler(e)}></input>
                        {validationErrors.phoneNumber ?
                            <div id='phonenumber--error' className='error--messages'>{validationErrors.phoneNumber}</div> :
                            <div id='phonenumber--error' className='info--messages'>
                                <ul>
                                    <li>enter 10 digits</li>
                                </ul>
                            </div>}
                    </div>
                </div>
                <button type='button' onClick={sAndcHandler} className='sac--button'>Save</button>
            </div>
            <div className={`right--column ` + noAccess.rightColumn}>
                <div className='user--details--preview'>
                    <div id='username--section'>
                        <div id='user--fig--div'>
                            <img id='user--figurine' src={uF} width={"90%"} style={{ borderRadius: "50%" }} />
                        </div>
                        <div id='sub--username'>{previewState ? credentials.userName : "..."}</div>
                        <div id='go--back' onClick={() => {
                            setNoAccess({
                                leftColumn: "",
                                rightColumn: "noaccess"
                            });
                            setPreviewState(false)
                        }}>&lt;</div>
                    </div>
                    <div id='contact--info--section'>
                        <div id='sub--email'>Email: {previewState ? credentials.email : "..."}</div>
                        <div id='sub--phonenumber'>Phone Number: {previewState ? credentials.phoneNumber : "..."}</div>
                    </div>
                </div>
                <div className='password--fields'>
                    <div className='fields--right' id='password--div'>
                        <input
                            id='password--field'
                            name='password'
                            type='password'
                            autoComplete='off'
                            placeholder='Enter your Password'
                            value={credentials.password}
                            onChange={e => onChangeHandler(e)}></input>
                        {validationErrors.password ?
                            <div id='password--error' className='error--messages'>{validationErrors.password}</div> :
                            <div id='password--error' className='info--messages'>
                                <ul>
                                    <li>use alhpanumerics and special symbols</li>
                                    <li>whitespace is not allowed</li>
                                </ul>
                            </div>}
                    </div>
                    <div className='fields--right' id='repassword--div'>
                        <input
                            id='repassword--field'
                            name='repassword'
                            type='password'
                            autoComplete='off'
                            placeholder='Re-enter your Password'
                            value={credentials.repassword}
                            onChange={e => onChangeHandler(e)}></input>
                        {validationErrors.repassword && <div id='repassword--error' className='error--messages'>{validationErrors.repassword}</div>}
                    </div>
                </div>
                <button
                    type='button'
                    id='register--button'
                    className={`sac--button ` + subState}
                    onClick={submitHandler}>Sign Up</button>
            </div>
            <div>{ }</div>

        </div>
    )
}

export default RegistrationPage