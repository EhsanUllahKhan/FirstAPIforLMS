const express = require("express");
const router = express.Router();
const db = require("../config/database")
const Test = require("../model/test")
const bodyParser = require('body-parser').json();


// get ALl the records
router.get('/', (req, res) => {
    console.log("getting")
    //res.send("Tests")
    Test.findAll()
        .then(tests => {
            console.log(`Tests are: \n ${tests}`)
            res.json(tests)
        })
        .catch(err => console.log(`Error: ${err}`))
})


// inserting one record into database
router.post('/', bodyParser, function (req, res) {

    //let { title, specs } = { req.query.title, req.query.specs };
    // let title = req.body.title;
    // let specs = req.body.specs;

    console.log(req.body)
    // await insert into table
    // Test.create({
    //     title,
    //     specs
    // })
    //     .then(tests => {
    //         console.log(`Inserting: \n ${tests}`)
    //         res.redirect('/tests');
    //     })
    //     .catch(err => console.log(`Error: ${err}`))
    res.send("SUCESS");
});




module.exports = router; 