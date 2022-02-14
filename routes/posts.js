const { Router } = require('express');
const router = Router();



router
.get('/', (req, res) => {
    console.log('get post')
})

.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log('get post', id)
})

.post('/', (req, res) => {
    console.log('post post')
})


module.exports = router;