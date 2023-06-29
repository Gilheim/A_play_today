const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logRoutes);


module.exports = app