
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

module.exports = function () {
    winston.add(new winston.transports.Console());
    winston.add(new winston.transports.File({ filename: 'logs/vd-logs.log' }));
    winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vd-logs' }));

    winston.exceptions.handle(new winston.transports.Console(), new winston.transports.File({ filename: 'logs/vd-logs.log' }));

    process.on('unhandledRejection', ex => {
        throw ex;
    });

    // const myPromise = Promise.reject("yana kutilmagan xato").then('bitdi');
    // throw new Error("Kutilmagan xato");
}