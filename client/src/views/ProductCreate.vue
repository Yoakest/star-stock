<template>
    <div class="container mx-auto p-6">
        <h1 class="text-3xl font-bold mb-6">Yeni Ürün Oluştur</h1>
        <form @submit.prevent="createProduct" class="space-y-4">
            <div>
                <label for="product_name" class="block text-sm font-medium text-gray-700">Ürün Adı</label>
                <input v-model="product.product_name" type="text" id="product_name"
                    class="w-full mt-1 p-2 border rounded" required />
            </div>

            <div>
                <label for="product_code" class="block text-sm font-medium text-gray-700">Ürün Kodu</label>
                <input v-model="product.product_code" type="text" id="product_code"
                    class="w-full mt-1 p-2 border rounded" required />
            </div>

            <div>
                <label for="brand" class="block text-sm font-medium text-gray-700">Marka</label>
                <input v-model="product.brand" type="text" id="brand" class="w-full mt-1 p-2 border rounded" />
            </div>

            <div>
                <label for="brand" class="block text-sm font-medium text-gray-700">Pallet içi adet</label>
                <input v-model="product.pallet_quantity" type="text" id="brand"
                    class="w-full mt-1 p-2 border rounded" />
            </div>

            <div>
                <label for="brand" class="block text-sm font-medium text-gray-700">Paket içi adet</label>
                <input v-model="product.package_quantity" type="text" id="brand"
                    class="w-full mt-1 p-2 border rounded" />
            </div>

            <div>
                <label for="brand" class="block text-sm font-medium text-gray-700">Ağırlık</label>
                <input v-model="product.weight" type="text" id="brand" class="w-full mt-1 p-2 border rounded" />
            </div>

            <div>
                <label for="total_stock" class="block text-sm font-medium text-gray-700">Toplam Stok</label>
                <input v-model="product.total_stock" type="number" id="total_stock"
                    class="w-full mt-1 p-2 border rounded" required />
            </div>

            <div>
                <label for="total_pallets" class="block text-sm font-medium text-gray-700">Toplam Palet</label>
                <input v-model="product.total_pallets" type="number" id="total_pallets"
                    class="w-full mt-1 p-2 border rounded" required />
            </div>

            <div>
                <label for="hide" class="block text-sm font-medium text-gray-700">Gizle</label>
                <input v-model="product.hide" type="checkbox" id="hide" class="w-4 h-4 mt-1" />
            </div>

            <div class="flex justify-end">
                <button type="submit" class="px-6 py-2 bg-blue-500 text-white rounded">Ürün Oluştur</button>
            </div>
        </form>
    </div>
</template>

<script>
// Vue.js bileşeninin script kısmını dışarıdaki js dosyasından alıyoruz
import createProduct from '../controller/Product/createProduct.js';

export default createProduct;
</script>

<style scoped>
/* Burada CSS özelleştirmelerini yapabilirsiniz */
</style>