import './App.css';
import Questions from "./components/Questions"
import { useState, useEffect } from "react"

function App() {
  const [showQuizzes, setShowQuizzes] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [checkAns, setCheckAns] = useState(false);
  const [correctChoices, setCorrectChoices] = useState(0);

  const fetchQuestions = async () => {
      const response = await fetch('https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple');
      const data = await response.json()
      setQuestions(data.results);
  }

  useEffect(() => {
      fetchQuestions();
  }, [])

  const addCorrectAnswer = (answer) => {
    setCorrectAnswers(prevAnswers => [...prevAnswers, answer]);
  }

  const selectAnswer = (answer) => {
    if(!selectedAnswers.includes(answer))
    setSelectedAnswers(prevAnswers => [...prevAnswers, answer].filter(answer => answer !== null));
  }

  const filterAnswers = (answer) => {
    setSelectedAnswers(prevAnswers => [...prevAnswers].filter(ans => ans !== answer))
  }

  const checkAnswers = () => {
    let correctCount = 0;
    selectedAnswers.map((answer) => {
      if(correctAnswers.includes(answer)) {
        correctCount += 1;
      }
    })
    setCorrectChoices(correctCount);
  }

  useEffect(() => {
    checkAnswers();
  }, [selectedAnswers])

  return (
    <main className='center'>
      <div className='container'>
        {
          !showQuizzes &&
          <div>
            <h2>Quizzical</h2>
            <p>this is a trivia questions React app</p>
            <button className='btn start-btn' onClick={() => setShowQuizzes(true)}>Start Quiz</button>
          </div>
        }
        {
          showQuizzes &&
          <div>
            <Questions addCorrectAnswer={addCorrectAnswer} selectAnswer={selectAnswer} filterAnswers={filterAnswers} checkAnswers={checkAns} questions={questions} />
            <div className='flex'>
              {checkAns && <p>you got {correctChoices}/5</p>} 
              <button className='btn' onClick={()=> setCheckAns(prevCheck => !prevCheck)}>Check Answers</button>
            </div>
          </div>
        }
      </div>
    </main>
  );
}

export default App;
