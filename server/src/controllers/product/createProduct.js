async function createProduct(product) {
    try {
        const { Product } = require('../../models/indexModel');
        const newProduct = await Product.create(product);
        return newProduct;
    } catch (error) {
        console.log(error);
    }
}

module.exports = createProduct;
