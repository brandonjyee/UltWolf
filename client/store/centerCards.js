// =========== Actions ============
const SET_CENTER_CARDS = 'SET_CENTER_CARDS';

//========  Action Creators  ============
export const setCenterCards = (centerCards) => ({
  type: SET_CENTER_CARDS,
  centerCards,
});

// =========== Reducers ============
export const centerCardsReducer = (centerCards = [], action) => {
  switch (action.type) {
    case SET_CENTER_CARDS:
      return action.centerCards;
    default:
      return centerCards;
  }
};

export default centerCardsReducer;
