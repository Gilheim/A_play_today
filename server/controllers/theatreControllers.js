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

    static async createTheatre(req,res) {
        const theatre = req.body
        try {
            const newTheatre = await Theatre.createTheatre(theatre)
            res.status(201).json(newTheatre)
        } catch (err){
            res.status(500).json({Error: `Error - ${err}`})
        }
    }

    static async updateTheatre(req, res) {
        const { id } = req.params
        const newTheatre = req.body
        try{
            const theatre = await Theatre.updateTheatre(newTheatre, id)
            if (theatre){
                res.status(200).json(theatre)
            } else {
                res.status(404).json({error: `Theatre not found!`})
            }
        }catch (err) {
            res.status(500).json({error:`Oops! Something went wrong - ${err}`})
        }
    }

    static async deleteTheatre(req, res) {
        try {
            const id = parseInt(req.params.id);
            const theatre = await Theatre.getOneById(id);
            const result = await theatre.deleteTheatre();
            res.status(204).json(result);
        } catch (err) {
            res.status(404).json({"error": err.message})
        }
    }
}


module.exports = TheatreController