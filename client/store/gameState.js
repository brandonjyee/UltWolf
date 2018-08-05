// import socketToServer from '../socket'
// import {ServerListensFor} from '../socket/MsgType'


export const GS_WAIT_TO_START_GAME = 'GS_WAIT_TO_START_GAME'
export const GS_WAIT_FOR_ROLE_CARD = 'GS_WAIT_FOR_ROLE_CARD'

// =========== Actions ============
const GOT_GAMESTATE_UPDATE_FROM_SERVER = 'GOT_GAMESTATE_UPDATE_FROM_SERVER';

// =========== Action Creators ============
export const gotGameStateUpdateFromServer = (gameState) => ({
  type: GOT_GAMESTATE_UPDATE_FROM_SERVER,
  gameState
});

// =========== Thunk Creators ============
// export const askServerToStartGame = () => {
//   return () => {
//     try {
//       // socket.emit(MsgType.ServerEndpoint.AskServer, clientMsg);
//       // socketToServer.emit(ServerListensFor.ASK_SERVER, )
//       socketToServer.emit(ServerListensFor.ASK_SERVER, )
//     } catch (err) {
//       console.error(err)
//     }
//   }
// }

// export const fetchReviews = (productId) => {
//   return async dispatch => {
//     try {
//       const { data: reviews } = await axios.get('/api/reviews/product/' + productId)
//       dispatch(gotReviews(reviews))
//     } catch (err) {
//       console.error(err)
//     }
//   }
// }

// =========== Reducers ============

const gameStateReducer = (gameState = GS_WAIT_TO_START_GAME, action) => {
  switch (action.type) {
    case GOT_GAMESTATE_UPDATE_FROM_SERVER:
      return action.gameState
    default:
      return gameState;
  }
};

export default gameStateReducer
