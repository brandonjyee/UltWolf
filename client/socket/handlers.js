import setupOT from './opentok';
import store from '../store';
import { gotTokDataFromServer } from '../store/tokdata';
import { setPlayers } from '../store/players';
import { setThisPlayer } from '../store/thisPlayer';
import {
  gotGameStateUpdateFromServer,
  GS_WAIT_FOR_ROLE_CARD,
} from '../store/gameState';
import { setRole } from '../store/role';
import { gotErrorFromServer } from '../store/err';
import { setCopyOfAllCards } from '../store/allCards';
import { setRoleActionData } from '../store/roleActionData';
import { setCenterCards } from '../store/centerCards';
import { setAnnouncerMsg } from '../store/announcerMsg';

// ======  Functions here handle messages from the server ========

// After receiving apiKey, sessionId, and token, can set up tok
export const handleGotTokFeed = data => {
  const [playerId, apiKey, sessionId, token] = data;
  console.log(
    'Received TOK msg from server. apiKey:',
    apiKey,
    'sessionId:',
    sessionId,
    'token:',
    token
  );
  setupOT(playerId, apiKey, sessionId, token);
  console.log('Dispatching tokData to redux');
  store.dispatch(gotTokDataFromServer(apiKey, sessionId, token));
};

export const handleThisPlayerInfo = playerData => {
  console.log('handleThisPlayerInfo. playerData:', playerData);
  const [playerId, playerName] = playerData;
  store.dispatch(setThisPlayer(playerId, playerName));
};

export const handlePlayerJoined = allPlayers => {
  console.log('handlePlayerJoined. allPlayers:', allPlayers);
  // const [playerId, playerName] = playerData
  store.dispatch(setPlayers(allPlayers));
};

export const handleAnnouncerMsg = msg => {
  console.log('handleAnnouncerMsg. msg:', msg);
  store.dispatch(setAnnouncerMsg(msg));
};

export const handleGameStateUpdate = stateUpdate => {
  console.log('handleGameStateUpdate. stateUpdate:', stateUpdate);
  const [state, data] = stateUpdate;
  switch (state) {
    case 'GAME_STARTED': {
      const allPlayers = data;
      store.dispatch(setCopyOfAllCards(allPlayers));
      store.dispatch(gotGameStateUpdateFromServer(GS_WAIT_FOR_ROLE_CARD));
      break;
    }
    default: {
      console.error('Received unknown stateUpdate from Server:', stateUpdate);
      break;
    }
  }
};

// Should get center cards at the same time. Could prob break them up into
// two messages for clarity
export const handleGotRole = ([role, centerCards]) => {
  console.log('handleGotRole. role:', role, 'centerCards:', centerCards);
  store.dispatch(setRole(role));
  store.dispatch(setCenterCards(centerCards));
};

// Shape of data depends on what role card this player has.
// Usually it's an array of playerIds
export const handleGotRoleActionData = actionData => {
  console.log('handleGotRoleActionData. actionData:', actionData);
  store.dispatch(setRoleActionData(actionData));
};

export const handleError = err => {
  store.dispatch(gotErrorFromServer(err));
};
