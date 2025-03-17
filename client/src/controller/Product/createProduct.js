import axios from '../../axios';

export default {
  data() {
    return {
      product: {
        product_name: null,
        product_code: null,
        brand: null,
        pallet_quantity: null,
        package_quantity: null,
        weight: null,
        total_stock: null,
        total_pallets: null,
        hide: null,
      }
    };
  },

  methods: {
    async createProduct() {
      try {
        // API'ye yeni ürün ekleme isteği
        await axios.post('/product/create-product', this.product).then(data => {
          console.log(data.data);
          if (data.data.status === 'success') {

            alert(`Ürün oluşturuldu ${data.data.data.product_name}`);
            this.product = {
              product_name: null,
              product_code: null,
              brand: null,
              pallet_quantity: null,
              package_quantity: null,
              weight: null,
              total_stock: null,
              total_pallets: null,
              hide: null,
            }
            this.$router.push('/product/list'); // Ürün listesine yönlendirme
          }
          else {
            alert("Ürün oluşturlurken hata oluştu");
          }
        })
        // this.$router.push({ name: 'product-create' }); // Başka bir sayfaya yönlendirme
      } catch (error) {
        console.error('Ürün oluşturulurken hata:', error);
      }
    }
  }
};
