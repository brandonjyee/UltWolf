const {
  ClientListensFor,
  ServerSends,
  GameStateUpdates,
} = require('./MsgType');

const createMsgToClient = (type, data) => ({ type, data });

const sendToClient = (socket, type, data) => {
  socket.emit(ClientListensFor.SERVER_UPDATE, createMsgToClient(type, data));
};

// ========== Send data to client via socket ========

module.exports.sendPlayerInfoToClient = (socket, playerId, playerName) => {
  sendToClient(socket, ServerSends.GIVE_PLAYER_INFO, [playerId, playerName]);
};

// Send tok apiKey, sessionId, token
module.exports.sendTokFeedToClient = (
  socket,
  playerId,
  apiKey,
  sessionId,
  token
) => {
  sendToClient(socket, ServerSends.GIVE_TOK_FEED, [
    playerId,
    apiKey,
    sessionId,
    token,
  ]);
};

module.exports.sendPlayerJoinedToClient = (socket, allPlayers) => {
  sendToClient(socket, ServerSends.GIVE_PLAYER_JOINED_GAME, allPlayers);
};

module.exports.sendGameStartedToClient = (socket, allCards) => {
  // Send all cards in play
  sendToClient(socket, ServerSends.GIVE_GAMESTATE_UPDATE, [
    GameStateUpdates.GAME_STARTED,
    allCards,
  ]);
};

module.exports.sendAnnouncerMsgToClient = (socket, msg) => {
  sendToClient(socket, ServerSends.GIVE_ANNOUNCER_MSG, msg);
}

module.exports.sendRoleToClient = (socket, role, centerCards) => {
  sendToClient(socket, ServerSends.GIVE_ROLE, [role, centerCards]);
};

module.exports.sendRoleActionDataToClient = (socket, actionData) => {
  sendToClient(socket, ServerSends.GIVE_ROLE_ACTION_DATA, actionData);
}

module.exports.sendErrorToClient = (socket, err) => {
  sendToClient(socket, ServerSends.GIVE_ERROR, err);
};
