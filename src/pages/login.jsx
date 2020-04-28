import React from "react";

const API_URL = 'http://131.181.190.87:3000'

export function Login() {
    function login() {
        const url = `${API_URL}/user/login`

        return fetch(url, {
            method: "POST",
            headers: {accept: "application/json", "Content-Type": "application/json"},
            body: JSON.stringify({email: "example@api.com", password: "asdlkfj1"})

        })
        .then((res) => res.json())
        // .then((res) => console.log(res))
        .then((res) => {localStorage.setItem("token", res.token)})}

    
    return (
        <div class="container">
            <h1> Login</h1>
            
            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" required/>

            <label for="password"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" required/>
            <button onClick={login}>Login</button>
        </div>
    )
}