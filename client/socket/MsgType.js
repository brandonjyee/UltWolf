
// Msgs that client will send to server
export const ClientSends = {
  ASK_FOR_CLIENT_ID: "client-id",
  ASK_FOR_GAME_ID: "game-id",
  ASK_TO_START_GAME: "start-game",
  TELL_ROLE_ACTION: "did-role-action",
  ASK_STATS: "stats"
};
// Endpoints that client listens on
export const ClientListensFor = {
  SERVER_UPDATE: "server-update"
};


// Msgs that server will send to client
export const ServerSends = {
  GIVE_CLIENT_ID: "client-id",
  GIVE_GAME_ID: "game-session-id",
  GIVE_ROLE: "give-role",
  GIVE_ANNOUNCER_MSG: "announcer-msg",
  ASK_DO_ROLE_ACTION: "do-role-action",
  GIVE_STATS: "stats",
  GIVE_TOK_FEED: "GIVE_TOK_FEED"
};
// Endpoints that server listens on
export const ServerListensFor = {
  ASK_SERVER: "ask-server"
}