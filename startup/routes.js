
const errorMiddleware = require('../middleware/error');
const express = require('express');

const categoryRoute = require('../routes/categories');
const customerRoute = require('../routes/customers');
const coursRoute = require('../routes/courses');
const enrollRoute = require('../routes/enrollments');
const userRoute = require('../routes/users');
const authRoute = require('../routes/auth');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/categories', categoryRoute);
    app.use('/api/customers', customerRoute);
    app.use('/api/courses', coursRoute);
    app.use('/api/enrollments', enrollRoute);
    app.use('/api/users', userRoute);
    app.use('/api/auth', authRoute);
    app.use(errorMiddleware);
}