/**
 * Belirtilen kategori ID'sine sahip kategoriyi günceller.
 * 
 * @param {number} categoryId - Güncellenecek kategorinin ID'si.
 * @param {Object} category - Güncellenmiş kategori verileri.
 * @returns {Promise<[number]>} - Güncellenen kayıt sayısını içeren bir dizi döner.
 * Eğer hata oluşursa hata nesnesini döner.
 */
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
