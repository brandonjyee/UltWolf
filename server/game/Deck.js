const { createUUIDs, shuffle } = require('./GameUtil');
const { ROBBER, SEER, TROUBLEMAKER, VILLAGER, WEREWOLF } = require('./Card');

class Deck {
  constructor(numPlayers) {
    this.cards = this._generateRandomDeck(numPlayers);
  }

  getNumCards() {
    return this.cards.length;
  }

  shuffleDeck() {
    shuffle(this.cards)
  }

  popCard() {
    if (this.cards.length) {
      return this.cards.pop()
    } else {
      console.error('Popping from an empty deck')
    }
  }

  peekCard() {
    if (this.cards.length) {
      return this.cards[this.cards.length - 1]
    } else {
      console.error('Peeking from an empty deck')
    }
  }

  pushCard(card) {
    this.cards.push(card)
  }

  _generateRandomDeck(numPlayers) {
    if (numPlayers < 3) throw new Error('Less than 3 players.');
    /* Should always be 3 more cards than # of players.
          3 players:
          2 werewolves; 1 Seer; 1 Robber; 1 Troublemaker; 1 Villager

          4 players:
          +1 Villager

          5 players:
          +2 Villagers
    */
    const numCards = numPlayers + 3;
    const cardIds = createUUIDs(numCards);
    const cards = [];
    cards.push(
      WEREWOLF(cardIds.pop()),
      WEREWOLF(cardIds.pop()),
      SEER(cardIds.pop()),
      ROBBER(cardIds.pop()),
      TROUBLEMAKER(cardIds.pop()),
      VILLAGER(cardIds.pop())
    );

    if (numPlayers >= 4) {
      cards.push(VILLAGER(cardIds.pop()));
    }
    if (numPlayers >= 5) {
      cards.push(VILLAGER(cardIds.pop()));
    }

    // Shuffles in place
    shuffle(cards);
    return cards;
  }

  // getFullDeck = function() {
  //   let retArr = [];
  //   // 16 cards total
  //   // 1 doppelganger
  //   // TODO
  //   // 2 werewolves
  //   retArr.push(WEREWOLF, WEREWOLF);
  //   // 1 minion
  //   // TODO
  //   // 2 masons
  //   // TODO
  //   // 1 seer
  //   retArr.push(SEER);
  //   // 1 robber
  //   retArr.push(ROBBER);
  //   // 1 troublemaker
  //   retArr.push(TROUBLEMAKER);
  //   // 1 drunk
  //   // TODO
  //   // 1 insomniac
  //   // TODO
  //   // 3 villagers
  //   retArr.push(VILLAGER, VILLAGER, VILLAGER);
  //   // 1 hunter
  //   // 1 tanner
  // };
}

module.exports = Deck;
