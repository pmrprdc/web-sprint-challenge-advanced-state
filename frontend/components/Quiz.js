import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, setSelectedAnswer, postAnswer, postQuiz } from '../state/action-creators';

function Quiz(props) {
  useEffect(() => {
    props.fetchQuiz();
    
  }, [])
  

  const { quiz, selectedAnswer, postAnswer, postQuiz } = props;

  const clickhandler = (e) => {
    const selectionId = quiz.answers.map(x=>{
     console.log(x.text, x.answer_id)
    })
    console.log(selectionId)
    postQuiz({ "quiz_id": quiz.quiz_id, "answer_id": selectionId })
   
  }
  
  return (
    
    <div id="wrapper">
      {
        
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          
          <>
          
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
                {console.log(quiz.answers)}
              <div className={selectedAnswer === quiz.answers[0].answer_id ? "answer selected" : "answer"}>
                 {quiz.answers[0].text}
                <button id={quiz.answers[0].answer_id} onClick={()=>props.setSelectedAnswer(quiz.answers[0].answer_id)}>
                  {selectedAnswer === quiz.answers[0].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>

              <div className={selectedAnswer === quiz.answers[1].answer_id ? "answer selected" : "answer"}>
              {quiz.answers[1].text}
                <button  onClick={()=>props.setSelectedAnswer(quiz.answers[1].answer_id)}>
                {selectedAnswer === quiz.answers[1].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>
            </div>

            <button selected={selectedAnswer} onClick={clickhandler} id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}



const mapStateToProps = state => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer,
    infoMessage: state.infoMessage
  }
}



export default connect(mapStateToProps, {fetchQuiz,setSelectedAnswer, postAnswer, postQuiz})(Quiz);