import io from 'socket.io-client';
import { ClientSends, ServerSends, ClientListensFor } from './MsgType';
import setupOT from '../opentok';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('websocket Connected!');
  // After receiving apiKey, sessionId, and token, can set up tok
  // setupOT(apiKey, sessionId, token)
});

socket.on(ClientListensFor.SERVER_UPDATE, function(serverMsg) {
  console.log('Received socket msg from server:', serverMsg);
  switch (serverMsg.type) {
    case ServerSends.GIVE_TOK_FEED: {
      const [apiKey, sessionId, token] = serverMsg.data;
      setupOT(apiKey, sessionId, token);
      break;
    }
    default: break;
  }
  // processServerUpdate(serverMsg);
});

export default socket;
