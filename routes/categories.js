const {Router} = require('express');
const router = Router();
const categoriesController = require('../controllers/categories');
const Response = require("../utils/ApiResponse");

router

    .post('/', async (req, res) => {
        const {name, description} = req.body // ??? надо добавить колонку description

        try {
            const result = await categoriesController.create(name, description)
            res.status(201).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

    .get('/:id', async (req, res) => {
        const {id} = req.params

        try {
            const result = await categoriesController.get(id)
            if (!result) res.status(404).send(new Response().error('Category not found'));
            res.status(200).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err));
        }
    })

    .get('/', async (req, res) => {
        try {
            const result = await categoriesController.getAll()
            res.status(200).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

    .put('/', async (req, res) => {
        const {id, name, description} = req.body

        try {
            const result = await categoriesController.update(id, name, description)
            res.status(200).send(new Response().data(result));
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

    .delete('/:id', async (req, res) => {
        const {id} = req.params

        try {
            const result = await categoriesController.delete(id)
            res.status(200).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

module.exports = router;