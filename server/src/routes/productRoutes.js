const express = require('express');
const router = express.Router();

const getProducts = require('../controllers/product/getProducts');
const createProduct = require('../controllers/product/createProduct');
const updateProduct = require('../controllers/product/updateProduct');
const deleteProduct = require('../controllers/product/deleteProduct');
const findByPkProduct = require('../controllers/product/findByPkProduct');
const addCategoryToProduct = require('../controllers/product/addCategoryToProduct');
const getProductsWithCategories = require('../controllers/product/getProductsWithCategories');

router.get('/get-products', async (req, res) => {
    const products = await getProducts();
    res.json({
        status: "success", data: products
    });
});

router.get('/get-product-with-categories', async (req, res) => {
    const products = await getProductsWithCategories();
    res.json({
        status: "success", data: products
    });
});

router.get('/get-product/:id', async (req, res) => {
    const productId = req.params.id;
    console.log(productId);
    const product = await findByPkProduct(productId).then((data) => {
        console.log(data);
        if (data == null) {
            res.status(404).json({
                status: "error", data: productId + " Product not found"
            });
        }
        res.status(200).json({
            status: "success", data: data
        });
    });
    console.log(product);
});

router.post('/create-product', async (req, res) => {
    const product = req.body;
    console.log("product");
    console.log(product);
    const newProduct = await createProduct(product);
    res.json({
        status: "success", data: newProduct
    });
});

router.put('/update-product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const productData = req.body;

        console.log("Güncellenecek veri:", productData, productId);

        const updatedProduct = await updateProduct(productId, productData).then(async (data) => {
            const newData = await findByPkProduct(productId);
            return newData;
        })

        if (!updatedProduct) {
            return res.status(404).json({ status: "error", message: "Ürün bulunamadı veya güncellenemedi" });
        }

        console.log("Güncellenmiş Ürün:", updatedProduct);

        res.json({ status: "success", data: updatedProduct });

    } catch (error) {
        console.error("Ürün güncellenirken hata oluştu:", error);
        res.status(500).json({ status: "error", message: "Sunucu hatası" });
    }
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

router.post('/add-category/:id', async (req, res) => {
    const productId = req.params.id;
    const categoryId = req.body.categoryId;
    const addedCategory = await addCategoryToProduct(productId, categoryId);
    res.json(
        {
            status: "success", data: addedCategory
        });
}
);

module.exports = router