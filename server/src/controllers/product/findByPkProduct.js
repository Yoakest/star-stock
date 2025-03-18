async function findByPkProduct(id) {
    try {
        console.log("product ıd")
        const { Product } = require('../../models/indexModel');
        const product = await Product.findByPk(id);
        return product;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = findByPkProduct;