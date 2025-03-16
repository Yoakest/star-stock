async function createCategory(category) {
    try {
        const { Category } = require('../../models/indexModel');
        const newCategory = await Category.create(category);
        return newCategory;
    } catch (error) {
        console.log(error);
    }
}

module.exports = createCategory;