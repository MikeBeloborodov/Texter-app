import React from 'react'
import {Card} from "react-bootstrap"
import { Link } from 'react-router-dom'

export default function MissingForm(){
    return(
        <>
        <Card style={{width: "400px"}}>
            <Card.Body>
                <Card.Title>404 not found</Card.Title>
                <Card.Text>
                This page does not exist.
                <br/>
                <br/>
                <Link to="/login">Login</Link>
                <br />
                <Link to="/register">Register</Link>
                </Card.Text>
            </Card.Body>
        </Card>
        </>
    )
}