import React from 'react';
import { connect } from 'react-redux';
import GameBoard from './GameBoard';
import Button from '@material-ui/core/Button';
import { askServerToStartGame } from '../socket/send';
import SnackDisplay from './SnackDisplay';
import ErrorDisplay from './ErrorDisplay';
// import 'hashwords' // In a browser context, gets added to window.hashwords
// const hw = window.hashwords
// const hw2 = window.hashwords()

class GameHome extends React.Component {
  constructor(props) {
    super(props);
    this.publisherRef = React.createRef();
    this.subscribersRef = React.createRef();
  }

  handleClickStartGame = () => {
    console.log('clicked Start Game');
    askServerToStartGame();
  };

  render() {
    const { tokData } = this.props;
    console.log('In GameHome.render. tokData:', tokData);
    return (
      <div>
        <div id="publisher" ref={this.publisherRef} />
        <div id="subscribers" ref={this.subscribersRef} />
        <SnackDisplay />
        <ErrorDisplay />
        {/* <div>
          <ul>
            <li>apiKey: {tokData.apiKey}</li>
            <li>sessionId: {tokData.sessionId}</li>
            <li>token: {tokData.token}</li>
          </ul>
        </div> */}
        <GameBoard publisherRef={this.publisherRef} />
        <Button onClick={this.handleClickStartGame} variant="contained">
          Start Game
        </Button>
      </div>
    );
  }
}

const defaultTokData = {
  apiKey: '',
  sessionId: '',
  token: '',
};

const mapStateToProps = ({ tokData = defaultTokData, gameState }) => ({
  tokData,
  gameState,
});

export default connect(mapStateToProps)(GameHome);
