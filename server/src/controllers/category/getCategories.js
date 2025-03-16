async function getCategories() {
    try {
        const { Category } = require('../../models/indexModel');
        const categories = await Category.findAll();
        return categories;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = getCategories;