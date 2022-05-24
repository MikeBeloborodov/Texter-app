import React from "react";
import {Container, Navbar, Nav, Image} from "react-bootstrap"
import logo from "../logo192.png"

export default function NavbarNew({isLogged, setNavbarChoice}){
    
    function handleNavbarChoice(event){
        setNavbarChoice(oldValues => {
            return(
                {
                    "login": false,
                    "register": false,
                    "allPosts": false,
                    "newPost": false,
                    "about": false,
                    [event.target.id]: true
                }
            )
        })
    }
    
    return(
        <Navbar bg="primary " variant="dark">
            <Container>
                <Image roundedCircle src={logo} width="40px"></Image>
                <Navbar.Brand href="#home">Texter</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                {isLogged ? <Nav>
                                <Nav.Link id="allPosts" onClick={handleNavbarChoice}>All posts</Nav.Link>
                                <Nav.Link id="newPost" onClick={handleNavbarChoice}>New post</Nav.Link>
                                <Nav.Link id="about" onClick={handleNavbarChoice}>About</Nav.Link>
                            </Nav> :
                            <Nav>
                                <Nav.Link id="login" onClick={handleNavbarChoice}>Login</Nav.Link>
                                <Nav.Link id="register" onClick={handleNavbarChoice}>Register</Nav.Link>
                                <Nav.Link id="about" onClick={handleNavbarChoice}>About</Nav.Link>
                            </Nav> }
                </Navbar.Collapse>
            </Container>
      </Navbar>
    )
}