const { sendErrorToClient } = require('./send');
const {GS_WAIT_TO_START} = require('../game/GameState')

// Handle incoming messages from the client
// *Outgoing messages from server to client will be triggered by game state listeners*

module.exports.handleAskStartGame = (socket, playerId, game) => {
  try {
    console.log('handleAskStartGame().');
    // Update game engine
    const started = game.startGame();
    if (!started) {
      sendErrorToClient(socket, `Could not start game. GameState needs to be ${GS_WAIT_TO_START}; it was ${game.getGameState()}. Players need to be >= 3 and <= 5. numPlayers: ${game.getNumPlayers()}`)
    }
  } catch (err) {
    console.error(err);
    // Send error to client?
  }
};

module.exports.handleDoRoleAction = (socket, playerId, game) => {
  try {
    console.log('handleDoRoleAction().');

    // game.
    // RoleMap[]
    // const started = game.startGame();
    // if (!started) {
    //   sendErrorToClient(socket, `Could not start game. GameState needs to be ${GS_WAIT_TO_START}; it was ${game.getGameState()}. Players need to be >= 3 and <= 5. numPlayers: ${game.getNumPlayers()}`)
    // }
  } catch (err) {
    console.error(err);
  }
};
