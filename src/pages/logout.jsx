
import React from "react";
import { BrowserRouter as Redirect } from "react-router-dom";

export default function Logout() {



    return (
        window.localStorage.clear(),
        alert("You have successfully logged out."),
        <Redirect path="/"/>

    )
        
    }
    
    

