<template>
    <div class="container mt-5">
      <h1 class="mb-4">Yeni Ürün Oluştur</h1>
      <form @submit.prevent="createProduct">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="product_name" class="form-label">Ürün Adı</label>
            <input v-model="product.product_name" type="text" id="product_name" class="form-control" required />
          </div>
  
          <div class="col-md-6 mb-3">
            <label for="product_code" class="form-label">Ürün Kodu</label>
            <input v-model="product.product_code" type="text" id="product_code" class="form-control" required />
          </div>
  
          <div class="col-md-6 mb-3">
            <label for="brand" class="form-label">Marka</label>
            <input v-model="product.brand" type="text" id="brand" class="form-control" />
          </div>
  
          <div class="col-md-6 mb-3">
            <label for="pallet_quantity" class="form-label">Palet içi adet</label>
            <input v-model="product.pallet_quantity" type="text" id="pallet_quantity" class="form-control" />
          </div>
  
          <div class="col-md-6 mb-3">
            <label for="package_quantity" class="form-label">Paket içi adet</label>
            <input v-model="product.package_quantity" type="text" id="package_quantity" class="form-control" />
          </div>
  
          <div class="col-md-6 mb-3">
            <label for="weight" class="form-label">Ağırlık</label>
            <input v-model="product.weight" type="text" id="weight" class="form-control" />
          </div>
  
          <div class="col-12 mb-3 form-check">
            <input v-model="product.hide" type="checkbox" id="hide" class="form-check-input" />
            <label for="hide" class="form-check-label">Gizle</label>
          </div>
        </div>
  
        <div class="text-end">
          <button type="submit" class="btn btn-primary">Ürün Oluştur</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import createProduct from '../controller/Product/createProduct.js';
  export default createProduct;
  </script>
  