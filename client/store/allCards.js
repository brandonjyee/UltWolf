// =========== Actions ============
const SET_COPY_OF_ALL_CARDS = 'SET_ALL_CARDS';

//========  Action Creators  ============
export const setCopyOfAllCards = (allCards) => ({
  type: SET_COPY_OF_ALL_CARDS,
  allCards,
});

// =========== Reducers ============
export const allCardsReducer = (allCards = [], action) => {
  switch (action.type) {
    case SET_COPY_OF_ALL_CARDS:
      return action.allCards;
    default:
      return allCards;
  }
};

export default allCardsReducer;
