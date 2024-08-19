
const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);

const port = process.env.PORT || 5001;
const server = app.listen(port, () => {
    winston.info(` ${port} listen ...`);
});

module.exports = server;