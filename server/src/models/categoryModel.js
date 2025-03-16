const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Category', {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    });
}