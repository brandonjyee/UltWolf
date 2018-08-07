import React from 'react';
import { connect } from 'react-redux';

const CenterCards = props => {
  return (
    <div id="center-cards">
      {props.centerCards && props.centerCards.map(centerCardId => {
        return (
          <div key={centerCardId}>
            {centerCardId}
            <img
              className="role-card"
              cardId={centerCardId}
              src="/img/roles/card-back.png"
            />
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = ({ centerCards = [] }) => ({ centerCards });

export default connect(mapStateToProps)(CenterCards);
