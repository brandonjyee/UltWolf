const {
  // ClientListensFor,
  ServerListensFor,
  ClientSends,
  // ServerSends,
} = require('./MsgType');
const { findOrCreateSessionInfo } = require('./opentok');
const helper = require('../helper');
const { sendTokFeedToClient } = require('./send');
const { handleAskStartGame } = require('./handlers');

// const sendToClient = (socket, playerId, msg) => {
//   // let socket = gs.playerToSocketMap[playerId];
//   if (!socket) {
//       console.error("No socket for player. playerId: " + playerId);
//   } else if (!socket.connected) {
//       console.error("Socket exists but is not connected. playerId: " + playerId);
//   } else {
//       socket.emit(MsgType.ClientEndpoint.ServerUpdate, msg);
//   }
// }

module.exports = io => {
  io.on('connection', async serverSocket => {
    console.log(
      `A socket connection to the server has been made: ${serverSocket.id}`
    );

    serverSocket.on('join-room', room => {
      serverSocket.join(room);
    });

    serverSocket.on(ServerListensFor.ASK_SERVER, clientMsg => {
      try {
        switch (clientMsg.type) {
          case ClientSends.ASK_TO_START_GAME:
            return handleAskStartGame(serverSocket);
          default:
            break;
        }
      } catch (err) {
        console.error(err);
      }
    });

    // serverSocket.on('draw-from-client', (start, end, strokeColor, lineWidth, room) => {
    //   serverSocket.to(room).emit('draw-from-server', start, end, strokeColor, lineWidth)
    // })

    serverSocket.on('disconnect', () => {
      console.log(`Connection ${serverSocket.id} has left the building`);
    });

    const [apiKey, sessionId, token] = await findOrCreateSessionInfo();
    console.log(
      'In sockets connection. sessionId:',
      helper.hashStr(sessionId),
      'token:',
      helper.hashStr(token)
    );

    // Send tok apiKey, sessionId, token
    sendTokFeedToClient(serverSocket, apiKey, sessionId, token);
  });
};
