const Play = require("../models/Plays")

class PlayController {
    static async getAllPlays(req,res) {
        try{
            const data = await Play.getAll()
            res.status(200).json(data)
        } catch (err){
            console.log(err)
            res.status(500).json({error: `Internal server error ${err}`})
        }
    }
    static async getOneById(req, res) {
        const { id } = req.params
        try {
            const play = await Play.getOneById(id)
            if (play){
                res.status(200).json(play)
            } else {
                res.status(404).json({error: `Play not found!`})
            }

        } catch (err){
            res.status(500).json({error:`Oops! Something went wrong - ${err}`})
        }
    }
}


module.exports = PlayController