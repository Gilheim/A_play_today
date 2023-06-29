const db = require("../database/db")

class Theatre {
    constructor({theatre_name, location, capacity}) {
        this.name = theatre_name
        this.location = location
        this.capacity = capacity
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM theatres ORDER BY theatre_name;")
        if (response.rows.length === 0) {
            throw new Error("No theatres available.")
        }
        return response.rows.map(g => new Theatre(g));
    }

    static async getOneById(id){
        const response = await db.query("SELECT * FROM theatres WHERE theatre_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate theatre.")
        }
        return new Theatre(response.rows[0]);
    }

    static async createTheatre(theatre) {
        const { name, location, capacity } = theatre
        const query = 'INSERT INTO theatres (theatre_name, location, capacity) VALUES ($1, $2, $3) RETURNING *;'
        const values = [name, location, capacity]
        const { rows } = await db.query(query, values)
        return rows[0]
    }
}


module.exports = Theatre