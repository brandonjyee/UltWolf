// =========== Actions ============
const SET_THIS_PLAYER = 'SET_THIS_PLAYER';

//========  Action Creators  ============
export const setThisPlayer = (playerId, playerName) => ({
  type: SET_THIS_PLAYER,
  playerId,
  playerName
});

// =========== Reducers ============
export const thisPlayerReducer = (thisPlayer = {}, action) => {
  switch (action.type) {
    case SET_THIS_PLAYER:
      return { id: action.playerId, name: action.playerName}
    default:
      return thisPlayer;
  }
};

export default thisPlayerReducer;
