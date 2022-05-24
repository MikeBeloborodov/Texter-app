import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-transition-group'
import { Fade } from "react-bootstrap"
import "./index.css"
import Navbar from "./components/Navbar"
import LoginForm from "./components/LoginForm"
import Posts from "./components/Posts"
import NewPost from "./components/NewPost"
import About from "./components/About"
import Register from "./components/Register"

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
    return(
        <div>
            { 

                // Navbar
            <div>
                <Navbar isLogged={isLogged} setNavbarChoice={setNavbarChoice}/>
            </div>

            }
            <div className="maindiv">
            {

                // Login page
                navbarChoice.login &&   
                <Fade
                    appear={true}
                    in={navbarChoice.login} 
                    mountOnEnter={true}
                    unmountOnExit={true}
                    timeout={0}
                >   
                    <div style={{   width: "400px",
                                    margin: "0 auto", 
                                    padding: "100px 0 0 0"
                                    }}>
                        <LoginForm 
                            loginHandle={setIsLogged}
                            tokenHandle={setUserToken}
                            navbarHandle={setNavbarChoice}
                            url_list={URL_LIST}
                        />
                    </div>
                </Fade>
            
            }
            {

                // Register page
                navbarChoice.register &&   
                <Fade
                    appear={true}
                    in={navbarChoice.register} 
                    mountOnEnter={true}
                    unmountOnExit={true}
                    timeout={0}
                >   
                    <div style={{   width: "400px", 
                                    margin: "0 auto", 
                                    padding: "100px 0 0 0",
                                }}>
                        <Register 
                            url_list={URL_LIST}
                        />
                    </div>
                </Fade>

            }
            {

                // Posts after login
            navbarChoice.allPosts && isLogged && 
                <Fade
                    appear={true}
                    in={navbarChoice.allPosts} 
                    mountOnEnter={true}
                    unmountOnExit={true}
                    timeout={0}
                >   
                    <div style={{   
                                    margin: "0 auto", 
                                    padding: "50px 0 0 0",
                                }}>
                        <Posts 
                            userToken={userToken}
                            url_list={URL_LIST}
                        />
                    </div>
                </Fade>
            
            }
            {

                // About page
                navbarChoice.about &&
                <Fade   
                    appear={true}
                    in={navbarChoice.about} 
                    mountOnEnter={true}
                    unmountOnExit={true}
                    timeout={0}
                >
                    <div style={{   
                                    margin: "0 auto", 
                                    padding: "10% 3% 0 3%",
                                }}>
                        <About />
                    </div>
                </Fade>

            }
            {
                
                // Create new post page
                navbarChoice.newPost && 
                    <Fade
                        appear={true}
                        in={navbarChoice.newPost} 
                        mountOnEnter={true}
                        unmountOnExit={true}
                        timeout={0}
                    >   
                        <div style={{   width: "400px", 
                                        margin: "0 auto", 
                                        padding: "50px 0 0 0",
                                    }}>
                            <NewPost 
                                userToken={userToken}
                                url_list={URL_LIST}
                            />
                        </div>
                    </Fade>

            }
            </div>
        </div>
    )
}
