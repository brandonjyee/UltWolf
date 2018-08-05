import setupOT from './opentok';
import store from '../store'
import {gotTokDataFromServer} from '../store/tokdata'
import {gotGameStateUpdateFromServer, GS_WAIT_FOR_ROLE_CARD} from '../store/gameState'

// ======  Functions here handle messages from the server ========

// After receiving apiKey, sessionId, and token, can set up tok
export const handleGotTokFeed = (data) => {
  const [apiKey, sessionId, token] = data;
  console.log(
    'Received TOK msg from server. apiKey:',
    apiKey,
    'sessionId:',
    sessionId,
    'token:',
    token
  );
  setupOT(apiKey, sessionId, token);
  console.log('Dispatching tokData to redux');
  store.dispatch(gotTokDataFromServer(apiKey, sessionId, token));
};

export const handleGameStateUpdate = (stateUpdate) => {
  console.log('handleGameStateUpdate. stateUpdate:', stateUpdate);
  let newState = '';
  switch (stateUpdate) {
    case 'GAME_STARTED': { newState = GS_WAIT_FOR_ROLE_CARD; break; }
    default: {
      console.error('Received unknown stateUpdate from Server:', stateUpdate);
      break;
    }
  }
  store.dispatch(gotGameStateUpdateFromServer(newState));
};
