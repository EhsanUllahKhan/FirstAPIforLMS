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
router.post('/add', bodyParser, (req, res) => {
    console.log("adding: ", req.body.title)
    let title = req.body.title;
    let specs = req.body.specs;

    console.log("title : ", title, "specs: ", specs)

    Test.create({
        title,
        specs
    })
        .then(tests => {
            console.log(`Inserting: \n ${tests}`)
            res.redirect('/tests');
        })
        .catch(err => console.log(`Error: ${err}`))
    res.send("SUCESS");
})

router.put('/put/:id', bodyParser, (req, res) => {
    console.log("putting", req.params.id)
    const { title, specs } = req.body
    Test.findByPk(req.params.bookId)
        .then((tests) => {
            Test.update({
                title,
                specs
            })
        })
        .then((updatedTest) => {
            res.status(200).send({
                message: "update operation successfull",
                data: {
                    title: title || updatedTest.title,
                    specs: specs || updatedTest.specs
                }
            })
        })
        .catch(error => res.status(400).send(error))
})


module.exports = router; 