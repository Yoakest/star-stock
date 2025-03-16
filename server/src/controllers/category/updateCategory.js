async function updateCategory(categoryId, category) {
    try {
        const { Category } = require('../../models/indexModel');
        const updatedCategory = await Category.update(category, { where: { id: categoryId } });
        return updatedCategory;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = updateCategory;