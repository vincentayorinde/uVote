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
                voter,
            });
        } catch (e) {
            console.log('the error', e);
            /* istanbul ignore next */
            return res.status(500).json({
                error: e.message,
            });
        }
    },

    getVoters: async (req, res) => {
        try {
            const allVoters = await db.voters.findAndCountAll({});
            if (allVoters) {
                return res.status(200).json({
                    message: 'Voters Retrieved Successfully',
                    allVoters,
                });
            }
        } catch (e) {
            console.log('the error', e);
            /* istanbul ignore next */
            return res.status(500).json({
                error: e.message,
            });
        }
    },
    getVoter: async (req, res) => {
        try {
            const voter = await db.voters.findOne({
                where: { id: req.params.id },
            });
            if (!voter) {
                return res.status(404).json({
                    message: 'Voter does not exist',
                });
            }
            return res.status(200).json({
                message: 'Voter Retrieved Successfully',
                voter,
            });
        } catch (e) {
            console.log('the error', e);
            /* istanbul ignore next */
            return res.status(500).json({
                error: e.message,
            });
        }
    },

    updateVoter: async (req, res) => {
        const {
            voter_id,
            first_name,
            last_name,
            gender,
            dob,
            occupation,
        } = req.body;
        try {
            const foundVoter = await db.voters.findOne({
                where: { id: req.params.id },
            });
            if (!foundVoter) {
                return res.status(404).send({
                    error: 'Voter does not exist',
                });
            }

            const voter = await foundVoter.update({
                voter_id,
                first_name,
                last_name,
                gender,
                dob,
                occupation,
            });
            res.status(200).json({
                message: 'Voter updated successfully',
                voter,
            });
        } catch (e) {
            console.log('the error', e);
            /* istanbul ignore next */
            return res.status(500).json({
                error: e.message,
            });
        }
    },

    deleteVoter: async (req, res) => {
        try {
            const foundVoter = await db.voters.findOne({
                where: { id: req.params.id },
            });
            if (!foundVoter) {
                return res.status(404).send({
                    error: 'Voter does not exist',
                });
            }
            await foundVoter.destroy();
            res.status(200).json({
                message: 'Voter deleted successfully',
                foundVoter,
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
