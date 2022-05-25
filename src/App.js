import React from "react"
import {Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-transition-group'
import "./index.css"
import RegisterPage from "./routes/RegisterPage"
import AboutPage from "./routes/AboutPage"
import LoginPage from "./routes/LoginPage"
import MissingPage from "./routes/MissingPage"
import AllPosts from "./routes/AllPosts"
import NewPostPage from "./routes/NewPostPage"
import MainPage from "./routes/MainPage"

export default function App(){
    const URL_LIST = {
        LOGIN_URL: process.env.REACT_APP_API_LOGIN_URL,
        REGISTER_URL:process.env.REACT_APP_API_REGISTER_URL,
        POSTS_URL: process.env.REACT_APP_API_POSTS_URL,
        POSTS_LIKE_URL: process.env.REACT_APP_API_POSTS_LIKE_URL
    }
    // check if the user is successfully logged in
    const [isLogged, setIsLogged] = React.useState(false)
    // get and save user token from api
    const [userToken, setUserToken] = React.useState({})

    return(
        <Routes>
            {
                // Public routes
            }
            <Route exact path="/" element={<MainPage />}/>
            <Route path="/login" element={<LoginPage 
                                                URL_LIST={URL_LIST}
                                                loginHandle={setIsLogged}
                                                tokenHandle={setUserToken} 
                                                isLogged={isLogged}   
                                                />}/>
            <Route path="/register" element={<RegisterPage 
                                                URL_LIST={URL_LIST}
                                                isLogged={isLogged}    
                                                />}/>
            <Route path="/about" element={<AboutPage />} isLogged={isLogged}/>
            <Route path="*" element={<MissingPage isLogged={isLogged}/>}/>



            {
                //Protected routes
            }
            <Route path="/allPosts" element={<AllPosts 
                                                URL_LIST={URL_LIST}
                                                isLogged={isLogged}
                                                userToken={userToken}
                                                />}/>
            <Route path="/newPost" element={<NewPostPage 
                                                URL_LIST={URL_LIST}
                                                isLogged={isLogged}
                                                userToken={userToken}
                                                />}/>   
        </Routes>
    )
}
