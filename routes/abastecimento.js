const express = require('express');
const router = express.Router();
const abastecimentoController = require('../controllers/abastecimentoController');

router.get('/', abastecimentoController.index);

router.post('/add', abastecimentoController.store);

router.post('/edit/:id', abastecimentoController.update);

router.post('/delete/:id', abastecimentoController.delete);

module.exports = router;
