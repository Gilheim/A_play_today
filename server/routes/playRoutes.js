const express = require ('express')
const PlayController = require('../controllers/playControllers')

const router = express.Router()

router.get('/', PlayController.getAllPlays)




module.exports = router