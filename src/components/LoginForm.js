import React from "react"
import {Form, Button, Card} from "react-bootstrap"
import { sprintf } from "sprintf-js"


export default function LoginForm({loginHandle, tokenHandle, navbarHandle, url_list}){

    const [formData, setFormData] = React.useState({
        "email": "",
        "password": "",
        "submit": 0
    })
    
    React.useEffect(() => {
        if (formData.submit){
            fetch(url_list.LOGIN_URL, {method: "POST",
                        body: sprintf('username=%s&password=%s', formData.email, formData.password),
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                                }
                    }).then( (res) => {
                        if (res.status === 200){
                            return res.json()
                        }else{
                            alert("Wrong credentials. Try again.")
                            return 1
                        }
                    }).then(data => {
                        if (data === 1){
                            return
                        }
                        tokenHandle(data)
                        loginHandle(true)
                        navbarHandle(oldValues => {
                            return ({
                                ...oldValues,
                                "allPosts": true
                            })
                        })})
        }
    }, [formData.submit])       

    function handleFormData(event){
        const {name, value} = event.target
        
        setFormData(oldValues => {
            return({
                ...oldValues,
                [name]: value
            })
        })
    }
    
    function handleSubmit(event){
        event.preventDefault()
        setFormData(oldValues => {
            return ({
                ...oldValues,
                "submit": oldValues.submit + 1
            })
        })
    }

    return(
        <Card className="mb-3" bg="primary" text="light">
        <div style={{padding: "10px 10px 10px"}}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                     type="email" 
                     name="email"
                     placeholder="Enter email" 
                     onChange={handleFormData}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    name="password"
                    placeholder="Password" 
                    onChange={handleFormData}
                />
                </Form.Group>
                <Button variant="light" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
        </Card>
    )
}