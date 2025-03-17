import axios from '../../axios';

export default {
    async getProducts() {
        try {
            const response = await axios.get('/product/get-products');
            return response.data;
        } catch (error) {
            console.error('Ürünler alınırken hata:', error);
            return [];
        }
    }
}