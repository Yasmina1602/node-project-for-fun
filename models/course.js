const Joi = require('joi');
const mongoose = require('mongoose');
const { categorySchema } = require('./category');

const Course = mongoose.model('Courses', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: categorySchema,
    required: true
  },
  trainer: {
    type: String,
    required: true
  },
  tags: {
    type: [String]
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    required: true
  },
  fee: {
    type: Number,
    required: true
  }
}));

function validateCourse(course) {
  const schema = Joi.object({
    title: Joi.string().required(),
    categoryId: Joi.string().required(), 
    trainer: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    status: Joi.string().required(),
    fee: Joi.number().min(0)
  });

  return schema.validate(course);
}

exports.Course = Course;
exports.validate = validateCourse;