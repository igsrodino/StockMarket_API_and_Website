import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <h1>Dividend Gods Stock Portal</h1>
        <h4>Welcome to the Stock Analyst portal. </h4>
        
        <div id="home">
          <p>Click on <a href="#stocks">Stocks</a> to see all available companies</p>
          <p><a href="#quote">Price Quote</a> to get the latest price information by stock
          symbol</p>
          <p>Choose <a href="#price-history">Price History</a> to view recent
          price history for particular
          stock.</p>
          <br></br>
          <br></br>
          <h5><b>Available Industries to View:</b></h5>
          <p>Health Care, Financials, Industrials, Real Estate, Consumer Discretionary,
            Materials, Information Technology, Energy, Consumer Staples, Telecommunication 
            Services and Utilities</p>
        </div>
      </div>
    );
  }
}
