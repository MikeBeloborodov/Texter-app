import React from 'react'
import {Card, Spinner} from "react-bootstrap"
import AlertModal from "./AlertModal"
import PostActionDropdown from './PostActionsDropdown'


export default function Posts({userToken, url_list, setPostChangedState}){
    
    const [posts, setPosts] = React.useState([])

    // alert modal for various purposes
    const [showAlertModal, setAlertModal] = React.useState({
        "show": false,
        "title": "",
        "body": ""
    })
    // spinner animation for posts
    const [loading, setLoading] = React.useState(false)
    
    let elements

    // effect to get post from the server
    React.useEffect(() => {
        setLoading(true)
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
                                    <div className='post-top' style={{display: "flex", justifyContent: "space-between"}}>
                                        <div className='title-subtitle'>
                                            <Card.Title>{data.title}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{data.owner.email}</Card.Subtitle>
                                        </div>
                                        <div className="post-actions">
                                            <PostActionDropdown setPostChangedState={setPostChangedState} url_list={url_list} userToken={userToken} id={data.id} />
                                        </div>
                                    </div>
                                    <br />
                                    <Card.Text>
                                    {data.content}
                                    </Card.Text>
                                    <br/>   
                                    <div className="date-time-likes" style={{display: "flex", justifyContent: "space-between"}}>
                                        <div className='date-time' style={{display:"flex"}}>
                                            <Card.Subtitle className="mb-2 text-muted" style={{paddingRight: "10px"}}>
                                                {data.created_at.slice(11, 16)}
                                            </Card.Subtitle>
                                            <Card.Subtitle className="mb-2 text-muted" style={{paddingRight: "40px"}}>
                                                {data.created_at.slice(0,10)}
                                            </Card.Subtitle>
                                        </div>  
                                        <div className='likes'>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                Likes: {data.likes}               
                                            </Card.Subtitle>
                                        </div>
                                    </div>
                                        {data.created_at != data.updated_at ?
                                            <div className='date-time' style={{display:"flex"}}>
                                            <Card.Subtitle className="mb-2 text-muted" style={{paddingRight: "10px"}}>
                                                Last update: {data.updated_at.slice(11, 16)}
                                            </Card.Subtitle>
                                            <Card.Subtitle className="mb-2 text-muted" style={{paddingRight: "40px"}}>
                                                {data.updated_at.slice(0,10)}
                                            </Card.Subtitle>
                                        </div>   :
                                        <></>}
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