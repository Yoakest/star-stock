import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/product/get-product-with-categories')
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Ürünler alınırken bir hata oluştu.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    api.delete(`/product/delete-product/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((err) => {
        console.error('Ürün silinirken hata oluştu', err);
      });
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Ürün Listesi</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Ürün Adı</th>
            <th>Ürün Kodu</th>
            <th>Marka</th>
            <th>Palet içi adet</th>
            <th>Paket içi adet</th>
            <th>Ağırlık</th>
            <th>Toplam stok</th>
            <th>Toplam Palet</th>
            <th>Kategoriler</th> {/* Yeni sütun eklendi */}
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.product_name}</td>
              <td>{product.product_code}</td>
              <td>{product.brand}</td>
              <td>{product.pallet_quantity}</td>
              <td>{product.package_quantity}</td>
              <td>{product.weight}</td>
              <td>{product.total_stock}</td>
              <td>{product.total_pallets}</td>
              <td>
                {product.Categories && product.Categories.length > 0
                  ? product.Categories.map((cat) => cat.name).join(', ') // Kategorileri virgülle ayırarak göster
                  : 'Kategori Yok'}
              </td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(product.id)}>Düzenle</Button>
                <Button variant="danger" onClick={() => handleDelete(product.id)} className="ml-2">Sil</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProductList;
