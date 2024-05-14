
// import LoginPage from '../Login/LoginPage'
// import RegistrationPage from '../Registration/RegistrationPage'
import Hero from './Hero';
import Feature from './Feature'
import Blog from './Blog'
// import Contact from './Contact';
import Footer from './Footer'
import About from './About';

const HomePage = () => {
    return (
        <>
            {/* HOME PAGE
            <ul>
                        <li>
                    <Link to={"/login"}>Login</Link>
                </li>
                <li>
                    <Link to={"/register"}>Register</Link>
                </li>
            </ul> */}

            { <div className="home-page">
            
                <Hero />
                <Feature/>
                <About />
                <Blog />
                {/* <Contact/> */}
                {/* <Footer /> */}
            </div> }
        </>
    )
}

export default HomePage