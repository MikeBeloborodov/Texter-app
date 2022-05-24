import React from 'react'
import { Form, Button, Modal, Spinner } from 'react-bootstrap'
import AlertModal from "./AlertModal"

export default function UpdatePost({post_id, url_list, userToken, setPostChangedState}){
    
    // modal popup if user wants to update a post
    const [showUpdateModal, setShowUpdateModal] = React.useState(true)
    // form values
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
            fetch(url_list.POSTS_URL + post_id, {method: "PATCH",
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
                        "title": "Your post has been updated!",
                        "body": 'Updated post is now on the "All posts" page.'
                            })
            })
        }
    }, [formData.submit]) 

    function handleClose(){
        setShowUpdateModal(false)
        setPostChangedState(true)
    }
    
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
       // setLoading(true)
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

    return (
        <div>
        <AlertModal 
        showAlertModal={showAlertModal}
        setAlertModal={setAlertModal} 
        />
        <Modal show={showUpdateModal} onHide={handleClose} centered backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Update post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formUpdatedTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Updated title"
                    name="title"
                    onChange={handleFormData}
                    value={formData.title}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUpdatedText">
                <Form.Label>Text</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={4}
                    name="content"
                    placeholder="Updated text here" 
                    onChange={handleFormData}
                    value={formData.content}
                />
            </Form.Group>
            <div style={{display: "flex", float: "right"}}>
                {loading && <Spinner animation="border"/>}
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
            </Form>
          </Modal.Body>
        </Modal>
        </div>

    )
}