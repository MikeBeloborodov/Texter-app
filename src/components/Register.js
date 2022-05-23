import React from "react"
import {Form, Button, Card, Spinner} from "react-bootstrap"
import AlertModal from "./AlertModal"

export default function Register({url_list}){

    const [formData, setFormData] = React.useState({
        "email": "",
        "password": "",
        "confirmPassword": "",
        "submit": 0
    })

    React.useEffect(() => {
        if (formData.submit){
            const payload = {"email": formData.email, "password": formData.password}
            fetch(url_list.REGISTER_URL, {method: "POST",
                        headers:{"Content-Type": "application/json"},
                        body: JSON.stringify(payload)})  
            .then(res => {
                if (res.status === 201){
                    return res.json()
                }else if (res.status === 403){
                    setAlertModal({
                            "show": true,
                            "title": "User already exists",
                            "body": "User with this email already exists. Please check your email address."
                                })
                    return "problem"
                }else{
                    setAlertModal({
                            "show": true,
                            "title": "Problem with response",
                            "body": "Something wrong on the server side, please contact administrator."
                                })
                    return "problem"
                }
            })
            .then(data => {
                setLoading(false)
                if (data === "problem"){
                    return
                }
                setFormData({
                        "email": "",
                        "password": "",
                        "confirmPassword": "",
                        "submit": 0
                            })
                setAlertModal({
                        "show": true,
                        "title": "New account registred",
                        "body": "You can now login with your email and password."
                            })
            })
        }
    }, [formData.submit])   

    // alert modal for various purposes
    const [showAlertModal, setAlertModal] = React.useState({
        "show": false,
        "title": "",
        "body": ""
    })
    // spinner animation
    const [loading, setLoading] = React.useState(false)

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
        setLoading(true)
        if (formData.password !== formData.confirmPassword){
            setAlertModal({
                "show": true,
                "title": "Passwords do not match",
                "body": "Plese make sure that password and confirm password are the same"
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
        console.log(formData)
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
            <h1>New account</h1>
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
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control 
                    type="password" 
                    name="confirmPassword"
                    placeholder="Confirm password" 
                    onChange={handleFormData}
                />
                </Form.Group>
                <div style={{display: "flex", justifyContent: "space-between", padding:"0 21px 0 0"}}>
                    <Button variant="light" type="submit">
                        Submit
                    </Button>
                    {loading && <Spinner animation="border"/>}
                </div>
            </Form>
            </div>
        </Card>
        </>
    )
}