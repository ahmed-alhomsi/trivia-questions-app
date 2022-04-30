const Answer = ({ answer, selectAnswer, isSelected, isCorrect, checkAnswers }) => {
    let classes = '';
    if(isCorrect && isSelected && checkAnswers) {
        classes = 'answer-correct';
    }
    if(isSelected && !isCorrect && checkAnswers) {
        classes = 'answer-incorrect';
    }
    if(isSelected && !checkAnswers) {
        classes = 'answer-select';
    }
    if(isCorrect && !isSelected && checkAnswers) {
        classes = 'answer-correct-not-chosen';
    }

    return (
        <button className={`answer ${classes}`} onClick={() => selectAnswer(answer)}>{answer}</button>
    )
}

export default Answer