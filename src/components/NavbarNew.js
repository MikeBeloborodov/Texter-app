import React from "react";
import {Container, Navbar, Nav, Image} from "react-bootstrap"
import logo from "../logo192.png"

export default function NavbarNew(){
    return(
        <Navbar bg="primary" variant="dark">
            <Container>
                <Image roundedCircle src={logo} width="40px"></Image>
                <Navbar.Brand href="#home">Texter</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Link href="#home">Login</Nav.Link>
                    <Nav.Link href="#pricing">About</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
      </Navbar>
    )
}