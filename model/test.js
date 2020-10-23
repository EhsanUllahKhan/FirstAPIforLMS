/*


file name based on Database name



*/

const Sequelize = require('sequelize');
const db = require('../config/database');

const test = db.define('test', {
    title: {
        type: Sequelize.STRING
    },
    spec: {
        type: Sequelize.STRING
    }
});

module.exports = test; 