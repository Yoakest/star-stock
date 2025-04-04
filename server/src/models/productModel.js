const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Product = sequelize.define('Product', {
    product_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    product_code: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
    brand: {
        type: DataTypes.STRING(25),
        defaultValue: 'N/A',
    },
    pallet_quantity: {
        type: DataTypes.STRING(20),
        defaultValue: 'N/A',
    },
    package_quantity: {
        type: DataTypes.STRING(20),
        defaultValue: 'N/A',
    },
    weight: {
        type: DataTypes.STRING(20),
        defaultValue: 'N/A',
    },
    total_stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    total_pallets: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    hide: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

Product.associate = (models) => {
    Product.hasMany(models.Shipment, { foreignKey: 'productId' });
    Product.hasMany(models.Pallet, { foreignKey: 'productId' });
};

module.exports = Product;
