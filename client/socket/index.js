import io from 'socket.io-client';
import { ServerSends, ClientListensFor } from './MsgType';
import { handleGotTokFeed, handleGameStateUpdate } from './handlers';

const socket = io(window.location.origin);
console.log('Creating a socket connection to namespace:', window.location.origin)

socket.on('connect', () => {
  console.log('websocket Connected!');
});

// Dispatch to the appropriate handler
socket.on(ClientListensFor.SERVER_UPDATE, serverMsg => {
  console.log('Received socket msg from server:', serverMsg);
  const data = serverMsg.data;
  switch (serverMsg.type) {
    case ServerSends.GIVE_TOK_FEED:
      return handleGotTokFeed(data);
    case ServerSends.GIVE_GAMESTATE_UPDATE:
      return handleGameStateUpdate(data);
    default:
      break;
  }
});

export default socket;
