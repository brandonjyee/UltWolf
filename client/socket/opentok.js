import OT from '@opentok/client';
// import store from '../store'
// import {gotTokDataFromServer} from '../store/tokdata'
import store from '../store'
import {setThisVideo} from '../store/thisVideoElem'
import {setPlayersVideo} from '../store/playersVideoElem'

const createPubOptions = (playerId) => ({
  publishAudio: true,
  publishVideo: true,
  width: 50,  // Change these vals?
  height: 50,
  resolution: '320x240', // Supports: 1280x720; 640x480 (default); 320x240
  name: playerId, // Set to playerId. Subscribers can access event.stream.name
  style: { nameDisplayMode: 'auto' },  // or 'off'
  insertDefaultUI: false,   // Going to stick the DOM elem where we want it later
});

const createSubOptions = () => ({
  width: 50,
  height: 50,
  style: { nameDisplayMode: 'auto' },  // or 'off'
  insertDefaultUI: false, // Going to stick the DOM elem in later
});

// This function runs when session.connect() asynchronously completes
const sessionConnected = (session, publisher) => {
  return event => {
    console.log(
      'session.connect() has completed. tok sessionConnected. event:',
      event
    );
    // Publish the publisher we initialzed earlier (this will trigger 'streamCreated' on other
    // clients)
    session.publish(publisher);
  };
};

const subscriberVideoElementCreated = (playerId) => {
  return event => {
    console.log('In publisher subscriberVideoElementCreated(). event:', event, 'event.element:', event.element)
    // console.log('event.stream.name:', event.stream.name)
    // const subContainer = document.createElement('div');
    // subContainer.id = 'stream-' + event.stream.streamId;
    // document.getElementById('subscribers').appendChild(subContainer);
    store.dispatch(setPlayersVideo(playerId, event.element))
  }
}

// const subscriberVideoElementCreated2 = (session) => {
//   return event => {
//     console.log('In publisher subscriberVideoElementCreated2(). event:', event, 'event.element:', event.element)
//     // store.dispatch(setThisVideo(event.element))
//   }
// }

// Triggers when other ppl publish their streams to this session
const streamCreated = session => {
  return event => {
    console.log(
      'another client has executed session.publish(). tok streamCreated. event:',
      event
    );

    // Create a container for a new Subscriber, assign it an id using the streamId, put it inside
    // the element with id="subscribers"

    // const subContainer = document.createElement('div');
    // subContainer.id = 'stream-' + event.stream.streamId;
    // document.getElementById('subscribers').appendChild(subContainer);

    // event.stream.name is on this event. Set to be the playerId
    // Subscribe to the stream that caused this event, put it inside the container we just made
    const subscriber = session.subscribe(event.stream, null, createSubOptions());
    console.log('subscriber:', subscriber)
    subscriber.on('videoElementCreated', subscriberVideoElementCreated(event.stream.name))
  };
};

const streamPropertyChanged = (session) => {
  return event => {
    console.log('received streamPropertyChanged event. event:', event);
    // const subscribers = session.getSubscribersForStream(event.stream);
    // for (var i = 0; i < subscribers.length; i++) {
      // You may want to display some UI text for each
      // subscriber, or make some other UI change,
      // based on event.changedProperty and
      // event.newValue
    // }
  };
};

const videoElementCreated = (session) => {
  return event => {
    console.log('In publisher videoElementCreated(). event:', event, 'event.element:', event.element)
    // const subContainer = document.createElement('div');
    // subContainer.id = 'stream-fdsa123'; //+ event.stream.streamId;
    // document.getElementById('publisher').appendChild(subContainer);
    // subContainer.appendChild(event.element)
    store.dispatch(setThisVideo(event.element))
  }
}



const setupEventHandlers = (session, publisher) => {
  // Attach event handlers to session, publisher, and subscriber.
  publisher.on('videoElementCreated', videoElementCreated(session))
  session.on({
    // This function runs when session.connect() asynchronously completes
    sessionConnected: sessionConnected(session, publisher),

    // This function runs when another client publishes a stream (eg. session.publish())
    streamCreated: streamCreated(session),
    streamPropertyChanged: streamPropertyChanged(session),
    // videoElementCreated: subscriberVideoElementCreated2(session), // Triggered for subscriber?
  });
};

const setupOT = (playerId, apiKey, sessionId, token) => {
  // Initialize an OpenTok Session object
  const session = OT.initSession(apiKey, sessionId);

  // const replacementElemId = 'publisher';
  // Initialize a Publisher, and place it into the element with id="publisher"
  // const publisher = OT.initPublisher(replacementElemId, pubOptions);
  const publisher = OT.initPublisher(null, createPubOptions(playerId));

  // Set up publishing and subscribing
  setupEventHandlers(session, publisher);

  // Connect to the Session using the 'apiKey' of the application and a 'token' for permission
  session.connect(token);
};

export default setupOT;
