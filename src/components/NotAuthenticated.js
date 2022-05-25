import React from 'react'
import {Card} from "react-bootstrap"
import { Link } from 'react-router-dom'

export default function NotAuthenticated(){
    return(
        <Card style={{width: "400px"}}>
            <Card.Body>
                <Card.Title>Authentication error</Card.Title>
                <Card.Text>
                To view this page you must log in.
                <br/>
                <br/>
                <Link to="/login">Login</Link>
                <br />
                <Link to="/register">Register</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}