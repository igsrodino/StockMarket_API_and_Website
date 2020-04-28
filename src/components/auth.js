import React from "react";

const API_URL = 'http://131.181.190.87:3000'
const url = `${API_URL}/route`
const token = localStorage.getItem("token")
const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
}

return fetch(url, {headers})
.then((res) => res.json())
.then((res) => console.log(res))