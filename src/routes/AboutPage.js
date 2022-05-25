import React from "react"
import NavbarComponent from "../components/NavbarComponent"
import AboutForm from "../components/AboutForm"
import { Fade } from "react-bootstrap"

export default function About({isLogged}){
    return(
        <>
            <NavbarComponent isLogged={isLogged}/>
            <Fade appear={true} in={true}>
                <div className="maindiv">
                    <div style={{   
                                    margin: "0 auto", 
                                    padding: "10% 3% 0 3%",
                                }}>
                    <AboutForm />
                    </div>
                </div>
            </Fade>
        </>
    )
}