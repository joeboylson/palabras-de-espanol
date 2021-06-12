import { useEffect, useRef } from "react";
import moment from "moment";
import { translationsToString } from "../utils/word";
import { NotificationManager } from "react-notifications";
import "./style.scss"

const AnswerResult = ({answerResult, setAnswerResult}) => {

  const inputRef = useRef(null)
  const handleClearAnswerResult = () => setAnswerResult(null);
  
  useEffect(() => {

    const nextDate = moment.unix(answerResult.user_word.next_review_at)
    const duration = moment.duration(moment().diff(nextDate));

    const message = `Showing again in ${duration.humanize()}`
    NotificationManager.info(message, null, 1000);

    if (inputRef.current && answerResult.correct) return inputRef.current.focus()
  })

  if (answerResult.correct) {
    setAnswerResult(null);
    return <span/>
  }
  
  return (
    <div id="answer-result">
      <div
        id="banner"
        className={`${answerResult.correct ? 'correct' : 'incorrect'}`}
      >
        <h2>{answerResult.correct ? 'Correct' : 'Incorrect'}</h2>
      </div>
      <h3>You Entered: "{answerResult.answer_text}"</h3>

      <div className="result-card">
        <p className={"mono small"}>English</p>
        <h3>{ answerResult && translationsToString(answerResult.user_word.word.english) }</h3>
      </div>

      <div className="result-card">
        <p className={"mono small"}>Spanish</p>
        <h3>{ answerResult && translationsToString(answerResult.user_word.word.spanish) }</h3>
      </div>

      <button onClick={handleClearAnswerResult} ref={inputRef}>Continue</button>
    </div>
  ); 
}

export default AnswerResult;