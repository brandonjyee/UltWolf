import React from 'react';
import { connect } from 'react-redux';
import PlayerCard from './PlayerCard';

class PlayerCards extends React.Component {
  render() {
    const { players, thisPlayer, role } = this.props;
    return (
      <div id="player-cards">
        {players.map(player => {
          if (thisPlayer && (player.id === thisPlayer.id)) {
            return (
              <PlayerCard
                key={player.id}
                playerId={player.id}
                playerName='YOU'
                role={role}
              />
            );
          } else {
            return (
              <PlayerCard
                key={player.id}
                playerId={player.id}
                playerName={player.name}
              />
            );
          }
        })}
        {/* <PlayerCard publisherRef={props.publisherRef} />*/}
      </div>
    );
  }
}

const mapStateToProps = ({ thisPlayer, players, role }) => ({
  thisPlayer,
  players,
  role,
});

export default connect(mapStateToProps)(PlayerCards);
