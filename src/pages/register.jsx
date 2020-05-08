import React, { useState } from "react";


export function Register() {
const API_URL = 'http://131.181.190.87:3000'
const url = `${API_URL}/user/register`
const [email, setEmail]= useState('');
const [password, setPassword]= useState('');
const headers = { 
    method: "POST",
    headers: {accept: "application/json", "Content-Type": "application/json"},
    body: JSON.stringify({email:`${email}`, password:`${password}`})
};

function register() {
    return fetch(url, {headers})
        .then((res) => res.json())
        // .then((res) => console.log(res))
        .then((res) => {localStorage.setItem("token", res.token)})}

    
    return (
        <div className="container">
            <h1> Register</h1>
            
            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" required value={email}onChange={
          (e)=>setEmail(e.target.value)}/>

            <label htmlFor="password"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" required value={password}onChange={
          (e)=>setPassword(e.target.value)}/>
            <button onClick={register}>Register</button>
        </div>
    )
}