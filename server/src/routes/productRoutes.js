const express = require('express');
const router = express.Router();

const getProducts = require('../controllers/product/getProducts');
const createProduct = require('../controllers/product/createProduct');
const updateProduct = require('../controllers/product/updateProduct');
const deleteProduct = require('../controllers/product/deleteProduct');
const findByPkProduct = require('../controllers/product/findByPkProduct');

router.get('/get-products', async (req, res) => {
    const products = await getProducts();
    res.json(products);
})

router.get('/get-product/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await findByPkProduct(productId);
    res.json({
        status: "success", data: product
    });
})

router.post('/create-product', async (req, res) => {
    const product = req.body;
    const newProduct = await createProduct(product);
    res.json({
        status: "success", data: newProduct
    });
});

router.put('/update-product/:id', async (req, res) => {
    const productId = req.params.id;
    const product = req.body;
    console.log(product);
    const data = await updateProduct(productId, product).then((dataw) => {
        console.log("test99", dataw);
    });
    // console.log(updatedProduct);
    // const data = await findByPkProduct(updatedProduct);
    res.json({
        status: "success", data: data
    });
});

router.delete('/delete-product/:id', async (req, res) => {
    const productId = req.params.id;
    const deletedProduct = await deleteProduct(productId);
    res.json(
        {
            status: "success", data: deletedProduct
        }
    );
});

module.exports = router