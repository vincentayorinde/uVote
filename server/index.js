import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import consola from 'consola';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import fileupload from 'express-fileupload';

import db from '../db/models';
import Routes from '../routes';

const app = express();

dotenv.config();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
    })
);
app.use(bodyParser.json());
app.use(
    fileupload({
        useTempFiles: true,
    })
);
// Routes which should handle requests
Routes(app);

app.get('/', (req, res) =>
    res.status(200).json({
        message: 'Welcome to uVote API',
    })
);
app.use((req, res) =>
    res.status(404).json({
        status: 404,
        error: `Route ${req.url} Not found`,
    })
);

app.use((error, req, res) =>
    res.status(500).json({
        status: 500,
        error,
    })
);

const dbconnection = db.sequelize;
dbconnection
    .authenticate()
    .then(() => {
        consola.success('Connection to database successful');
        app.listen(process.env.PORT, () => {
            consola.success(`Server start at port ${process.env.PORT}`);
        });
    })
    .catch((e) => {
        /* istanbul ignore next */
        throw e.message;
    });
export { app, db };
