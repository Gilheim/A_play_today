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

    static async createPlay(req,res) {
        const play = req.body
        try {
            const newPlay = await Play.createPlay(play)
            res.status(201).json(newPlay)
        } catch (err){
            res.status(500).json({Error: `Error - ${err}`})
        }
    }

    static async updatePlay(req, res) {
        const { id } = req.params
        console.log(`ID is`, id)
        const newPlay = req.body
        console.log(`newPlay is`, id)
        try{
            const play = await Play.updatePlay(newPlay, id)
            console.log(`play is`, id)
            if (play){
                res.status(200).json(play)
            } else {
                res.status(404).json({error: `Play not found!`})
            }
        }catch (err) {
            res.status(500).json({error:`Oops! Something went wrong - ${err}`})
        }
    }

    static async deletePlay(req, res) {
        try {
            const id = parseInt(req.params.id);
            const play = await Play.getOneById(id);
            const result = await Play.deletePlay(play);
            res.json(result);
        } catch (err) {
            res.status(404).json({"error": err.message})
        }
    }
}


module.exports = PlayController
