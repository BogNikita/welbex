const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

router.get('/api/', controllers.getData);
router.get('/api/orderBy', controllers.getDataOrderBy);
router.get('/api/filtred', controllers.getFiltredData);

module.exports = router;
