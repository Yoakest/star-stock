<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Ürün Düzenle</h1>
    <form @submit.prevent="updateProduct" class="card p-4 shadow-sm">
      <div class="mb-3">
        <label class="form-label">Ürün Adı</label>
        <input v-model="product.product_name" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Ürün Kodu</label>
        <input v-model="product.product_code" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Marka</label>
        <input v-model="product.brand" type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label class="form-label">Palet içi adet</label>
        <input v-model="product.pallet_quantity" type="number" class="form-control" />
      </div>

      <div class="mb-3">
        <label class="form-label">Paket içi adet</label>
        <input v-model="product.package_quantity" type="number" class="form-control" />
      </div>

      <div class="mb-3">
        <label class="form-label">Ağırlık (kg)</label>
        <input v-model="product.weight" type="number" step="0.01" class="form-control" />
      </div>

      <div class="form-check mb-3">
        <input v-model="product.hide" type="checkbox" class="form-check-input" id="hideCheckbox" />
        <label class="form-check-label" for="hideCheckbox">Gizle</label>
      </div>

      <button type="submit" class="btn btn-primary w-100">Güncelle</button>
    </form>

    <div v-if="message" class="alert mt-3" :class="messageClass">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { getProductById, updateProduct } from "@/controller/Product/editProduct.js";

export default {
  data() {
    return {
      product: {
        product_name: "",
        product_code: "",
        brand: "",
        pallet_quantity: "",
        package_quantity: "",
        weight: "",
        hide: false,
      },
      message: "",
      messageClass: "",
    };
  },
  async created() {
    const productId = this.$route.params.id;
    try {
      this.product = await getProductById(productId);
    } catch (error) {
      console.error("Ürün alınırken hata oluştu:", error);
    }
  },
  methods: {
    async updateProduct() {
      const success = await updateProduct(this.product);
      if (success) {
        this.message = `Ürün "${this.product.product_name}" başarıyla güncellendi!`;
        this.messageClass = "alert-success";
      } else {
        this.message = "Güncelleme sırasında hata oluştu!";
        this.messageClass = "alert-danger";
      }
    }
  }
};
</script>
