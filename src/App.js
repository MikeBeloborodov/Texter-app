import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import NavbarNew from "./components/NavbarNew";
import LoginForm from "./components/LoginForm";

export default function App(){

    const [isLogged, setIsLogged] = React.useState(false)
    const [userToken, setUserToken] = React.useState({})

    return(
        <div>
            <div>
                <NavbarNew />
            </div>
            <div style={{width: "400px", margin: "0 auto", padding: "100px 0 0 0"}}>
                {!isLogged && <LoginForm 
                                loginHandle={setIsLogged}
                                tokenHandle={setUserToken}
                                />}
                {isLogged && <h1>You are now logged in!</h1>}
            </div>
        </div>
    )
}
