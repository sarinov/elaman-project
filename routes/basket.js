const {Router} = require('express');
const router = Router();
const basketController = require('../controllers/basket')
const Response = require('../utils/ApiResponse')
const {verifyToken, isAdmin} = require('../middlewares/auth')

router

    .post('/', verifyToken, async (req, res) => {
        const {productId, amount} = req.body;
        const {userId} = req;

        try {
            const result = await basketController.create(productId, userId, amount)
            res.status(201).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

    .put('/buy/:id', verifyToken, async (req, res) => {
        const {id} = req.params;

        try {
            const result = await basketController.buy(id)
            res.status(201).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

    .get('/:id', verifyToken, async (req, res) => {
        const {id} = req.params;

        try {
            const result = await basketController.get(id)
            res.status(200).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

    .get('/', verifyToken, async (req, res) => {
        const {userId} = req;

        try {
            const result = await basketController.getAll(userId)
            res.status(200).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

    .put('/', verifyToken, async (req, res) => {
        const {id, amount} = req.body

        try {
            const result = await basketController.update(id, amount)
            res.status(200).send(new Response().data(result));
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

    .delete('/:id', verifyToken, async (req, res) => {
        const {id} = req.params

        try {
            const result = await basketController.delete(id)
            res.status(200).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

module.exports = router;