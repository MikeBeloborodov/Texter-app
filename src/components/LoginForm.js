import React from "react"
import {Form, Button, Card, Spinner} from "react-bootstrap"
import { sprintf } from "sprintf-js"
import AlertModal from "./AlertModal"


export default function LoginForm(
    {   loginHandle, 
        tokenHandle, 
        navbarHandle, 
        url_list,
    }){

    const [formData, setFormData] = React.useState({
        "email": "",
        "password": "",
        "submit": 0
    })
    // alert modal for various purposes
    const [showAlertModal, setAlertModal] = React.useState({
        "show": false,
        "title": "",
        "body": ""
    })
    // spinner animation
    const [loading, setLoading] = React.useState(false)
    
    React.useEffect(() => {
        if (formData.submit){
            fetch(url_list.LOGIN_URL, {method: "POST",
                        body: sprintf('username=%s&password=%s', formData.email, formData.password),
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                                }
                    })
            .then(res => {
                if (res.status === 200){
                    return res.json()
                }else{
                    setAlertModal(oldValues => {
                        return {
                            ...oldValues,
                            "show": true,
                            "title": "Wrong credentials",
                            "body": "Please check your email and password and try again."
                        }
                    })
                    return "wrong pass"
                }
            })
            .then(data => {
                if (data === "wrong pass"){
                    setLoading(false)
                    return
                }
                setLoading(false)
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
        setLoading(true)
        event.preventDefault()
        setFormData(oldValues => {
            return ({
                ...oldValues,
                "submit": oldValues.submit + 1
            })
        })
    }

    return(
        <>
        <AlertModal 
            showAlertModal={showAlertModal}
            setAlertModal={setAlertModal} 
        />
        <Card className="mb-3" bg="primary" text="light">
        <div style={{
                    justifyContent: "center", 
                    alignItems: "center", 
                    display: "flex",
                    padding: "20px 0 0 0"}}>
            <h1>Login</h1>
        </div>
        <div style={{padding: "20px 30px 30px 30px"}}>
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
                    placeholder="Enter password" 
                    onChange={handleFormData}
                />
                </Form.Group>
                <div style={{display: "flex", justifyContent: "space-between", padding:"0 21px 0 0"}}>
                    <Button variant="light" type="submit">
                        Submit
                    </Button>
                    {loading && <Spinner animation="border"/>}
                </div>
                <br />
                <p>Press register to get new account</p>
            </Form>
            </div>
        </Card>
        </>
    )
}