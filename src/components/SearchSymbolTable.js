import { AgGridReact } from "ag-grid-react";
import React from "react";

export default function SearchSymbolsTable(props){

const columns = [
    { headerName: "Timestamp", field: "timestamp", resizable: true },
    { headerName: "Symbol", field: "symbol", resizable: true},
    { headerName: "Name", field: "name", resizable: true },
    { headerName: "Industry", field: "industry", resizable: true },
    { headerName: "Open", field: "open", resizable: true },
    { headerName: "High", field: "high", resizable: true },
    { headerName: "Low", field: "low", resizable: true},
    { headerName: "Close", field: "close", resizable: true},
    { headerName: "Volume", field: "volumes", resizable: true },
    
    ];
return(
    <AgGridReact
        columnDefs={columns}
        rowData={props.searchResults}
        
         />
)}