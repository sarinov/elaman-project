const { Router } = require('express');
const router = Router();
const posts = require('./posts');
const prods = require('./products');
const users = require('./users');

router

.use('/post', posts)
.use('/products', prods)
.use('/users', users)





module.exports = router;