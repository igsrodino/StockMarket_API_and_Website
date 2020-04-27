import React, { Component } from "react";
// import { agGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Button } from "react-bootstrap";


export default class Stocks extends Component {
  
  render() {
    return (
      
      <div className="Stocks">
        <Button
        color="info"
        size="sm"
        className="mt-3"
        href="http://131.181.190.87:3000/stocks/symbols"
        target="_blank">
        Go to Stocks API</Button>
      </div>
    );
  }
}
