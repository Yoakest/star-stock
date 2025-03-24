import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import api from '../axios';

function EditCategory() {
  const { id } = useParams();  // URL'den kategori ID'sini al
  const navigate = useNavigate();
  const [category, setCategory] = useState({ name: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/category/get-category/${id}`)
      .then((response) => {
        setCategory(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Kategori bilgileri alınırken hata oluştu.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setCategory({ ...category, name: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/category/update-category/${id}`, category)
      .then(() => {
        navigate('/category-list');  // Güncelleyince kategori listesine yönlendir
      })
      .catch((err) => {
        console.error('Kategori güncellenirken hata oluştu', err);
      });
  };

  if (loading) return <div className="text-center">Yükleniyor...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <Container className="mt-4">
      <h1>Kategori Düzenle</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Kategori Adı</Form.Label>
          <Form.Control 
            type="text" 
            name="name" 
            value={category.name} 
            onChange={handleChange} 
            required 
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">Güncelle</Button>
      </Form>
    </Container>
  );
}

export default EditCategory;
