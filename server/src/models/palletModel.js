const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Pallet = sequelize.define('Pallet', {
  pallet_no: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  warehouse: {
    type: DataTypes.ENUM('Pharmastar', 'Logismart'),
    allowNull: false,
  },
});

Pallet.associate = (models) => {
  Pallet.belongsTo(models.Product, { foreignKey: 'productId' });
};

module.exports = Pallet;
