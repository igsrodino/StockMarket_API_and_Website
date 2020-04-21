import React from "react";
import "./styles.css";
// import { Navbar, Nav } from 'react-bootstrap';
import Menu from "./components/Nav";
import Home from "./pages/home";
// import Header from "./components/Header.jsx";
// import {Nav, Navbar} from 'react-bootstrap/Navbar'

export default function App() {
  return (
    <div className="App">
      <Menu />
      <Home />

      {/* //   <div className="App">
  //     <Menu displaytext="First Component Data" />
  //     <h1>Dividend Gods Stock Portal</h1>
  //     <h4>Welcome to the Stock Analyst portal. </h4>
  //     <div id="home">
  //       Click on <a href="#stocks">Stocks</a> to see the available companies,{" "}
  //       <a href="quote">Quote</a> to get the latest price information by stock
  //       symbol, or choose <a href="price-history">Price History</a> to sample
  //       from the most recent one hundred days of information for a particular
  //       stock.
  //     </div>} */}
    </div>
  );
}
