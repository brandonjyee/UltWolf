import { ServerListensFor, ClientSends } from './MsgType';
import socket from '.'

export const sendToServer = (type, data) => {
  try {
  // socket.emit(MsgType.ServerEndpoint.AskServer, clientMsg);
      // socketToServer.emit(ServerListensFor.ASK_SERVER, )
      console.log('Sending msg to server. type:', type, 'data:', data)
      socket.emit(ServerListensFor.ASK_SERVER, { type, data })
  } catch (err) {
    console.error(err)
  }
}

export const askServerToStartGame = () => {
  sendToServer(ClientSends.ASK_TO_START_GAME, '')
}
