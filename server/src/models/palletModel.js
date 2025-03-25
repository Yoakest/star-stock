const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Product = require('./productModel');

const Pallet = sequelize.define('Pallet', {
  pallet_no: {
    type: DataTypes.INTEGER,
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
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
    },
    onDelete: 'CASCADE', // Ürün silinirse bağlı paletler de silinsin
  },

});

Pallet.associate = (models) => {
  Pallet.belongsTo(models.Product, { foreignKey: 'productId' });
};

module.exports = Pallet;
