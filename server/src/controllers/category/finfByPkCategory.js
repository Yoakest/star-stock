async function findByPkCategory(id) {
    try {
        const { Category } = require('../../models/indexModel');
        const category = await Category.findByPk(id);
        return category;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = findByPkCategory;