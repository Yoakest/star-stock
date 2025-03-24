import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../axios';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/category/get-categories')
      .then((response) => {
        setCategories(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Kategoriler alınırken bir hata oluştu.');
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
    navigate(`/edit-category/${id}`);  // Kategori düzenleme sayfasına yönlendir
  };

  const handleDelete = (id) => {
    api.delete(`/category/delete-category/${id}`)
      .then(() => {
        setCategories(categories.filter((category) => category.id !== id));
      })
      .catch((err) => {
        console.error('Kategori silinirken hata oluştu', err);
      });
  };

  return (
    <Container className="mt-4">
      <h1>Kategori Listesi</h1>
      <Button variant="success" className="mb-3" onClick={() => navigate('/create-category')}>
        Yeni Kategori Ekle
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Kategori Adı</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(category.id)}>Düzenle</Button>
                <Button variant="danger" onClick={() => handleDelete(category.id)} className="ms-2">Sil</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default CategoryList;
