<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Ürünler Listesi</h1>

    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Yükleniyor...</span>
      </div>
    </div>

    <div v-else>
      <table class="table table-hover table-bordered">
        <thead class="table-dark">
          <tr>
            <th>Ürün Adı</th>
            <th>Ürün Kodu</th>
            <th>Marka</th>
            <th>Palet içi adet</th>
            <th>Paket içi adet</th>
            <th>Ağırlık</th>
            <th>Toplam Stok</th>
            <th>Toplam Palet</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.product_name }}</td>
            <td>{{ product.product_code }}</td>
            <td>{{ product.brand }}</td>
            <td>{{ product.pallet_quantity }}</td>
            <td>{{ product.package_quantity }}</td>
            <td>{{ product.weight }}</td>
            <td>{{ product.total_stock }}</td>
            <td>{{ product.total_pallets }}</td>
            <td>
              <router-link :to="`/product/edit/${product.id}`">
                <button class="btn btn-sm btn-primary">Düzenle</button>
              </router-link>
              <button @click="deleteProduct(product.id)" class="btn btn-sm btn-danger ms-2">Sil</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { listProducts } from "../controller/Product/listProduct";

export default {
  data() {
    return {
      products: [],
      loading: true,
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await listProducts();
        this.products = response.data;
      } catch (error) {
        console.error("Ürünler alınırken hata oluştu:", error);
      } finally {
        this.loading = false;
      }
    },
    deleteProduct(productId) {
      console.log(`Ürün silinecek: ${productId}`);
      // API'ye silme isteği gönderilebilir
    },
  },
};
</script>
