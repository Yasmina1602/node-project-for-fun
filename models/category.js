const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
});

function validateCategory(category) {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50)
    });

    return schema.validate(category);
}

const Category = mongoose.model('Category', categorySchema);

exports.Category = Category;
exports.validate = validateCategory;
exports.categorySchema = categorySchema;
