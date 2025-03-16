async function deleteProduct(productId) {
    try {
        const { Product } = require('../../models/indexModel');
        const deletedProduct = await Product.destroy({ where: { id: productId } });
        return deletedProduct;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = deleteProduct