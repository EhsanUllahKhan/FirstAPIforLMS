/*
file name based on Database name
*/

const Sequelize = require('sequelize');
const db = require('../config/database');
const test = require("./test");

const grades = db.define('grades', {
    title: {
        type: Sequelize.TEXT
    },
    tests_id: {
        // foreign key for Exam board
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false,
        references: {
            model: "tests",
            key: 'id'
        }
    }
}
    , {
        //schema: dbConfig.Schemas(1),
        tableName: 'grades',
        timestamps: false
    }
);

module.exports = grades; 