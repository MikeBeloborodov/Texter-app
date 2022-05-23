import React from 'react'
import {Card} from "react-bootstrap"


export default function Posts({userToken, url_list}){
    
    const [posts, setPosts] = React.useState([])
    
    let elements

    React.useEffect(() => {
        fetch(url_list.POSTS_URL, {method: "GET",
                    headers: {
                        "Authorization": `Bearer ${userToken.access_token}`,
                            }
                }).then( (res) => {
                    if (res.status === 200){
                        return res.json()
                    }else{
                        alert("Something went wrong.")
                        return
                    }
                }).then(data => {
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
                                    <Card.Subtitle className="mb-2 text-muted">
                                    <pre>{data.created_at.slice(11, 16)}  {data.created_at.slice(0,10)}</pre>
                                    </Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">
                                    <pre>Likes: {data.likes}               <button>Like</button></pre>
                                    </Card.Subtitle>
                                </Card.Body>
                            </Card>
                            <br />
                            </div>
                        )
                    })
                    setPosts(elements)
                })
    }, [])
    
    return(
        <div>
            {posts}
        </div>
    )
}