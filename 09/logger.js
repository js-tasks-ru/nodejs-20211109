const winston = require('winston'); // bunyan

module.exports = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({ label: 'application' }),
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
  ],
}); // logger.{debug|info|warn|error}

// logger.log("asdfasdf")
