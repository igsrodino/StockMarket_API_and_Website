import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <h1>Dividend Gods Stock Portal</h1>
        <h4>Welcome to the Stock Analyst portal. </h4>
        <div id="home">
          Click on <a href="#stocks">Stocks</a> to see the available companies,{" "}
          <a href="quote">Quote</a> to get the latest price information by stock
          symbol, or choose <a href="price-history">Price History</a> to sample
          from the most recent one hundred days of information for a particular
          stock.
        </div>
      </div>
    );
  }
}
