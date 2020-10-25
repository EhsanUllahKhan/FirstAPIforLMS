const bodyParser = require('body-parser');
const express = require('express');
const Sequelize = require('sequelize');

const path = require('path');


const db = require("./config/database");

// checking if DB is connected or not
db.authenticate()
    .then(() => console.log("\t\tDatabase connected!!........"))
    .catch(err => console.log(err))


// db.tests.hasMany(db.grades);
// db.grades.belongsTo(db.tests);

const app = express()


app.get('/', (req, res) => res.send('Hello World!'))

// test routes
app.use("/tests", require('./routes/tests'));
app.use("/grades", require('./routes/grade.controller'));



const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}!`))