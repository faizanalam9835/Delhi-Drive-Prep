import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';



const flashcards = [
    {
      id: 1,
      question: "What is the capital of France?",
      answer: "Paris",
    },
    {
      id: 2,
      question: "What is 5 + 7?",
      answer: "12",
    },
    {
      id: 3,
      question: "Who wrote 'To Kill a Mockingbird'?",
      answer: "Harper Lee",
    },
    {
      id: 4,
      question: "What is the chemical symbol for water?",
      answer: "H2O",
    },
    {
      id: 5,
      question: "What is the speed of light in a vacuum?",
      answer: "299,792,458 meters per second",
    }
  ];
  const localStorageKeys = {
    CORRECT_ANSWERS: "flashcardCorrectAnswers", 
    INCORRECT_ANSWERS: "flashcardIncorrectAnswers", 
    UNATTEMPTED_CARDS: "unattemptedFlashcards", 
    CURRENT_CARD_INDEX: "currentFlashcardIndex", 
    TIMER: "studySessionTimer", 
  };

export default function FlashCard() {
  const [Index , SetIndex] = useState(
     Number(localStorage.getItem(localStorageKeys.CURRENT_CARD_INDEX) || 0) 
  )
  const [showAnswer , setShowAnswer] = useState(false)
  const [correct , setCorrect] = useState(Number(localStorage.getItem(localStorageKeys.CORRECT_ANSWERS))|| 0) 
  const [incorrect , setInCorrect] = useState(Number(localStorage.getItem(localStorageKeys.INCORRECT_ANSWERS))|| 0) 
  const [time, setTime] = useState(Number(localStorage.getItem(localStorageKeys.TIMER)) || 600) 
  const [sessionover , setSession] = useState(false)
    
      
 useEffect(() =>{
     if(time <= 0){
        setSession(true);
        return
     }

     const timer = setInterval(() => {
          setTime((prev) => prev - 1)
     }, 1000);
 
     
     return () =>{
        clearInterval(timer)
     }
 } , [time])

 useEffect(() =>{
     localStorage.setItem(localStorageKeys.CURRENT_CARD_INDEX , Index)
     localStorage.setItem(localStorageKeys.CORRECT_ANSWERS, correct)
     localStorage.setItem(localStorageKeys.INCORRECT_ANSWERS , incorrect)
     localStorage.setItem(localStorageKeys.TIMER , time)
 } , [Index , correct , incorrect , time])

const handlecorrect = () =>{
     setCorrect(correct + 1)
     nextCard()
}

const  handlewrong = () =>{
    setInCorrect(incorrect + 1)
    nextCard()
}

const nextCard = () =>{
     setShowAnswer(false)
     if(Index < flashcards.length - 1){
        SetIndex(Index + 1)
     }else{
        setSession(true)
     }
}


const pastCard = () =>{
    setShowAnswer(false)
    if(Index > 0) {
        SetIndex(Index - 1)
    }
}

if(sessionover){
    localStorage.setItem(localStorageKeys.CORRECT_ANSWERS , 0)
    let UnAsnwer = flashcards.length - (correct + incorrect)
    return(
        <div  style={{display:"flex" , flexDirection:"column" , justifyContent:"center" , alignItems:"center"}}>
        <h2>
        Summary
        </h2>
        <p>correct : {correct}</p>
        <p>Incorrect : {incorrect}</p>
        <p>UnAnswer : {UnAsnwer}</p>
        </div>
      
    )
}

 const card = flashcards[Index]
      
  return (
    <div style={{ width:"800px" , height:"600px",  display:"flex" , flexDirection:"column" , justifyContent:"center"  , alignItems:"center", gap:"20px"}}>
        <h2>Flashcard App</h2>
        <p>
            Time left : {Math.floor(time / 60)}:{(time % 60).toString()} 
        </p>
          <div style={{  width:"300px" , height:"500px" , display:"flex" , flexDirection:"column" , justifyContent:"center"  , alignItems:"center", borderRadius:"20px",  backgroundColor:"antiquewhite", boxShadow:"2px 2px 2px 2px"}}>
              <h3>{showAnswer ? card.answer : card.question}</h3>
          </div>
          <button onClick={() => setShowAnswer(!showAnswer)}> {showAnswer ? "Hide Answer" : "Show Answer"}</button>
          {
            showAnswer && (
                <div style={{marginTop:5 , display:"flex" , gap:"10px"}}>
                   <button onClick={handlecorrect}>Correct</button>
                   <button onClick={handlewrong} >incorrect</button>
                </div>
            )
          }
          <div style={{marginTop:5}}>
           <button onClick={pastCard} disabled={Index === 0}>Previous</button>
           <button onClick={nextCard} disabled={Index === flashcards.length  -1}>Next Question</button>
          </div>
          <div style={{marginTop:20,  display:'flex' , gap : "10px"}}>
          <p>
               correct : {correct} 
          </p>
          <p>
               Incorrect : {incorrect} 
          </p>

          </div>
        
    </div>
  )
}
