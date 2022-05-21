import React from "react"
import {Form, Button, Card} from "react-bootstrap"


export default function LoginForm(){
    
    const [userPasswordInput, setuserPasswordInput] = React.useState("")
    const [userInputEmail, setUserInputEmail] = React.useState("")
    
    function handleMouseClick(){
        console.log("Email: " + userInputEmail)
        console.log("Password: " + userPasswordInput)
    }

    function handleEmailInput(event){
        setUserInputEmail(oldValue => event.target.value)
    }

    function handlePasswordInput(event){
        setuserPasswordInput(oldValue => event.target.value)
    }

    return(
        <Card className="mb-3" bg="primary" text="light">
        <div style={{padding: "10px 10px 10px"}}>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleEmailInput}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handlePasswordInput}/>
                </Form.Group>
                <Button variant="light" type="submit" onClick={handleMouseClick}>
                    Submit
                </Button>
            </Form>
            </div>
        </Card>
    )
}