import  React, { useState } from "react";
import SearchSymbolsTable from "../components/SearchSymbolTable";

export default function SearchBySymbol() {
    const[searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
 
    return(
    <div>
      <input 
        aria-labelledby="search-button"
        name="search"
        id="search"
        type="search"
        value={searchTerm}onChange={
        (e)=>setSearchTerm(e.target.value)
      }/>
      <button id="search-button" type="button" onClick={()=>
        {fetch(`http://131.181.190.87:3000/stocks/${searchTerm}`)
        .then(res => {
          if (res.status === 404){
            //throw "404"
          }
          return res.json() })
        
        .then(data => setSearchResults(data)
 
        )
      
        .catch(error => alert(error));
        }
        }>Search By Symbol</button> 
        
     {searchResults.length > 0 ? (
     <div className="ag-theme-balham-dark">
      <SearchSymbolsTable searchResults={searchResults} />
      </div>)
            : ('')
          }
     
      </div>
          )}