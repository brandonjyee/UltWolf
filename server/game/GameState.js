// descStart: "When game is created, this is its state. Wait on sufficient number of players to enter",
// descEnd: "Triggers when game starts. Needs: sufficient number of players. Transitions to GIVE_ROLES"
module.exports.GS_WAIT_TO_START = 'GS_WAIT_TO_START';

// descStart: "Triggers when all players have received their role cards. Transitions from GIVE_ROLES",
// descEnd: "Triggers when all players have seen the results of the actions. Transitions to SHOW_ACTION_RESULT"
module.exports.GS_WAIT_FOR_ROLE_INPUTS = 'GS_WAIT_FOR_ROLE_INPUTS';

// const GameState = {
//   WAIT_TO_START: {
//     name: 'WAIT_TO_START',
//     descStart:
//       'When game is created, this is its state. Wait on sufficient number of players to enter',
//     descEnd:
//       'Triggers when game starts. Needs: sufficient number of players. Transitions to GIVE_ROLES',
//   },
//   GIVE_ROLES: {
//     name: 'GIVE_ROLES',
//     descStart: 'Triggers when start the game. Transitions from WAIT_TO_START.',
//     descEnd:
//       'Triggers when all players have received their role card. Transitions to GET_ROLE_INPUTS',
//   },
//   GET_ROLE_INPUTS: {
//     name: 'GET_ROLE_INPUTS',
//     descStart:
//       'Triggers when all players have received their role cards. Transitions from GIVE_ROLES',
//     descEnd:
//       'Triggers when all players have seen the results of the actions. Transitions to SHOW_ACTION_RESULT',
//   },
//   SHOW_ACTION_RESULT: {
//     name: 'SHOW_ACTION_RESULT',
//     descStart:
//       'Triggers when all players have done their role action (if they have anything to do)',
//     descEnd:
//       'Triggers when all players have seen the result of their actions. Transitions to DISCUSSION',
//   },
//   DISCUSSION: {
//     name: 'DISCUSSION',
//     descStart:
//       'Triggers when all players have seen the result of their actions. Now they must discuss who to vote to kill',
//     descEnd: 'Triggers when discussion ends. Transitions to VOTE.',
//     // ** It's possible the voting and discussion may happen concurrently
//   },
//   VOTE: {
//     name: 'VOTE',
//     descStart:
//       'Triggers after players have finished discussing who they want to vote to kill',
//     descEnd: 'Triggers when voting has completed.',
//   },
//   GAME_RESULT: {
//     name: 'GAME_RESULT',
//     descStart:
//       'Triggers when the voting has completed. Game will compute who wins and who loses.',
//     descEnd:
//       'Triggers when all players have seen the game results. Game is over.',
//   },
// };

// Object.freeze(GameState);

// module.exports.GameState = GameState;
