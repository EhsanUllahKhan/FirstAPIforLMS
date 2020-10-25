const express = require("express");
const router = express.Router();
const db = require("../config/database")
const Test = require("../model/test")
const Grade = require("../model/grade.model")
const bodyParser = require('body-parser').json();


// get ALl the records
router.get('/', (req, res) => {
    console.log("getting")
    //res.send("Tests")
    Grade.findAll()
        .then(grades => {
            console.log(`Grades are: \n ${grades}`)
            res.json(grades)
        })
        .catch(err => console.log(`Error: ${err}`))
})

router.get('/:id', bodyParser, (req, res) => {
    console.log("getting")
    //res.send("Tests")
    Grade.findByPk(req.params.id)
        .then(grades => {
            console.log(`Grade is: \n ${grades}`)
            res.json(grades)
        })
        .catch(err => console.log(`Error: ${err}`))
})

// inserting one record into database
router.post('/add', bodyParser, (req, res) => {
    console.log("adding: ", req.body.title)
    // let title = req.body.title;
    // let tests_id = req.body.tests_id;
    // console.log("title : ", title, "fk:", tests_id)
    const { title, tests_id } = req.body;
    console.log("title : ", title, "fk:", tests_id)
    Grade.create({
        title,
        tests_id
    })
        .then(grades => {
            //console.log(`Inserting: \n ${grades}`)
            return res.send('ok');
        })
        .catch(err => console.log(`Error1: ${err}`))
    // res.send("SUCESSsss");
})

router.put('/put/:id', bodyParser, (req, res) => {
    console.log("putting", req.params.id)
    const { title, specs } = req.body
    Grade.findByPk(req.params.id)
        .then((grades) => {
            Test.update({
                title: title,
                specs: specs
            },
                {
                    where: { id: req.params.id }
                })
        })
        .then((updatedGrade) => {
            res.status(200).send({
                message: "update operation successfull",
                data: {
                    title: title || updatedGrade.title,
                    specs: specs || updatedGrade.specs
                }
            })
        })
        .catch(error => res.status(400).send(error))
})

router.delete('/delete/:id', bodyParser, (req, res) => {
    console.log("Searching for : ", req.params.id, "  to delete")
    Grade.findByPk(req.params.id)
        .then((grades) => {
            if (grades) {
                return grades.destroy()
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


