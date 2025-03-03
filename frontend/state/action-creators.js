// ❗ You don't need to add extra action creators to achieve MVP
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM
} from "./action-types";
import axios from "axios";



export function moveClockwise() {
  return {
    type: MOVE_CLOCKWISE
  };
}

export function moveCounterClockwise() {
  return {
    type: MOVE_COUNTERCLOCKWISE
  };
}

export function setQuizIntoState(quiz) {
  return {
    type: SET_QUIZ_INTO_STATE,
    payload: quiz
  };
}

export function setSelectedAnswer(answer) {
  return {
    type: SET_SELECTED_ANSWER,
    payload: answer
  };
}

export function setInfoMessage(message) {
  return {
    type: SET_INFO_MESSAGE,
    payload: message
  };
}

export function inputChange(value) {
  return {
    type: INPUT_CHANGE,
    payload: value
  };
}

export function resetForm() {
  return {
    type: RESET_FORM
  };
}


// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    dispatch(resetForm());

    axios
      .get('http://localhost:9000/api/quiz/next') // Replace '/api/quiz' with your actual API endpoint
      .then((response) => {
        // Extract the quiz data from the response
        const quiz = response.data; // Adjust this line based on your API response structure
        
        // On successful GET:
        // - Dispatch an action to send the obtained quiz to its state
        dispatch(setQuizIntoState(quiz)); // Replace 'setQuiz' with your actual action creator
       // Replace 'setMessage' with your actual action creator
      })
      .catch((error) => {
        // If there's an error during the API call, dispatch an action to handle the error
        dispatch(setInfoMessage('Error loading quiz')); // Replace 'setMessage' with your actual action creator
        dispatch(setInfoMessage(error)); // Replace 'quizError' with your actual error handling action creator
      });
  };
}


export function postAnswer(answers) {
  return function (dispatch) {
    // On successful POST:

    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    axios
      .post('http://localhost:9000/api/quiz/answer',answers) // Replace '/api/quiz' with your actual API endpoint
      .then((response) => {
        // Extract the quiz data from the response
        dispatch(setSelectedAnswer(null))
        dispatch(setInfoMessage(response.data.message)) // Adjust this line based on your API response structure
        
      
      
        // On successful GET:
        // - Dispatch an action to send the obtained quiz to its state
        ; // Replace 'setQuiz' with your actual action creator
        // Replace 'setMessage' with your actual action creator
      })
      .catch((error) => {
        // If there's an error during the API call, dispatch an action to handle the error
        dispatch(setInfoMessage('Error loading quiz')); // Replace 'setMessage' with your actual action creator
        dispatch(setInfoMessage("error")); // Replace 'quizError' with your actual error handling action creator
      }).finally(()=>{dispatch(fetchQuiz())});
    // - Dispatch the fetching of the next quiz
   

   
  };
    
  
}
export function postQuiz(data) {
  return function (dispatch) {
    let payload = { "question_text": data.newQuestion, "true_answer_text": data.newTrueAnswer, "false_answer_text": data.newFalseAnswer }
    // Make the POST request using Axios
    axios.post('http://localhost:9000/api/quiz/new', payload)
      .then(response => {
        // On successful POST:
        
        // - Dispatch the correct message to the appropriate state
        dispatch(setInfoMessage(`Congrats: "${payload.question_text}" is a great question!`));

        // - Dispatch the resetting of the form
        dispatch(resetForm())
        
      })
      .catch(error => {
        // Handle any errors that occurred during the POST request
        dispatch(setInfoMessage(error.message)
      ) ;
      });
  };
  }

// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
