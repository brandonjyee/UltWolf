import OT from '@opentok/client';
// import store from '../store'
// import {gotTokDataFromServer} from '../store/tokdata'

const pubOptions = {
  publishAudio: true,
  publishVideo: true,
  width: 50,
  height: 50,
  resolution: '320x240', // Supports: 1280x720; 640x480 (default); 320x240
};

const subOptions = {
  width: 50,
  height: 50,
};

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

const streamCreated = session => {
  return event => {
    console.log(
      'another client has executed session.publish(). tok streamCreated. event:',
      event
    );

    // Create a container for a new Subscriber, assign it an id using the streamId, put it inside
    // the element with id="subscribers"

    const subContainer = document.createElement('div');
    subContainer.id = 'stream-' + event.stream.streamId;
    document.getElementById('subscribers').appendChild(subContainer);

    // Subscribe to the stream that caused this event, put it inside the container we just made
    session.subscribe(event.stream, subContainer, subOptions);
  };
};

const streamPropertyChanged = (session) => {
  return event => {
    console.log('received streamPropertyChanged event. event:', event);
    const subscribers = session.getSubscribersForStream(event.stream);
    for (var i = 0; i < subscribers.length; i++) {
      // You may want to display some UI text for each
      // subscriber, or make some other UI change,
      // based on event.changedProperty and
      // event.newValue
    }
  };
};

const setupEventHandlers = (session, publisher) => {
  // Attach event handlers to this session.
  session.on({
    // This function runs when session.connect() asynchronously completes
    sessionConnected: sessionConnected(session, publisher),

    // This function runs when another client publishes a stream (eg. session.publish())
    streamCreated: streamCreated(session),
    streamPropertyChanged: streamPropertyChanged(session),
  });
};

const setupOT = (apiKey, sessionId, token) => {
  // Initialize an OpenTok Session object
  const session = OT.initSession(apiKey, sessionId);

  const replacementElemId = 'publisher';
  // Initialize a Publisher, and place it into the element with id="publisher"
  const publisher = OT.initPublisher(replacementElemId, pubOptions);

  // Set up publishing and subscribing
  setupEventHandlers(session, publisher);

  // Connect to the Session using the 'apiKey' of the application and a 'token' for permission
  session.connect(token);
};

export default setupOT;
