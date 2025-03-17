const express = require('express');
const app = express();
const sequelize = require('./src/models/indexModel'); // Veritabanı kontrol işlemleri yapılıyor.
const indexRoutes = require('./src/routes/indexRoutes');
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use('/api', indexRoutes);


app.listen(3001, () => {
    console.log('listening on port 3001');
});