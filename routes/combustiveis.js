const express = require('express');
const router = express.Router();
const combustiveisController = require('../controllers/combustiveisController');

router.get('/', combustiveisController.index);
router.post('/add', combustiveisController.store);
router.post('/edit/:id', combustiveisController.update);
router.post('/delete/:id', combustiveisController.delete);

module.exports = router;
