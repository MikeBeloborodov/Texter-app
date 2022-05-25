import React from "react";
import {Container, Navbar, Nav, Image} from "react-bootstrap"
import {LinkContainer} from 'react-router-bootstrap'
import { Link } from "react-router-dom";
import logo from "../logo192.png"

export default function NavbarComponent({isLogged}){
    
    return(
        isLogged ? 
        <Navbar bg="primary " variant="dark">
            <Container>
                <Image roundedCircle src={logo} width="40px"></Image>
                <LinkContainer to="/">
                    <Navbar.Brand>Texter</Navbar.Brand>
                </LinkContainer>
                <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <LinkContainer to="/allPosts">
                        <Nav.Link>All posts</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/newPost">
                        <Nav.Link>New post</Nav.Link>
                    </LinkContainer>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> :
        <Navbar bg="primary " variant="dark">
        <Container>
            <Image roundedCircle src={logo} width="40px"></Image>
            <LinkContainer to="/">
                <Navbar.Brand>Texter</Navbar.Brand>
            </LinkContainer>
            <Navbar.Collapse className="justify-content-end">
                            <Nav>
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/register">
                                <Nav.Link>Register</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/about">
                                <Nav.Link>About</Nav.Link>
                            </LinkContainer>
                            </Nav> 
                </Navbar.Collapse>
            </Container>
      </Navbar>
    )
}