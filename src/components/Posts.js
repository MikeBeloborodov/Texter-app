import React from 'react'
import {Card, Button, Spinner} from "react-bootstrap"
import AlertModal from "./AlertModal"


export default function Posts({userToken, url_list, setPostChangedState}){
    
    const [posts, setPosts] = React.useState([])

    // get id for a liked post and set it, default id is 0
    const [like, setLike] = React.useState(0)
    // alert modal for various purposes
    const [showAlertModal, setAlertModal] = React.useState({
        "show": false,
        "title": "",
        "body": ""
    })
    // spinner animation for posts
    const [loading, setLoading] = React.useState(false)
    
    let elements

    function handleLike(event){
        setLoading(true)
        setLike(event.target.id)
    }

    // effect to send a like to the server
    React.useEffect(() => {
        if(like !== 0) {
            fetch(url_list.POSTS_LIKE_URL + like, {method: "PATCH",
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
                setLoading(false)
                setLike(0)
                if (data === "problem"){
                    return
                }
                setPostChangedState(true)
            })
        }
    },[like])

    // effect to get post from the server
    React.useEffect(() => {
        fetch(url_list.POSTS_URL, {method: "GET",
                    headers: {
                        "Authorization": `Bearer ${userToken.access_token}`,
                            }
                }).then( (res) => {
                    if (res.status === 200){
                        return res.json()
                    }else if(res.status === 401){
                        setAlertModal({
                            "show": true,
                            "title": "Unauthorized",
                            "body": "Your token has expired, please login again"
                                })
                        setLoading(false)
                        return "problem"
                    }
                }).then(data => {
                    if (data === "problem"){
                        elements = <h4>Posts should be here, but there was an error...</h4>
                        setPosts(elements)
                        return
                    }
                    elements = data.map(data => {
                        return(
                            <div key={data.id} id={data.id}>
                            <Card style={{width: "400px"}}>
                                <Card.Body>
                                    <Card.Title>{data.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{data.owner.email}</Card.Subtitle>
                                    <br />
                                    <Card.Text>
                                    {data.content}
                                    </Card.Text>
                                    <br/>   
                                    <div className="date-time-likes" style={{display: "flex"}}>
                                        <Card.Subtitle className="mb-2 text-muted" style={{paddingRight: "10px"}}>
                                            {data.created_at.slice(11, 16)}
                                        </Card.Subtitle>
                                        <Card.Subtitle className="mb-2 text-muted" style={{paddingRight: "40px"}}>
                                            {data.created_at.slice(0,10)}
                                        </Card.Subtitle>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            Likes: {data.likes}               
                                        </Card.Subtitle>
                                    </div>
                                    <div className="like-button" style={{display: "flex", justifyContent: "right"}}>
                                    <Button id={data.id} onClick={handleLike}>Like</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                            <br />
                            </div>
                        )
                    })
                    setLoading(false)
                    setPosts(elements)
                })
    }, [])
    
    return(
        <div>
            {loading &&
                <div style={{display: "flex",   justifyContent: "center", paddingBottom: "20px"}}>
                    <Spinner animation="border"/>
                </div>
            }
            {showAlertModal && 
                <AlertModal 
                    showAlertModal={showAlertModal}
                    setAlertModal={setAlertModal} 
                />}
            {posts}
        </div>
    )
}