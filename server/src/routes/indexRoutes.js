const express = require('express');
const router = express.Router();

const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');

router.use('/product', productRoutes);
router.use('/category', categoryRoutes);



module.exports = router