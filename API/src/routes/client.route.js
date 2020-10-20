const express = require('express');
const router = express.Router();
const client = require('../controllers/client.controller.js');

router.post('/client/register', client.create);
router.post('/client/login', client.login);
router.get('/client', client.findAll);
router.get('/client/:id', client.getClient);
router.patch('/client/:id', client.updateClient);
router.patch('/clientPassword/:id', client.updatePassword);
router.delete('/client/:id', client.deleteClientbyId)



module.exports = router;