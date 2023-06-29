const express = require ('express')
const TheatreController = require('../controllers/theatreControllers')

const router = express.Router()

router.get('/', TheatreController.getAllTheatres)




module.exports = router