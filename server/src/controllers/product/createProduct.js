async function createProduct(product) {
    try {
        console.log("createprodut")
        console.log(product);
        const { Product } = require('../../models/indexModel');
        const newProduct = await Product.create(product);
        if (product.categories) {
            const addCategoryToProduct = require('../product/addCategoryToProduct');
            console.log(newProduct)
            for (const category of product.categories) {
                await addCategoryToProduct(newProduct.dataValues.id, category);
            }
        }
        return newProduct;
    } catch (error) {
        console.log(error);
    }
}

module.exports = createProduct;
