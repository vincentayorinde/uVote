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
    getResult: async (req, res) => {
        try {
            let vote = [];
            let candidates = [];
            const allVotes = await db.votes.findAndCountAll({
                include: [
                    {
                        model: db.candidates,
                        as: 'candidate',
                        attributes: ['first_name', 'last_name'],
                    },
                ],
            });
            for (let i = 0; i < allVotes.rows.length; i++) {
                vote.push(allVotes.rows[i].dataValues);
            }
            let result = {};
            vote.forEach((x) => {
                console.log(x.candidate.first_name+' '+x.candidate.last_name);
                let cname = x.candidate.first_name+' '+x.candidate.last_name;
                result[cname] = (result[cname] || 0) + 1;
            });
            let percentage = {};
            for (let [candidate, vote_count] of Object.entries(result)) {
                percentage[candidate] = parseFloat(vote_count / allVotes.count * 100).toFixed(2)+'% with ('+vote_count+' votes)';
            }
            return res.status(200).json({
                message: 'The result',
                count: allVotes.count,
                votes: percentage,
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
