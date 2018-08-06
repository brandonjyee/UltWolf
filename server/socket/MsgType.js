
// Msgs that client will send to server
module.exports.ClientSends = {
  ASK_FOR_CLIENT_ID: "client-id",
  ASK_FOR_GAME_ID: "game-id",
  ASK_TO_START_GAME: "start-game",
  TELL_ROLE_ACTION: "did-role-action",
  ASK_STATS: "stats"
};
// Endpoints that client listens on
module.exports.ClientListensFor = {
  SERVER_UPDATE: "server-update"
};


// Msgs that server will send to client
module.exports.ServerSends = {
  GIVE_CLIENT_ID: "client-id",
  GIVE_GAME_ID: "game-session-id",
  GIVE_PLAYER_INFO: "GIVE_PLAYER_INFO",
  GIVE_ROLE: "give-role",
  GIVE_ANNOUNCER_MSG: "announcer-msg",
  ASK_DO_ROLE_ACTION: "do-role-action",
  GIVE_STATS: "stats",
  GIVE_TOK_FEED: "GIVE_TOK_FEED",
  GIVE_GAMESTATE_UPDATE: "GIVE_GAMESTATE_UPDATE",
  GIVE_PLAYER_JOINED_GAME: "GIVE_PLAYER_JOINED_GAME",
  GIVE_ERROR: "GIVE_ERROR",
};
// Endpoints that server listens on
module.exports.ServerListensFor = {
  ASK_SERVER: "ask-server"
}

// ========= Game States =========
module.exports.GameStateUpdates = {
  GAME_STARTED: "GAME_STARTED"
}
