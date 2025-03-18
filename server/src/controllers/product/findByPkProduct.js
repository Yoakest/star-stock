async function findByPkProduct(id) {
    try {
        const { Product, Category } = require('../../models/indexModel');
        const product = await Product.findByPk(id, {
            include: {
                model: Category,
                through: { attributes: [] },
            }
        });
        return product;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = findByPkProduct;