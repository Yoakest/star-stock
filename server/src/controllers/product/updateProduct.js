async function updateProduct(productId, productData) {
    try {
        const { Product, Category } = require('../../models/indexModel');

        // Ürünü güncelle
        await Product.update(productData, { where: { id: productId } });

        // Eğer `categories` alanı varsa, ilişkileri güncelle
        if (productData.categories) {
            const product = await Product.findByPk(productId);
            if (product) {
                await product.setCategories(productData.categories);
            }
        }

        return { message: "Ürün başarıyla güncellendi" };
    } catch (error) {
        console.error("Ürün güncellenirken hata oluştu:", error);
        return error;
    }
}

module.exports = updateProduct;
