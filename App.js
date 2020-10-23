const bodyParser = require('body-parser');
const express = require('express');

const path = require('path');


const Sequelize = require('sequelize');
// connecting to database
const db = new Sequelize('lms', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    },
});
db.authenticate()
    .then(() => console.log("\t\tDatabase connected!!........"))
    .catch(err => console.log(err))

const app = express()
const port = process.env.port || 3000;


app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, () => console.log(`Server listening on port ${port}!`))