const express = require('express');
const router = express.Router();
const setoresController = require('../controllers/setoresController');

router.get('/', setoresController.index);
router.post('/add', setoresController.store);
router.post('/edit/:id', setoresController.update);
router.post('/delete/:id', setoresController.delete);

module.exports = router;
