import { useEffect, useState } from "react";

// components
import Input from "../Input";
import Word from "../Word";

// utils
import { objectToFormData, usePost, useRequest } from "../utils/request";

// styles
import './style.scss'

const Question = ({setAnswerResult, showSpanish, setShowSpanish}) => {

  const [input, setInput] = useState('');
  const {loading, data} = useRequest('/next_word')
  const { post, result } = usePost()

  useEffect(() => {
    if (result) setAnswerResult(result.data)
  }, [result, setAnswerResult])

  if (loading) return <p>loading . . .</p>

  const handlePost = () => {
    const postData = {
      user_word_id: data.next_word.id,
      answer_language: showSpanish ? 'english' : 'spanish',
      answer_text: input
    };
    post('/question_answer', objectToFormData(postData))
  }

  return (
    <div id="question">

      <div id="question-header">
        <button 
          onClick={() => setShowSpanish(false)}
          className={showSpanish ? '' : 'active'}
        >English To Spanish</button>

        <button 
          onClick={() => setShowSpanish(true)}
          className={showSpanish ? 'active' : ''}
        >Spanish To English</button>
      </div>

      <p><i>Translate to {showSpanish ? 'English' : 'Spanish'}</i></p>

      <Word 
        word={data.next_word.word}
        hideEnglish={showSpanish}
        hideSpanish={!showSpanish}
      />

      <Input spanish={!showSpanish} onChange={setInput}/>
      <button onClick={handlePost}>POST</button>
    </div>
  );

}

export default Question;