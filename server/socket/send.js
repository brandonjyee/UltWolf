const { ClientListensFor, ServerSends, GameStates } = require('./MsgType');

const createMsgToClient = (type, data) => ({ type, data });

const sendToClient = (socket, type, data) => {
  socket.emit(ClientListensFor.SERVER_UPDATE, createMsgToClient(type, data));
};

// Send tok apiKey, sessionId, token
module.exports.sendTokFeedToClient = (socket, apiKey, sessionId, token) => {
  sendToClient(socket, ServerSends.GIVE_TOK_FEED, [apiKey, sessionId, token]);
};

module.exports.sendGameStartedToClient = (socket) => {
  sendToClient(socket, ServerSends.GIVE_GAMESTATE_UPDATE, GameStates.STARTED);
};
