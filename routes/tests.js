const express = require("express");
const router = express.Router();
const db = require("../config/database")
const Test = require("../model/test")


// get ALl the records
router.get('/', (req, res) => {
    //res.send("Tests")
    Test.findAll()
        .then(tests => {
            console.log(`Tests are: \n ${tests}`)
            res.sendStatus(200);
        })
        .catch(err => console.log(`Error: ${err}`))
})

module.exports = router; 