import Sequelize from 'sequelize';
import db from '../../db/models';

export default {
    getStats: async (req, res) => {
        let stats = {};
        try {
            const party = await db.political_party.findAndCountAll();
            const candidate = await db.candidates.findAndCountAll();
            const voter = await db.voters.findAndCountAll();
            const vote = await db.votes.findAndCountAll();
            
            stats['parties'] = party.count;
            stats['candidates'] = candidate.count;
            stats['voters'] = voter.count;
            stats['votes'] = vote.count;
            return res.status(200).json({
                message: 'Stats Retrieved Successfully',
                stats,
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
