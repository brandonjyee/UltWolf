import React from 'react';
import PlayerCard from './PlayerCard';

const PlayerCards = (props) => {
  return (
    <div id="player-cards">
      <PlayerCard publisherRef={props.publisherRef} />
      <PlayerCard />
      <PlayerCard />
      <PlayerCard />
      <PlayerCard />
    </div>
  );
};

export default PlayerCards;
