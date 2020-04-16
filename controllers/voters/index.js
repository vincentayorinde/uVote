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
            const checkVoter = await db.voters.findOne({
                where: { voter_id },
            });
            if (checkVoter) {
                return res.status(403).send({
                    error: 'Voter already exists',
                });
            }
            const voter = await db.voters.create({
                voter_id,
                first_name,
                last_name,
                gender,
                dob,
                occupation,
            });
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
