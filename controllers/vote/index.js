import Sequelize from 'sequelize';
import db from '../../db/models';

export default {
    addVote: async (req, res) => {
        const { candidatesId, votersId } = req.body;
        try {
            const checkCandidate = await db.candidates.findOne({
                where: { id: candidatesId },
            });
            if (!checkCandidate) {
                return res.status(400).send({
                    error: 'Candidate does not exist',
                });
            }
            const checkVoter = await db.voters.findOne({
                where: { voter_id: votersId },
            });
            if (!checkVoter) {
                return res.status(400).send({
                    error: 'Voter does not exist',
                });
            }
            const checkVote = await db.votes.findOne({
                where: { voter_id: votersId },
            });
            if (checkVote) {
                return res.status(400).send({
                    error: 'You already Voted!',
                });
            }
            const vote = await db.votes.create({
                candidatesId: checkCandidate.id,
                votersId: checkVoter.id,
                count: 1,
                voter_id: votersId,
            });
            return res.status(201).json({
                message: 'Thank you for your Vote!',
                vote,
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
