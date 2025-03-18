import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../axios'; // Axios instance

function CreateProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); // Kategorileri tutan state
  const [selectedCategories, setSelectedCategories] = useState([]); // Seçilen kategoriler
  const [product, setProduct] = useState({
    product_name: '',
    product_code: '',
    brand: '',
    pallet_quantity: '',
    package_quantity: '',
    weight: '',
    hide: false,
  });

  // Kategorileri API'den çekme
  useEffect(() => {
    api.get('/category/get-categories')
      .then((response) => {
        setCategories(response.data.data); // Kategorileri state'e kaydet
      })
      .catch((err) => {
        console.error('Kategoriler alınırken hata oluştu', err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Kategori seçme işlemi
  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.value);
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/product/create-product', { ...product, categories: selectedCategories }) // Seçilen kategorileri de gönder
      .then(() => {
        navigate('/'); // Ürün listesine yönlendir
      })
      .catch((err) => {
        console.error('Ürün oluşturulurken hata oluştu', err);
      });
  };

  return (
    <Container className="mt-4">
      <h1>Yeni Ürün Oluştur</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="product_name">
          <Form.Label>Ürün Adı</Form.Label>
          <Form.Control 
            type="text" 
            name="product_name" 
            value={product.product_name} 
            onChange={handleChange} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="product_code">
          <Form.Label>Ürün Kodu</Form.Label>
          <Form.Control 
            type="text" 
            name="product_code" 
            value={product.product_code} 
            onChange={handleChange} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="brand">
          <Form.Label>Marka</Form.Label>
          <Form.Control 
            type="text" 
            name="brand" 
            value={product.brand} 
            onChange={handleChange} 
          />
        </Form.Group>

        <Form.Group controlId="pallet_quantity">
          <Form.Label>Palet içi adet</Form.Label>
          <Form.Control 
            type="number" 
            name="pallet_quantity" 
            value={product.pallet_quantity} 
            onChange={handleChange} 
          />
        </Form.Group>

        <Form.Group controlId="package_quantity">
          <Form.Label>Paket içi adet</Form.Label>
          <Form.Control 
            type="number" 
            name="package_quantity" 
            value={product.package_quantity} 
            onChange={handleChange} 
          />
        </Form.Group>

        <Form.Group controlId="weight">
          <Form.Label>Ağırlık (kg)</Form.Label>
          <Form.Control 
            type="text" 
            name="weight" 
            value={product.weight} 
            onChange={handleChange} 
          />
        </Form.Group>

        <Form.Group controlId="hide">
          <Form.Check 
            type="checkbox" 
            label="Gizle" 
            name="hide" 
            checked={product.hide} 
            onChange={handleChange} 
          />
        </Form.Group>

        {/* Kategoriler için Checkbox Listesi */}
        <Form.Group controlId="categories">
          <Form.Label>Kategoriler</Form.Label>
          <div>
            {categories.map((category) => (
              <Form.Check 
                key={category.id}
                type="checkbox"
                label={category.name}
                value={category.id}
                onChange={handleCategoryChange}
              />
            ))}
          </div>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">Oluştur</Button>
      </Form>
    </Container>
  );
}

export default CreateProduct;
