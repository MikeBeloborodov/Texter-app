import React from "react"
import {Form, Button, Card, Spinner} from "react-bootstrap"
import ProblemModal from "./ProblemModal"

export default function Register({url_list, wrongPasswordHandle}){

    const [formData, setFormData] = React.useState({
        "email": "",
        "password": "",
        "confirmPassword": "",
        "submit": 0
    })

    React.useEffect(() => {
        if (formData.submit){
            fetch(url_list.REGISTER_URL, {method: "POST",
                        body: {
                            "email": formData.email,
                            "password": formData.password
                        },
                        headers: {
                            "Content-Type": "application/json",
                                }
                    })
            .then(res => {
                if (res.status === 201){
                    return res.json()
                }else{
                    setShowProblemModal(true)
                    return res.json()
                }
            })
            .then(data => {
                if (data === "problem"){
                    console.log(data)
                    setLoading(false)
                    return
                }
                console.log(data)
                setLoading(false)
                })
        }
    }, [formData.submit])   

    // if server problem
    const [showProblemModal, setShowProblemModal] = React.useState(false)
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
        if (formData.password != formData.confirmPassword){
            wrongPasswordHandle(true)
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
        <ProblemModal 
            showProblemModal={showProblemModal}
            setProblemModal={setShowProblemModal} 
            title="Something went wrong" 
            problem="Probably something went wrong on the server side. Please contact administrator."
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