import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";

const token = localStorage.getItem("token");
export default class Menu extends Component {
  
  render() {
    
    return (
      <header>
      <nav className="navbar bg-dark navbar-dark">
        <Nav>
          <Navbar.Brand href="/">Dividend Gods</Navbar.Brand>
          <Nav.Link href="/stocks">Stocks</Nav.Link>
          <Nav.Link href="/quote">Quote</Nav.Link>
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
}
