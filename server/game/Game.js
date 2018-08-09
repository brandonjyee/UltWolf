const Player = require('./Player');
const Deck = require('./Deck');
const { GS_WAIT_TO_START, GS_WAIT_FOR_ROLE_INPUTS } = require('./GameState');
const EventEmitter = require('events');
const { uuidv4 } = require('./GameUtil');
const { RoleActionMap } = require('./ComputeNightActionData');
const {
  GE_PLAYER_JOINED_GAME,
  GE_GAME_STARTED,
  GE_PLAYER_GETS_ROLE_CARD,
  GE_WAIT_FOR_NIGHT_ACTIONS,
  GE_ANNOUNCER_MSG,
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

  getCopyOfAllCards() {
    return this.deck.getCopyOfAllCards();
  }

  getNumPlayers() {
    return Object.values(this.players).length;
  }

  getGameState() {
    return this.gameState;
  }

  getAllPlayerInfo() {
    return Object.values(this.players);
  }

  canJoin() {
    return this.gameState === GS_WAIT_TO_START && this.getNumPlayers() <= 5;
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

    // Emit the full state of players
    this.emit(GE_PLAYER_JOINED_GAME, this.getAllPlayerInfo());

    return playerId;
  }

  canStart() {
    return this.gameState === GS_WAIT_TO_START && this.getNumPlayers() >= 3;
  }

  _computeDataForRoleActions() {
    // For each player in the game
    const playerActionData = {};
    Object.values(this.players).forEach(player => {
      const playerId = player.getId();
      const card = player.getCard();
      const role = card.getRole();
      playerActionData[playerId] = RoleActionMap[role].computeActionData(
        this,
        playerId
      );
    });
    return playerActionData;
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

      // FIXME
      const centerCards = ['1','2','3']
      this.emit(GE_PLAYER_GETS_ROLE_CARD, player.getId(), card, centerCards);
    });

    // Display to user what the character's night action is
    // or client-side already has that info

    // Announcer announces night phase
    this.emit(GE_ANNOUNCER_MSG, 'Night falls... Everyone close your eyes.')
    // const intervalStopper = {};
    // let secondsCount = 10;
    // var interval = setInterval(() => {
    //   // Clear the interval when the timer has finished
    //   if (secondsCount <= 0) {
    //     clearInterval(interval);
    //   } else {
    //     secondsCount--;
    //   }
    // }, 1000)

    // Game is now waiting for players to do their role action
    this.gameState = GS_WAIT_FOR_ROLE_INPUTS;

    // Ask clients for role action. Provide data for each role
    // Will compute data for each player and generate map of playerId -> data
    const playerActionData = this._computeDataForRoleActions();
    this.emit(GE_WAIT_FOR_NIGHT_ACTIONS, playerActionData);

    return true;
  }

  doRoleAction(playerId, actionData) {
    // Get player's role and process actionData based
    if (this.gameState !== GS_WAIT_FOR_ROLE_INPUTS) {
      throw new Error('Not allowed to do that role action in current game state')
    }

    const player = this.players[playerId]
    if (!player) throw new Error('No player with id:', playerId)

    const role = player.getCard().getRole();

    return true
  }
}

module.exports = Game;
