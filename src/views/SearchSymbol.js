import  React, { useState } from "react";
import SearchSymbolTable from "../components/SearchSymbolTable";

export default function SearchBySymbol() {
    const[searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState('');
 
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
            alert("Stock symbol entered not found")
            throw new Error(404)
          }
          if (res.status === 400){
            alert("Stock symbol must be 1-5 capital letters")
            throw new Error(400)
          }
          
          return res.json() })
        
        .then(data => setSearchResults([data])
 
        )
      
        .catch(Error);
    }
        }>Search By Symbol</button> 
        
     {searchResults.length > 0 ? (
     <div id="symbolSearch" className="ag-theme-balham-dark">
      <SearchSymbolTable searchResults={searchResults} />
      </div>)
            : ('')
          }
     
      </div>
          )}