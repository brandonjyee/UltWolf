const Player = require('./Player');
const Deck = require('./Deck');
const { GS_WAIT_TO_START, GS_WAIT_FOR_ROLE_INPUTS } = require('./GameState');
const EventEmitter = require('events');
const { uuidv4 } = require('./GameUtil');
const {
  PLAYER_JOINED_GAME,
  GAME_STARTED,
  PLAYER_GETS_ROLE_CARD,
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

  get id() {
    return this.id;
  }

  get numPlayers() {
    return Object.values(this.players).length;
  }

  get gameState() {
    return this.gameState;
  }

  // Returns playerId. May be supplied with an id
  createPlayer(playerId) {
    if (this.numPlayers() >= 5) {
      console.error('Max players is 5. gameId:', this.id());
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

    this.emit(PLAYER_JOINED_GAME, playerId);

    return playerId;
  }

  startGame() {
    const numPlayers = this.numPlayers();
    if (this.gameState !== GS_WAIT_TO_START || numPlayers < 3) {
      console.error(
        'Cannot start game. gameState:',
        this.gameState,
        'numPlayers:',
        numPlayers
      );
      return null;
    }

    // Create the card deck
    this.deck = new Deck(numPlayers);

    this.emit(GAME_STARTED);

    // Hand out role cards to the players and notify listeners
    this.players.forEach(player => {
      const card = this.deck.popCard();
      player.giveCard(card);

      this.emit(PLAYER_GETS_ROLE_CARD, card);
    });

    // Game is now waiting for players to do their role action
    this.gameState = GS_WAIT_FOR_ROLE_INPUTS;
  }
}

module.exports = Game;
