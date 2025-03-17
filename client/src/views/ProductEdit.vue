<template>
    <div class="container">
      <h1>Ürün Düzenle</h1>
      <form @submit.prevent="updateProduct">
        <div>
          <label>Ürün Adı</label>
          <input v-model="product.product_name" type="text" required />
        </div>
  
        <div>
          <label>Ürün Kodu</label>
          <input v-model="product.product_code" type="text" required />
        </div>
  
        <div>
          <label>Marka</label>
          <input v-model="product.brand" type="text" />
        </div>
  
        <div>
          <label>Toplam Stok</label>
          <input v-model="product.total_stock" type="number" required />
        </div>
  
        <button type="submit">Güncelle</button>
      </form>
    </div>
  </template>
  
  <script>
  import { getProductById, updateProduct } from '@/controller/Product/editProduct.js';
  
  export default {
    data() {
      return {
        product: {
          product_name: "",
          product_code: "",
          brand: "",
          total_stock: 0,
        },
      };
    },
    async created() {
      const productId = this.$route.params.id; // URL’den ürün ID’sini al
      this.product = await getProductById(productId);
      console.log(this.product);
    },
    methods: {
      async updateProduct() {
        const success = await updateProduct(this.product);
        if (success) {
          alert("Ürün başarıyla güncellendi!");
          this.$router.push('/products'); // Ürün listesine yönlendirme
        } else {
          alert("Güncelleme sırasında hata oluştu!");
        }
      }
    }
  };
  </script>
  