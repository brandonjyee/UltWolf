import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import SeerAction from './role-actions/SeerAction';
import RobberAction from './role-actions/RobberAction';
import TroublemakerAction from './role-actions/TroublemakerAction';
import {getPlayerName} from './role-actions/helper'

const roleTextMap = {
  SEER: `SEER, wake up. You may look at another player's card or two of the center cards.`,
  ROBBER: `ROBBER, wake up. You may exchange your card with another player's card, and then view your new card.`,
  TROUBLEMAKER:
    'TROUBLEMAKER, wake up. You may exchange cards between two other players.',
  VILLAGER: 'VILLAGER, you are fast asleep while others are scheming...',
  WEREWOLF:
    'WEREWOLVES, wake up and look for other werewolves. If there is only one Werewolf, you may look at a card from the center.',
};


const getActionDisplay = (players, role, roleActionData) => {
  if (role === 'SEER') {
    console.log('setting formData for SEER');
    return <SeerAction players={players} actionData={roleActionData} />;
  } else if (role === 'ROBBER') {
    console.log('setting formData for ROBBER');
    return <RobberAction players={players} actionData={roleActionData} />;
  } else if (role === 'TROUBLEMAKER') {
    console.log('setting formData for TROUBLEMAKER');
    return <TroublemakerAction players={players} actionData={roleActionData} />;
  } else if (role === 'VILLAGER') {
    console.log('setting formData for VILLAGER');
    return '';
  } else if (role === 'WEREWOLF') {
    console.log('setting formData for WEREWOLF');

    const wolfIds = roleActionData;
    // Get the names of the other players
    const wolfNames = wolfIds.map(wolfId => {
      return getPlayerName(wolfId, players);
    });
    return wolfNames;
  } else {
    return 'roleActionData:' + roleActionData;
  }
};

class RoleActionForm extends React.Component {
  constructor() {
    super();
    this.state = {
      data: '',
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    // Send data to server via sockets
  };

  render() {
    const { players, role, roleActionData } = this.props;
    console.log(
      'In RoleActionForm.render(). players:',
      players,
      'role:',
      role,
      'roleActionData:',
      roleActionData
    );
    let formData = 'roleActionData:' + roleActionData;
    if (roleActionData && role && players) {
      formData = getActionDisplay(players, role, roleActionData);
    }

    return (
      <Paper id="action-input-container" elevation={1}>
        <div>Your role is: {role}</div>
        <div>Action: {roleTextMap[role]}</div>
        <div>{formData}</div>
      </Paper>
    );
  }
}

const mapStateToProps = ({ players, role, roleActionData = null }) => ({
  players,
  role,
  roleActionData,
});

export default connect(mapStateToProps)(RoleActionForm);
