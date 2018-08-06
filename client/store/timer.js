// =========== Actions ============
const SET_TIMER = 'SET_TIMER';

//========  Action Creators  ============
export const setTimer = (numSec) => ({
  type: SET_TIMER,
  numSec,
});

// =========== Reducers ============
export const timerReducer = (timer = 0, action) => {
  switch (action.type) {
    case SET_TIMER:
      return action.numSec;
    default:
      return timer;
  }
};

export default timerReducer;
