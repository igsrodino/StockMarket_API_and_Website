import React, { useState } from "react";

export function Login() {
const API_URL = 'http://131.181.190.87:3000'
const url = `${API_URL}/user/login`
const [email, setEmail]= useState('');
const [password, setPassword]= useState('');

function login() {

    return fetch(url, {
        method: "POST",
        headers: {accept: "application/json", "Content-Type": "application/json"},
        body: JSON.stringify({email:`${email}`, password:`${password}`})
    })
        .then(res => {
            if (res.status === 401){
                alert("Incorrect password")
            }
            return res.json() })
        .then((res) => {localStorage.setItem("token", res.token)})}


    return (
        <div className="container">
            <h1>Login</h1>
            
            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" required value={email}onChange={
            (e)=>setEmail(e.target.value)}/>

            <label htmlFor="password"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" required value={password}onChange={
            (e)=>setPassword(e.target.value)}/>
            
            <button onClick={login}>Login</button>
        </div>
        )
    }
    
    