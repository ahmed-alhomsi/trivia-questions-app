import Answer from "./Answer"
import { useEffect, useState } from "react"

const Question = (question) => {
  const [correctAnswer, setCorrectAnswer] = useState(question.correct_answer);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([null]);

  const selectAnswer = (answer) => {
    setSelectedAnswer(answer);
  }
  
  useEffect(() => {
    const newAnswersArr = [];
    newAnswersArr.push(question.correct_answer);
    for(let i = 0; i < 3; i++) {
      newAnswersArr.push(question.incorrect_answers[i]);        
    }
  
    const newAnswers = [];
      newAnswers[Math.floor(Math.random() * 4)] = newAnswersArr[0];
      for(let i = 0; i < 4; i++) {
          if(newAnswers[i] === undefined) {  
              for(let j = 0; j < newAnswersArr.length; j++) {
                  if(newAnswers.indexOf(newAnswersArr[j]) === -1) {
                      newAnswers[i] = newAnswersArr[j];
                  }
              }
          }
      }
      setAnswers(newAnswers)
      question.addCorrectAnswer(question.correct_answer);
  }, [])

  useEffect(() => {
    for(let i = 0; i < answers.length; i++) {
      question.filterAnswers(answers[i]);
    }
    question.selectAnswer(selectedAnswer);
  }, [selectedAnswer])
  

  return (
    <div className="question">
        <h2 className="text-left">{question.question}</h2>
        <div className="answers-container">
          {
            answers.map((answer, index) => {
              let isSelected = false;
              answer === selectedAnswer ? isSelected = true : isSelected = false;
              let correctAns = false;
              answer === correctAnswer ? correctAns = true : correctAns = false;
              return <Answer checkAnswers={question.checkAnswers} isCorrect={correctAns} isSelected={isSelected} key={index} answer={answer} selectAnswer={selectAnswer} />
            })
          }
        </div>
      <hr />
    </div>
  )
}

export default Question