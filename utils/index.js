import { validations } from 'indicative';
import { Vanilla } from 'indicative/builds/formatters';
import Validator from 'indicative/builds/validator';
import { v2 as cloudinary } from 'cloudinary';
import db from '../db/models';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

cloudinary.config({
    cloud_name: process.env.CLOUDI_NAME,
    api_key: process.env.CLOUDI_API_KEY,
    api_secret: process.env.CLOUDI_API_SECRET,
  });

export const messages = {
    required: 'Input your {{ field }}',
    required_with_any:
        'You have to provide a {{ field }} for any {{ argument.0 }}',
    requiredWithoutAll: 'Search Failed, no Filter provided',
    min: '{{ field }} should not be less than {{ argument.0 }}',
    max: '{{ field }} should not be more than {{ argument.0 }}',
    unique: '{{ field }} already existed',
    email: 'The value provided is not an email',
    string: '{{ field }} must be a string',
    integer: '{{ field }} must be an integer',
    alpha: 'Only letters allowed as {{ field }}',
    alphaNumeric: 'Only letters and numbers are allowed as {{ field }}',
    range: 'Only ratings from 1 to 5 are allowed',
    in: 'Wrong user role provided',
};

export const sanitizeRules = {
    first_name: 'trim',
    last_name: 'trim',
    email: 'trim',
    password: 'trim',
};

validations.unique = async (data, field, message, args, get) => {
    const fieldValue = get(data, field);
    if (!fieldValue) return;
    console.log('the args', args[0]+'s')
    if(db.sequelize) console.log('the table', db[args[0]])
    const row = await db[args[0]].findOne({ where: { [field]: fieldValue } });
    if (row) throw message;
};

export const validatorInstance = Validator(validations, Vanilla);

export const getToken = (id, email) =>
    jwt.sign({ id, email }, process.env.SECRET, {
        expiresIn: '1h', 
    });

export const randomString = () => crypto.randomBytes(11).toString('hex');

export const decodeToken = (token) => jwt.verify(token, process.env.SECRET);

export const uploadImage = (img, publicId) => new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      img.tempFilePath,
      { public_id: publicId },
      (err, res) => (err ? reject(err) : resolve(res.url))
    );
  });
  
  export const deleteImage = publicId => new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      (err, res) => (err ? reject(err) : resolve(res.url))
    );
  });


  export const expiireThisToken = async (token) => {
    const decoded = decodeToken(token);
    await db.expiredtokens.create({
      token,
      expireAt: decoded.exp,
    });
  };

  export const tokenExpired = async (token) => {
    const blockedToken = await db.expiredtokens.findOne({
      where: { token },
    });
    return !!blockedToken;
  };