// =========== Actions ============
const SET_ROLE = 'SET_ROLE';

//========  Action Creators  ============
export const setRole = (role) => ({
  type: SET_ROLE,
  role,
});

// =========== Reducers ============
export const roleReducer = (role = '', action) => {
  switch (action.type) {
    case SET_ROLE:
      return action.role
    default:
      return role;
  }
};

export default roleReducer;
