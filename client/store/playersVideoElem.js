// =========== Actions ============
const SET_PLAYERS_VIDEO = 'SET_PLAYERS_VIDEO';

//========  Action Creators  ============
export const setPlayersVideo = (playerId, videoElem) => ({
  type: SET_PLAYERS_VIDEO,
  playerId,
  videoElem,
});

// =========== Reducers ============
export const playersVideoElemReducer = (playersVideoElem = {}, action) => {
  switch (action.type) {
    case SET_PLAYERS_VIDEO:
      return { ...playersVideoElem, [action.playerId]: action.videoElem };
    default:
      return playersVideoElem;
  }
};

export default playersVideoElemReducer;
