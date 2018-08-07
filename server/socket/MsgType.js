
// Msgs that client will send to server
module.exports.ClientSends = {
  ASK_FOR_CLIENT_ID: "ASK_FOR_CLIENT_ID",
  ASK_FOR_GAME_ID: "ASK_FOR_GAME_ID",
  ASK_TO_START_GAME: "ASK_TO_START_GAME",
  TELL_ROLE_ACTION: "TELL_ROLE_ACTION",
  ASK_STATS: "ASK_STATS"
};
// Endpoints that client listens on
module.exports.ClientListensFor = {
  SERVER_UPDATE: "SERVER_UPDATE"
};


// Msgs that server will send to client
module.exports.ServerSends = {
  GIVE_CLIENT_ID: "GIVE_CLIENT_ID",
  GIVE_GAME_ID: "GIVE_GAME_ID",
  GIVE_PLAYER_INFO: "GIVE_PLAYER_INFO",
  GIVE_COPY_OF_ALL_CARDS: "GIVE_COPY_OF_ALL_CARDS",
  GIVE_ROLE: "GIVE_ROLE",
  GIVE_ROLE_ACTION_DATA: "GIVE_ROLE_ACTION_DATA",
  GIVE_ANNOUNCER_MSG: "GIVE_ANNOUNCER_MSG",
  ASK_DO_ROLE_ACTION: "ASK_DO_ROLE_ACTION",
  GIVE_STATS: "GIVE_STATS",
  GIVE_TOK_FEED: "GIVE_TOK_FEED",
  GIVE_GAMESTATE_UPDATE: "GIVE_GAMESTATE_UPDATE",
  GIVE_PLAYER_JOINED_GAME: "GIVE_PLAYER_JOINED_GAME",
  GIVE_ERROR: "GIVE_ERROR",
};
// Endpoints that server listens on
module.exports.ServerListensFor = {
  ASK_SERVER: "ASK_SERVER"
}

// ========= Game States =========
module.exports.GameStateUpdates = {
  GAME_STARTED: "GAME_STARTED"
}
