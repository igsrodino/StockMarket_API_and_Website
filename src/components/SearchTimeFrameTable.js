import { AgGridReact } from "ag-grid-react";
import React from "react";


// Designs template for search by symbol and date table
export default function SearchTimeFrameTable(props){

const columns = [
    { headerName: "Timestamp", field: "timestamp", sortable:true, cellRenderer: 
    (data) => {
        return data.value ? (new Date(data.value)).toLocaleDateString() : '';
   } },
    { headerName: "Symbol", field: "symbol", sortable:true },
    { headerName: "Name", field: "name", sortable:true },
    { headerName: "Industry", field: "industry", sortable:true },
    { headerName: "Open", field: "open", sortable:true },
    { headerName: "High", field: "high", sortable:true },
    { headerName: "Low", field: "low", sortable:true },
    { headerName: "Close", field: "close", sortable:true },
    { headerName: "Volume", field: "volumes", sortable:true },
    
    ];
return(
    <AgGridReact
        columnDefs={columns}
        rowData={props.searchResults}
        pagination={true}
        paginationPageSize={25}/>
)}