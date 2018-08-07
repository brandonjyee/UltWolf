import React from 'react';
import { connect } from 'react-redux';
import PlayerCard from './PlayerCard';

const PlayerCards = props => {
  const { players, thisPlayer, role, thisVideoElem, playersVideoElem } = props;
  return (
    <div id="player-cards">
      {players.map(player => {
        // If it's this player
        if (thisPlayer && player.id === thisPlayer.id) {
          return (
            <PlayerCard
              key={player.id}
              playerId={player.id}
              playerName={player.name + " (YOU)"}
              role={role}
              videoElem={thisVideoElem}
            />
          );
        }
        // If it's another player
        else {
          return (
            <PlayerCard
              key={player.id}
              playerId={player.id}
              playerName={player.name}
              videoElem={playersVideoElem[player.id]}
            />
          );
        }
      })}
    </div>
  );
};

const mapStateToProps = ({
  thisPlayer,
  players,
  role,
  thisVideoElem,
  playersVideoElem,
}) => ({
  thisPlayer,
  players,
  role,
  thisVideoElem,
  playersVideoElem
});

export default connect(mapStateToProps)(PlayerCards);
