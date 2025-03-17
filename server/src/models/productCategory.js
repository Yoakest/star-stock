const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const ProductCategory = sequelize.define('ProductCategory', {
    // Ara tabloda ekstra alanlar tanımlamak istersen buraya ekleyebilirsin.
}, {
    timestamps: false // Eğer createdAt ve updatedAt istemiyorsan
});

module.exports = ProductCategory;
