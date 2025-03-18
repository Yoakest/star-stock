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
    console.log(product);
    await axios.put(`/product/update-product/${product.id}`, product).then(data => {
      console.log(data.data);
    });
    return true;
  } catch (error) {
    console.error("Ürün güncellenirken hata:", error);
    return false;
  }
}
