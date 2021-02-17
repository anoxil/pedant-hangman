import React, { useState, useEffect } from "react"

import ButtonLetter from "./ButtonLetter.jsx"
import "./Game.css"

export default function Game() {
    const [mysteryWord, setMysteryWord] = useState(null)
    const [userWord, setUserWord] = useState([])
    const [gameState, setGameState] = useState({})
    const [alphabetInput, setAlphabetInput] = useState({ notClicked: [], correctClicked: [], incorrectClicked: [] })
    const [wordDefinition, setWordDefinition] = useState(null)
    const [definitionDisplayed, setDefinitionDisplayed] = useState(false)
    const [nbErrors, setNbErrors] = useState(0)

    function initEmptyUserWordList(word) {
        let array = []
        for (let i = 0; i < word.length; i++) {
            array.push('_')
        }
        return array
    }

    function initAlphabetInput() {
        setAlphabetInput(
            {
                notClicked: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
                correctClicked: [],
                incorrectClicked: []
            }
        )
    }

    function newGame() {
        fetch("https://random-words-api.vercel.app/word")
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                // console.log(data)
                let word = data[0].word.toLowerCase()
                setNbErrors(0)
                setDefinitionDisplayed(false)
                initAlphabetInput()
                setMysteryWord(word)
                setUserWord(initEmptyUserWordList(word))
                setWordDefinition(data[0].definition)
                setGameState({
                    gameEnded: false,
                    gameWon: false
                })
            })
            .catch((error) => {
                console.log(error)
                alert("Couldn't fetch data from API, try again later...")
            })
    }

    function checkLoseWin() {
        // lose
        if (nbErrors >= 9) {
            setGameState({
                gameEnded: true,
                gameWon: false
            })
            setDefinitionDisplayed(true)
        }
        // win
        else if (mysteryWord === userWord.join('')) {
            setGameState({
                gameEnded: true,
                gameWon: true
            })
            setDefinitionDisplayed(true)
        }
    }

    function selectLetter(inputLetter) {
        let indexList = []
        for (let i = 0; i < mysteryWord.length; i++) {
            if (mysteryWord[i] === inputLetter) indexList.push(i)
        }
        // correct letter clicked
        if (indexList.length) {
            setAlphabetInput({
                notClicked: alphabetInput.notClicked.filter(previousLetter => previousLetter !== inputLetter),
                correctClicked: [...alphabetInput.correctClicked, inputLetter],
                incorrectClicked: alphabetInput.incorrectClicked
            })
            setUserWord(userWord.map((c, index) => { return (indexList.includes(index) ? inputLetter : c) }))
        }
        // incorrect letter clicked
        else {
            setNbErrors(nbErrors + 1)
            setAlphabetInput({
                notClicked: alphabetInput.notClicked.filter(previousLetter => previousLetter !== inputLetter),
                correctClicked: alphabetInput.correctClicked,
                incorrectClicked: [...alphabetInput.incorrectClicked, inputLetter]
            })
        }
    }

    useEffect(() => {
        checkLoseWin()
    }, [nbErrors, userWord])

    useEffect(() => {
        newGame()
    }, [])

    return (
        <div>
            <div className="playground">
                <div className="game">
                    <img src={`${process.env.PUBLIC_URL}/images/pedantor/hangman${nbErrors}.png`} alt={`hangman error n°${nbErrors}`} />
                    { // end game text
                        gameState.gameEnded && ((gameState.gameWon) ?
                            <div className="endText">you prevailed. <span id="link" onClick={newGame}>try again?</span></div>
                            :
                            <div className="endText">you've been vanquished, the word was <span id="mysteryWord">{mysteryWord}</span>. <span id="link" onClick={newGame}>try again?</span></div>)
                    }
                    <div className="inputZone">
                        <div className="userLetters">
                            {userWord.map((letter, index) => { return <span key={index}>{letter}</span> })}
                        </div>
                        {definitionDisplayed && <div className="definition">{wordDefinition}</div>}
                        <div className="notClickedLetters px-3 md:px-5 py-1 md:py-2 gap-2 md:gap-4">
                            {alphabetInput.notClicked.map((letter, index) => { return <ButtonLetter key={index} char={letter} selectLetter={selectLetter} gameEnded={gameState.gameEnded} /> })}
                        </div>
                        <div className="clickedLetters">
                            <div className="rightLetters">
                                {alphabetInput.correctClicked.join(" - ")}
                            </div>
                            <div className="wrongLetters">
                                {alphabetInput.incorrectClicked.join(" - ")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="options">
                <button type="button" onClick={newGame}>new word</button>
                {!definitionDisplayed && <button type="button" onClick={() => { setDefinitionDisplayed(true) }}>get definition</button>}
            </div>
        </div>
    )
}