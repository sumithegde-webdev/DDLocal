
import { Link, Route, Routes } from 'react-router-dom'
// import LoginPage from '../Login/LoginPage'
// import RegistrationPage from '../Registration/RegistrationPage'

const HomePage = () => {
    return (
        <>
            HOME PAGE
            <ul>
                <li>
                    <Link to={"/login"}>Login</Link>
                </li>
                <li>
                    <Link to={"/register"}>Register</Link>
                </li>
            </ul>
        </>
    )
}

export default HomePage