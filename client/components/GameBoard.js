import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import PlayerCards from './PlayerCards'
import CenterCards from './CenterCards'

const GameBoard = (props) => {
  return (
    <div id="game-board">
      <Card>
        <CardContent>
          {/* <Button variant="contained" color="primary">
            Hello World
          </Button> */}
          <CenterCards />
          <PlayerCards publisherRef={props.publisherRef} />
        </CardContent>
      </Card>
    </div>
  );
};

export default GameBoard;
