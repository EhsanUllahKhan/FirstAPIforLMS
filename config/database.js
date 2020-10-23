// initializing database
const Sequelize = require('sequelize');
// connecting to database
module.exports = new Sequelize('lms', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    },
});
