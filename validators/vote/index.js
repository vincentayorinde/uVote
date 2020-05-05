import { sanitize } from 'indicative';
import { messages, validatorInstance, sanitizeRules } from '../../utils';

export default {
    addVote: async (req, res, next) => {
        const rules = {
            candidatesId: 'required|integer',
            votersId: 'required',
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
    checkVoter: async (req, res, next) => {
        const rules = {
            votersId: 'required',
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
