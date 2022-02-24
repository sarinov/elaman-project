const {Router} = require('express');
const router = Router();
const prodController = require('../controllers/products')
const Response = require('../utils/ApiResponse')

router

    .post('/create-prod', async (req, res) => {
        const {name, description, price, amount} = req.body

        try {
            const result = await prodController.create(name, description, price, amount)
            res.status(201).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

    .get('/get-prod', async (req, res) => {
        const {id} = req.body

        try {
            const result = await prodController.get(id)
            if (!result) res.status(404).send(new Response().error('Product not found'));
            res.status(200).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err));
        }
    })

    .get('/get-all-prods', async (req, res) => {
        try {
            const result = await prodController.getAll()
            res.status(200).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

    .post('/update-prod', async (req, res) => {
        const {id, name, description, price, amount} = req.body

        try {
            const result = await prodController.update(id, name, description, price, amount)
            res.status(201).send(new Response().data(result));
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

    .post('/delete-prod', async (req, res) => {
        const {id} = req.body

        try {
            const result = await prodController.delete(id)
            res.status(201).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

module.exports = router;