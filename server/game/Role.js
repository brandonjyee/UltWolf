// =========================== WEREWOLF ===========================

module.exports.WEREWOLF = 'WEREWOLF'

// module.exports.WEREWOLF = {
//   action: 'Open your eyes and see who are the other werewolves.';
//   processRoleAction: function(gameServer, clientMsg) {
//   // Usually Werewolves don't do anything. Just look at each other.
//   // If only one werewolf then can view one center card
//   // ** New id for cards, esp for center cards
// //   let clientId = clientMsg.clientId;
// //   let gameId = clientMsg.gameId;
// //   let actionData = clientMsg.actionData;

// //   let player = gameServer.players[clientId];

// //   player.actions.roleAction = actionData;
//     Role.prototype.processRoleAction.call(this, gameServer, clientMsg);
//   console.log(
//     'set werewolf data. playerId: ' + clientId + ' actionData: ' + actionData
//   );
// }
// }

// =========================== SEER ===========================

module.exports.SEER = 'SEER'

// var SEER = new Role('seer');
// SEER.action = "Look at another player's card or two of the center cards.";
// SEER.processRoleAction = function(gameServer, clientMsg) {
//   // Selected either another player or two center cards. Should cards have Ids?
//   let clientId = clientMsg.clientId;
//   let gameId = clientMsg.gameId;
//   let roleCard = clientMsg.roleCard;
//   let actionData = clientMsg.actionData;

//   // *** Check if client packet has valid info
//   let game = gameServer.games[gameId];
//   let player = gameServer.players[clientId];

//   // Check action validity
//   if (actionData === 'center' || game.hasPlayer(actionData)) {
//     // It's a valid input
//     // Return results to user
//     // player.actions.roleAction = actionData;
//     Role.prototype.processRoleAction.call(this, gameServer, clientMsg);
//     console.log(
//       'set seer data. playerId: ' + clientId + ' actionData: ' + actionData
//     );
//   } else {
//     console.error('Invalid seer data. actionData: ' + actionData);
//   }
// };
// Roles[SEER.name] = SEER;

// ========================== ROBBER ===========================

module.exports.ROBBER = 'ROBBER'

// var ROBBER = new Role('robber');
// ROBBER.action =
//   "Exchange your card with another player's card. View your new card.";
// ROBBER.processRoleAction = function(gameServer, clientMsg) {
//   // Selected either another player or two center cards. Should cards have Ids?
// //   let clientId = clientMsg.clientId;
// //   let gameId = clientMsg.gameId;
// //   let roleCard = clientMsg.roleCard;
// //   let actionData = clientMsg.actionData;

// //   // *** Check if client packet has valid info
// //   let game = gameServer.games[gameId];
// //   let player = gameServer.players[clientId];
//     Role.prototype.processRoleAction.call(this, gameServer, clientMsg);
// };
// Roles[ROBBER.name] = ROBBER;

// ========================== TROUBLEMAKER ===========================
module.exports.TROUBLEMAKER = 'TROUBLEMAKER'

// var TROUBLEMAKER = new Role('troublemaker');
// TROUBLEMAKER.action = 'Exchange cards between two other players.';
// Roles[TROUBLEMAKER.name] = TROUBLEMAKER;

// =========================== VILLAGER ===========================
module.exports.VILLAGER = 'VILLAGER'

// var VILLAGER = new Role('villager');
// VILLAGER.action = 'You are fast asleep while others are scheming...';
// Roles[VILLAGER.name] = VILLAGER;
