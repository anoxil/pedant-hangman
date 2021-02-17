import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Header from "./Header.jsx"
import Home from "./Home.jsx"
import Game from "./Game.jsx"
import "./index.css"

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL} onUpdate={() => window.scrollTo(0, 0)}>
            <Switch>
                <Route exact path="/" children={<div><Header /><Home /></div>}></Route>
                <Route path="/play" children={<div><Header /><Game /></div>}></Route>
            </Switch>
        </BrowserRouter>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))