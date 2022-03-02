const {Router} = require('express');
const router = Router();
const compsController = require('../controllers/companies');
const Response = require("../utils/ApiResponse");
const {verifyToken, isAdmin} = require('../middlewares/auth')

router

    .post('/', verifyToken, isAdmin, async (req, res) => {
        const {name, description, address} = req.body

        try {
            const result = await compsController.create(name, description, address)
            res.status(201).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

    .get('/:id', async (req, res) => {
        const {id} = req.params

        try {
            const result = await compsController.get(id)
            if (!result) res.status(404).send(new Response().error('Company not found'));
            res.status(200).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err));
        }
    })

    .get('/', async (req, res) => {
        try {
            const result = await compsController.getAll()
            res.status(200).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

    .put('/', verifyToken, isAdmin, async (req, res) => {
        const {id, name, description, address} = req.body

        try {
            const result = await compsController.update(id, name, description, address)
            res.status(200).send(new Response().data(result));
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

    .delete('/:id', verifyToken, isAdmin, async (req, res) => {
        const {id} = req.params

        try {
            const result = await compsController.delete(id)
            res.status(200).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

module.exports = router;