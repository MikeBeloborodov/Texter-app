import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./index.css"
import NavbarNew from "./components/NavbarNew"
import LoginForm from "./components/LoginForm"
import Posts from "./components/Posts"
import NewPost from "./components/NewPost"
import About from "./components/About"
import Register from "./components/Register"
import WrongPass from "./components/WrongPass"

const URL_LIST = {
    LOGIN_URL: process.env.REACT_APP_API_LOGIN_URL,
    REGISTER_URL:process.env.REACT_APP_API_REGISTER_URL,
    POSTS_URL: process.env.REACT_APP_API_POSTS_URL,
    POSTS_LIKE_URL: process.env.REACT_APP_API_POSTS_LIKE_URL
}

export default function App(){

    // check if the user is successfully logged in
    const [isLogged, setIsLogged] = React.useState(false)
    // get and save user token from api
    const [userToken, setUserToken] = React.useState({})
    // use navbar choices to redirect user
    const [navbarChoice, setNavbarChoice] = React.useState({
        "login": true,
        "register": false,
        "allPosts": false,
        "newPost": false,
        "about": false
    })
    // show modal window if user entered wrong credentials
    const [showWrongPassModal, setShowWrongPassModal] = React.useState(false)

    return(
        <div>
            { 

                // Navbar
            <div>
                <NavbarNew isLogged={isLogged} setNavbarChoice={setNavbarChoice}/>
            </div>

            }
            <div className="maindiv">
            {

                // Login page
            navbarChoice.login && !isLogged && 
            <div style={{   width: "400px",
                            margin: "0 auto", 
                            padding: "100px 0 0 0"
                            }}>
                <LoginForm 
                    loginHandle={setIsLogged}
                    tokenHandle={setUserToken}
                    navbarHandle={setNavbarChoice}
                    url_list={URL_LIST}
                    wrongPasswordHandle={setShowWrongPassModal}
                />
                <WrongPass 
                    showWrongPassModal={showWrongPassModal}
                    setShowWrongPassModal={setShowWrongPassModal}
                    title="Wrong credentials"
                    problem="Please check your email and password and try again."
                />
            </div>
            
            }
            {

                // Register page
                navbarChoice.register &&  
                <div style={{   width: "400px", 
                                margin: "0 auto", 
                                padding: "100px 0 0 0",
                            }}>
                    <Register 
                        url_list={URL_LIST}
                        wrongPasswordHandle={setShowWrongPassModal}
                    />
                    <WrongPass 
                    showWrongPassModal={showWrongPassModal}
                    setShowWrongPassModal={setShowWrongPassModal}
                    title="Wrong credentials"
                    problem="Your passwords do not match. Please, try again."
                    />
                </div>

            }
            {

                // Posts after login
            navbarChoice.allPosts && isLogged && 
            <div style={{   
                            margin: "0 auto", 
                            padding: "50px 0 0 0",
                        }}>
                <Posts 
                    userToken={userToken}
                    url_list={URL_LIST}
                />
            </div>
            
            }
            {

                // About page
                navbarChoice.about && 
                <div style={{   
                                margin: "0 auto", 
                                padding: "10% 3% 0 3%",
                            }}>
                    <About />
                </div>

            }
            {
                
                // Create new post page
                navbarChoice.newPost && 
                <div style={{   width: "400px", 
                                margin: "0 auto", 
                                padding: "50px 0 0 0",
                            }}>
                    <NewPost 
                        userToken={userToken}
                        url_list={URL_LIST}
                    />
                </div>

            }
            </div>
        </div>
    )
}
