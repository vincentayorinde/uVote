const sanitize = require('indicative').sanitize;
const { messages, validatorInstance, sanitizeRules } = require('../../utils');

const signUp = async (req, res, next) => {
    const rules = {
        first_name: 'required|alpha',
        last_name: 'required|alpha',
        email: 'required|email|unique:user',
        password: 'required|min:8|max:30',
    };

    let data = req.body;
    const email = data.email.toLowerCase();
    data = {
        ...data,
        email,
    };
    console.log('the data', data);

    sanitize(data, sanitizeRules);
    try {
        console.log('call next now');
        await validatorInstance.validateAll(data, rules, messages);
        next();
    } catch (e) {
        console.log('the error', e)
        return res.status(400).json({
            message: e,
        });
    }
};

module.exports = { signUp };
