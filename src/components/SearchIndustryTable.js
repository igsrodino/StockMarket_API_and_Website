import { AgGridReact } from "ag-grid-react";
import React from "react";

export default function SearchTable(props){
    
const columns = [
    { headerName: "Name", field: "name", resizable: true , sortable:true, filter:true},
    { headerName: "Symbol", field: "symbol", resizable: true, sortable:true, filter:true },
    { headerName: "Industry", field: "industry", resizable: true, sortable:true, filter:true },
    
    ];
return(
    <AgGridReact
        columnDefs={columns}
        rowData={props.searchResults}
        pagination={true}
        paginationPageSize={25} />
)}