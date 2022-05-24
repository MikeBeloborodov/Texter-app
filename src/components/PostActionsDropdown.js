import React from 'react'
import { Dropdown } from 'react-bootstrap'
import AlertModal from "./AlertModal"

export default function PostActionDropdown({id, userToken, url_list, setPostChangedState}){
    // get id for a liked post and set it, default id is 0
    const [userAction, setUserAction] = React.useState({
        like: 0,
        update: 0,
        delete: 0
    })

    const [showAlertModal, setAlertModal] = React.useState({
        "show": false,
        "title": "",
        "body": ""
    })
    // effect to send a like to the server
    React.useEffect(() => {
        if(userAction.like !== 0) {
            fetch(url_list.POSTS_LIKE_URL + userAction.like, {method: "PATCH",
                        headers:{
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${userToken.access_token}`
                        }
                    })
            .then(res => {
                if (res.status === 201){
                    return res.json()
                }else if (res.status === 403){
                    setAlertModal({
                            "show": true,
                            "title": "Access problem",
                            "body": "You can't like a post twice."
                                })
                    return "problem"
                }else if (res.status === 404){
                    setAlertModal({
                        "show": true,
                        "title": "Post does not exist",
                        "body": "The post you are trying to like does not exist."
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
                setUserAction(() =>{
                    return ({
                        like: 0,
                        update: 0,
                        delete: 0
                    })
                })
                if (data === "problem"){
                    return
                }
                setPostChangedState(true)
            })
        }
    },[userAction.like])

    // effect to delete a post
    React.useEffect(() => {
        if(userAction.delete !== 0) {
            fetch(url_list.POSTS_URL + userAction.delete, {method: "DELETE",
                        headers:{
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${userToken.access_token}`
                        }
                    })
            .then(res => {
                if (res.status === 200){
                    return res.json()
                }else if (res.status === 403){
                    setAlertModal({
                            "show": true,
                            "title": "Access problem",
                            "body": "You can only delete your own posts."
                                })
                    return "problem"
                }else if (res.status === 404){
                    setAlertModal({
                        "show": true,
                        "title": "Post does not exist",
                        "body": "The post you are trying to delete does not exist."
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
                setUserAction(() =>{
                    return ({
                        like: 0,
                        update: 0,
                        delete: 0
                    })
                })
                if (data === "problem"){
                    return
                }
                setPostChangedState(true)
            })
        }
    
    }, [userAction.delete])
    
    function handleLike(){
        setUserAction(() =>{
            return ({
                like: id,
                update: 0,
                delete: 0
            })
        })
    }

    function handleUpdate(){
        setUserAction(() =>{
            return ({
                like: 0,
                update: id,
                delete: 0
            })
        })
    }

    function handleDelete(){
        setUserAction(() =>{
            return ({
                like: 0,
                update: 0,
                delete: id
            })
        })
    }

    return(
        <div>
            {showAlertModal && 
                <AlertModal 
                    showAlertModal={showAlertModal}
                    setAlertModal={setAlertModal} 
                />}
            <Dropdown >
                <Dropdown.Toggle variant="outline-primary" size="sm" id="dropdown-basic">
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLike}>Like</Dropdown.Item>
                    <Dropdown.Item onClick={handleUpdate}>Update</Dropdown.Item>
                    <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}