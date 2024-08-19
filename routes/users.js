
const { User, validate } = require('../models/user');
const auth = require('../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res)=> {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', auth, async (req, res)=> {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.send("This email already exists in the database");

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    
    await user.save();

    res.status(201).send(_.pick(user, ['_id', 'name', 'email', 'isAdmin']));
});

module.exports = router; 