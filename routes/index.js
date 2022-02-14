const { Router } = require('express');
const router = Router();
const posts = require('./posts')


router

.use('/post', posts)


module.exports = router;