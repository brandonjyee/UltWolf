// =========== Actions ============
const SET_THIS_VIDEO = 'SET_THIS_VIDEO';

//========  Action Creators  ============
export const setThisVideo = thisVideoElem => ({
  type: SET_THIS_VIDEO,
  thisVideoElem,
});

// =========== Reducers ============
export const thisVideoElemReducer = (thisVideoElem = null, action) => {
  switch (action.type) {
    case SET_THIS_VIDEO:
      return action.thisVideoElem;
    default:
      return thisVideoElem;
  }
};

export default thisVideoElemReducer;
