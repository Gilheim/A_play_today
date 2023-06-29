const db = require("../database/db")

class Play {
    constructor({show_id, show_name, show_description, ticket_price, end_date, genre, show_duration, poster_url, theatre_id}) {
        this.id = show_id
        this.name = show_name
        this.description = show_description
        this.price = ticket_price
        this.end_date = end_date
        this.genre = genre
        this.duration = show_duration
        this.poster = poster_url
        this.theatre_id = theatre_id
    }

    static async getAll(){
        const response = await db.query("SELECT * FROM shows ORDER BY show_name;")
        if (response.rows.length === 0) {
            throw new Error("No plays available.")
        }
        return response.rows.map(g => new Play(g));
    }

    static async getOneById(id){
        const response = await db.query("SELECT * FROM shows WHERE show_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate play.")
        }
        return new Play(response.rows[0]);
    }

    static async createPlay(play){
        const { name, description, price, end_date, genre, duration, poster, theatre_id } = play
        const query = 'INSERT INTO shows (show_name, show_description, ticket_price_£, end_date, genre, show_duration, poster_url, theatre_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;'
        const values = [name, description, price, end_date, genre, duration, poster, theatre_id]
        const { rows } = await db.query(query,values)
        return rows[0]
    }
}

module.exports = Play
