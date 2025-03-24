const { DataTypes } = require('sequelize');
const sequelize = require('./db');
  
const Shipment = sequelize.define('Shipment', {
  shipment_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  shipment_type: {
    type: DataTypes.ENUM('Giriş', 'Çıkış'),
    allowNull: false,
  },
  shipment_no: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  recipient: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  pallet_list: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

Shipment.associate = (models) => {
  Shipment.belongsTo(models.Product, { foreignKey: 'productId' });
};

module.exports = Shipment
