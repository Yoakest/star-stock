import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import api from '../axios'; // axios'ı import ediyoruz

function EditProduct() {
    const { id } = useParams();  // URL parametrelerini almak için
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]); // Tüm kategoriler
    const [selectedCategories, setSelectedCategories] = useState([]); // Seçilen kategoriler
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ürünün detaylarını getir
        api.get(`/product/get-product/${id}`)
            .then((response) => {
                const productData = response.data.data;
                setProduct(productData);
                setSelectedCategories(productData.Categories.map(cat => cat.id)); // Mevcut kategorileri set et
                setLoading(false);
            })
            .catch((err) => {
                console.error('Ürün detayları alınırken hata oluştu', err);
                setLoading(false);
            });

        // Tüm kategorileri getir
        api.get('/category/get-categories')
            .then((response) => {
                setCategories(response.data.data);
            })
            .catch((err) => {
                console.error('Kategoriler alınırken hata oluştu', err);
            });
    }, [id]);

    if (loading) {
        return <div className="text-center">Yükleniyor...</div>;
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

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
        api.put(`/product/update-product/${id}`, { ...product, categories: selectedCategories })
            .then(() => {
                navigate('/'); // Ürün listesine yönlendir
            })
            .catch((err) => {
                console.error('Ürün güncellenirken hata oluştu', err);
            });
    };

    return (
        <Container className="mt-4">
            <h1>Ürün Düzenle</h1>
            {product && (
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="product_name">
                        <Form.Label>Ürün Adı</Form.Label>
                        <Form.Control
                            type="text"
                            name="product_name"
                            value={product.product_name}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="product_code">
                        <Form.Label>Ürün Kodu</Form.Label>
                        <Form.Control
                            type="text"
                            name="product_code"
                            value={product.product_code}
                            onChange={handleChange}
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
                                    checked={selectedCategories.includes(category.id)}
                                    onChange={handleCategoryChange}
                                />
                            ))}
                        </div>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3">Güncelle</Button>
                </Form>
            )}
        </Container>
    );
}

export default EditProduct;
 