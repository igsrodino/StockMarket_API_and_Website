import React, { Component } from "react";


export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <h1><b>Stock Portal</b></h1>
        <h4>Welcome to the Stock Analyst Portal.</h4>
        <img id="homeImage" src={require('./../images/homeImage.jpg')} alt="Home Pic"></img>
          <div id="home">
            <a href="/stocks"><button type="button" id="button" class="btn btn-outline-dark btn-lg">All Stocks</button></a>
            <a href="/quote"><button type="button" id="button"class="btn btn-outline-dark btn-lg">Search Stocks</button></a>
            <a href="/pricehistory"><button type="button" id="button"class="btn btn-outline-dark btn-lg">Price History</button></a>
          </div>
      </div>
    );
  }
}
