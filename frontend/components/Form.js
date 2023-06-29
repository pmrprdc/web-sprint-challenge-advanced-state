import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'
import { act } from 'react-dom/test-utils'
const { localStorage } = window;

export function Form(props) {
  
  const {form, inputChange, postQuiz} = props;
  // useEffect(() => {
  //   // Retrieve persisted form state from local storage
  //   const persistedFormState = localStorage.getItem('formState');
  //   if (persistedFormState) {
  //     const parsedFormState = JSON.parse(persistedFormState);
  //     inputChange(parsedFormState);
  //   }
  // }, [inputChange]);


   
  
  const onChange = evt => {
    evt.preventDefault();
    inputChange({[evt.target.id]: evt.target.value})
    localStorage.setItem('formState', JSON.stringify({ ...form, [evt.target.id]: evt.target.value }))
  }

  const onSubmit = evt => {
    evt.preventDefault();
    postQuiz(form)
  }

  const isDisabled = () => {
    return Object.values(form).some(value => !value.trim().length)
  }

  return (

    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={form.newQuestion} />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={form.newTrueAnswer}/>
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={form.newFalseAnswer} />
      <button id="submitNewQuizBtn" disabled={isDisabled()}>Submit new quiz</button>
    </form>
  )
}


const mapStateToProps = state => {
  return {
    form: state.form
  }
}

const mapDispatchToProps = {
  inputChange:actionCreators.inputChange,
  postQuiz: actionCreators.postQuiz
}
export default connect(mapStateToProps, mapDispatchToProps)(Form)
