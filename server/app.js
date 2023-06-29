const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');
const theatreRoutes = require('./routes/theatreRoutes')
const playRoutes = require('./routes/playRoutes')

const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req,res) => {
    res.json({
        title: "A Play Today!",
        description: "Get information about theatres and shows here!"
    })
})

app.use(logRoutes);
app.use('/theatres', theatreRoutes)
app.use('/plays', playRoutes)



module.exports = app
