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
}


module.exports = TheatreController