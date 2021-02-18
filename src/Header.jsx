import React from "react"
import { Link } from "react-router-dom"

import "./Header.css"

import logo from "./assets/images/pedantor/pedantor.png"
import hubIcon from "./assets/images/hub_icon.png"
import gitIcon from "./assets/images/git_icon.png"

export default function Header() {
    return (
        <div className="header">
            <Link to="/">
                <div className="homeButton">
                    <img src={logo} alt="Home" title="home" /><span>Pedant Hangman</span>
                </div>
            </Link>
            <div className="icons">
                <a href="https://anoxil.github.io/">
                    <img src={hubIcon} className="hubIcon" alt="Hub" title="anoxil's hub" />
                </a>
                <a href="https://github.com/anoxil" target="_blank" rel="noreferrer">
                    <img src={gitIcon} className="gitIcon" alt="Git" title="anoxil's github" />
                </a>
            </div>
        </div >
    )
}