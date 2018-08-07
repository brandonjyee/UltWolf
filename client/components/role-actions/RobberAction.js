import React, {Fragment} from 'react';
import {getPlayerName} from './helper'


class RobberAction extends React.Component {
  handleChange = event => {
    console.log('RobberAction handleChange triggered')
  }

  handleSubmit = event => {
    console.log('RobberAction handleSubmit().')
    event.preventDefault();
    // Get the data from the form and submit it to server
    // FIXME
    // Send a playerId
    const playerId = this.props.actionData[0];
    sendRoleActionToServer(playerId);
  };

  render() {
    const { players, actionData: playerIds } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        {playerIds.map(playerId => {
          return (
            <Fragment key={playerId}>
              <input
                id={playerId}
                name="robber-choice"
                className="display"
                type="radio"
                value={playerId}
              />
              <label htmlFor={playerId}>
              {getPlayerName(playerId, players)}
              </label>
              <br />
            </Fragment>
          );
        })}
        <button id="do-game-action" type="submit">
          Lock in Your Choice
        </button>
      </form>
    );
  }
}

export default RobberAction;
