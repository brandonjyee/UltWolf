const helper = require('../helper');
const OpenTok = require('opentok');

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

module.exports.createSession = async () => {
  console.log('createSession(). Creating a Tok session...');
  const waitForSessionInfo = new Promise((resolve, reject) => {
    // The session will the OpenTok Media Router:
    const sessionOptions = {
      mediaMode: 'relayed'  // routed (through tokbox servers); relayed (P2P)
    }
    tok.createSession(sessionOptions, function(err, session) {
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
  return sessionId
};

module.exports.createToken = sessionId => {
  return tok.generateToken(sessionId);
};
