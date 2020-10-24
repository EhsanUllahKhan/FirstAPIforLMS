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

router.get('/:id', bodyParser, (req, res) => {
    console.log("getting")
    //res.send("Tests")
    Test.findByPk(req.params.id)
        .then(tests => {
            console.log(`Test is: \n ${tests}`)
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
            //console.log(`Inserting: \n ${tests}`)
            return res.send('ok');
        })
        .catch(err => console.log(`Error1: ${err}`))
    // res.send("SUCESSsss");
})

router.put('/put/:id', bodyParser, (req, res) => {
    console.log("putting", req.params.id)
    const { title, specs } = req.body
    Test.findByPk(req.params.id)
        .then((tests) => {
            Test.update({
                title: title,
                specs: specs
            },
                {
                    where: { id: req.params.id }
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

router.delete('/delete/:id', bodyParser, (req, res) => {
    console.log("Searching for : ", req.params.id, "  to delete")
    Test.findByPk(req.params.id)
        .then((test) => {
            if (test) {
                return test.destroy()
                    .then(() => res.status(200).send({
                        message: "Deleted Successfully"
                    }))
                    .catch(error => res.status(400).send(error))
            }
            else {
                return res.status(404).send({
                    message: "User Not Found!!"
                })
            }
        })
        .catch(error => res.status(400).send(error))
})

module.exports = router;


