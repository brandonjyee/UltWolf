export const getPlayerName = (playerId, players) => {
  const foundPlayer = players.find((player) => {
    return player.id === playerId
  })
  if (foundPlayer) {
    return foundPlayer.name
  }
  return playerId
}
