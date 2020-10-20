const express = require('express');
const router = express.Router();
const invoice = require('../controllers/invoice.controller');
const verifyToken = require('../helpers/verifyToken');
const verifyAdmin = require('../helpers/verifyAdmin');
const verifications = [ verifyToken, verifyAdmin ];

// Create a new post
router.post('/invoice', verifyToken, invoice.create);
router.get('/invoice', verifyAdmin, invoice.findAll);
router.get('/invoice/:id', verifications, invoice.findById);
router.get('/invoiceofclient/:id', invoice.getInvoicesofclient)
router.patch('/invoice/:id', verifyToken, invoice.updateById);
router.delete('/invoice/:id', verifyAdmin, invoice.deleteByID);
router.delete('/invoice/delete/all', verifications, invoice.deleteAllInvoices);

module.exports = router;
