import React from "react"
import { Link } from "react-router-dom"

import "./Header.css"

export default function Header() {
    return (
        <div className="header">
            <Link to="/">
                <div className="homeButton">
                    <img src={process.env.PUBLIC_URL + `/images/pedantor/pedantor.png`} alt="Home" title="home" /><span>Pedant Hangman</span>
                </div>
            </Link>
            <div className="icons">
                <a href="https://anoxil.github.io/">
                    <img src={process.env.PUBLIC_URL + `/images/hub_icon.png`} className="hubIcon" alt="Hub" title="anoxil's hub" />
                </a>
                <a href="https://github.com/anoxil" target="_blank" rel="noreferrer">
                    <img src={process.env.PUBLIC_URL + `/images/git_icon.png`} className="gitIcon" alt="Git" title="anoxil's github" />
                </a>
            </div>
        </div >
    )
}