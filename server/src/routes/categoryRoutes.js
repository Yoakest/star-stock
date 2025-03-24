const express = require('express');
const router = express.Router();

const getCategories = require('../controllers/category/getCategories');
const createCategory = require('../controllers/category/createCategory');
const updateCategory = require('../controllers/category/updateCategory');


router.get('/get-categories', async (req, res) => {
    const categories = await getCategories();
    res.json({
        status: "success", data: categories
    });
})

router.get('/get-category/:id', async (req, res) => {
    const categoryId = req.params.id;
    const findByPkCategory = require('../controllers/category/finfByPkCategory');
    const category = await findByPkCategory(categoryId);
    res.json({
        status: "success", data: category
    });
});

router.post('/create-category', async (req, res) => {
    const category = req.body;
    console.log(category);
    const newCategory = await createCategory(category);
    res.json({
        status: "success", data: newCategory
    });
});

router.put('/update-category/:id', async (req, res) => {
    const categoryId = req.params.id;
    const category = req.body;
    console.log(category);
    const updatedCategory = await updateCategory(categoryId, category);
    res.json({
        status: "success", data: updatedCategory
    });
})



module.exports = router;