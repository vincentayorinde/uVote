const { validations } = require('indicative');
const { Vanilla } = require('indicative/builds/formatters');
const Validator = require('indicative/builds/validator');
const db = require('../db/models');

const messages = {
    required: 'Input your {{ field }}',
    required_with_any:
        'You have to provide a {{ field }} for any {{ argument.0 }}',
    requiredWithoutAll: 'Search Failed, no Filter provided',
    min: '{{ field }} should not be less than {{ argument.0 }}',
    max: '{{ field }} should not be more than {{ argument.0 }}',
    unique: '{{ field }} already existed',
    email: 'The value provided is not an email',
    string: '{{ field }} must be a string',
    integer: '{{ field }} must be an integer',
    alpha: 'Only letters allowed as {{ field }}',
    alphaNumeric: 'Only letters and numbers are allowed as {{ field }}',
    range: 'Only ratings from 1 to 5 are allowed',
    in: 'Wrong user role provided',
};

const sanitizeRules = {
    firstName: 'trim',
    lastName: 'trim',
    email: 'trim',
    password: 'trim',
};

validations.unique = async (data, field, message, args, get) => {
    const fieldValue = get(data, field);
    if (!fieldValue) return;
    const row = await db.users.findOne({ where: { [field]: fieldValue } });
    console.log('the row', row);
    if (row) throw message;
};

const validatorInstance = Validator(validations, Vanilla);

module.exports = { messages, validatorInstance, sanitizeRules };
