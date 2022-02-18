const { Router } = require('express');
const router = Router();

router
.get('/', (req, res) => {
    res.send('get post ASD')
})

.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send('get post', id)
})

.post('/', (req, res) => {
    res.send('post post')
})

module.exports = router;