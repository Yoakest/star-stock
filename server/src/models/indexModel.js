const sequelize = require('./db');

// Modelleri içe aktar ve oluştur
const Product = require('./productModel');
const Category = require('./categoryModel');
const ProductCategory = require('./productCategory');
const Pallet = require('./palletModel');
const Shipment = require('./shipmentModel');

// Many-to-Many İlişkiler
Product.belongsToMany(Category, { through: ProductCategory });
Category.belongsToMany(Product, { through: ProductCategory });

Shipment.hasMany(Pallet, { foreignKey: 'shipmentId' });
Pallet.belongsTo(Shipment, { foreignKey: 'shipmentId' });

Pallet.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Pallet, { foreignKey: 'productId' });

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Veritabanı senkronize edildi (alter: true)');
    })
    .catch(err => {
        console.error('Veritabanı senkronizasyon hatası:', err);
    });

module.exports = { sequelize, Product, Category, ProductCategory, Pallet, Shipment };