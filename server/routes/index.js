const app = require('../');

app.get('/', function(req, res, next) {
  try {
    // const sessionId = app.get('sessionId');
    console.log('In default get route "/".');// tok sessionId:', sessionId);
    // generate a fresh token for this client
    // const token = opentok.generateToken(sessionId);

    // res.render('index.ejs', {
    //   apiKey: apiKey,
    //   sessionId: sessionId,
    //   token: token,
    // });
  } catch (err) {
    next(err);
  }
});
