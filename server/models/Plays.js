const db = require("../database/db")

class Play {
    constructor({show_name, show_description, ticket_price, end_date, genre, show_duration, poster_url, theatre_id}) {
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
        const { name, description, price, end_date, genre, duration, poster, theatre_name } = play
        const getTheatreId = await db.query('SELECT theatre_id FROM theatres WHERE theatre_name ILIKE $1;', [theatre_name])
        const theatre_id = getTheatreId.rows[0].theatre_id
        const query = 'INSERT INTO shows (show_name, show_description, ticket_price_£, end_date, genre, show_duration, poster_url, theatre_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;'
        const values = [name, description, price, end_date, genre, duration, poster, theatre_id]
        const { rows } = await db.query(query,values)
        return rows[0]
    }
    
    static async updatePlay(play, id) {
        const { name, description, price, end_date, genre, duration, poster, theatre_name } = play
        const getTheatreId = await db.query('SELECT theatre_id FROM theatres WHERE theatre_name ILIKE $1;', [theatre_name])
        const theatre_id = getTheatreId.rows[0].theatre_id
        const query = 'UPDATE shows SET show_name = $1, show_description = $2, ticket_price_£ = $3, end_date = $4, genre = $5, show_duration = $6, poster_url = $7, theatre_id = $8 WHERE show_id = $9 RETURNING *;'
        const values = [name, description, price, end_date, genre, duration, poster, theatre_id, id]
        const { rows } = await db.query(query, values)
        return rows[0]
    }
}

module.exports = Play