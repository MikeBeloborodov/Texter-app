import React from "react"
import NavbarComponent from "../components/NavbarComponent"
import RegisterForm from "../components/RegisterForm"
import { Fade } from "react-bootstrap"

export default function Register({URL_LIST, isLogged}){
    return(
        <>
            <NavbarComponent isLogged={isLogged}/>
            <Fade appear={true} in={true}>   
                <div className="maindiv">
                    <div style={{   width: "400px", 
                                    margin: "0 auto", 
                                    padding: "100px 0 0 0",
                                }}>
                        <RegisterForm URL_LIST={URL_LIST}/>
                    </div>
                </div>
            </Fade>
        </>
    )
}