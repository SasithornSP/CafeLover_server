const express = require('express');
const router = express.Router();
const { createCategory, listCategory, removeCategory} = require('../Controller/category-controller');

//@ENDPOINT: /category
router.post('/',createCategory);
router.get('/',listCategory);
router.delete('/:id',removeCategory);

module.exports = router;