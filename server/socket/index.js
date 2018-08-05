const {
  // ClientListensFor,
  ServerListensFor,
  ClientSends,
  // ServerSends,
} = require('./MsgType');
// const { findOrCreateSessionInfo } = require('./opentok');
const { apiKey, createSession, createToken } = require('./opentok');
const helper = require('../helper');
const { sendTokFeedToClient } = require('./send');
const { handleAskStartGame } = require('./handlers');
const GamesManager = require('../game/GamesManager');
const {
  GAME_STARTED,
  PLAYER_GETS_ROLE_CARD,
  PLAYER_JOINED_GAME,
} = require('../game/GameEvents');

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

/*
Holds a map of socketIds to:
{
  socket,
  playerId,
  game,
  tokData: { sessionId, token }, // apiKey will be the same for every player
}
*/
const socketIdMap = {};

/*
Holds a map of gameIds to tokSessions
*/
const gameIdMap = {};

const registerSocketListeners = serverSocket => {
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
};

const registerGameListeners = (game, serverSocket) => {
  game.on(GAME_STARTED, () => {
    // do stuff
  });

  game.on(PLAYER_GETS_ROLE_CARD, () => {
    // do stuff
  });

  game.on(PLAYER_JOINED_GAME, () => {
    // do stuff
  });
};

module.exports = io => {
  io.on('connection', async serverSocket => {
    console.log(
      `A socket connection to the server has been made: ${serverSocket.id}`
    );

    serverSocket.on('disconnect', () => {
      console.log(`Connection ${serverSocket.id} has left the building`);
    });

    registerSocketListeners(serverSocket);

    const existingSocketData = socketIdMap[serverSocket.id];
    if (existingSocketData) {
      console.error('Existing socket data with id:', serverSocket.id);
    }

    // Assume player has joined a game
    // serverSocket.on('join-game', () => {})
    // Create player in game and get playerId
    const playerId = GamesManager.createPlayer();
    const game = GamesManager.joinAGame(playerId);

    // sessionId will be the same for players in the same game
    // Try to look for an existing tok session associated with a game
    const sessionId = await createSession();
    // token will be different for every player
    const token = createToken(sessionId);
    console.log(
      'In sockets connection. sessionId:',
      helper.hashStr(sessionId),
      'token:',
      helper.hashStr(token)
    );

    // Save all this data to the socketIdMap
    socketIdMap[serverSocket.id] = {
      socket: serverSocket,
      playerId,
      game,
      tokData: { sessionId, token },
    };

    // Need to register listeners for the Game
    registerGameListeners(game, serverSocket);

    // Video feed: send tok apiKey, sessionId, token
    sendTokFeedToClient(serverSocket, apiKey, sessionId, token);
  });
};
