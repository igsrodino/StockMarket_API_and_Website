import { AgGridReact } from "ag-grid-react";
import React from "react";


// Designs template for all stocks and industry table
export default function SearchTable(props){
    
const columns = [
    { headerName: "Name", field: "name", sortable:true, filter:true },
    { headerName: "Symbol", field: "symbol", sortable:true, filter:true },
    { headerName: "Industry", field: "industry", sortable:true, filter:true },
    
    ];
return(
    <AgGridReact
        columnDefs={columns}
        rowData={props.searchResults}
        pagination={true}
        paginationPageSize={25} />
)}