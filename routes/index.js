const {Router} = require('express');
const router = Router();
const prods = require('./products');
const users = require('./users');
const companies = require('./companies')
const categories = require('./categories')
const comments = require('./comments')
const basket = require('./basket')

router

    .use('/products', prods)
    .use('/users', users)
    .use('/companies', companies)
    .use('/categories', categories)
    .use('/comments', comments)
    .use('/basket', basket)

module.exports = router;