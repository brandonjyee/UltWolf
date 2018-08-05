const helper = require('../helper');
const OpenTok = require('opentok');
// const app = require('.');

// Verify that the Tok API Key and API Secret are defined
const apiKey = process.env.TOK_API_KEY,
  apiSecret = process.env.TOK_API_SECRET;
if (!apiKey || !apiSecret) {
  console.log(
    'You must specify TOK_API_KEY and TOK_API_SECRET environment variables'
  );
  process.exit(1);
}

module.exports.apiKey = apiKey

const tok = new OpenTok(apiKey, apiSecret);
// const sessions = [];

// module.exports.setupOpenTok = () => {
//   // const opentok = new OpenTok(apiKey, apiSecret);

//   console.log('setupOpenTok. Creating a Tok session...');
//   // The session will the OpenTok Media Router:
//   tok.createSession({ mediaMode: 'routed' }, function(err, session) {
//     if (err) return console.log(err);

//     // save the sessionId
//     // db.save('session', session.sessionId, done);

//     const sessionId = session.sessionId;
//     console.log('Tok sessionId:', helper.hashStr(sessionId));
//     const token = tok.generateToken(sessionId);
//     console.log('Tok token:', helper.hashStr(token));

//     // app.set('sessionId', session.sessionId);

//     // We will wait on starting the app until this is done
//     // callback();
//   });
// };

module.exports.createSession = async () => {
  console.log('createSession(). Creating a Tok session...');
  const waitForSessionInfo = new Promise((resolve, reject) => {
    // The session will the OpenTok Media Router:
    tok.createSession({ mediaMode: 'routed' }, function(err, session) {
      if (err) {
        reject(err);
        return console.log(err);
      }

      const sessionId = session.sessionId;
      console.log('Tok sessionId:', helper.hashStr(sessionId));
      // const token = tok.generateToken(sessionId);
      // console.log('Tok token:', helper.hashStr(token));

      // resolve([sessionId, token]);
      resolve(sessionId);
    });
  });
  const sessionId = await waitForSessionInfo;
  console.log(
    'waited for creation of sessionId and token. sessionId:',
    helper.hashStr(sessionId)
    // 'token:',
    // helper.hashStr(token)
  );
  // const sessionInfo = [apiKey, sessionId, token];
  // sessions.push(sessionInfo);
  // return sessionInfo;
  return sessionId
};
// module.exports.createSession = createSession;

// module.exports.findOrCreateSessionInfo = () => {
//   if (sessions.length) {
//     return sessions[0];
//   } else {
//     return createSession();
//   }
// };

module.exports.createToken = sessionId => {
  return tok.generateToken(sessionId);
};
