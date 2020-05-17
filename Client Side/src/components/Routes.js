import React from "react";
import Menu from "./Nav";
import Home from "./../pages/home";
import Stocks from "./../pages/stocks";
import Quote from "../pages/quote";
import PriceHistory from "./../pages/pricehistory";
import { Login } from "./../pages/login";
import { Register } from "./../pages/register";
import  Logout  from "./../pages/logout";
import SearchByIndustry from "./../views/SearchIndustry";
import SearchBySymbol from "./../views/SearchSymbol";
import SearchTimeframe from "./../views/SearchTimeframe";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


// Router for displaying different pages/functions
export default function Routes(){

    return(
        <Router>
            <div className="App">
                <Menu />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/stocks">
                            <Stocks />
                        </Route>
                        <Route path="/quote">
                            <Quote />
                            <SearchBySymbol />
                            <SearchByIndustry /> 
                        </Route>
                        <Route path="/pricehistory">
                            <PriceHistory />
                            <SearchTimeframe />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/logout">
                            <Logout path="/"/>
                        </Route>
                    </Switch>
            </div>
        </Router>
    );
}