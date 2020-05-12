import React from "react";
import { Nav } from "react-bootstrap";

//const token = localStorage.getItem("token");
export default function Menu() {
  
const token = localStorage.getItem("token");  
    
    return (
      <header>
        <nav className="navbar bg-dark navbar-dark">
          <Nav>
          <a class="navbar-brand" href="/">
            <img id="logoImage" src="https://previews.123rf.com/images/ronnarid/ronnarid1509/ronnarid150900212/45669889-graph-grow-up-logo-vector-illustration.jpg" alt="Logo"/>
          </a>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/stocks">All Stocks</Nav.Link>
            <Nav.Link href="/quote">Price Quote</Nav.Link>
            <Nav.Link href="/pricehistory">Price History</Nav.Link>
          </Nav>
          <Nav>
            {!token ? (
            <><Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link></>)
              : (
            <><Nav.Link href="/logout">Logout</Nav.Link></>)}
          </Nav>
        </nav>
      </header>
    );
  
}
