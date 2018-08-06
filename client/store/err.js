// =========== Actions ============
const CLEAR_ERROR = 'CLEAR_ERROR';
const SET_ERROR = 'SET_ERROR';

// =========== Action Creators ============
export const gotErrorFromServer = err => ({
  type: SET_ERROR,
  err: 'ServerError: ' + err,
});

export const setError = (err) => ({
  type: SET_ERROR,
  err
});

export const clearErr = () => ({
  type: CLEAR_ERROR,
});

// =========== Reducers ============
const errorReducer = (err = '', action) => {
  switch (action.type) {
    case CLEAR_ERROR:
      return '';
    case SET_ERROR:
      return action.err;
    default:
      return err;
  }
};

export default errorReducer;
