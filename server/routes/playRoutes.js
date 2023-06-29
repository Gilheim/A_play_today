const express = require ('express')
const PlayController = require('../controllers/playControllers')

const router = express.Router()

router.get('/', PlayController.getAllPlays)
router.get('/:id', PlayController.getOneById)
router.post('/', PlayController.createPlay)




module.exports = router