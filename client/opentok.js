import OT from '@opentok/client';

const setupOT = (apiKey, sessionId, token) => {
  // Initialize an OpenTok Session object
  const session = OT.initSession(apiKey, sessionId);

  // Initialize a Publisher, and place it into the element with id="publisher"
  const publisher = OT.initPublisher('publisher');

  // Attach event handlers
  session.on({
    // This function runs when session.connect() asynchronously completes
    sessionConnected: function(event) {
      console.log('session.connect() has completed. tok sessionConnected. event:', event)
      // Publish the publisher we initialzed earlier (this will trigger 'streamCreated' on other
      // clients)
      session.publish(publisher);
    },

    // This function runs when another client publishes a stream (eg. session.publish())
    streamCreated: function(event) {
      console.log('another client has done session.publish(). tok streamCreated. event:', event)


      // Create a container for a new Subscriber, assign it an id using the streamId, put it inside
      // the element with id="subscribers"
      const subContainer = document.createElement('div');
      subContainer.id = 'stream-' + event.stream.streamId;
      document.getElementById('subscribers').appendChild(subContainer);

      // Subscribe to the stream that caused this event, put it inside the container we just made
      session.subscribe(event.stream, subContainer);
    },
  });

  // Connect to the Session using the 'apiKey' of the application and a 'token' for permission
  session.connect(token);
};

export default setupOT
