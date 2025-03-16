async function findByPkProduct(id) {
    try {
        const { Product } = require('../../models/indexModel');
        const product = await Product.findByPk(id);
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = findByPkProduct