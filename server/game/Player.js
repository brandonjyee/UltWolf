const {randName, uuidv4} = require('./GameUtil')

class Player {
  constructor(id) {
    this.name = randName();
    this.id = id || uuidv4()

    // Game-specific data.
    this.card = null
  }

  getName() { return this.name }
  getId() { return this.id }

  giveCard(card) {
    this.card = card;
  }
}

module.exports = Player
