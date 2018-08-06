const Player = require('./Player');
const Deck = require('./Deck');
const { GS_WAIT_TO_START, GS_WAIT_FOR_ROLE_INPUTS } = require('./GameState');
const EventEmitter = require('events');
const { uuidv4 } = require('./GameUtil');
const {
  GE_PLAYER_JOINED_GAME,
  GE_GAME_STARTED,
  GE_PLAYER_GETS_ROLE_CARD,
} = require('./GameEvents');

class Game extends EventEmitter {
  // GameManager will provide an id for the Game
  constructor(id) {
    super();
    this.id = id || uuidv4();
    // Map of playerIds to players
    this.players = {};
    this.gameState = GS_WAIT_TO_START;
    // Deck will be created when the game starts
    this.deck = null;
  }

  getId() {
    return this.id;
  }

  getNumPlayers() {
    return Object.values(this.players).length;
  }

  getGameState() {
    return this.gameState;
  }

  getAllPlayerInfo() {
    return Object.values(this.players)
  }

  canJoin() {
    return (this.gameState === GS_WAIT_TO_START && this.getNumPlayers() <= 5)
  }

  // Returns playerId. May be supplied with an id
  addPlayer(playerId) {
    if (!this.canJoin()) {
      console.error('Max players is 5. gameId:', this.id);
      throw new Error('Max players is 5');
    }

    // If no playerId supplied, create one
    if (!playerId) {
      let created = false;
      while (!created) {
        playerId = uuidv4();
        if (!this.players[playerId]) {
          created = true;
        }
      }
    }
    const newPlayer = new Player(playerId);
    this.players[playerId] = newPlayer;

    // Emit the full state of
    this.emit(GE_PLAYER_JOINED_GAME, playerId);

    return playerId;
  }

  canStart() {
    return this.gameState === GS_WAIT_TO_START && this.getNumPlayers() >= 3;
  }

  // Returns true if started, else false
  startGame() {
    const numPlayers = this.getNumPlayers();
    if (!this.canStart()) {
      console.error(
        'Cannot start game. gameState:',
        this.gameState,
        'numPlayers:',
        numPlayers
      );
      return false;
    }

    // Create the card deck
    this.deck = new Deck(numPlayers);

    this.emit(GE_GAME_STARTED);

    // Hand out role cards to the players and notify listeners
    Object.values(this.players).forEach(player => {
      const card = this.deck.popCard();
      player.giveCard(card);

      this.emit(GE_PLAYER_GETS_ROLE_CARD, player.getId(), card);
    });

    // Game is now waiting for players to do their role action
    this.gameState = GS_WAIT_FOR_ROLE_INPUTS;
    return true;
  }
}

module.exports = Game;
