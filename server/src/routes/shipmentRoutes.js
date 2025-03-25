const express = require('express');
const router = express.Router();

// const getShipments = require('../controllers/shipment/getShipments');
const createShipment = require('../controllers/shipment/createShipment');

// router.get('/get-shipments', async (req, res) => {
//     const shipments = await getShipments();
//     res.json({
//         status: "success", data: shipments
//     });
// })

router.post('/create-shipment', async (req, res) => {
    const shipment = req.body;
    console.log(shipment);
    const newShipment = await createShipment(shipment);
    res.json({
        status: "success", data: newShipment
    });
});

module.exports = router