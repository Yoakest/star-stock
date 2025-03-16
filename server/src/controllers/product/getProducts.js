async function getProducts() {
    try {
        const { Product } = require('../../models/indexModel');
        const products = await Product.findAll();

        return products;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = getProducts;