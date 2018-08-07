// =========== Actions ============
const SET_ROLE_ACTION_DATA = 'SET_ROLE_ACTION_DATA';

//========  Action Creators  ============
export const setRoleActionData = (actionData) => ({
  type: SET_ROLE_ACTION_DATA,
  actionData,
});

// =========== Reducers ============
export const actionDataReducer = (actionData = null, action) => {
  switch (action.type) {
    case SET_ROLE_ACTION_DATA:
      return action.actionData;
    default:
      return actionData;
  }
};

export default actionDataReducer;
