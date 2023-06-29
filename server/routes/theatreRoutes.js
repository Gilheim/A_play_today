const express = require ('express')
const TheatreController = require('../controllers/theatreControllers')

const router = express.Router()

router.get('/', TheatreController.getAllTheatres)
router.get('/:id', TheatreController.getOneById)
router.post('/', TheatreController.createTheatre)
router.put('/:id', TheatreController.updateTheatre)




module.exports = router