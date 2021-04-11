import { useState } from "react";

// utils
import { random } from 'lodash';

// components
import AnswerResult from "../AnswerResult";
import Question from "../Question";

const Home = () => {

  const [answerResult, setAnswerResult] = useState(null);  

  const showSpanish = random(0, 10) > 5

  const props = {answerResult, setAnswerResult, showSpanish}
  if (answerResult) return <AnswerResult {...props}/>;
  return <Question {...props}/>

}

export default Home;