import { sanitize, validations } from 'indicative';
import { messages, validatorInstance, sanitizeRules } from '../../utils';

export default {
    addVoter: async (req, res, next) => {
        const rules = {
            voter_id: 'required',
            first_name: 'required|alpha',
            last_name: 'required|alpha',
            gender: 'required',
            dob: 'required',
            occupation: 'required|alpha',
        };

        let data = req.body;
        sanitize(data, sanitizeRules);
        try {
            await validatorInstance.validateAll(data, rules, messages);
            next();
        } catch (e) {
            console.log('the error', e);
            return res.status(400).json({
                message: e,
            });
        }
    },
};
