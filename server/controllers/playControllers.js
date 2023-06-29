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
}


module.exports = PlayController