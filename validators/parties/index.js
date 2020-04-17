import { sanitize, validations } from 'indicative';
import { messages, validatorInstance, sanitizeRules } from '../../utils';

export default {
    addParty: async (req, res, next) => {
        const rules = {
            name: 'required|alpha',
            bio: 'required',
            established: 'required',
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
