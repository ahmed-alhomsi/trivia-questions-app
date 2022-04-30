import { useEffect, useState } from "react";
import Question from "./Question"

const Quizzes = ({ questions, addCorrectAnswer, selectAnswer, filterAnswers, checkAnswers }) => {

    return (
        <div>
            <div className="questions-container">
                {
                    questions.map((question, index) => {
                        return (
                            <Question checkAnswers={checkAnswers} addCorrectAnswer={addCorrectAnswer} selectAnswer={selectAnswer} filterAnswers={filterAnswers} key={index} {...question} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Quizzes