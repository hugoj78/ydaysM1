const express = require('express');
const router = express.Router();
const mcd = require('../controllers/mcd.controller.js');

router.get('/mcd', mcd.getMCD);



module.exports = router;