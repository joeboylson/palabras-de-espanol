import { useEffect, useRef } from "react";

// components
import Word from "../Word";

// styles
import './style.scss'

const AnswerResult = ({answerResult, setAnswerResult}) => {

  const inputRef = useRef(null)
  const handleClearAnswerResult = () => setAnswerResult(null);
  
  useEffect(() => {
    if (inputRef.current && answerResult.correct) inputRef.current.focus()
  })
  
  return (
    <div className={'answer-result'}>

      <div className={`message ${answerResult.correct ? 'correct' : 'incorrect'}`}>
        <p>{answerResult.correct ? 'Correct' : 'Incorrect'}</p>
      </div>
      <p>You Entered: "{answerResult.answer_text}"</p>
      <Word word={answerResult.user_word.word}/>
      <button onClick={handleClearAnswerResult} ref={inputRef}>CLEAR</button>
    </div>
  ); 
}

export default AnswerResult;