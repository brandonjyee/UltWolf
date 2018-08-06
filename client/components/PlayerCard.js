import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import { connect } from 'react-redux';
// import ReactDOM from 'react-dom';

const cardImageMap = {
  ROBBER: '/img/roles/robber.png',
  SEER: '/img/roles/seer.png',
  TROUBLEMAKER: '/img/roles/troublemaker.png',
  VILLAGER: '/img/roles/villager.png',
  WEREWOLF: '/img/roles/werewolf.png',
};

const PlayerCard = props => {
  const { publisherRef, videoElem } = props;
  if (publisherRef) {
    console.log('In PlayerCard. publisherRef.current:', publisherRef.current);
  }
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
          {/* This just prints out [object HTMLVideoElement] */}
          {/* <div>
            {thisVideoElem && thisVideoElem.toString()}
          </div> */}
          <div
            className="player-video"
            ref={el => {
              if (videoElem && el) {
                videoElem.style.height = '150px';
                videoElem.style.width = '200px';
                // thisVideoElem.style.borderRadius = '50%';
                // Clear out the element and set the child as the video
                el.innerHTML = '';
                el.appendChild(videoElem);
              }
            }}
          >
            {/* Will be filled by video */}
          </div>
          <div>{props.playerName}</div>
        </CardContent>
      </Card>
    </div>
  );
};

// const mapStateToProps = ({ thisVideoElem }) => ({ thisVideoElem });

// export default connect(mapStateToProps)(PlayerCard);
export default PlayerCard
