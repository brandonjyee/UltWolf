// =========== Actions ============
const ADD_MSG = 'ADD_MSG';
const CLEAR_MSGS = 'CLEAR_MSGS';

//========  Action Creators  ============
export const addMsg = (message) => ({
  type: ADD_MSG,
  message,
});

export const clearMsgs = () => ({
  type: CLEAR_MSGS,
});

// =========== Reducers ============
export const msgDisplayReducer = (msgDisplay = [], action) => {
  switch (action.type) {
    case ADD_MSG:
      return [...msgDisplay, action.message];
    case CLEAR_MSGS:
      return [];
    default:
      return msgDisplay;
  }
};

export default msgDisplayReducer;
