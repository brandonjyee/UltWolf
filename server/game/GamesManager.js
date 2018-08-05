const Game = require('./Game');
const { GS_WAIT_TO_START } = require('./GameState');
const { uuidv4 } = require('./GameUtil');

class GamesManager {
  constructor() {
    // Map of gameId to game
    this.games = {};
    /* Map of serverPlayerIds to:
    {
      game,
      inGamePlayerId  // Deprecated. Will be same as serverPlayerId
    }
    */
    this.players = {};
  }

  _createNewGame() {
    let created = false;
    while (!created) {
      const gameId = uuidv4();
      // Create a new game session if there's no existing session with the given id
      if (!this.games[gameId]) {
        const newGame = new Game(gameId);
        // Update the GameServer
        this.games[gameId] = newGame;
        created = true;
        return newGame;
      }
    }
  }

  // Return a server-wide unique playerId. Player will likely have a different in-game ID
  createPlayer() {
    let created = false;
    while (!created) {
      const serverPlayerId = uuidv4();
      // Create a new game session if there's no existing session with the given id
      if (!this.players[serverPlayerId]) {
        this.players[serverPlayerId] = { game: null, inGamePlayerId: '' };
        created = true;
        return serverPlayerId;
      }
    }
  }

  // Return the game that was joined
  joinAGame(serverPlayerId) {
    // First search for a game that's waiting for players
    const foundGame = Object.entries(this.games).find(({ gameId, game }) => {
      if (game.gameState() === GS_WAIT_TO_START) {
        const inGamePlayerId = game.createPlayer(serverPlayerId);
        // Update player data
        this.players[serverPlayerId] = {
          game,
          inGamePlayerId,
        };
        return true;
      }
      return false;
    });
    // If can't find any, create a new game
    if (!foundGame) {
      const newGame = this._createNewGame();
      this.games[newGame.id()] = newGame
      const inGamePlayerId = newGame.createPlayer(serverPlayerId);
      // Update player data
      this.players[serverPlayerId] = {
        game: newGame,
        inGamePlayerId,
      };
      return newGame;
    }
  }
}

const GamesManagerInstance = new GamesManager();

module.exports = GamesManagerInstance;
