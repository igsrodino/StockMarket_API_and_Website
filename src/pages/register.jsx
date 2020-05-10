import React, { useState } from "react";
import { useHistory } from "react-router-dom";


export function Register() {
const API_URL = 'http://131.181.190.87:3000'
const url = `${API_URL}/user/register`
const [email, setEmail]= useState('');
const [password, setPassword]= useState('');
const history = useHistory();

function register() {
    
    return fetch(url, {
        method: "POST",
        headers: {accept: "application/json", "Content-Type": "application/json"},
        body: JSON.stringify({email:`${email}`, password:`${password}`})
    })
        .then(res => {
            if (res.status === 201){
                alert("Success! Account registered!")
                history.push("/")}

            if (res.status === 400){
                alert("Both email and password required")
                history.push("/register")
                throw new Error(400)}

            if (res.status === 409){
                alert("User already exists, please log in instead")
                history.push("/login")
                throw new Error(401)
            }


            
            return res.json() })
        
            
        .catch(Error)}
    
    return (
        <div className="container">
            <h1>Register</h1>
            
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