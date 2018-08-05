const {uuidv4} = require('./GameUtil')

class Player {
  constructor(id) {
    // this.name = name;
    this.id = id || uuidv4()

    // Game-specific data.
    this.card = null
  }

  get id() { return this.id }

  set giveCard(card) {
    this.card = card;
  }
}

module.exports = Player
