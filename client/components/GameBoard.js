import React from 'react';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import PlayerCards from './PlayerCards'
import CenterCards from './CenterCards'

const GameBoard = () => {
  return (
    <div id="game-board">
      <Card>
        <CardContent>
          <CenterCards />
          <PlayerCards />
        </CardContent>
      </Card>
    </div>
  );
};

export default GameBoard;
