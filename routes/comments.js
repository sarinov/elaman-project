const {Router} = require('express');
const router = Router();
const commentsController = require('../controllers/categories');
const Response = require("../utils/ApiResponse");

router

    .post('/', async (req, res) => {
        const {productId, content, userId, replyId} = req.body

        try {
            const result = await commentsController.create(productId, content, userId, replyId)
            res.status(201).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

    .get('/:id', async (req, res) => {
        const {id} = req.params

        try {
            const result = await commentsController.get(id)
            if (!result) res.status(404).send(new Response().error('Comment not found'));
            res.status(200).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err));
        }
    })

    .get('/', async (req, res) => {
        try {
            const result = await commentsController.getAll()
            res.status(200).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

    .put('/', async (req, res) => {
        const {id, productId, content, userId, replyId} = req.body

        try {
            const result = await commentsController.update(id, productId, content, userId, replyId)
            res.status(200).send(new Response().data(result));
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

    .delete('/:id', async (req, res) => {
        const {id} = req.params

        try {
            const result = await commentsController.delete(id)
            res.status(200).send(new Response().data(result))
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err))
        }
    })

module.exports = router;