const {
  // ClientListensFor,
  ServerListensFor,
  ClientSends,
  // ServerSends,
} = require('./MsgType');
const { apiKey, createSession, createToken } = require('./opentok');
const helper = require('../helper');
const { sendPlayerInfoToClient, sendTokFeedToClient } = require('./send');
const { handleAskStartGame } = require('./handlers');
const GamesManager = require('../game/GamesManager');
const { registerGameListeners } = require('./gameListeners');

// const Game = require('../game/Game');
// const {
//   GE_GAME_STARTED,
//   GE_PLAYER_JOINED_GAME,
// } = require('../game/GameEvents');

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
Holds a map of gameIds to tok sessionIds
*/
const gameIdMap = {};

const getPlayerId = socket => socketIdMap[socket.id].playerId;
const getGame = socket => socketIdMap[socket.id].game;
const getTokData = socket => socketIdMap[socket.id].tokData;

const registerSocketListeners = serverSocket => {
  serverSocket.on('join-room', room => {
    serverSocket.join(room);
  });

  serverSocket.on(ServerListensFor.ASK_SERVER, clientMsg => {
    try {
      switch (clientMsg.type) {
        case ClientSends.ASK_TO_START_GAME:
          return handleAskStartGame(
            serverSocket,
            getPlayerId(serverSocket),
            getGame(serverSocket)
          );
        default:
          break;
      }
    } catch (err) {
      console.error(err);
    }
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

    const playerId = GamesManager.createPlayer();
    sendPlayerInfoToClient(serverSocket, playerId, 'Mr. Smith');

    // Join a game
    const game = GamesManager.findOrCreateAGame();
    console.log(
      'GamesManager.findOrCreateAGame() returned a game with id:',
      game.getId()
    );
    // Need to register listeners for the Game before joining game to catch all updates
    registerGameListeners(game, playerId, serverSocket);
    GamesManager.joinGame(playerId, game);

    // sessionId will be the same for players in the same game
    // Try to look for an existing tok session associated with the game
    let sessionId = gameIdMap[game.getId()];
    if (!sessionId) {
      sessionId = await createSession();
      gameIdMap[game.getId()] = sessionId;
    }
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

    // Video feed: send tok apiKey, sessionId, token
    sendTokFeedToClient(serverSocket, apiKey, sessionId, token);
  });
};

// console.log('Created new game manually.')
// const myGame = new Game('1234')
// myGame.on(GE_GAME_STARTED, () => { console.log('myGame has started!')})
// myGame.on(GE_PLAYER_JOINED_GAME, () => { console.log('myGame has a new player!')})
// console.log('Set listener on game. Adding players to game and starting game...')
// myGame.addPlayer('1')
// myGame.addPlayer('2')
// myGame.addPlayer('3')
// myGame.startGame()

// Assume player has joined a game
// serverSocket.on('join-game', () => {})
// Create player in game and get playerId
// const newGame = GamesManager.createNewGame();
// newGame.on(GE_GAME_STARTED, () => { console.log('0 game has started!')})
// newGame.on(GE_PLAYER_JOINED_GAME, () => { console.log('0 game has a new player!')})
// newGame.addPlayer('1')
// newGame.addPlayer('2')
// newGame.addPlayer('3')
// newGame.startGame()
