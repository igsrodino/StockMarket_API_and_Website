import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";

export default class Menu extends Component {
  render() {
    return (
      <nav className="navbar bg-dark navbar-dark">
        <Nav>
          <Navbar.Brand href="/">Dividend Gods</Navbar.Brand>
          <Nav.Link href="/stocks">Stocks</Nav.Link>
          <Nav.Link href="/quote">Quote</Nav.Link>
          <Nav.Link href="/price-history">Price History</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/register">Register</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      </nav>
    );
  }
}
