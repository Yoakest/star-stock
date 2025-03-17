import axios from '../../axios';

// Belirli bir ürünü ID'ye göre getir
export async function getProductById(productId) {
  try {
    const response = await axios.get(`/product/get-product/${productId}`);
    return response.data.data;
  } catch (error) {
    console.error("Ürün alınırken hata:", error);
    return null;
  }
}

// Ürünü güncelle
export async function updateProduct(product) {
  try {
    await axios.put(`/product/update-product/${product.id}`, product);
    return true;
  } catch (error) {
    console.error("Ürün güncellenirken hata:", error);
    return false;
  }
}
