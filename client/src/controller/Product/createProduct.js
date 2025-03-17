import axios from 'axios';

export default {
  data() {
    return {
      product: {
        product_name: '',
        product_code: '',
        brand: '',
        pallet_quantity: '',
        package_quantity: '',
        weight: '',
        total_stock: 0,
        total_pallets: 0,
        hide: false
      }
    };
  },
  methods: {
    async createProduct() {
      try {
        // API'ye yeni ürün ekleme isteği
        await axios.post('http://192.168.1.110:3001/api/product/create-product', this.product).then(data => {
          console.log(data.data);
          if (data.data.status === 'success') {

            alert(`Ürün oluşturuldu ${data.data.data.product_name}`);
            this.product = {
              product_name: '',
              product_code: '',
              brand: '',
              pallet_quantity: '',
              package_quantity: '',
              weight: '',
              total_stock: 0,
              total_pallets: 0,
              hide: false
            }
          }
          else{
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
