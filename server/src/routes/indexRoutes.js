const express = require('express');
const router = express.Router();

const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const shipmentRoutes = require('./shipmentRoutes');

router.use('/product', productRoutes);
router.use('/category', categoryRoutes);
router.use('/shipment', shipmentRoutes);

module.exports = router;