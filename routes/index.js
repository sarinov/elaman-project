const { Router } = require('express');
const router = Router();
const posts = require('./posts');
const prods = require('./prods');


router

.use('/post', posts)

.use('/products', prods)


module.exports = router;