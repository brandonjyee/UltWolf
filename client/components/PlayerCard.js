import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

const cardImageMap = {
  ROBBER: '/img/roles/robber.png',
  SEER: '/img/roles/seer.png',
  TROUBLEMAKER: '/img/roles/troublemaker.png',
  VILLAGER: '/img/roles/villager.png',
  WEREWOLF: '/img/roles/werewolf.png',
};

const PlayerCard = props => {
  const { publisherRef, thisVideoElem } = props;
  if (publisherRef) {
    console.log('In PlayerCard. publisherRef.current:', publisherRef.current);
  }
  // const portalContainer = document.getElementById('abc123')
  return (
    <div>
      <Card>
        <CardContent className="player-card">
          {/* For thisPlayer, we render their role card if available */}
          {props.role ? (
            <img className="role-card" src={cardImageMap[props.role]} />
          ) : (
            <img className="role-card" src="/img/roles/card-back.png" />
          )}
          <div
            id="abc123"
            className="player-video"
            ref={el => {
              if (thisVideoElem) {
                thisVideoElem.style.height = '150px';
                thisVideoElem.style.width = '200px';
                thisVideoElem.style.borderRadius = '50%';
                el.appendChild(thisVideoElem);
              }
            }}
          >
            {/* {thisVideoElem && thisVideoElem} */}
          </div>
          <div>{props.playerName}</div>
          {/* { ReactDOM.createPortal(thisVideoElem, portalContainer) } */}
        </CardContent>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ thisVideoElem }) => ({ thisVideoElem });

export default connect(mapStateToProps)(PlayerCard);
