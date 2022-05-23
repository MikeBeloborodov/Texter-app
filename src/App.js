import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./index.css"
import NavbarNew from "./components/NavbarNew"
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

    const [isLogged, setIsLogged] = React.useState(false)
    const [userToken, setUserToken] = React.useState({})
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
                <NavbarNew isLogged={isLogged} setNavbarChoice={setNavbarChoice}/>
            </div>

            }
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
                />
            </div>
            
            }
            {

                // Register page
                navbarChoice.register &&  
                <div style={{   width: "400px", 
                                margin: "0 auto", 
                                padding: "50px 0 0 0",
                                        }}>
                    <Register 
                        url_list={URL_LIST}
                    />
                </div>

            }
            {

                // Posts after login
            navbarChoice.allPosts && isLogged && 
            <div style={{   width: "290px", 
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
                <div style={{   width: "400px", 
                                margin: "0 auto", 
                                padding: "50px 0 0 0",
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
    )
}
