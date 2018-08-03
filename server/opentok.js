const OpenTok = require('opentok');
const app = require('.');

// Verify that the Tok API Key and API Secret are defined
const apiKey = process.env.TOK_API_KEY,
  apiSecret = process.env.TOK_API_SECRET;
if (!apiKey || !apiSecret) {
  console.log(
    'You must specify TOK_API_KEY and TOK_API_SECRET environment variables'
  );
  process.exit(1);
}

const sessions = []

module.exports.setupOpenTok = () => {
  const opentok = new OpenTok(apiKey, apiSecret);

  console.log('setupOpenTok. Creating a Tok session...');
  // The session will the OpenTok Media Router:
  opentok.createSession({ mediaMode: 'routed' }, function(err, session) {
    if (err) return console.log(err);

    // save the sessionId
    // db.save('session', session.sessionId, done);

    const sessionId = session.sessionId;
    console.log('Tok sessionId:', sessionId);
    const token = opentok.generateToken(sessionId);
    console.log('Tok token:', token);

    // app.set('sessionId', session.sessionId);

    // We will wait on starting the app until this is done
    // callback();
  });
};



const getNewSessionInfo = async () => {
  const opentok = new OpenTok(apiKey, apiSecret);

  console.log('getNewSessionInfo. Creating a Tok session...');
  const waitForSessionInfo = new Promise((resolve, reject) => {
    // The session will the OpenTok Media Router:
    opentok.createSession({ mediaMode: 'routed' }, function(err, session) {
      if (err) {
        reject(err)
        return console.log(err);
      }

      const sessionId = session.sessionId;
      console.log('Tok sessionId:', sessionId);
      const token = opentok.generateToken(sessionId);
      console.log('Tok token:', token);

      resolve([ sessionId, token ])
    });
  });
  const [sessionId, token] = await waitForSessionInfo
  console.log('waited for creation of sessionId and token. sessionId:', sessionId, 'token:', token)
  const sessionInfo = [apiKey, sessionId, token]
  sessions.push(sessionInfo)
  return sessionInfo
};
module.exports.getNewSessionInfo = getNewSessionInfo

module.exports.findOrCreateSessionInfo = () => {
  if (sessions.length) {
    return sessions[0]
  } else {
    return getNewSessionInfo()
  }
}
