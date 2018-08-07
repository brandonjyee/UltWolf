// =========== Actions ============
const SET_ANNOUNCER_MSG = 'SET_ANNOUNCER_MSG';

//========  Action Creators  ============
export const setAnnouncerMsg = (msg) => ({
  type: SET_ANNOUNCER_MSG,
  msg,
});

// =========== Reducers ============
export const announcerMsgReducer = (announcerMsg = [], action) => {
  switch (action.type) {
    case SET_ANNOUNCER_MSG:
      return action.msg;
    default:
      return announcerMsg;
  }
};

export default announcerMsgReducer;
