import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../axios'; // Axios instance

function CreateShipment() {
  const navigate = useNavigate();
  const [shipment, setShipment] = useState({
    shipment_date: '',
    shipment_type: 'entry', // Varsayılan olarak 'entry'
    shipment_no: '',
    recipient: '',
    palletList: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const shipmentData = {
      ...shipment,
      palletList: JSON.parse(shipment.palletList), // JSON string'den obje'ye dönüştürme
    };

    api.post('/shipment/create-shipment', shipmentData)
      .then(() => {
        navigate('/shipments'); // Sevkiyatlar listesine yönlendir
      })
      .catch((err) => {
        console.error('Sevkiyat oluşturulurken hata oluştu:', err);
      });
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
            <option value="entry">Giriş</option>
            <option value="exit">Çıkış</option>
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

        <Form.Group controlId="palletList">
          <Form.Label>Palet Listesi (JSON Formatında)</Form.Label>
          <Form.Control
            as="textarea"
            name="palletList"
            value={shipment.palletList}
            onChange={handleChange}
            placeholder='Örneğin: [{"pallet_no": "123", "product_id": 1, "quantity": 10}]'
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Oluştur
        </Button>
      </Form>
    </Container>
  );
}

export default CreateShipment;
