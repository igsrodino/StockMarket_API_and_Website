import React, { Component } from "react";
// import { Table } from "react-bootstrap";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";

const table = {
  columns: [
    {headerName: "Name", field: "name", sortable: true, filter: true}, 
    {headerName: "Symbol", field: "symbol", sortable: true, filter: true}, 
    {headerName: "Industry", field: "industry", sortable: true, filter: true}
  ],
  rowData: [
    {name: "Toyota", symbol: "Camry", industry: 28888},
    {name: "Toyota", symbol: "Bamry", industry: 2800888}
  ],

}

export default class Stocks extends Component {
  render() {
    return (
      
      <div className="Stocks">
        <div className="container">
        <div
        className="ag-theme-balham"
        >
          <AgGridReact
          columnDefs={table.columns}
          rowData={table.rowData}
          pagination={true}
          paginationPageSize={50}
           />
        </div>
        </div>
        <h1>STOCKS</h1>
        <h4>STOCKS PAGE </h4>
        <div id="stocks">STOCKS PAGE</div>
      </div>
    );
  }
}
