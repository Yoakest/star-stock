const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME
});

// Modeli içe aktar ve oluştur
const Product = require('./productModel')(sequelize);
const Category = require('./categoryModel')(sequelize);

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Veritabanı senkronize edildi (alter: true)');
    })
    .catch(err => {
        console.error('Veritabanı senkronizasyon hatası:', err);
    });

module.exports = { sequelize, Product, Category };
