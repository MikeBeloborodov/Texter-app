import React from "react"
import MissingForm from "../components/MissingForm"
import NavbarComponent from "../components/NavbarComponent"
import { Fade } from "react-bootstrap"

export default function MissingPage({isLogged}){
    return(
        <>
            <NavbarComponent isLogged={isLogged}/>
            <Fade appear={true} in={true}>
                <div className="maindiv">
                    <div style={{   
                                    margin: "0 auto", 
                                    padding: "10% 3% 0 3%",
                                }}>
                    <MissingForm />
                    </div>
                </div>
            </Fade>
        </>
    )
}