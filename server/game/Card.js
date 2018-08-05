const { uuidv4 } = require('./GameUtil');
const { ROBBER, SEER, TROUBLEMAKER, VILLAGER, WEREWOLF } = require('./Role');

class Card {
  constructor(id, role) {
    // Uniquely identify cards
    this.id = id || uuidv4();
    this.role = role;
  }

  get id() { return this.id; }
  get role() { return this.role; }
}

// module.exports = Card;

module.exports.ROBBER = id => new Card(id, ROBBER);
module.exports.SEER = id => new Card(id, SEER);
module.exports.TROUBLEMAKER = id => new Card(id, TROUBLEMAKER);
module.exports.VILLAGER = id => new Card(id, VILLAGER);
module.exports.WEREWOLF = id => new Card(id, WEREWOLF);
