import React from "react"
import NavbarComponent from "../components/NavbarComponent"
import { Fade } from "react-bootstrap"
import NewPostForm from "../components/NewPostForm"

export default function NewPostPage({isLogged, URL_LIST, userToken}){
    return(
        <>
            <NavbarComponent isLogged={isLogged}/>
            <Fade appear={true} in={true}>
                <div className="maindiv">
                    <div style={{   width: "400px", 
                                    margin: "0 auto", 
                                    padding: "50px 0 0 0",
                                }}>
                        <NewPostForm URL_LIST={URL_LIST} userToken={userToken}/>
                    </div>
                </div>
            </Fade>
        </>
    )
}