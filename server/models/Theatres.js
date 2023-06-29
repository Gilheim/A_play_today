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
}


module.exports = Theatre