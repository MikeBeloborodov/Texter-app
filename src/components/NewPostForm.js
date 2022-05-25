import React from "react"
import {Form, Button, Card, Spinner} from "react-bootstrap"
import AlertModal from "./AlertModal"

export default function NewPostForm({URL_LIST, userToken}){
    const [formData, setFormData] = React.useState({
        "title": "",
        "content": "",
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
            const payload = {"title": formData.title, "content": formData.content}
            fetch(URL_LIST.POSTS_URL, {method: "POST",
                        headers:{
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${userToken.access_token}`
                        },
                        body: JSON.stringify(payload)})  
            .then(res => {
                if (res.status === 201){
                    return res.json()
                }else if (res.status === 403){
                    setAlertModal({
                            "show": true,
                            "title": "Access problem",
                            "body": "You do not have access to perform this action."
                                })
                    return "problem"
                }else if (res.status === 422){
                    setAlertModal({
                        "show": true,
                        "title": "Format error",
                        "body": "You have entered you text in a wrong format. Please check it and try again."
                            })
                    return "problem"
                }else{
                    setAlertModal({
                            "show": true,
                            "title": "Server problem",
                            "body": "Something is wrong on the server side, please contact administrator."
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
                        "title": "",
                        "content": "",
                        "submit": 0
                            })
                setAlertModal({
                        "show": true,
                        "title": "Your post has been published!",
                        "body": 'You can now see it on the "All posts" page.'
                            })
            })
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
        if (formData.title === "" || formData.content === ""){
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
        <Card className="mb-3" bg="light" text="dark">
        <div style={{
                    justifyContent: "center", 
                    alignItems: "center", 
                    display: "flex",
                    padding: "20px 0 0 0"}}>
            <h1>New post</h1>
        </div>
        <div style={{padding: "20px 30px 30px 30px"}}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                     type="text" 
                     name="title"
                     placeholder="Enter title" 
                     onChange={handleFormData}
                     value={formData.title}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Text</Form.Label>
                    <Form.Control 
                    as="textarea" 
                    rows={4}
                    name="content"
                    placeholder="Your text here" 
                    onChange={handleFormData}
                    value={formData.content}
                    />
                </Form.Group>
                <div style={{display: "flex", justifyContent: "space-between", padding:"0 21px 0 0"}}>
                    <Button variant="primary" type="submit">
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