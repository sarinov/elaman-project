const { Router } = require('express');
const router = Router();
const posts = require('./posts');
const prods = require('./products');


router

.use('/post', posts)

.use('/products', prods)


module.exports = router;