import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, setSelectedAnswer } from '../state/action-creators';

function Quiz(props) {
  useEffect(() => {
    props.fetchQuiz();
  }, [])
  

  const { quiz, selectedAnswer } = props;


  
  return (
    <div id="wrapper">
      {
        
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={selectedAnswer === quiz.answers[0].text ? "answer selected" : "answer"}>
                {quiz.answers[0].text}
                <button onClick={props.setSelectedAnswer}>
                  {selectedAnswer === quiz.answers[0].text ? "SELECTED" : "Select"}
                </button>
              </div>

              <div className={selectedAnswer === quiz.answers[0].text ? "answer selected" : "answer"}>
              {quiz.answers[1].text}
                <button onClick={props.setSelectedAnswer}>
                  Select
                </button>
              </div>
            </div>

            <button onClick={props.setSelectedAnswer} id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}



const mapStateToProps = state => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
  }
}



export default connect(mapStateToProps, {fetchQuiz,setSelectedAnswer})(Quiz);