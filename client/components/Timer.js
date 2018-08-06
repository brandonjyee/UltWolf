import React from 'react';
import { connect } from 'react-redux';

const Timer = props => {
  return <div id="timer">Timer: {props.timer}</div>;
};

const mapStateToProps = ({ timer = 0 }) => ({ timer });

export default connect(mapStateToProps)(Timer);
