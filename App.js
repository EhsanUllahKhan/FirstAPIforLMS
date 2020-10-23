const bodyParser = require('body-parser');
const express = require('express');

const path = require('path');


const db = require("./config/database");

// checking if DB is connected or not
db.authenticate()
    .then(() => console.log("\t\tDatabase connected!!........"))
    .catch(err => console.log(err))

const app = express()
const port = process.env.port || 3000;


app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, () => console.log(`Server listening on port ${port}!`))