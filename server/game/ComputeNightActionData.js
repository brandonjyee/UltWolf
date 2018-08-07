const {WEREWOLF} = require('./Role')

const getOtherPlayerIds = (game, thisPlayerId) => {
  const players = game.getAllPlayerInfo();
  const playerIds = [];
  players.forEach(player => {
    if (player.getId() !== thisPlayerId) {
      playerIds.push(player.getId());
    }
  });
  return playerIds;
}

module.exports.RoleActionMap = {
  // Needs to know about other players' cards
  ROBBER: {
    computeActionData: getOtherPlayerIds
  },
  // Can see other players' card or 2 cards from center
  SEER: {
    computeActionData: (game, thisPlayerId) => {
      const playerIds = getOtherPlayerIds(game, thisPlayerId)
      playerIds.push('2 Center Cards')
      return playerIds;
    }
  },
  // Switch two players' cards
  TROUBLEMAKER: {
    computeActionData: getOtherPlayerIds
  },
  // Do  nothing
  VILLAGER: {
    computeActionData: () => {}
  },
  // Know about other werewolves
  WEREWOLF: {
    computeActionData: (game) => {
      // Find all werewolves (their playerIds)
      const players = game.getAllPlayerInfo();
      const wolves = [];
      players.forEach(player => {
        const role = player.getCard().getRole();
        if (role === WEREWOLF) {
          wolves.push(player.getId());
        }
      });
      return wolves;
    }
  }
}
