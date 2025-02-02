require('express-async-errors');
const express = require('express');
const router = express.Router();
const { Category, validate } = require('../models/category');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const mongoose = require('mongoose');

router.get('/', async (req, res)=> {
    // throw new Error("toifalarni chaqirishda xato yuz berdi");
    const result = await Category.find().sort('name');
    res.send(result);
});

router.get('/:id', async (req, res)=> {
    if( !mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Yaroqsiz ID');

    const category = await Category.findById(req.params.id);
    if(!category)
        return res.status(404).send("category ID not found");

    res.send(category);
});

router.put('/:id', auth, async (req, res)=> {
    const { error } = validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);

    let category = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name },
        { new: true }
    );

    if (!category)
        return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');
    
      res.send(category);
});

router.post('/', auth, async (req, res)=> {
    const { error } = validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);

    let category = new Category({
        name: req.body.name
    });
    category = await category.save();
    
    res.status(201).send(category);
});

router.delete('/:id', [auth, admin], async (req, res)=> {
    const category = await Category.findByIdAndDelete(req.params.id);
    if(!category)
        return res.status(404).send("category ID not found");

    res.send(category);
});

module.exports = router;