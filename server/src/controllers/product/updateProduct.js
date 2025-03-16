async function updateProduct(productId, product) {
    try {
        const { Product } = require('../../models/indexModel');
        const updatedProduct = await Product.update(product, { where: { id: productId } });
        return updatedProduct;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = updateProduct;