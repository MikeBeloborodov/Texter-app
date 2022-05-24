import React from 'react'
import {Card, Button, Spinner} from "react-bootstrap"


export default function Posts({userToken, url_list}){
    
    const [posts, setPosts] = React.useState([])
    
    // spinner animation
    const [loading, setLoading] = React.useState(false)
    
    let elements

    React.useEffect(() => {
        setLoading(true)
        fetch(url_list.POSTS_URL, {method: "GET",
                    headers: {
                        "Authorization": `Bearer ${userToken.access_token}`,
                            }
                }).then( (res) => {
                    if (res.status === 200){
                        return res.json()
                    }else{
                        alert("Something went wrong.")
                        setLoading(false)
                        return "problem"
                    }
                }).then(data => {
                    if (data === "problem"){
                        elements = <h4>Posts should be here, but there was an error...</h4>
                        return
                    }
                    elements = data.map(data => {
                        return(
                            <div key={data.id}>
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
                                    <Button>Like</Button>
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
            {loading && <Spinner animation="border"/>}
            {posts}
        </div>
    )
}