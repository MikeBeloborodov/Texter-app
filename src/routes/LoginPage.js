import React from "react"
import NavbarComponent from "../components/NavbarComponent"
import LoginForm from "../components/LoginForm"
import { Fade } from "react-bootstrap"

export default function LoginPage({URL_LIST, loginHandle, tokenHandle, isLogged}){
    return(
        <>
            <NavbarComponent isLogged={isLogged}/>
            <Fade appear={true} in={true}>
                <div className="maindiv">
                    <div style={{   width: "400px",
                                    margin: "0 auto", 
                                    padding: "100px 0 0 0"
                                }}>
                        <LoginForm 
                            URL_LIST={URL_LIST}
                            loginHandle={loginHandle}
                            tokenHandle={tokenHandle}
                        />
                    </div>
                </div>
            </Fade>
        </>
    )
}