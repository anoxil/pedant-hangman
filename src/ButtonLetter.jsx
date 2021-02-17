import React from "react"

export default function ButtonLetter(props) {
    return (
        <button
            type="button"
            onClick={() => props.selectLetter(props.char)}
            disabled={props.gameEnded}
            className="disabled:opacity-40"
        >
            { props.char.toUpperCase()}
        </button >
    )
}