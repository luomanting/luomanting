const Joi = require('joi');
exports.login_schema = {
    body: {
        username: Joi.string().alphanum().min(3).max(10).required(),
        password: Joi.string().pattern(/^[\S]{6,18}$/).required()
    }
}