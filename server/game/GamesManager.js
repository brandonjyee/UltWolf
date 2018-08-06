const Game = require('./Game');
const { GS_WAIT_TO_START } = require('./GameState');
const { uuidv4 } = require('./GameUtil');

class GamesManager {
  constructor() {
    // Map of gameId to game
    this.games = {};
    // Map of serverPlayerIds to game
    this.players = {};
  }

  createNewGame() {
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
      if (!this.players[serverPlayerId]) {
        // this.players[serverPlayerId] = { game: null};
        created = true;
        return serverPlayerId;
      }
    }
  }

  findOrCreateAGame() {
    console.log('In findOrCreateAGame()');
    // First search for a game that's waiting for players
    const foundGame = Object.values(this.games).find(game => {
      // console.log('In findOrCreateAGame() game entries. game:', game);
      return game.canJoin();
    });
    if (foundGame) {
      return foundGame;
    }
    console.log('Could not find a game to join. Creating a new one.');

    // If can't find any open games, create a new game
    const newGame = this.createNewGame();
    this.games[newGame.getId()] = newGame;
    return newGame;
  }

  // Return the game that was joined
  joinGame(serverPlayerId, game) {
    console.log(
      'In joinGame(). playerId:',
      serverPlayerId,
      'gameId:',
      game.getId()
    );
    game.addPlayer(serverPlayerId);
    // Update player data
    this.players[serverPlayerId] = game;
  }
}

const GamesManagerInstance = new GamesManager();

module.exports = GamesManagerInstance;
