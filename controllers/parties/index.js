import Sequelize from 'sequelize';
import db from '../../db/models';
import { uploadImage, deleteImage } from '../../utils';

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
            const logo = await uploadImage(req.files.logo, `${name}-logoImg`);
            const party = await db.political_party.create({
                name,
                bio,
                logo,
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

    getParties: async (req, res) => {
        try {
            const allParties = await db.political_party.findAndCountAll({});
            if (allParties) {
                return res.status(200).json({
                    message: 'Parties Retrieved Successfully',
                    allParties,
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

    getParty: async (req, res) => {
        try {
            const party = await db.political_party.findOne({
                where: { id: req.params.id },
            });
            if (!party) {
                return res.status(404).json({
                    message: 'Political Party does not exist',
                });
            }
            return res.status(200).json({
                message: 'Political Party Retrieved Successfully',
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

    updateParty: async (req, res) => {
        const { name, bio, established } = req.body;
        try {
            const foundParty = await db.political_party.findOne({
                where: { id: req.params.id },
            });
            if (!foundParty) {
                return res.status(404).send({
                    error: 'Political Party does not exist',
                });
            }
            const image = req.files
                ? await uploadImage(req.files.logo, `${name}-logoImg`)
                : foundParty.logo;

            const party = await foundParty.update({
                name,
                bio,
                logo: image,
                established,
            });
            res.status(200).json({
                message: 'Political Party updated successfully',
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

    deleteParty: async (req, res) => {
        try {
            const foundParty = await db.political_party.findOne({
                where: { id: req.params.id },
            });
            if (!foundParty) {
                return res.status(404).send({
                    error: 'Political Party does not exist',
                });
            }
            await foundParty.destroy();
            await deleteImage(foundParty.logo + '-logoImg');
            res.status(200).json({
                message: 'Political Party deleted successfully',
                foundParty,
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
