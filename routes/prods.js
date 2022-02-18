const { Router } = require('express');
const router = Router();

const prodsArr = [
    { name: "Milk", price: 300 },
    { name: "Bread", price: 60 }
]

router
.get('/',(req, res) => {
    res.send(prodsArr)
})

.delete('/:id', (req, res) => {
    const { id } = req.params
    prodsArr.splice(id, 1)
    res.send('ok')
    console.log(prodsArr)

})

module.exports = router;