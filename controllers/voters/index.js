import Sequelize from 'sequelize';
import db from '../../db/models';

export default {
    addVoter: async (req, res) => {
        const {
            voter_id,
            first_name,
            last_name,
            gender,
            dob,
            occupation,
        } = req.body;

        try {
            const voter = await db.voters.create({
                voter_id,
                first_name,
                last_name,
                gender,
                dob,
                occupation,
            });
            console.log('the voter', voter);

            return res.status(201).json({
                message: 'Voter Registration Successful',
                voter
            });
        } catch (e) {
            console.log('the error', e);
            /* istanbul ignore next */
            return res.status(500).json({
                error: e.message,
            });
        }
    },
};
