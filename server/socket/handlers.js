const {sendGameStartedToClient} = require('./send')


module.exports.handleAskStartGame = (socket) => {
  try {
    console.log('handleAskStartGame().')
    // Update game engine
    // Send response to clients of that game
    sendGameStartedToClient(socket)
    // Give Role card
  } catch (err) {
    console.error(err)
  }
}