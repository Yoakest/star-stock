async function addCategoryToProduct(productId, categroryId) {
    try {
        console.log("productId, categroryId");
        console.log(productId, categroryId);
        const { ProductCategory } = require('../../models/indexModel');
        const result = await ProductCategory.create({
            ProductId: productId,
            CategoryId: categroryId
        })
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = addCategoryToProduct;