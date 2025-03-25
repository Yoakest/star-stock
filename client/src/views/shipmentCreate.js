import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import api from '../axios';

function CreateShipment() {
  const [shipment, setShipment] = useState({
    shipment_date: new Date().toISOString().split('T')[0],
    shipment_type: 'Giriş', // Varsayılan 'gelen' olarak ayarlandı
    shipment_no: '',
    recipient: '',
    pallet_list: [],
  });

  const [products, setProducts] = useState([]); // Ürün listesi (entry için)
  const [pallets, setPallets] = useState([]); // Palet listesi (exit için)
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState('');

  // Ürün ve paletleri API'den çek
  useEffect(() => {
    if (shipment.shipment_type === 'Giriş') {
      api.get('/product/get-products')
        .then((res) => setProducts(res.data.data))
        .catch((err) => console.error('Ürünler alınırken hata oluştu', err));
    } else {
      api.get('/pallet/get-pallets')
        .then((res) => setPallets(res.data.data))
        .catch((err) => console.error('Paletler alınırken hata oluştu', err));
    }
  }, [shipment.shipment_type]);

  // Form inputlarını güncelle
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Ürün veya palet seçildiğinde state'i güncelle
  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  // Palet listesine ekleme işlemi
  const handleAddToPalletList = () => {
    if (!selectedItem || !quantity) {
      alert('Lütfen bir ürün ve miktar girin.');
      return;
    }
    console.log("selectedItem", selectedItem);

    const newItem = {
      id: selectedItem.id,
      quantity: parseInt(quantity, 10),
      product_code: selectedItem.product_code
    };


    setShipment((prev) => ({
      ...prev,
      pallet_list: [...prev.pallet_list, newItem],
    }));

    setSelectedItem(null);
    setQuantity('');
  };

  // API'ye veri gönderme
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("shipment");
    console.log(shipment);
    api.post('/shipment/create-shipment', shipment)
      .catch((err) => console.error('Sevkiyat oluşturulurken hata oluştu:', err));
  };

  return (
    <Container className="mt-4">
      <h1>Yeni Sevkiyat Oluştur</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="shipment_date">
          <Form.Label>Sevkiyat Tarihi</Form.Label>
          <Form.Control
            type="date"
            name="shipment_date"
            value={shipment.shipment_date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="shipment_type">
          <Form.Label>Sevkiyat Türü</Form.Label>
          <Form.Control
            as="select"
            name="shipment_type"
            value={shipment.shipment_type}
            onChange={handleChange}
            required
          >
            <option value="Giriş">Giriş</option>
            <option value="Çıkış">Çıkış</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="shipment_no">
          <Form.Label>Sevkiyat No</Form.Label>
          <Form.Control
            type="text"
            name="shipment_no"
            value={shipment.shipment_no}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="recipient">
          <Form.Label>Alıcı (Müşteri)</Form.Label>
          <Form.Control
            type="text"
            name="recipient"
            value={shipment.recipient}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Sevkiyat türüne göre Ürün veya Palet Listesi */}
        {shipment.shipment_type === 'Giriş' ? (
          <>
            <h4>Ürün Listesi</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Ürün Adı</th>
                  <th>Ürün Kodu</th>
                  <th>Seç</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.product_name}</td>
                    <td>{product.product_code}</td>
                    <td>
                      <Button variant="success" onClick={() => handleSelect(product)}>Seç</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : (
          <>
            <h4>Palet Listesi</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Palet No</th>
                  <th>Ürün Adı</th>
                  <th>Miktar</th>
                  <th>Seç</th>
                </tr>
              </thead>
              <tbody>
                {pallets.map((pallet) => (
                  <tr key={pallet.id}>
                    <td>{pallet.pallet_no}</td>
                    <td>{pallet.product_name}</td>
                    <td>{pallet.quantity}</td>
                    <td>
                      <Button variant="warning" onClick={() => handleSelect(pallet)}>Seç</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}

        {/* Miktar Ekleme Alanı */}
        {selectedItem && (
          <Form.Group controlId="quantity">
            <Form.Label>{shipment.shipment_type === 'Giriş' ? 'Ürün Miktarı' : 'Gönderilecek Miktar'}</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
            <Button variant="primary" className="mt-2" onClick={handleAddToPalletList}>Ekle</Button>
          </Form.Group>
        )}

        {/* Seçilen Palet Listesi */}
        <h4>Palet Listesi</h4>
        <ul>
          {shipment.pallet_list.map((item, index) => (
            <li key={index}>{item.product_code} - {item.quantity} adet</li>
          ))}
        </ul>

        <Button variant="primary" type="submit" className="mt-3">Sevkiyatı Kaydet</Button>
      </Form>
    </Container>
  );
}

export default CreateShipment;
