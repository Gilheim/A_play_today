const express = require ('express')
const PlayController = require('../controllers/playControllers')

const router = express.Router()

router.get('/', PlayController.getAllPlays)
router.get('/:id', PlayController.getOneById)
router.post('/', PlayController.createPlay)
router.put('/:id', PlayController.updatePlay)
router.delete('/:id', PlayController.deletePlay)




module.exports = router