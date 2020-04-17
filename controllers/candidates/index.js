import Sequelize from 'sequelize';
import db from '../../db/models';
import { uploadImage } from '../../utils';

export default {
    addCandidate: async (req, res) => {
        const {
            first_name,
            last_name,
            manifesto,
            gender,
            political_partyId,
        } = req.body;
        try {
            const checkCandidate = await db.candidates.findOne({
                where: { first_name, last_name },
            });
            if (checkCandidate) {
                return res.status(403).send({
                    error: 'Candidate already exists',
                });
            }
            const checkParty = await db.political_party.findOne({
                where: { id: political_partyId },
            });
            if (!checkParty) {
                return res.status(400).send({
                    error: 'Political Party does not exist',
                });
            }
            const display_picture = await uploadImage(
                req.files.display_picture,
                `${first_name}-${last_name}-candidateImg`
            );
            const candidate = await db.candidates.create({
                first_name,
                last_name,
                manifesto,
                gender,
                political_partyId,
                display_picture,
            });
            return res.status(201).json({
                message: 'Candidate Registration Successful',
                candidate,
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
