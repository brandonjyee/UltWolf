const express = require('express');
const path = require('path');
const OpenTok = require('opentok');

const PORT = 3000;

// Verify that the API Key and API Secret are defined
const apiKey = process.env.API_KEY,
  apiSecret = process.env.API_SECRET;
if (!apiKey || !apiSecret) {
  console.log('You must specify API_KEY and API_SECRET environment variables');
  process.exit(1);
}

const opentok = new OpenTok(apiKey, apiSecret);

// Initialize the express app
var app = express();
app.use(express.static(path.join(__dirname, 'public')));

// Start the express app
function startListening() {
  // Start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () => {
    console.log("You're app is now ready at http://localhost:3000/");
  });

  // Set up our socket control center
  // const io = socketio(server);
  // require('./socket')(io);
}

// const startListening = () => {

//   const server = app.listen(PORT, () =>
//     console.log(`Mixing it up on port ${PORT}`)
//   );
// };

// A Session with an automatic archiving
// opentok.createSession({mediaMode:'routed', archiveMode:'always'}, function(err, session) {

const setupOpenTok = () => {
  // The session will the OpenTok Media Router:
  opentok.createSession({ mediaMode: 'routed' }, function(err, session) {
    if (err) return console.log(err);

    // save the sessionId
    // db.save('session', session.sessionId, done);

    const sessionId = session.sessionId;
    const token = opentok.generateToken(sessionId);

    app.set('sessionId', session.sessionId);

    // We will wait on starting the app until this is done
    startListening();
  });
};

// Generate a Token from just a sessionId (fetched from a database)
// token = opentok.generateToken(sessionId);

// Generate a Token from a session object (returned from createSession)
// token = session.generateToken();

// Set some options in a Token
// token = session.generateToken({
//   role :                   'moderator',
//   expireTime :             (new Date().getTime() / 1000)+(7 * 24 * 60 * 60), // in one week
//   data :                   'name=Johnny',
//   initialLayoutClassList : ['focus']
// });

app.get('/', function(req, res) {
  var sessionId = app.get('sessionId'),
    // generate a fresh token for this client
    token = opentok.generateToken(sessionId);

  res.render('index.ejs', {
    apiKey: apiKey,
    sessionId: sessionId,
    token: token,
  });
});
