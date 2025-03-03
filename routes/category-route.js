const express = require('express');
const router = express.Router();
const { listCategory } = require('../Controller/category-controller');

//@ENDPOINT http://localhost:8900/category

router.get('/',listCategory);


module.exports = router;