import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../axios'; // Axios instance

function CreateCategory() {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/category/create-category', category)
      .then(() => {
        navigate('/category-list'); // Kategori listesine yönlendir
      })
      .catch((err) => {
        console.error('Kategori oluşturulurken hata oluştu:', err);
      });
  };

  return (
    <Container className="mt-4">
      <h1>Yeni Kategori Oluştur</h1>
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

        <Form.Group controlId="description">
          <Form.Label>Açıklama</Form.Label>
          <Form.Control 
            type="text" 
            name="description" 
            value={category.description} 
            onChange={handleChange} 
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">Oluştur</Button>
      </Form>
    </Container>
  );
}

export default CreateCategory;
