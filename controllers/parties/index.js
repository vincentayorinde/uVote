import Sequelize from 'sequelize';
import db from '../../db/models';
import { uploadImage } from '../../utils';

export default {
    addParty: async (req, res) => {
        const { name, bio, established } = req.body;
        try {
            const checkParty = await db.political_party.findOne({
                where: { name },
            });
            if (checkParty) {
                return res.status(403).send({
                    error: 'Polical Party already exists',
                });
            }
            const plogo = await uploadImage(req.files.logo, `${name}-logoImg`);
            const party = await db.political_party.create({
                name,
                bio,
                logo: plogo,
                established,
            });
            return res.status(201).json({
                message: 'Political Party Registration Successful',
                party,
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
