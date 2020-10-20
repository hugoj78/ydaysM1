const express = require('express');
const router = express.Router();
const motherproduct = require('../controllers/motherproduct.controller');
const verifyToken = require('../helpers/verifyToken');
const verifyAdmin = require('../helpers/verifyAdmin');
const verifications = [ verifyToken, verifyAdmin ];

// Create a new post
router.post('/motherproduct', verifications, motherproduct.create);
router.get('/motherproduct', motherproduct.findAll);
router.get('/motherproduct/:id', motherproduct.findById);
router.patch('/motherproduct/:id', verifications, motherproduct.updateById);
router.delete('/motherproduct/:id', verifications, motherproduct.deleteByID);
router.delete('/motherproduct/delete/all', verifications, motherproduct.deleteAllproducts);

module.exports = router;
