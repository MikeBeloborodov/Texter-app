import React from "react"
import {Form, Button, Card} from "react-bootstrap"


export default function LoginForm(){
    function handleMouseClick(){
        console.log("Click!")
    }
    
    return(
        <Card className="mb-3" bg="primary" text="light">
        <div style={{padding: "10px 10px 10px"}}>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="light" type="submit" onClick={handleMouseClick}>
                    Submit
                </Button>
            </Form>
            </div>
        </Card>
    )
}