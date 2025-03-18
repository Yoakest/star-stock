async function getProductsWithCategories() {
    const { Product, Category } = require('../../models/indexModel');
    try {
        const products = await Product.findAll({
            include: {
                model: Category,
                through: { attributes: [] }, // Ara tabloyu gizle
            },
        });

        return products;
    } catch (error) {
        console.error('Ürünler alınırken hata oluştu:', error);
        return error;
    }
}

module.exports = getProductsWithCategories;
