// =========== Actions ============
// const ADD_PLAYER = 'ADD_PLAYER';
const SET_PLAYERS = 'SET_PLAYERS';

//========  Action Creators  ============
// export const addPlayer = (playerId, playerName) => ({
//   type: ADD_PLAYER,
//   playerId,
//   playerName
// });

export const setPlayers = (players) => ({
  type: SET_PLAYERS,
  players,
});

// =========== Reducers ============
export const playersReducer = (players = [], action) => {
  switch (action.type) {
    case SET_PLAYERS:
      return action.players;
    default:
      return players;
  }
};

export default playersReducer;
