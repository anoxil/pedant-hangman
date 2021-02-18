import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import "./Home.css"

function importhangmenThrone(r) {
    let images = {};
    r.keys().map((item, index) => images[index] = r(item).default);
    // object with key=index & value=image_url
    return images;
}
const hangmenThrone = importhangmenThrone(require.context('./assets/images/pedantor/', false, /^\.\/hangman_throne_[0-2]\.png$/))


export default function Home() {
    const [headPos, setHeadPos] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setHeadPos((headPos + 1) % 3)
        }, 2000)
    }, [headPos])

    return (
        <div className="menu">
            <img src={hangmenThrone[headPos]} alt="Hangman" />
            <Link to="/play"><button type="button">partake in the festivities</button></Link>
            <p className="taunt"><span className="apostrophe">“</span>How quaint, you yearn to trounce my own self. Sublime, shall we commence? <span className="apostrophe">”</span></p>
        </div >
    )
}
