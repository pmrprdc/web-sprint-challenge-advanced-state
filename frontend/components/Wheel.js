import React from 'react'
import { connect } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

function Wheel(props) {
  console.log(props.wheelState)
  return (
    <div id="wrapper">
      <div id="wheel">
        <div className={props.wheelState === 0 ? "cog active" : "cog"} style={{ "--i": 0 }}>{props.wheelState===0 ? "B" : ""}</div>
        <div className={props.wheelState === 1 ? "cog active" : "cog"} style={{ "--i": 1 }}>{props.wheelState===1 ? "B" : ""}</div>
        <div className={props.wheelState === 2 ? "cog active" : "cog"} style={{ "--i": 2 }}>{props.wheelState===2 ? "B" : ""}</div>
        <div className={props.wheelState === 3 ? "cog active" : "cog"} style={{ "--i": 3 }}>{props.wheelState===3 ? "B" : ""}</div>
        <div className={props.wheelState === 4 ? "cog active" : "cog"} style={{ "--i": 4 }}>{props.wheelState===4 ? "B" : ""}</div>
        <div className={props.wheelState === 5 ? "cog active" : "cog"} style={{ "--i": 5 }}>{props.wheelState===5 ? "B" : ""}</div>

      </div>
      <div id="keypad">
        <button onClick={props.moveCounterClockwise} id="counterClockwiseBtn" >Counter clockwise</button>
        <button onClick={props.moveClockwise} id="clockwiseBtn">Clockwise</button>
      </div>

    </div>
  )
}


const mapStateToProps = state => {

  return {

    wheelState: state.wheel
  }
}

const mapDispatchToProps = {
  moveClockwise,
  moveCounterClockwise
};


export default connect(mapStateToProps, mapDispatchToProps)(Wheel);