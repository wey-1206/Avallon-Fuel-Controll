const express = require('express');
const router = express.Router();
const fornecedoresController = require('../controllers/fornecedoresController');

router.get('/', fornecedoresController.index);
router.post('/add', fornecedoresController.store);
router.post('/edit/:id', fornecedoresController.update);
router.post('/delete/:id', fornecedoresController.delete);

module.exports = router;
