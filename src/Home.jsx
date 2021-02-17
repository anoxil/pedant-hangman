import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import "./Home.css"

export default function Home() {
    const [headPos, setHeadPos] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setHeadPos((headPos + 1) % 3)
        }, 2000)
    }, [headPos])

    return (
        <div className="menu">
            <img src={`${process.env.PUBLIC_URL}/images/pedantor/hangman_throne_${headPos}.png`} alt="Hangman" />
            <Link to="/play"><button type="button">partake in the festivities</button></Link>
            <p className="taunt"><span className="apostrophe">“</span>How quaint, you yearn to trounce my own self. Sublime, shall we commence? <span className="apostrophe">”</span></p>
        </div >
    )
}
