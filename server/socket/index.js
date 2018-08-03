const {ClientListensFor, ServerSends} = require('./MsgType')
const {findOrCreateSessionInfo} = require('../opentok')

// const sendToClient = (socket, playerId, msg) => {
//   // let socket = gs.playerToSocketMap[playerId];
//   if (!socket) {
//       console.error("No socket for player. playerId: " + playerId);
//   } else if (!socket.connected) {
//       console.error("Socket exists but is not connected. playerId: " + playerId);
//   } else {
//       socket.emit(MsgType.ClientEndpoint.ServerUpdate, msg);
//   }
// }

module.exports = io => {
  io.on('connection', async serverSocket => {
    console.log(`A socket connection to the server has been made: ${serverSocket.id}`)

    const [apiKey, sessionId, token] = await findOrCreateSessionInfo()
    console.log('In sockets connection. sessionId:', sessionId, 'token:', token)
    // Send tok apiKey, sessionId, token
    serverSocket.emit(ClientListensFor.SERVER_UPDATE, {
      type: ServerSends.GIVE_TOK_FEED,
      data: [apiKey, sessionId, token]
    });


    serverSocket.on('join-room', room => {
      serverSocket.join(room)
    })


    // serverSocket.on('draw-from-client', (start, end, strokeColor, lineWidth, room) => {
    //   serverSocket.to(room).emit('draw-from-server', start, end, strokeColor, lineWidth)
    // })

    serverSocket.on('disconnect', () => {
      console.log(`Connection ${serverSocket.id} has left the building`)
    })
  })
}


