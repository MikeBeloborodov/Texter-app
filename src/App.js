import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import NavbarNew from "./components/NavbarNew";
import LoginForm from "./components/LoginForm";

export default function App(){
    return(
        <div>
            <div>
                <NavbarNew />
            </div>
            <div style={{width: "400px", margin: "0 auto", padding: "100px 0 0 0"}}>
                <LoginForm />
            </div>
        </div>
    )
}