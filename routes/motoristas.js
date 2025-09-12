const express = require('express');
const router = express.Router();
const motoristasController = require('../controllers/motoristasController');

router.get('/', motoristasController.index);
router.post('/add', motoristasController.store);
router.post('/edit/:id', motoristasController.update);
router.post('/delete/:id', motoristasController.delete);

module.exports = router;
