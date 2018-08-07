const {
  GE_GAME_STARTED,
  GE_ANNOUNCER_MSG,
  GE_PLAYER_GETS_ROLE_CARD,
  GE_PLAYER_JOINED_GAME,
  GE_WAIT_FOR_NIGHT_ACTIONS,
  GE_ERROR,
} = require('../game/GameEvents');
const {
  sendErrorToClient,
  sendGameStartedToClient,
  sendAnnouncerMsgToClient,
  sendPlayerJoinedToClient,
  sendRoleToClient,
  sendRoleActionDataToClient,
} = require('./send');

module.exports.registerGameListeners = (game, thisPlayerId, serverSocket) => {
  console.log('Registering game listeners for game.getId():', game.getId());

  game.on(GE_PLAYER_JOINED_GAME, allPlayers => {
    // Ignore message if it's the same player
    // if (thisPlayerId === playerId) return;

    console.log(
      `In game listener for gameId: ${game.getId()}; thisPlayerId: ${thisPlayerId}. GE_PLAYER_JOINED_GAME`
    );
    // Need to send all player info so that players who joined later can know about
    // players who joined earlier
    sendPlayerJoinedToClient(serverSocket, allPlayers);
  });

  game.on(GE_GAME_STARTED, () => {
    console.log(
      `In game listener for gameId: ${game.getId()}; thisPlayerId: ${thisPlayerId}. GE_GAME_STARTED`
    );
    sendGameStartedToClient(serverSocket, game.getCopyOfAllCards());
  });

  game.on(GE_ANNOUNCER_MSG, (msg) => {
    console.log(
      `In game listener for gameId: ${game.getId()}; thisPlayerId: ${thisPlayerId}. GE_ANNOUNCER_MSG. msg: ${msg}`
    );
    sendAnnouncerMsgToClient(serverSocket, msg);
  });

  game.on(GE_PLAYER_GETS_ROLE_CARD, (playerId, card, centerCards) => {
    // Ignore messages not for this player
    if (thisPlayerId !== playerId) return;

    console.log(
      `In game listener for gameId: ${game.getId()}; thisPlayerId: ${thisPlayerId}. GE_PLAYER_GETS_ROLE_CARD. playerId: ${playerId}. card: ${card.toString()}`
    );
    sendRoleToClient(serverSocket, card.getRole(), centerCards);
  });

  game.on(GE_WAIT_FOR_NIGHT_ACTIONS, playerActionData => {
    console.log(
      `In game listener for gameId: ${game.getId()}; thisPlayerId: ${thisPlayerId}. GE_WAIT_FOR_NIGHT_ACTIONS. playerActionData: ${playerActionData}`
    );
    const actionData = playerActionData[thisPlayerId];
    console.log('actionData:', actionData)
    sendRoleActionDataToClient(serverSocket, actionData);
  });

  game.on(GE_ERROR, err => {
    console.log(
      `In game listener for gameId: ${game.getId()}; thisPlayerId: ${thisPlayerId}. GE_ERROR. err: ${err}`
    );
    sendErrorToClient(serverSocket, err);
  });
};
