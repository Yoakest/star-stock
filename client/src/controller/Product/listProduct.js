import axios from '../../axios';

export async function listProducts() {
    try {
        const response = await axios.get('/product/get-products');
        return response.data;
    } catch (error) {
        console.error('Ürünler alınırken hata:', error);
        return [];
    }
}