import React from 'react'
import {Card} from "react-bootstrap"

export default function About(){
    return(
        <>
        <Card style={{width: "400px"}}>
            <Card.Body>
                <Card.Title>About</Card.Title>
                <Card.Text>
                This is a test project to learn more about 
                backend and frontend development
                by using Python library FastAPI for the serverside and 
                Node.js library React for the frontend.
                <br/>
                <br/>
                You can find the source code here:
                <br></br> 
                <a href="https://github.com/MikeBeloborodov" target="_blank">My github</a>                  
                </Card.Text>
                <br/>   
                <Card.Subtitle className="mb-2 text-muted">
                ® Mikhail Beloborodov 2022
                </Card.Subtitle>
            </Card.Body>
        </Card>
        </>
    )
}