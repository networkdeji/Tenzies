import { useState, useEffect } from 'react'
import Die from './Die'
import './App.css'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [roll, setRoll] = useState(0)
  // const [timer, setTimer] = useState("01:30")

  // const totalSecs = 121
  // let counter = 0
  // function countdown(s){
  //   let min = s / 60
  //   let sec = s % 60
  //   retur "0" + min + ":" + "0" +sec

  // }
  // function timeIt(){
  //   counter++
  //   setTimer(countdown(totalSecs))
  // }
  
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue){
      setTenzies(true)
    }
  }, [dice])

  function generateNewDice(){
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice(){
    const newDice = []
    for (let i = 0; i < 10; i++){
      newDice.push(generateNewDice())
      
    }
    
    return newDice
  }

  function rollDice(){
    
    if(!tenzies){
      
      setRoll(roll + 1)
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld?
        die :
        generateNewDice()
        
      }))
    }else {
      setTenzies(false)
      setDice(allNewDice())
      setRoll(0)
    }
  }

  function holdDice(id){
    
    setDice(oldDice => oldDice.map(die => {
      
      return die.id === id ?
      {...die, isHeld: !die.isHeld } :
      die
    }))
  }


  const diceElements = dice.map(die => {
    return  <Die 
    key={die.id}
    value={die.value}
    isHeld={die.isHeld}
    holdDice={ () => holdDice(die.id)}
  />  
   
  })
  
  return (
    <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <p className="timer">Number of rolls: {roll}</p> <span className="timer">00:00</span>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            
        </main>
  )
}

export default App
