const express = require('express');
const router = express.Router();
const product = require('../controllers/product.controller');
const verifyToken = require('../helpers/verifyToken');
const verifyAdmin = require('../helpers/verifyAdmin');
const verifications = [ verifyToken, verifyAdmin ];

// Create a new post
router.post('/product', verifyToken, product.create);
router.get('/product', product.findAll);
router.get('/search/:name', product.findByName);
router.get('/productOfMother/:id', product.findByIdMother);
router.get('/product/:id', product.findById);
router.get('/productofseller/:id', product.getproductsofseller)
router.patch('/product/:id', verifyToken, product.updateById);
router.delete('/product/:id', verifyToken, product.deleteByID);
router.delete('/product/delete/all', verifyAdmin, product.deleteAllproducts);

module.exports = router;
