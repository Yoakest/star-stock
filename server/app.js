const express = require('express');
const app = express();
const { sequelize } = require('./src/models/indexModel');

const indexRoutes = require('./src/routes/indexRoutes');

app.use(express.json());

app.use('/api', indexRoutes);

app.listen(3001, () => {
    console.log('listening on port 3001')
});