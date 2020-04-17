import { sanitize, } from 'indicative';
import { messages, validatorInstance, sanitizeRules } from '../../utils';

export default {
    addCandidate: async (req, res, next) => {
        const rules = {
            first_name: 'required|alpha',
            last_name: 'required|alpha',
            manifesto: 'required',
            gender: 'required',
            political_partyId: 'required'
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
