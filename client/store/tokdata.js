// =========== Actions ============
const GOT_TOKDATA_FROM_SERVER = 'GOT_TOKDATA_FROM_SERVER';

// =========== Action Creators ============
export const gotTokDataFromServer = (apiKey, sessionId, token) => ({
  type: GOT_TOKDATA_FROM_SERVER,
  apiKey,
  sessionId,
  token,
});

// =========== Reducers ============
const initTokData = {
  apiKey: '',
  sessionId: '',
  token: ''
}

const tokDataReducer = (tokData = initTokData, action) => {
  switch (action.type) {
    case GOT_TOKDATA_FROM_SERVER:
      return ['apiKey', 'sessionId', 'token'].reduce((accum, key) => {
        accum[key] = action[key];
        return accum
      }, {});
    default:
      return tokData;
  }
};

export default tokDataReducer
