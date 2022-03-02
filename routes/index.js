const {Router} = require('express');
const router = Router();
const posts = require('./posts');
const prods = require('./products');
const users = require('./users');
const companies = require('./companies')
const categories = require('./categories')
const comments = require('./comments')

router

    .use('/post', posts)
    .use('/products', prods)
    .use('/users', users)
    .use('/companies', companies)
    .use('/categories', categories)
    .use('/comments', comments)

module.exports = router;