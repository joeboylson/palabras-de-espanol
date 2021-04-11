import { useEffect, useMemo, useState } from "react";
import { objectToFormData, usePost, useRequest } from "../utils/request";
import { translationsToString } from "../utils/word";
import Input from "../Input";
import Loading from "../Loading";
import './style.scss'

const Question = ({setAnswerResult, showSpanish, setShowSpanish}) => {

  const [input, setInput] = useState('');
  const { loading: requestLoading, data } = useRequest('/next_word')
  const { loading: postLoading, post, result } = usePost()

  useEffect(() => {
    if (result) setAnswerResult(result.data)
  }, [result, setAnswerResult])

  const handlePost = () => {
    const postData = {
      user_word_id: data.next_word.id,
      answer_language: showSpanish ? 'english' : 'spanish',
      answer_text: input
    };
    post('/question_answer', objectToFormData(postData))
  }

  const word = useMemo(() => {
    if (data && data.next_word) {
      return showSpanish ? data.next_word.word.spanish : data.next_word.word.english
    }
  }, [data, showSpanish])

  return (
    <div id="question">
      <Loading loading={requestLoading || postLoading}>
        
        <div id="question-word">
          <p className={"mono small"}>Translate to {showSpanish ? 'English' : 'Spanish'}</p>
          <h3>{ word && translationsToString(word) }</h3>
        </div>

        <div id="question-form">
          <Input spanish={!showSpanish} onChange={setInput}/>
          <button onClick={handlePost}>Submit</button>
        </div>
      </Loading>
    </div>
  );

}

export default Question;