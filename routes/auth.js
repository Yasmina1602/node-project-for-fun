
const { User } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res)=> {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.send(" Email don't exists in database");
    
    const isValid = await bcrypt.compare(req.body.password, user.password); //    chota NETO !!!
    if (!isValid) return res.status(400).send("Invalid password");

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(true);
});

function validate(user){
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });
    return schema.validate(user);
}

module.exports = router; 