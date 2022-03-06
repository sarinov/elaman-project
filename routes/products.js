const {Router} = require('express');
const router = Router();
const prodController = require('../controllers/products')
const Response = require('../utils/ApiResponse')
const {verifyToken, isAdmin} = require('../middlewares/auth')

router

    .post('/', verifyToken, isAdmin, async (req, res) => {
        const {name, description, price, amount, categoryId, companyId} = req.body

        try {
            const result = await prodController.create(name, description, price, amount, categoryId, companyId)
            res.status(201).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

    .get('/:id', async (req, res) => {
        const {id} = req.params

        try {
            const result = await prodController.get(id)
            if (!result) res.status(404).send(new Response().error('Product not found'));
            res.status(200).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err));
        }
    })

    .get('/', async (req, res) => {
        try {
            const result = await prodController.getAll()
            res.status(200).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

    .get('/prodsofcompany/:id', async (req, res) => {
        const { id } = req.params
        try {
            const result = await prodController.getAllProdsOfCompany(id)
            res.status(200).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

    .put('/', verifyToken, isAdmin, async (req, res) => {
        const {id, name, description, price, amount} = req.body

        try {
            const result = await prodController.update(id, name, description, price, amount)
            res.status(200).send(new Response().data(result));
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

    .delete('/:id', verifyToken, isAdmin, async (req, res) => {
        const {id} = req.params

        try {
            const result = await prodController.delete(id)
            res.status(200).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

    .put('/like/:id', verifyToken, async (req, res) => {
        const {id} = req.params
        const {userId} = req

        try {
            const result = await prodController.incrementLike(userId, id);
            res.status(201).send(new Response().data(result));
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err));
        }
    })

    .put('/dislike/:id', verifyToken, async (req, res) => {
        const {id} = req.params
        const {userId} = req

        try {
            const result = await prodController.incrementDislike(userId, id);
            res.status(201).send(new Response().data(result));
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err));
        }
    })

    .put('/unlike/:id', verifyToken, async (req, res) => {
        const {id} = req.params
        const {userId} = req

        try {
            const result = await prodController.decrementLike(userId, id);
            res.status(201).send(new Response().data(result));
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err));
        }
    })

    .put('/undislike/:id', verifyToken, async (req, res) => {
        const {id} = req.params
        const {userId} = req

        try {
            const result = await prodController.decrementDislike(userId, id);
            res.status(201).send(new Response().data(result));
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err));
        }
    })

module.exports = router;