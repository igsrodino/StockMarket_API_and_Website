import React, { useState } from "react";
import { useHistory } from "react-router-dom";


// Function to login user and store JWT token
export function Login() {
    
const API_URL = 'http://131.181.190.87:3000'
const url = `${API_URL}/user/login`
const [email, setEmail]= useState('');
const [password, setPassword]= useState('');
const history = useHistory();

function login() {

    return fetch(url, {
        method: "POST",
        headers: {accept: "application/json", "Content-Type": "application/json"},
        body: JSON.stringify({email:`${email}`, password:`${password}`})
    })
        .then(res => {
            if (res.status === 200){
                
                alert("Success! Welcome!")
                history.push("/")
                window.location.reload()
                
            }
            if (res.status === 401){
                alert("Incorrect password")
            }
            
            return res.json() })
        .then((res) => {
            localStorage.setItem("token", res.token)})}
            


    return (
        <div className="container">
            <div>
                <h1><b>Login</b></h1>
                <br></br>
                <label htmlFor="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" required value={email}onChange={
                (e)=>setEmail(e.target.value)}/>

                <label htmlFor="password"><b>&emsp;Password</b></label>
                <input type="password" placeholder="Enter Password" name="password" required value={password}onChange={
                (e)=>setPassword(e.target.value)}/>
                <div>
                    <br></br>
                    <button id="search-button" class="btn btn-outline-dark btn-lg" onClick={login}>Login</button>
                </div>
            </div>
            <div id="registerlogin">
                <h5><b>Don't have an account?</b></h5>
                <a href="/register"><button type="button" class="btn btn-outline-dark btn-lg">Register</button></a>
            </div>
        </div>
        )
    }
    
    