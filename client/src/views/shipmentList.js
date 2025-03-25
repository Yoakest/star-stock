import React, { useEffect, useState } from "react";
import axios from "../axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const ShipmentList = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openShipment, setOpenShipment] = useState(null); // Seçilen sevkiyatın ID'si

  // Sevkiyat verilerini API'den almak
  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await axios.get("/shipment/get-shipments"); // API endpoint'ini buraya ekle
        setShipments(response.data.data);
      } catch (error) {
        console.error("Sevkiyat verisi alınırken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, []);

  const handleRowClick = (shipmentId) => {
    setOpenShipment(openShipment === shipmentId ? null : shipmentId); // Eğer aynı satır tekrar tıklanırsa, gizle
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Sevkiyatlar</h1>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Sevkiyat No</th>
            <th>Tarih</th>
            <th>Tür</th>
            <th>Alıcı</th>
            <th>Detaylar</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <React.Fragment key={shipment.id}>
              <tr
                onClick={() => handleRowClick(shipment.id)}
                className={openShipment === shipment.id ? "table-info" : ""}
              >
                <td>{shipment.shipment_no}</td>
                <td>{new Date(shipment.shipment_date).toLocaleDateString()}</td>
                <td>{shipment.shipment_type}</td>
                <td>{shipment.recipient}</td>
                <td>
                  {openShipment === shipment.id ? (
                    <button className="btn btn-danger btn-sm">Kapat</button>
                  ) : (
                    <button className="btn btn-primary btn-sm">Göster</button>
                  )}
                </td>
              </tr>

              {openShipment === shipment.id && (
                <tr>
                  <td colSpan="5">
                    <div className="mt-3">
                      <h4>Palet Listesi:</h4>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Ürün Kodu</th>
                            <th>Ürün Adı</th>
                            <th>Adet</th>
                          </tr>
                        </thead>
                        <tbody>
                          {shipment.pallet_list.map((pallet, index) => (
                            <tr key={index}>
                              <td>{pallet.product_code}</td>
                              <td>{pallet.product_name}</td>
                              <td>{pallet.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipmentList;
