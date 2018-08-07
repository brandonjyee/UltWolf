/**
 * In a development environment, all API keys are in a file called `secrets.js`
 * in root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On production server, can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
if (process.env.NODE_ENV !== 'production') require('../secrets');

const express = require('express');
const path = require('path');
// const {setupOpenTok} = require('./opentok')
const socketio = require('socket.io');
const morgan = require('morgan')
const compression = require('compression')
const https = require('https')
const fs = require('fs')

const PORT = process.env.PORT || 3000;

const app = express()

module.exports = app


const createApp = () => {

  // logging middleware
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // compression middleware
  app.use(compression());

  // auth and api routes
  // app.use('/auth', require('./auth'));
  // app.use('/api', require('./api'));

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found req.path:', req.path);
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // Sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

  // Error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

// Start the express app
function startListening() {
  // Start listening (and create a 'server' object representing our server)
  const certOptions = {
    // key: fs.readFileSync(path.resolve('server.key')),
    // cert: fs.readFileSync(path.resolve('server.crt'))
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt')
  }

  // Set server to HTTPS which is required for browsers to do video
  const server = https.createServer(certOptions, app).listen(443, () => {
    // console.log(`You're app is now ready at http://localhost:${PORT}/`);
    console.log(`You're app is now ready at https://localhost`);
  })

  // const server = app.listen(PORT, () => {
  //   console.log(`You're app is now ready at http://localhost:${PORT}/`);
  // });

  // Set up our socket control center
  const io = socketio(server);
  require('./socket')(io);
}

async function bootApp() {
  // await sessionStore.sync()
  // await syncDb()
  await createApp()
  // await setupOpenTok(app);
  await startListening()
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp()
} else {
  createApp()
}


