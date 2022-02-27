const {Router} = require('express');
const router = Router();
const posts = require('./posts');
const prods = require('./products');
const users = require('./users');
const companies = require('./companies')

router

    .use('/post', posts)
    .use('/products', prods)
    .use('/users', users)
    .use('/companies', companies)

module.exports = router;