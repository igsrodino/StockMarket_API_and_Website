import React from "react";
// import { agGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Button, Badge } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";

const API_URL = 'http://131.181.190.87:3000'
const url = `${API_URL}/stocks/symbols`

export default function StocksApp(search){
const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(res => {
        if (res.status === 404){
          throw "404"
        }
        return res.json() })
      
      .then(data => data.map(data => {
          
        return {
            name: data.name,
            symbol: data.symbol,
            industry: data.industry,
          };
        })
      )
      .then(data => setRowData(data))
      .catch(error => alert(error));
      
  }, [search]);

  const columns = [
    { headerName: "Name", field: "name", resizable: true , sortable:true, filter:true},
    { headerName: "Symbol", field: "symbol", resizable: true, sortable:true, filter:true },
    { headerName: "Industry", field: "industry", resizable: true, sortable:true, filter:true },
    
  ];

    return (
      <div className="container">
      <h1>Stocks List</h1>
      <p><Badge color="success">{rowData.length}</Badge> Stocks loaded</p>
      <div className="ag-theme-balham-dark" style={{rowHeight: "500px"}}>
        <AgGridReact
          columnDefs={columns}
          rowData={rowData}
          pagination={true}
          paginationPageSize={25} />
          </div>
          <div className="Stocks">
            <Button
            color="info"
            size="sm"
            className="mt-3"
            href="http://131.181.190.87:3000/stocks/symbols"
            target="_blank">
            Go to Stocks API</Button></div>
          </div>
    );
  }

