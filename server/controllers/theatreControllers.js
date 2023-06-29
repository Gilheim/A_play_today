const Theatre = require("../models/Theatres")

class TheatreController {
    static async getAllTheatres(req,res) {
        try{
            const data = await Theatre.getAll()
            res.status(200).json(data)
        } catch (err){
            console.log(err)
            res.status(500).json({error: `Internal server error ${err}`})
        }
    }
    static async getOneById(req, res) {
        const { id } = req.params
        try {
            const theatre = await Theatre.getOneById(id)
            if (theatre){
                res.status(200).json(theatre)
            } else {
                res.status(404).json({error: `Theatre not found!`})
            }

        } catch (err){
            res.status(500).json({error:`Oops! Something went wrong - ${err}`})
        }
    }
}


module.exports = TheatreController