import Sequelize from 'sequelize';
import db from '../../db/models';
import { uploadImage, deleteImage } from '../../utils';

export default {
    addCandidate: async (req, res) => {
        const {
            first_name,
            last_name,
            manifesto,
            gender,
            political_partyId,
        } = req.body;
        console.log('the body data')
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

    getCandidates: async (req, res) => {
        try {
            const allCandidates = await db.candidates.findAndCountAll({});
            if (allCandidates) {
                return res.status(200).json({
                    message: 'Candidates Retrieved Successfully',
                    allCandidates,
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
    getCandidate: async (req, res) => {
        try {
            const candidate = await db.candidates.findOne({
                where: { id: req.params.id },
            });
            if (!candidate) {
                return res.status(404).json({
                    message: 'Candidate does not exist',
                });
            }
            return res.status(200).json({
                message: 'Candidate Retrieved Successfully',
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

    updateCandidate: async (req, res) => {
        const {
            first_name,
            last_name,
            manifesto,
            gender,
            political_partyId,
        } = req.body;
        try {
            const foundCandidate = await db.candidates.findOne({
                where: { id: req.params.id },
            });
            if (!foundCandidate) {
                return res.status(404).send({
                    error: 'Candidate does not exist',
                });
            }
            const image = req.files
                ? await uploadImage(
                      req.files.display_picture,
                      `${first_name}+' '+${last_name}-candidateImg`
                  )
                : foundCandidate.display_picture;
            const checkParty = await db.political_party.findOne({
                where: { id: political_partyId },
            });
            if (!checkParty) {
                return res.status(400).send({
                    error: 'Political Party does not exist',
                });
            }
            const candidate = await foundCandidate.update({
                first_name,
                last_name,
                manifesto,
                gender,
                display_picture: image,
                political_partyId: checkParty.id,
            });
            res.status(200).json({
                message: 'Candidate updated successfully',
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

    deleteCandidate: async (req, res) => {
        try {
            const foundCandidate = await db.candidates.findOne({
                where: { id: req.params.id },
            });
            if (!foundCandidate) {
                return res.status(404).send({
                    error: 'Candidate does not exist',
                });
            }
            await foundCandidate.destroy();
            await deleteImage(foundCandidate.first_name+'-'+foundCandidate.last_name+'-candidateImg');
            res.status(200).json({
                message: 'Candidate deleted successfully',
                foundCandidate,
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
