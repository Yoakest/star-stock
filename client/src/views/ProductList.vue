<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Ürünler Listesi</h1>
    <div v-if="loading" class="text-center text-xl">Yükleniyor...</div>
    <div v-else>
      <table class="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Ürün Adı</th>
            <th class="py-2 px-4 border-b">Ürün Kodu</th>
            <th class="py-2 px-4 border-b">Marka</th>
            <th class="py-2 px-4 border-b">Toplam Stok</th>
            <th class="py-2 px-4 border-b">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td class="py-2 px-4 border-b">{{ product.product_name }}</td>
            <td class="py-2 px-4 border-b">{{ product.product_code }}</td>
            <td class="py-2 px-4 border-b">{{ product.brand }}</td>
            <td class="py-2 px-4 border-b">{{ product.total_stock }}</td>
            <td class="py-2 px-4 border-b">
              <router-link :to="`/product/edit/${product.id}`" class="text-blue-500">
                <button class="text-blue-500">Düzenle</button>
              </router-link>

              <button @click="deleteProduct(product.id)" class="text-red-500 ml-2">Sil</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],  // Ürün listesi
      loading: true, // Yükleniyor durumu
    };
  },
  created() {
    this.fetchProducts(); // Sayfa yüklendiğinde ürünleri al
  },
  methods: {
    // Ürünleri API'den çekme fonksiyonu
    async fetchProducts() {
      try {
        const response = await axios.get('http://192.168.1.110:3001/api/product/get-products');  // API URL'ini burada belirtin
        this.products = response.data;
      } catch (error) {
        console.error('Ürünler alınırken hata oluştu:', error);
      } finally {
        this.loading = false;
      }
    },
    // Ürünü düzenleme fonksiyonu (henüz işlevsellik eklenmedi)

    // Ürünü silme fonksiyonu
    deleteProduct(productId) {
      console.log(`Ürün silinecek: ${productId}`);
      // API'ye silme isteği gönderilebilir
    },
  },
};
</script>

<style scoped>
/* Stil eklemeleri yapabilirsiniz */
</style>