const express = require('express');
const morgan = require('morgan');
// const admin = require("firebase-admin");
var cors = require('cors');

const router = require('./api');
const { logger } = require('./utils/logger');
const { errorHandler } = require('./middleware/error-handler');

// Create a new express application instance
const app = express();

app.use(cors());
app.use(express.json());

// The port the express app will listen on
const port = process.env.PORT || 8081;

logger.info('🤖 Initializing middleware');

app.use(morgan('tiny', { stream: logger.stream }));
app.use('/', router);
app.use(errorHandler);

console.log('in the backend');

// Serve the application at the given port
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    logger.info(`🎧 Listening at http://localhost:${port}/`);
  });
}

module.exports = {
  app
};
