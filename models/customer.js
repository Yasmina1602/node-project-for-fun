const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isVip: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true
    }
    //bonusPoints: Number
});

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().required(),
        isVip: Joi.boolean().required(),
        phone: Joi.string().required()
        //bonusPoints: Joi.number().min(0)
    });

    return schema.validate(customer);
}

const Customer = mongoose.model('Customer', customerSchema);

exports.Customer = Customer;
exports.validate = validateCustomer;