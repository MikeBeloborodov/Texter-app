import React from "react"
import {Form, Button, Card, Spinner} from "react-bootstrap"
import { sprintf } from "sprintf-js"
import AlertModal from "./AlertModal"


export default function LoginForm(
    {   loginHandle, 
        tokenHandle, 
        navbarHandle, 
        url_list,
        setPostChangedState
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
                }else if (res.status === 422){
                    setAlertModal({
                        "show": true,
                        "title": "Format error",
                        "body": "You have entered wrong email or password format. Make sure that email has symbol @."
                            })
                    return "problem"
                }else if (res.status === 403){
                    setAlertModal({
                            "show": true,
                            "title": "Wrong credentials",
                            "body": "Please check your email and password and try again."
                                })
                    return "problem"
                }else{
                    setAlertModal({
                        "show": true,
                        "title": "Server problem",
                        "body": "There is a problem with our server. Please contact administrator."
                            })
                    return "problem"
                }
            })
            .then(data => {
                if (data === "problem"){
                    setLoading(false)
                    return
                }
                setLoading(false)
                tokenHandle(data)
                setPostChangedState(true)
                loginHandle(true)
                navbarHandle(oldValues => {
                return ({
                    ...oldValues,
                    "login": false,
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
        if (formData.email === "" || formData.password === ""){
            setAlertModal({
                "show": true,
                "title": "Empty fields",
                "body": "Please fill all the fields."
                        })
            setLoading(false)
            return
        }
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
                <Form.Group className="mb-3" controlId="formBasicEmailLogin">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                     type="email" 
                     name="email"
                     placeholder="Enter email" 
                     onChange={handleFormData}
                     value={formData.email}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPasswordLogin">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    name="password"
                    placeholder="Enter password" 
                    onChange={handleFormData}
                    value={formData.password}
                />
                </Form.Group>
                <div style={{display: "flex", justifyContent: "space-between", padding:"0 21px 0 0"}}>
                    <Button variant="light" type="submit">
                        Submit
                    </Button>
                    {loading && <Spinner animation="border"/>}
                </div>
                <br />
                <p>Press register to get a new account</p>
            </Form>
            </div>
        </Card>
        </>
    )
}