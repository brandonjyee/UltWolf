import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const PlayerCard = (props) => {
  const {publisherRef} = props
  if (publisherRef) {
    console.log('In PlayerCard. publisherRef.current:', publisherRef.current)
  }
  return (
    <div>
      <Card>
        <CardContent className="player-card">
          <img className="role-card" src="/img/roles/card-back.png" />
          {/* Publisher: */}
          {/* <div id="publisher" /> */}
          {/* Subscribers: */}
          {/* <div id="subscribers" /> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerCard;
