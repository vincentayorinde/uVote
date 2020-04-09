const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const consola = require('consola');
const dotenv = require('dotenv');

const db = require('../db/models');
const Routes = require('../routes');

const app = express();

dotenv.config();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
        app.listen(process.env._PORT, () => {
            consola.success(`Server start at port ${process.env._PORT}`);
        });
    })
    .catch((e) => {
        /* istanbul ignore next */
        throw e.message;
    });
module.exports = { app, db };
